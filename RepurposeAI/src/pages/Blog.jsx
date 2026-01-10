import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';

const posts = [
    {
        id: 1,
        title: "How to 10x Your Reach with Content Repurposing",
        excerpt: "Learn the exact strategy top creators use to turn one video into a week's worth of content across all platforms.",
        category: "Strategy",
        author: "Sarah Connor",
        date: "Jan 15, 2026",
        image: "bg-gradient-to-br from-purple-500/20 to-blue-500/20"
    },
    {
        id: 2,
        title: "The Future of AI in Social Media Marketing",
        excerpt: "Why manual content creation is becoming obsolete and how AI agents are taking over the creative workflow.",
        category: "AI Trends",
        author: "John Tech",
        date: "Jan 12, 2026",
        image: "bg-gradient-to-br from-green-500/20 to-cyan-500/20"
    },
    {
        id: 3,
        title: "Case Study: From 0 to 100k Followers in 30 Days",
        excerpt: "A deep dive into how effective repurposing and consistency helped a new brand explode on TikTok.",
        category: "Case Study",
        author: "Mike Viral",
        date: "Jan 10, 2026",
        image: "bg-gradient-to-br from-orange-500/20 to-red-500/20"
    },
    {
        id: 4,
        title: "Mastering the LinkedIn Algorithm in 2026",
        excerpt: "Text-only posts are out. Discover why video summaries and AI-generated carousels are the new king.",
        category: "LinkedIn",
        author: "Jane Doe",
        date: "Jan 05, 2026",
        image: "bg-gradient-to-br from-pink-500/20 to-purple-500/20"
    }
];

export default function Blog() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 relative">
            {/* Background Gradients */}
            <div className="fixed top-0 left-0 w-full h-96 bg-gradient-to-b from-purple-900/10 to-transparent pointer-events-none -z-10" />

            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16 space-y-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl font-bold tracking-tight"
                    >
                        Latest <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Insights</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-xl"
                    >
                        Tips, tricks, and strategies from the Repurpose.ai team.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 max-w-5xl mx-auto pb-20">
                    {posts.map((post, i) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            whileHover={{ y: -5 }}
                            className="group cursor-pointer glass rounded-2xl overflow-hidden border-white/5 hover:border-white/20 transition-all duration-300"
                        >
                            <div className={`h-64 ${post.image} relative overflow-hidden`}>
                                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500" />
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 rounded-full bg-black/50 backdrop-blur-md text-xs font-bold border border-white/10">
                                        {post.category}
                                    </span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="flex items-center gap-4 text-xs text-zinc-500 mb-4">
                                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> {post.author}</span>
                                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {post.date}</span>
                                </div>
                                <h2 className="text-2xl font-bold mb-3 group-hover:text-purple-400 transition-colors">{post.title}</h2>
                                <p className="text-zinc-400 text-sm leading-relaxed mb-6">
                                    {post.excerpt}
                                </p>
                                <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:gap-3 transition-all">
                                    Read Article <ArrowRight className="w-4 h-4" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
