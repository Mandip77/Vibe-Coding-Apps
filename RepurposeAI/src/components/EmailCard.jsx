import React, { useState } from 'react';
import { Copy, Wand2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function EmailCard({ subject, body, sender = "Repurpose.ai", onRefine }) {
    const [showRefineOptions, setShowRefineOptions] = useState(false);
    const [refining, setRefining] = useState(false);

    const handleRefineClick = async (instruction) => {
        setRefining(true);
        setShowRefineOptions(false);
        await onRefine(instruction);
        setRefining(false);
    };
    const handleCopy = () => {
        navigator.clipboard.writeText(`Subject: ${subject}\n\n${body}`);
        // Optional: Add toast notification here
    };

    return (
        <div className="bg-black rounded-3xl border border-zinc-800 overflow-hidden flex flex-col h-[600px] w-full max-w-md mx-auto shadow-2xl transition-transform hover:scale-[1.02] duration-500 group">
            {/* Email Header (Mac Mail style) */}
            <div className="bg-[#1C1C1E] p-4 border-b border-zinc-700/50">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-[#FF5F57]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#FEBC2E]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#28C840]"></div>
                </div>

                <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <span className="text-zinc-500 text-xs font-medium w-12 text-right">To:</span>
                        <span className="text-zinc-300 text-sm bg-zinc-800/50 px-2 py-0.5 rounded">You</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-zinc-500 text-xs font-medium w-12 text-right">From:</span>
                        <span className="text-blue-400 text-sm font-medium">{sender}</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-zinc-500 text-xs font-medium w-12 text-right">Subject:</span>
                        <span className="text-white text-sm font-semibold truncate">{subject}</span>
                    </div>
                </div>
            </div>

            {/* Email Body */}
            <div className="flex-1 bg-white p-6 overflow-y-auto text-black font-sans leading-relaxed text-sm">
                {body ? (
                    <div className="whitespace-pre-wrap">{body}</div>
                ) : (
                    <div className="text-gray-400 italic">Generating newsletter draft...</div>
                )}
            </div>

            {/* Action Toolbar */}
            <div className="bg-[#1C1C1E] p-3 border-t border-zinc-700/50 flex justify-between items-center px-6">
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-full hover:bg-zinc-700 transition-colors text-zinc-400 hover:text-white"
                    title="Copy to Clipboard"
                >
                    <Copy className="w-5 h-5" />
                </button>

                {onRefine && (
                    <div className="relative group">
                        <button
                            onClick={() => setShowRefineOptions(!showRefineOptions)}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-xs font-medium text-zinc-300 transition-colors"
                            disabled={refining}
                        >
                            <Wand2 className={`w-3 h-3 ${refining ? 'animate-spin text-primary' : 'text-primary'}`} />
                            {refining ? 'Refining...' : 'Refine'}
                        </button>

                        {showRefineOptions && (
                            <div className="absolute right-0 bottom-12 bg-[#1C1C1E] border border-white/10 p-1 rounded-xl w-32 shadow-xl flex flex-col gap-1 z-50">
                                {['Make Persuasive', 'Fix Grammar', 'Shorten', 'Add Call to Action'].map(opt => (
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
            </div>
        </div>
    );
}
