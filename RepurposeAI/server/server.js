
import { GoogleGenerativeAI } from '@google/generative-ai';
import OpenAI from 'openai';
import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Supabase
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Initialize AI Providers
const genAI = process.env.GEMINI_API_KEY ? new GoogleGenerativeAI(process.env.GEMINI_API_KEY) : null;
const openai = process.env.OPENAI_API_KEY ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY }) : null;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// ... (existing code for getVideoId, Innertube, fetchYouTubeContent, generatePrompt) ...

// AI Generation Helper
async function generateContentWithFallback(prompt, modelPreference) {
    let content = null;
    let usedProvider = null;

    // 1. Try OpenAI (ChatGPT) if available
    if (openai && (!modelPreference || modelPreference.startsWith('gpt'))) {
        try {
            console.log("🤖 Generating with OpenAI (ChatGPT)...");
            const completion = await openai.chat.completions.create({
                messages: [{ role: "system", content: prompt }],
                model: "gpt-4-turbo-preview", // or gpt-3.5-turbo
                response_format: { type: "json_object" },
            });
            content = JSON.parse(completion.choices[0].message.content);
            usedProvider = 'OpenAI';
            return { content, provider: usedProvider };
        } catch (err) {
            console.error("OpenAI Failed:", err.message);
        }
    }

    // 2. Try Google Gemini (Free Tier)
    if (genAI && (!content)) {
        try {
            console.log("✨ Generating with Google Gemini...");
            const modelGemini = genAI.getGenerativeModel({ model: "gemini-pro" });
            const result = await modelGemini.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
            content = JSON.parse(cleanJson);
            usedProvider = 'Gemini';
            return { content, provider: usedProvider };
        } catch (err) {
            console.error("Gemini Failed:", err.message);
        }
    }

    // 3. Fallback to Local Ollama
    if (!content) {
        try {
            console.log("🦙 Generating with Local Ollama...");
            const response = await axios.post('http://localhost:11434/api/generate', {
                model: modelPreference || "gemma2",
                prompt: prompt,
                stream: false,
                format: "json",
                options: { temperature: 0.7 }
            });
            content = JSON.parse(response.data.response);
            usedProvider = 'Ollama';
            return { content, provider: usedProvider };
        } catch (err) {
            console.error("Ollama Failed:", err.message);
            throw new Error("All AI providers failed. Check your keys or local Ollama.");
        }
    }
}

app.post('/api/repurpose', async (req, res) => {
    try {
        const { url, content, type, model } = req.body;
        const authHeader = req.headers.authorization;

        // ... (Auth & Usage Logic remains same) ...
        // Auth Check
        if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });
        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: authError } = await supabase.auth.getUser(token);
        if (authError || !user) return res.status(401).json({ error: 'Invalid token.' });

        // Usage Limit Check
        const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
        if (profile.tier === 'free' && profile.usage_count >= 3) {
            return res.status(403).json({ error: 'Free limit reached. Upgrade to Pro.' });
        }

        // Fetch Content
        let transcriptText = content || '';
        if (type === 'youtube' && url) {
            const videoId = getVideoId(url);
            if (!videoId) return res.status(400).json({ error: 'Invalid YouTube URL' });
            try {
                const result = await fetchYouTubeContent(videoId);
                transcriptText = result.text;
            } catch (err) {
                return res.status(400).json({ error: "Could not fetch content." });
            }
        } else if (type === 'article' && url) {
            const { data: html } = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
            transcriptText = html.replace(/<[^>]+>/g, ' ');
        }

        if (!transcriptText || transcriptText.length < 50) return res.status(400).json({ error: 'Content too short.' });
        const truncated = transcriptText.slice(0, 30000);
        const prompt = generatePrompt(truncated, req.body.tone);

        // 🤖 GENERATE with Fallback
        const { content: generatedContent, provider } = await generateContentWithFallback(prompt, model);
        console.log(`✅ Success via ${provider}`);

        // Update Usage
        await supabase.from('profiles').update({ usage_count: profile.usage_count + 1 }).eq('id', user.id);

        res.json(generatedContent);

    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// Stripe & Webhook logic would go here (omitted for brevity in this fix step)
const stripe = process.env.STRIPE_SECRET_KEY ? new Stripe(process.env.STRIPE_SECRET_KEY) : null;

app.post('/api/create-checkout-session', async (req, res) => {
    try {
        if (!stripe) return res.status(500).json({ error: 'Stripe not configured.' });

        const { priceId, userId } = req.body;

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [{ price: priceId, quantity: 1 }],
            success_url: `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${req.headers.origin}/cancel`,
            metadata: { userId },
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Stripe Session Error:', error);
        res.status(500).json({ error: error.message });
    }
});

app.post('/api/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];

    if (!stripe) return res.status(500).send('Stripe not configured');

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const userId = session.metadata.userId;
        const stripeCustomerId = session.customer;

        // Upgrade user to Pro
        await supabase
            .from('profiles')
            .update({
                tier: 'pro',
                stripe_customer_id: stripeCustomerId,
                subscription_status: 'active'
            })
            .eq('id', userId);

        console.log(`✅ User ${userId} upgraded to PRO`);
    }

    res.json({ received: true });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    if (genAI) console.log("✨ Gemini AI is ENABLED");
    else console.log("🦙 Gemini not configured. Using Local Ollama.");
});
