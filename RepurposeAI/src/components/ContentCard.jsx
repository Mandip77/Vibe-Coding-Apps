import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, Share2, Video, FileText, Mail, MessageSquare, Hash, Search } from 'lucide-react';

export default function ContentCard({ data }) {
    if (!data) return null;

    const [activeTab, setActiveTab] = useState('tiktok');
    const [copied, setCopied] = useState(null);

    const tabs = [
        { id: 'tiktok', label: 'TikTok Script', icon: Video, color: 'from-pink-500 to-red-500' },
        { id: 'linkedin', label: 'LinkedIn Post', icon: Share2, color: 'from-blue-600 to-cyan-500' },
        { id: 'newsletter', label: 'Newsletter', icon: Mail, color: 'from-purple-500 to-indigo-500' },
        { id: 'twitter_thread', label: 'Twitter Thread', icon: MessageSquare, color: 'from-sky-400 to-blue-500' },
        { id: 'viral_hooks', label: 'Viral Hooks', icon: Hash, color: 'from-yellow-400 to-orange-500' },
        { id: 'seo_meta', label: 'SEO Metadata', icon: Search, color: 'from-green-400 to-emerald-500' }
    ];

    const handleCopy = (text, type) => {
        navigator.clipboard.writeText(text);
        setCopied(type);
        setTimeout(() => setCopied(null), 2000);
    };

    const renderContent = () => {
        switch (activeTab) {
            case 'tiktok':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold">{data.tiktok?.title}</h3>
                            <button onClick={() => handleCopy(data.tiktok?.script, 'tiktok')} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                {copied === 'tiktok' ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 font-mono text-sm whitespace-pre-wrap">
                            {data.tiktok?.script}
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            {data.tiktok?.hashtags?.map(tag => (
                                <span key={tag} className="text-xs bg-pink-500/20 text-pink-300 px-2 py-1 rounded-full border border-pink-500/30">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                );
            case 'linkedin':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold">{data.linkedin?.title}</h3>
                            <button onClick={() => handleCopy(data.linkedin?.content, 'linkedin')} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                {copied === 'linkedin' ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 whitespace-pre-wrap">
                            {data.linkedin?.content}
                        </div>
                    </div>
                );
            case 'newsletter':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-start">
                            <h3 className="text-xl font-bold"><span className="text-zinc-400">Subject:</span> {data.newsletter?.subject}</h3>
                            <button onClick={() => handleCopy(data.newsletter?.body, 'newsletter')} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                {copied === 'newsletter' ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="bg-black/30 p-4 rounded-xl border border-white/5 whitespace-pre-wrap font-serif">
                            {data.newsletter?.body}
                        </div>
                    </div>
                );
            case 'twitter_thread':
                return (
                    <div className="space-y-4">
                        <div className="flex justify-between items-center">
                            <h3 className="text-xl font-bold">Twitter Thread</h3>
                            <button onClick={() => handleCopy(data.twitter_thread?.join('\n\n'), 'twitter')} className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                                {copied === 'twitter' ? <Check className="w-5 h-5 text-green-400" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="space-y-2">
                            {data.twitter_thread?.map((tweet, i) => (
                                <div key={i} className="bg-black/30 p-3 rounded-lg border border-white/5 text-sm">
                                    {tweet}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'viral_hooks':
                return (
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold">Viral Hooks</h3>
                        <div className="grid gap-3">
                            {data.viral_hooks?.map((hook, i) => (
                                <div key={i} className="flex gap-3 items-center bg-black/30 p-3 rounded-lg border border-white/5">
                                    <span className="text-2xl font-bold text-white/20">#{i + 1}</span>
                                    <p className="font-bold text-lg">{hook}</p>
                                    <button onClick={() => handleCopy(hook, `hook-${i}`)} className="ml-auto p-2 hover:bg-white/10 rounded-lg transition-colors">
                                        {copied === `hook-${i}` ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                );
            case 'seo_meta':
                return (
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <label className="text-sm font-bold text-zinc-400">SEO Title</label>
                                <button onClick={() => handleCopy(data.seo_meta?.title, 'seo-title')} className="p-1 hover:bg-white/10 rounded transition-colors">{copied === 'seo-title' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}</button>
                            </div>
                            <div className="bg-black/30 p-3 rounded-lg border border-white/5">{data.seo_meta?.title}</div>
                        </div>
                        <div>
                            <div className="flex justify-between items-start mb-2">
                                <label className="text-sm font-bold text-zinc-400">Meta Description</label>
                                <button onClick={() => handleCopy(data.seo_meta?.description, 'seo-desc')} className="p-1 hover:bg-white/10 rounded transition-colors">{copied === 'seo-desc' ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}</button>
                            </div>
                            <div className="bg-black/30 p-3 rounded-lg border border-white/5">{data.seo_meta?.description}</div>
                        </div>
                        <div>
                            <label className="text-sm font-bold text-zinc-400 block mb-2">Keywords</label>
                            <div className="flex flex-wrap gap-2">
                                {data.seo_meta?.keywords?.map(k => (
                                    <span key={k} className="bg-green-500/20 text-green-300 px-2 py-1 rounded text-sm border border-green-500/30">{k}</span>
                                ))}
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-4xl mx-auto mt-12 bg-zinc-900/50 rounded-2xl border border-white/10 backdrop-blur-xl overflow-hidden"
        >
            {/* Tabs Header */}
            <div className="flex overflow-x-auto border-b border-white/10 p-2 gap-2 scrollbar-hide">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap relative ${isActive ? 'text-white' : 'text-zinc-400 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId="activeTab"
                                    className={`absolute inset-0 bg-gradient-to-r ${tab.color} opacity-20 rounded-xl`}
                                />
                            )}
                            <Icon className={`w-4 h-4 ${isActive ? 'text-white' : ''}`} />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Content Body */}
            <div className="p-6 min-h-[400px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {renderContent()}
                    </motion.div>
                </AnimatePresence>
            </div>
        </motion.div>
    );
}
