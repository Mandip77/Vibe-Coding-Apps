import React, { useState } from 'react';
import { Copy, Heart, MessageCircle, Share2, Wand2, Plus, Music2 } from 'lucide-react';

export default function TikTokCard({ script, title, tags, onRefine }) {
    const [showRefineOptions, setShowRefineOptions] = useState(false);
    const [refining, setRefining] = useState(false);

    const handleRefineClick = async (instruction) => {
        setRefining(true);
        setShowRefineOptions(false);
        await onRefine(instruction);
        setRefining(false);
    };

    return (
        <div className="relative mx-auto border-zinc-800 bg-[#121212] border-[8px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl overflow-hidden flex flex-col group transition-transform hover:scale-[1.02] duration-500">
            {/* Refine Controls */}
            {onRefine && (
                <div className="absolute top-4 right-4 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                        onClick={() => setShowRefineOptions(!showRefineOptions)}
                        className="p-2 bg-black/50 backdrop-blur-md rounded-full text-white hover:bg-black/70 transition-colors"
                        disabled={refining}
                    >
                        <Wand2 className={`w-4 h-4 ${refining ? 'animate-spin text-primary' : ''}`} />
                    </button>

                    {showRefineOptions && (
                        <div className="absolute right-0 top-10 bg-[#1C1C1E] border border-white/10 p-1 rounded-xl w-32 shadow-xl flex flex-col gap-1">
                            {['Make Shorter', 'Make Funnier', 'Add Hook', 'More Serious'].map(opt => (
                                <button
                                    key={opt}
                                    onClick={() => handleRefineClick(opt)}
                                    className="text-xs text-left px-3 py-2 text-zinc-300 hover:bg-white/10 rounded-lg transition-colors"
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    )}
                </div>
            )}

            {/* Screen Content */}
            <div className="h-full w-full bg-black relative">
                {/* Background / Placeholder Video */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 flex items-center justify-center">
                    <span className="text-gray-600 text-sm">Video Preview</span>
                </div>

                {/* Right Sidebar */}
                <div className="absolute right-2 bottom-20 flex flex-col items-center gap-6 z-20">
                    <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gray-200 border border-white" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-500 rounded-full p-[2px]">
                            <Plus className="w-3 h-3 text-white" />
                        </div>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <Heart className="w-8 h-8 text-white fill-white/20" />
                        <span className="text-white text-xs font-bold">12K</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <MessageCircle className="w-8 h-8 text-white fill-white/20" />
                        <span className="text-white text-xs font-bold">482</span>
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <Share2 className="w-8 h-8 text-white fill-white/20" />
                        <span className="text-white text-xs font-bold">Share</span>
                    </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-4 left-4 right-16 z-20 text-white text-left">
                    <div className="font-bold mb-2">@user.name</div>
                    <div className="text-sm opacity-90 mb-2 line-clamp-2">{title || "My awesome TikTok video"} {tags && tags.map(t => t + " ")}</div>
                    <div className="flex items-center gap-2 text-xs">
                        <Music2 className="w-3 h-3 animate-spin" />
                        <span className="opacity-80">Original Sound - @user.name</span>
                    </div>
                </div>

                {/* Teleprompter Overlay (The actual generated script) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] z-10">
                    <div className="bg-black/60 text-white p-4 rounded-xl backdrop-blur-sm border border-white/10">
                        <div className="text-xs text-center text-gray-400 mb-2 uppercase tracking-wide">Script / Teleprompter</div>
                        <p className="text-sm font-medium leading-relaxed text-center whitespace-pre-wrap h-[200px] overflow-y-auto no-scrollbar">
                            {script || "No script generated yet."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
