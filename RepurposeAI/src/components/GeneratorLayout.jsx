import React from 'react';
import ContentCard from './ContentCard';
import { motion } from 'framer-motion';

export default function GeneratorLayout({ data, onReset, onUpdate }) {
    if (!data) return null;

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-2xl font-bold text-white mb-2">Generated Content</h2>
                    <p className="text-zinc-400">Here's your repurposing magic. Ready to post.</p>
                </div>
                <button
                    onClick={onReset}
                    className="text-sm text-zinc-400 hover:text-white underline decoration-zinc-700 underline-offset-4"
                >
                    Generate Another
                </button>
            </div>

            <div className="w-full flex justify-center">
                <ContentCard data={data} />
            </div>
        </div>
    );
}
