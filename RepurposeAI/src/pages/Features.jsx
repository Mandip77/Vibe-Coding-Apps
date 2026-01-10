import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Share2, Sliders, Zap, Hash, BarChart3, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';

const features = [
    {
        icon: Brain,
        title: "AI Video Analysis",
        description: "Our advanced algorithms understand context, tone, and key moments to extract the perfect clips.",
        color: "text-purple-400",
        bg: "bg-purple-500/10"
    },
    {
        icon: Share2,
        title: "Multi-Platform Output",
        description: "Generate TikTok scripts, LinkedIn posts, and tweets instantly from a single video source.",
        color: "text-blue-400",
        bg: "bg-blue-500/10"
    },
    {
        icon: Sliders,
        title: "Tone & Style Control",
        description: "Choose from Professional, Funny, Casual, or Controversial tones to match your brand voice.",
        color: "text-pink-400",
        bg: "bg-pink-500/10"
    },
    {
        icon: Zap,
        title: "Viral Hooks",
        description: "Automatically generates hook variations scientifically designed to grab attention in the first 3 seconds.",
        color: "text-yellow-400",
        bg: "bg-yellow-500/10"
    },
    {
        icon: Hash,
        title: "Smart Hashtags",
        description: "SEO-optimized hashtag suggestions based on current trends to maximize your content's reach.",
        color: "text-green-400",
        bg: "bg-green-500/10"
    },
    {
        icon: BarChart3,
        title: "Analytics Ready",
        description: "Content is structured to perform based on viral trends and engagement metrics.",
        color: "text-orange-400",
        bg: "bg-orange-500/10"
    }
];

export default function Features() {
    return (
        <div className="min-h-screen bg-black text-white selection:bg-primary/30 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed top-20 left-10 w-96 h-96 bg-purple-600/10 rounded-full blur-[120px] -z-10" />
            <div className="fixed bottom-20 right-10 w-96 h-96 bg-blue-600/10 rounded-full blur-[120px] -z-10" />

            <div className="pt-32 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-20 space-y-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-purple-300 mb-4"
                    >
                        <Sparkles className="w-3 h-3" />
                        Feature Rich
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-bold tracking-tight"
                    >
                        Unleash Your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Content's Potential
                        </span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed"
                    >
                        Everything you need to dominate social media with AI-generated content, all in one powerful platform.
                    </motion.p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 pb-20">
                    {features.map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            whileHover={{ scale: 1.02 }}
                            className="glass p-8 rounded-3xl group border-white/5 hover:border-white/20 transition-all duration-300"
                        >
                            <div className={`w-12 h-12 rounded-2xl ${feature.bg} ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                            <p className="text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
