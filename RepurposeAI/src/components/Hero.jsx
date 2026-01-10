import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Youtube, Loader2, FileText, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Hero({ onDataReceived, history = [], onSelectHistory }) {
    const [mode, setMode] = useState('youtube'); // 'youtube', 'article', 'text'
    const [url, setUrl] = useState('');
    const [transcript, setTranscript] = useState('');
    const [tone, setTone] = useState('Professional');
    const [model, setModel] = useState('gemma3');
    const [loading, setLoading] = useState(false);

    const tones = ['Professional', 'Funny', 'Casual', 'Educational', 'Controversial', 'Inspirational'];
    const models = ['gemma2', 'mistral', 'llama3', 'deepseek-r1'];

    const handleSubmit = async (e) => {
        if (e) e.preventDefault();
        const inputType = mode; // map local state 'mode' to 'inputType' logic if needed, or just use mode
        if (mode === 'url' && !url) return;
        if (mode === 'text' && !transcript) return;

        setLoading(true);

        try {
            const { data: { session } } = await supabase.auth.getSession();
            const token = session?.access_token;

            if (!token) {
                alert("Please log in to generate content.");
                setLoading(false);
                return;
            }

            const payload = {
                type: mode, // 'youtube', 'article', 'text'
                url: (mode === 'youtube' || mode === 'article') ? url : undefined,
                content: mode === 'text' ? transcript : undefined,
                tone,
                model
            };

            const response = await fetch('http://localhost:3000/api/repurpose', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Failed to generate content');
            }

            onDataReceived(data);
        } catch (error) {
            console.error(error);
            alert(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-[90vh] flex flex-col items-center justify-center p-4 overflow-hidden">
            {/* Background Animations */}
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 rounded-full blur-[100px] animate-blob mix-blend-screen" />
            <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/20 rounded-full blur-[100px] animate-blob animation-delay-2000 mix-blend-screen" />
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500/20 rounded-full blur-[100px] animate-blob animation-delay-4000 mix-blend-screen" />

            <div className="relative z-10 w-full max-w-4xl mx-auto text-center space-y-8">

                {/* Heading */}
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300"
                    >
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        AI Content Engine v2.0
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        Repurpose Video into <br />
                        <span className="text-gradient-primary">Viral Content</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg text-zinc-400 max-w-xl mx-auto"
                    >
                        Transform any content into authentic TikTok scripts, LinkedIn posts, and newsletter drafts in seconds.
                    </motion.p>
                </div>

                {/* Input Area */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="glass p-4 rounded-3xl"
                >
                    {/* Tabs */}
                    <div className="flex gap-4 mb-4 px-2">
                        <button
                            onClick={() => setMode('youtube')}
                            className={`transition-colors text-sm font-medium ${mode === 'youtube' ? 'text-white border-b-2 border-purple-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            YouTube Video
                        </button>
                        <button
                            onClick={() => setMode('article')}
                            className={`transition-colors text-sm font-medium ${mode === 'article' ? 'text-white border-b-2 border-blue-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            Article / Blog
                        </button>
                        <button
                            onClick={() => setMode('text')}
                            className={`transition-colors text-sm font-medium ${mode === 'text' ? 'text-white border-b-2 border-green-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                        >
                            Custom Text
                        </button>
                    </div>

                    {/* Input Fields */}
                    <div className="flex bg-black/40 rounded-2xl border border-white/5 p-2 focus-within:border-purple-500/50 focus-within:ring-1 focus-within:ring-purple-500/50 transition-all duration-300">
                        {mode === 'youtube' && (
                            <div className="flex items-center gap-3 w-full px-4">
                                <Youtube className="w-5 h-5 text-red-500" />
                                <input
                                    type="text"
                                    placeholder="Paste YouTube Link..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 h-12"
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {mode === 'article' && (
                            <div className="flex items-center gap-3 w-full px-4">
                                <FileText className="w-5 h-5 text-blue-500" />
                                <input
                                    type="text"
                                    placeholder="Paste Article or Blog URL..."
                                    value={url}
                                    onChange={(e) => setUrl(e.target.value)}
                                    className="flex-1 bg-transparent border-none outline-none text-white placeholder-zinc-500 h-12"
                                    disabled={loading}
                                />
                            </div>
                        )}

                        {mode === 'text' && (
                            <textarea
                                placeholder="Paste your content directly here..."
                                value={transcript}
                                onChange={(e) => setTranscript(e.target.value)}
                                className="w-full bg-transparent border-none outline-none text-white placeholder-zinc-500 min-h-[100px] p-2 resize-none"
                                disabled={loading}
                            />
                        )}

                        <div className="flex flex-col gap-2 justify-center border-l border-white/10 pl-2">
                            <button
                                onClick={handleSubmit}
                                disabled={loading}
                                className="h-12 px-6 bg-white text-black rounded-xl font-bold hover:bg-zinc-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                        <span>...</span>
                                    </>
                                ) : (
                                    <>
                                        <Sparkles className="w-4 h-4" />
                                        <span>Generate</span>
                                    </>
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Controls Footer */}
                    <div className="flex items-center justify-end gap-3 mt-4 text-xs text-zinc-500">
                        <div className="flex items-center gap-2">
                            <span className="text-zinc-600">Tone:</span>
                            <select
                                value={tone}
                                onChange={(e) => setTone(e.target.value)}
                                className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-zinc-300 outline-none hover:border-white/20"
                            >
                                {tones.map(t => <option key={t} value={t}>{t}</option>)}
                            </select>
                        </div>

                        <div className="flex items-center gap-2">
                            <span className="text-zinc-600">Model:</span>
                            <select
                                value={model}
                                onChange={(e) => setModel(e.target.value)}
                                className="bg-zinc-900 border border-white/10 rounded-lg px-2 py-1 text-zinc-300 outline-none hover:border-white/20"
                            >
                                {models.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>
                    </div>
                </motion.div>

                {/* History Pills */}
                {history && history.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                        className="flex flex-wrap justify-center gap-2"
                    >
                        {history.slice(0, 3).map((item) => (
                            <button
                                key={item.id}
                                onClick={() => onSelectHistory(item)}
                                className="px-3 py-1 rounded-full bg-white/5 border border-white/5 hover:border-white/20 text-xs text-zinc-400 hover:text-white transition-all"
                            >
                                ↺  {new Date(item.timestamp).toLocaleDateString()}
                            </button>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    );
}
