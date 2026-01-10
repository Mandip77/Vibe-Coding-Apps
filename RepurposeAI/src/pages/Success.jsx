import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { CheckCircle } from 'lucide-react';

export default function Success() {
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4">
                <div className="max-w-md w-full text-center space-y-6 bg-zinc-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                    <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-10 h-10 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold">Payment Successful!</h1>
                    <p className="text-zinc-400">
                        Thank you for upgrading to Pro. Your account has been updated and you now have unlimited access.
                    </p>
                    <div className="pt-4">
                        <Link
                            to="/"
                            className="inline-block bg-white text-black px-8 py-3 rounded-full font-bold hover:bg-zinc-200 transition-colors"
                        >
                            Start Creating
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
