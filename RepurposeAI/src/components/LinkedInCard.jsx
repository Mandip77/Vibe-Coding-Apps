import React, { useState } from 'react';
import { MoreHorizontal, ThumbsUp, MessageCircle, Share2, Send, Wand2 } from 'lucide-react';

export default function LinkedInCard({ content, title, onRefine }) {
    const [showRefineOptions, setShowRefineOptions] = useState(false);
    const [refining, setRefining] = useState(false);

    const handleRefineClick = async (instruction) => {
        setRefining(true);
        setShowRefineOptions(false);
        await onRefine(instruction);
        setRefining(false);
    };
    return (
        <div className="bg-white text-black rounded-xl border-none w-full max-w-[500px] overflow-hidden font-sans shadow-2xl transition-transform hover:scale-[1.01] duration-500">
            {/* Refine Overlay */}
            {onRefine && (
                <div className="absolute top-3 right-12 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => setShowRefineOptions(!showRefineOptions)}
                        className="p-2 bg-gray-100/50 hover:bg-gray-200 rounded-full text-gray-600 transition-colors"
                        disabled={refining}
                    >
                        <Wand2 className={`w-4 h-4 ${refining ? 'animate-spin text-blue-600' : ''}`} />
                    </button>
                    {/* Menu logic remains same but styled better if needed, relying on previous impl */}
                </div>
            )}

            {/* Header */}
            <div className="p-3 flex items-start justify-between">
                <div className="flex gap-2">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="text-xs">
                        <div className="font-semibold text-gray-900">User Name</div>
                        <div className="text-gray-500">AI Content Creator • 1st</div>
                        <div className="text-gray-500">1h • <span className="text-gray-400">Edited</span> • 🌐</div>
                    </div>
                </div>
                <div className="flex gap-2">
                    {onRefine && (
                        <div className="relative">
                            <button
                                onClick={() => setShowRefineOptions(!showRefineOptions)}
                                className="text-gray-600 hover:text-blue-600 transition-colors p-1"
                                disabled={refining}
                            >
                                <Wand2 className={`w-5 h-5 ${refining ? 'animate-spin text-blue-600' : ''}`} />
                            </button>
                            {showRefineOptions && (
                                <div className="absolute right-0 top-8 bg-white border border-gray-200 p-1 rounded-xl w-40 shadow-xl flex flex-col gap-1 z-50">
                                    {['Make Professional', 'Add Emojis', 'Shorten', 'Expand'].map(opt => (
                                        <button
                                            key={opt}
                                            onClick={() => handleRefineClick(opt)}
                                            className="text-xs text-left px-3 py-2 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
                                        >
                                            {opt}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    <button className="text-gray-600">
                        <MoreHorizontal className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="px-4 pb-2 text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
                {title && <div className="font-bold mb-2">{title}</div>}
                {content || "No content generated yet."}
            </div>

            {/* Engagement Stats */}
            <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-500 flex items-center justify-between">
                <div className="flex items-center gap-1">
                    <div className="flex -space-x-1">
                        <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center text-[8px] text-white">👍</div>
                        <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center text-[8px] text-white">❤️</div>
                    </div>
                    <span>84</span>
                </div>
                <div>
                    12 comments • 4 reposts
                </div>
            </div>

            {/* Action Buttons */}
            <div className="px-2 py-1 flex items-center justify-between">
                <button className="flex items-center gap-1 px-3 py-3 hover:bg-gray-100 rounded text-gray-600 font-semibold text-sm transition-colors">
                    <ThumbsUp className="w-5 h-5" />
                    <span>Like</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-3 hover:bg-gray-100 rounded text-gray-600 font-semibold text-sm transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>Comment</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-3 hover:bg-gray-100 rounded text-gray-600 font-semibold text-sm transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span>Repost</span>
                </button>
                <button className="flex items-center gap-1 px-3 py-3 hover:bg-gray-100 rounded text-gray-600 font-semibold text-sm transition-colors">
                    <Send className="w-5 h-5" />
                    <span>Send</span>
                </button>
            </div>
        </div>
    );
}
