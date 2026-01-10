import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { supabase } from '../lib/supabase';
import { Link, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';

export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');
        try {
            const { error } = await supabase.auth.signUp({
                email,
                password,
            });
            if (error) throw error;
            alert('Signup successful! You can now log in.');
            navigate('/login');
        } catch (error) {
            console.error("Signup Error:", error);
            setErrorMsg(error.error_description || error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            <Navbar />
            <div className="flex-1 flex items-center justify-center px-4 pt-20">
                <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-2xl border border-white/10 backdrop-blur-xl">
                    <h1 className="text-3xl font-bold mb-2 text-center">Create Account</h1>
                    <p className="text-zinc-400 text-center mb-8">Join Repurpose.ai today</p>

                    {errorMsg && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-200 p-3 rounded-lg mb-4 text-sm text-center">
                            {errorMsg}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Email address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                                placeholder="you@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-1">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg p-3 text-white focus:border-primary outline-none transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button
                            disabled={loading}
                            className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-zinc-200 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Sign Up'}
                        </button>
                    </form>

                    <p className="text-center mt-6 text-zinc-500 text-sm">
                        Already have an account?{' '}
                        <Link to="/login" className="text-white hover:underline">
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
