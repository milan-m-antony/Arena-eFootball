"use client";

import { useTheme } from "@/context/ThemeContext";
import { Bell, Menu, Gamepad2, Moon, Sun, Home, Trophy, Swords, Shield, Users, Zap, BarChart3, Wallet } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardHeaderProps {
    isMiles: boolean;
    onMenuClick: () => void;
    role: 'admin' | 'super_admin' | 'player' | 'moderator';
}

export function DashboardHeader({ isMiles, onMenuClick, role }: DashboardHeaderProps) {
    const { theme, toggleTheme } = useTheme();
    const pathname = usePathname();
    const isAdmin = role === 'admin' || role === 'super_admin';

    const links = isAdmin ? [
        { name: "Command", href: "/admin", icon: Shield },
        { name: "Tours", href: "/dashboard?cat=tournaments", icon: Trophy },
        { name: "Players", href: "/dashboard?cat=profile", icon: Users },
        { name: "System", href: "/dashboard?cat=settings", icon: Zap },
    ] : [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "Tournaments", href: "/dashboard?cat=tournaments", icon: Trophy },
        { name: "Matches", href: "/dashboard?cat=matches", icon: Swords },
        { name: "Ranking", href: "/dashboard?cat=leaderboard", icon: BarChart3 },
        { name: "Pay", href: "/dashboard?cat=payments", icon: Wallet },
    ];

    return (
        <header className="fixed top-6 left-1/2 -translate-x-1/2 z-[60] w-[calc(100%-3rem)] max-w-7xl">
            <nav className={`h-16 md:h-20 px-6 md:px-10 rounded-[2rem] border backdrop-blur-3xl flex items-center justify-between transition-all duration-500 shadow-2xl ${isMiles ? 'bg-black/40 border-white/10 shadow-glow-pink/10' : 'bg-white/60 border-black/5'
                }`}>
                {/* Left: Logo */}
                <Link href="/" className="flex items-center gap-3 group shrink-0 transition-all duration-500 hover:scale-105">
                    <div className={`p-2.5 rounded-2xl transition-all duration-500 shadow-lg ${isMiles ? 'bg-accent-pink/20 text-accent-pink shadow-glow-pink/10' : 'bg-accent-red/20 text-accent-red shadow-glow-red/10'
                        }`}>
                        <Gamepad2 className="w-6 h-6" />
                    </div>
                </Link>

                {/* Center: Navigation Links (Desktop Only) */}
                <div className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/5 p-1 rounded-2xl border border-black/5 dark:border-white/5">
                    {links.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 ${isActive
                                    ? isMiles ? 'bg-accent-pink text-white shadow-glow-pink' : 'bg-accent-red text-white shadow-glow-red'
                                    : 'text-slate-500 hover:text-slate-900 dark:text-white/40 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
                                    }`}
                            >
                                <link.icon className="w-3.5 h-3.5" />
                                {link.name}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-3 md:gap-4">
                    {/* Theme Toggle */}
                    <button
                        onClick={toggleTheme}
                        className={`p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-90 border ${isMiles ? 'bg-white/5 border-white/10 text-white/70 hover:text-white shadow-lg shadow-black/20' : 'bg-black/5 border-black/5 text-slate-600 hover:text-slate-900 shadow-sm'
                            }`}
                    >
                        {theme === 'miles' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
                    </button>

                    {/* Notification Hub */}
                    <button className={`relative p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-90 border ${isMiles ? 'bg-white/5 border-white/10 text-white/70 hover:text-white shadow-lg shadow-black/20' : 'bg-black/5 border-black/5 text-slate-600 hover:text-slate-900 shadow-sm'
                        }`}>
                        <Bell className="w-5 h-5" />
                        <span className={`absolute top-2 right-2 w-2 h-2 rounded-full border-2 ${isMiles ? 'bg-accent-pink border-black' : 'bg-accent-red border-white'
                            }`} />
                    </button>

                    {/* Mobile Only: System Menu (3-dot logic) */}
                    <button
                        onClick={onMenuClick}
                        className={`md:hidden p-3 rounded-2xl transition-all duration-300 hover:scale-110 active:scale-90 border ${isMiles ? 'bg-white/5 border-white/10 text-white/70 hover:text-white' : 'bg-black/5 border-black/5 text-slate-600 hover:text-slate-900'
                            }`}>
                        <Menu className="w-5 h-5" />
                    </button>

                    {/* Desktop Only: Profile Picture */}
                    <div className="hidden md:block">
                        <div className={`w-12 h-12 rounded-full p-0.5 border-2 transition-all duration-500 ${isMiles ? 'border-accent-pink shadow-glow-pink/30' : 'border-accent-red shadow-glow-red/30'
                            }`}>
                            <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                                <Image
                                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                                    alt="Profile"
                                    width={40}
                                    height={40}
                                    unoptimized
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
