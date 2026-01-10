import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { XCircle } from 'lucide-react';

export default function Cancel() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center space-y-6 bg-zinc-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                    <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto">
                        <XCircle className="w-10 h-10 text-red-500" />
                    </div>
                    <h1 className="text-3xl font-bold">Payment Cancelled</h1>
                    <p className="text-zinc-400">
                        Your payment was cancelled and you have not been charged.
                    </p>
                    <div className="pt-4">
                        <Link
                            to="/pricing"
                            className="inline-block bg-white/10 text-white px-8 py-3 rounded-full font-bold hover:bg-white/20 transition-colors"
                        >
                            Try Again
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
