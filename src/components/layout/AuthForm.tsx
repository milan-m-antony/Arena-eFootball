"use client";

import { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, ArrowRight, AlertCircle, Loader2 } from "lucide-react";
import Link from "next/link";
import { CinematicWrapper } from "./CinematicWrapper";

export function AuthForm({ initialMode = "login" }: { initialMode?: "login" | "register" }) {
    const { theme } = useTheme();
    const router = useRouter();

    const [mode, setMode] = useState<"login" | "register">(initialMode);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gamerTag, setGamerTag] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const isMiles = theme === "miles";
    const accent = isMiles ? "#FE019A" : "#E30613";
    const accentRgb = isMiles ? "254,1,154" : "227,6,19";
    const isLogin = mode === "login";

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await new Promise((resolve) => setTimeout(resolve, 500));
            router.push("/dashboard");
        } catch (err: unknown) {
            console.error("Auth error:", err);
            setError(err instanceof Error ? err.message : "An authentication error occurred.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <CinematicWrapper backgroundText={isLogin ? "AUTH" : "RECRUIT"}>
            <div className="min-h-screen w-full flex items-center justify-center py-12 px-6">
                <div className="relative z-10 w-full max-w-[440px] animate-fade-in">
                    <div
                        className={`relative rounded-[2.5rem] overflow-hidden backdrop-blur-3xl border ${isMiles ? 'bg-black/40 border-white/10 shadow-glow-pink' : 'bg-white/80 border-black/5 shadow-xl'}`}
                        style={{ boxShadow: isMiles ? `0 40px 100px rgba(0,0,0,0.8), 0 0 40px rgba(${accentRgb}, 0.1)` : '' }}
                    >
                        {/* Top Accent Line */}
                        <div className="h-1.5 w-full" style={{ background: accent }} />

                        {/* Content */}
                        <div className="px-8 pt-12 pb-10">
                            {/* Hero Section in Card */}
                            <div className="mb-10 text-center">
                                <h2 className={`text-4xl font-black italic uppercase tracking-tighter mb-2 ${isMiles ? 'text-white' : 'text-slate-900'}`}>
                                    {isLogin ? 'Authorize' : 'Initialize'}
                                </h2>
                                <p className={`text-[10px] font-bold uppercase tracking-[0.3em] opacity-50 ${isMiles ? 'text-white' : 'text-slate-900'}`}>
                                    {isLogin ? 'Bypass the grid security' : 'Create your digital identity'}
                                </p>
                            </div>

                            {/* Mode Toggle */}
                            <div className={`flex p-1 rounded-2xl mb-8 ${isMiles ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/5'} border`}>
                                <button
                                    onClick={() => setMode("login")}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${isLogin ? 'text-white' : 'text-white/30'}`}
                                    style={{ background: isLogin ? accent : 'transparent' }}
                                >
                                    Login
                                </button>
                                <button
                                    onClick={() => setMode("register")}
                                    className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${!isLogin ? 'text-white' : 'text-white/30'}`}
                                    style={{ background: !isLogin ? accent : 'transparent' }}
                                >
                                    Register
                                </button>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleAuth} className="space-y-5">
                                {!isLogin && (
                                    <div className="space-y-1.5">
                                        <label className={`text-[9px] font-black uppercase tracking-widest opacity-40 ml-1 flex items-center gap-2 ${isMiles ? 'text-white' : 'text-slate-900'}`}>
                                            <User className="w-3 h-3" /> Gamer Tag
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={gamerTag}
                                            onChange={(e) => setGamerTag(e.target.value)}
                                            placeholder="PETER_P"
                                            className={`w-full h-14 rounded-2xl px-6 text-sm focus:outline-none transition-all ${isMiles ? 'bg-white/5 border-white/10 text-white focus:border-accent-pink/50' : 'bg-slate-100 border-slate-200 text-slate-900 focus:border-accent-red/50'}`}
                                        />
                                    </div>
                                )}

                                <div className="space-y-1.5">
                                    <label className={`text-[9px] font-black uppercase tracking-widest opacity-40 ml-1 flex items-center gap-2 ${isMiles ? 'text-white' : 'text-slate-900'}`}>
                                        <Mail className="w-3 h-3" /> Email Link
                                    </label>
                                    <input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="player@arena.com"
                                        className={`w-full h-14 rounded-2xl px-6 text-sm focus:outline-none transition-all ${isMiles ? 'bg-white/5 border-white/10 text-white focus:border-accent-pink/50' : 'bg-slate-100 border-slate-200 text-slate-900 focus:border-accent-red/50'}`}
                                    />
                                </div>

                                <div className="space-y-1.5">
                                    <label className={`text-[9px] font-black uppercase tracking-widest opacity-40 ml-1 flex items-center gap-2 ${isMiles ? 'text-white' : 'text-slate-900'}`}>
                                        <Lock className="w-3 h-3" /> Access Code
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        className={`w-full h-14 rounded-2xl px-6 text-sm focus:outline-none transition-all ${isMiles ? 'bg-white/5 border-white/10 text-white focus:border-accent-pink/50' : 'bg-slate-100 border-slate-200 text-slate-900 focus:border-accent-red/50'}`}
                                    />
                                </div>

                                {error && (
                                    <div className="flex items-center gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black uppercase tracking-wider">
                                        <AlertCircle className="w-4 h-4" />
                                        {error}
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className={`w-full h-16 rounded-2xl font-black uppercase tracking-[0.3em] text-[11px] text-white transition-all duration-300 hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-3`}
                                    style={{ background: accent, boxShadow: `0 10px 30px rgba(${accentRgb}, 0.3)` }}
                                >
                                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : isLogin ? 'Access Hub' : 'Initialize Profile'}
                                    {!loading && <ArrowRight className="w-4 h-4" />}
                                </button>
                            </form>

                            {/* Back home */}
                            <div className="mt-8 text-center">
                                <Link href="/" className={`text-[10px] font-black uppercase tracking-widest opacity-40 hover:opacity-100 transition-opacity ${isMiles ? 'text-white' : 'text-slate-900'}`}>
                                    ← Return to Landing
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .shadow-glow-pink { box-shadow: 0 0 60px rgba(254, 1, 154, 0.2); }
            `}</style>
        </CinematicWrapper>
    );
}
