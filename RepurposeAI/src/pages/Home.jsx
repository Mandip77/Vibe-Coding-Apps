import React, { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import GeneratorLayout from '../components/GeneratorLayout';
import { supabase } from '../lib/supabase';

export default function Home() {
    const [hasGenerated, setHasGenerated] = useState(false);
    const [generatedContent, setGeneratedContent] = useState(null);
    const [history, setHistory] = useState([]);

    // Load history on mount
    useEffect(() => {
        fetchHistory();
    }, []);

    const fetchHistory = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            // Fetch from Supabase if logged in
            const { data, error } = await supabase
                .from('history')
                .select('*')
                .eq('user_id', session.user.id)
                .order('created_at', { ascending: false })
                .limit(10);

            if (!error && data) {
                setHistory(data.map(item => ({
                    ...item,
                    // Map database fields to app state structure if needed, 
                    // or ensure we save them in the right structure.
                    // For now assuming we save the whole generic JSON object or specific fields.
                    // Actually, let's verify table structure plan. 
                    // Plan said: video_url, tiktok_script, linkedin_post, newsletter_body.
                    // But app uses a single 'generatedContent' object.
                    // Let's adapt to save the whole object for simplicity or map it.
                    // Let's assume we save the JSON payload in a 'content' column or similar, 
                    // OR we map it back. 
                    // Let's try to keep it simple: Save 'content' (jsonb) if possible, or mapping.
                    // Plan said specific columns. Let's stick to specific columns for better DB practice,
                    // but for rapid prototype, a JSONB column 'data' would be easier. 
                    // Let's try to recover the `generatedContent` shape from columns.
                    tiktok: { script: item.tiktok_script, hashtags: [] }, // simplified
                    linkedin: { content: item.linkedin_post },
                    newsletter: { body: item.newsletter_body }
                })));
            }
        } else {
            // Fallback to LocalStorage
            const saved = localStorage.getItem('ai_content_history');
            if (saved) {
                try {
                    setHistory(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to load history", e);
                }
            }
        }
    };


    const handleDataReceived = async (data) => {
        const newContent = { ...data, timestamp: new Date().toISOString(), id: Date.now() };
        setGeneratedContent(newContent);
        setHasGenerated(true);

        // Save to history (Local + Supabase)
        const newHistory = [newContent, ...history].slice(0, 10);
        setHistory(newHistory);
        localStorage.setItem('ai_content_history', JSON.stringify(newHistory));

        // Save to Supabase if logged in
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
            try {
                await supabase.from('history').insert({
                    user_id: session.user.id,
                    video_url: '',
                    tiktok_script: typeof data.tiktok?.script === 'string' ? data.tiktok.script : JSON.stringify(data.tiktok?.script),
                    linkedin_post: typeof data.linkedin?.content === 'string' ? data.linkedin.content : JSON.stringify(data.linkedin?.content),
                    newsletter_body: typeof data.newsletter?.body === 'string' ? data.newsletter.body : JSON.stringify(data.newsletter?.body)
                });
            } catch (err) {
                console.error("Failed to save to Supabase:", err);
            }
        }
    };

    const handleHistorySelect = (item) => {
        setGeneratedContent(item);
        setHasGenerated(true);
    };

    const handleReset = () => {
        setHasGenerated(false);
        setGeneratedContent(null);
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30">

            <main className="pt-16">
                {!hasGenerated ? (
                    <Hero
                        onDataReceived={handleDataReceived}
                        history={history}
                        onSelectHistory={handleHistorySelect}
                    />
                ) : (
                    <GeneratorLayout
                        data={generatedContent}
                        onReset={handleReset}
                        onUpdate={(newData) => setGeneratedContent(newData)}
                    />
                )}
            </main>
        </div>
    );
}
