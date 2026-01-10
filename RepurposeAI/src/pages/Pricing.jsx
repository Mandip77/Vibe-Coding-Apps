import React from 'react';
import { motion } from 'framer-motion';
import { Check, X, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const tiers = [
    {
        name: 'Starter',
        price: '0',
        description: 'Perfect for trying out the power of AI.',
        features: ['3 Videos / Month', 'Standard Processing', 'Basic AI Models', '720p Export', 'Community Support'],
        missing: ['No Watermark Removal', 'No API Access']
    },
    {
        name: 'Pro',
        price: '29',
        priceId: 'price_1Q...', // Placeholder for Stripe Price ID
        description: 'For creators ready to scale their brand.',
        recommended: true,
        features: ['Unlimited Videos', 'Fast Processing', 'GPT-4o & Claude 3.5', '4K Export', 'Priority Support', 'No Watermarks', 'Custom Tones'],
        missing: ['No API Access']
    },
    {
        name: 'Agency',
        price: '99',
        description: 'Team collaboration and automation.',
        features: ['Everything in Pro', '5 Team Seats', 'API Access', 'White-labeling', 'Dedicated Account Manager', 'Custom Integration'],
        missing: []
    }
];

export default function Pricing() {

    const handleSubscribe = async (priceId) => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) {
                alert("Please log in to subscribe.");
                // Optionally redirect to login
                window.location.href = '/login';
                return;
            }

            // Call backend API
            const response = await fetch('http://localhost:3000/api/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${session.access_token}`
                },
                body: JSON.stringify({ priceId })
            });

            const { url, error } = await response.json();
            if (error) throw new Error(error);
            if (url) window.location.href = url;

        } catch (error) {
            console.error("Subscription Error:", error);
            alert("Failed to start checkout: " + error.message);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -z-10" />

            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold tracking-tight"
                    >
                        Simple, Transparent <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                            Pricing
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-xl"
                    >
                        Start for free, upgrade when you go viral.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto pb-20">
                    {tiers.map((tier, i) => (
                        <motion.div
                            key={tier.name}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className={`relative p-8 rounded-3xl border flex flex-col ${tier.recommended
                                ? 'bg-white/10 border-primary/50 shadow-2xl shadow-primary/20 scale-105 z-10'
                                : 'bg-white/5 border-white/10 hover:border-white/20'
                                } backdrop-blur-xl transition-all duration-300`}
                        >
                            {tier.recommended && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-xs font-bold shadow-lg">
                                    MOST POPULAR
                                </div>
                            )}

                            <div className="mb-8">
                                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                                <p className="text-zinc-400 text-sm h-10">{tier.description}</p>
                                <div className="text-4xl font-bold mt-6">
                                    ${tier.price}<span className="text-lg font-normal text-zinc-500">/mo</span>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4 mb-8">
                                {tier.features.map((feature, f) => (
                                    <div key={f} className="flex items-start gap-3 text-sm text-zinc-300">
                                        <div className="mt-0.5 min-w-[16px]">
                                            <Check className="w-4 h-4 text-green-400" />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                                {tier.missing.map((feature, m) => (
                                    <div key={m} className="flex items-start gap-3 text-sm text-zinc-600">
                                        <div className="mt-0.5 min-w-[16px]">
                                            <X className="w-4 h-4" />
                                        </div>
                                        {feature}
                                    </div>
                                ))}
                            </div>

                            {tier.price === '0' ? (
                                <Link
                                    to="/features"
                                    className="w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200"
                                >
                                    Get Started Free
                                </Link>
                            ) : tier.recommended ? (
                                <button
                                    onClick={() => handleSubscribe(tier.priceId || 'price_test_123')}
                                    className="w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:shadow-lg hover:shadow-purple-500/25 text-white"
                                >
                                    <Zap className="w-4 h-4 fill-current" />
                                    Choose {tier.name}
                                </button>
                            ) : (
                                <button
                                    className="w-full py-4 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 bg-white text-black hover:bg-zinc-200"
                                >
                                    Contact Sales
                                </button>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
