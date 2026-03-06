"use client";

import { Home, Trophy, Swords, Settings, LogOut, Shield, Users, Zap, Activity, Wallet, BarChart3 } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface AppSidebarProps {
    isMiles: boolean;
    onLogout: () => void;
    role: 'admin' | 'super_admin' | 'player' | 'moderator';
    isOpen: boolean;
    onClose: () => void;
}

interface SidebarLink {
    name: string;
    href: string;
    icon: LucideIcon;
    notify?: boolean;
}

export function AppSidebar({ isMiles, onLogout, role, isOpen, onClose }: AppSidebarProps) {
    const pathname = usePathname();
    const isAdmin = role === 'admin' || role === 'super_admin';

    const links: SidebarLink[] = isAdmin ? [
        { name: "Command", href: "/admin", icon: Shield },
        { name: "Tours", href: "/dashboard?cat=tournaments", icon: Trophy },
        { name: "Players", href: "/dashboard?cat=profile", icon: Users },
        { name: "System", href: "/dashboard?cat=settings", icon: Zap },
    ] : [
        { name: "Home", href: "/dashboard", icon: Home },
        { name: "Tournaments", href: "/dashboard?cat=tournaments", icon: Trophy },
        { name: "Matches", href: "/dashboard?cat=matches", icon: Swords, notify: true },
        { name: "Ranking", href: "/dashboard?cat=leaderboard", icon: BarChart3 },
        { name: "Payments", href: "/dashboard?cat=payments", icon: Wallet },
        { name: "Profile", href: "/dashboard?cat=profile", icon: Settings },
    ];

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-70 md:hidden bg-black/60 backdrop-blur-md animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Mobile Compact Capsule Sidebar */}
            <div className={`fixed z-80 md:hidden right-3 top-1/2 -translate-y-1/2 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${isOpen ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0 pointer-events-none'
                }`}>
                <div className={`w-20 h-[88dvh] max-h-screen rounded-full border backdrop-blur-3xl shadow-2xl ${isMiles ? 'bg-black/85 border-white/10 shadow-glow-pink/20' : 'bg-white/95 border-black/10 shadow-xl'
                    }`}>
                    <div className="h-full flex flex-col items-center py-5">
                        {/* Avatar */}
                        <div className="relative group cursor-pointer shrink-0">
                            <div className={`w-14 h-14 rounded-full p-0.5 border-2 transition-all duration-500 ${isMiles ? 'border-accent-pink shadow-[0_0_20px_rgba(254,1,154,0.8)]' : 'border-accent-red shadow-[0_0_20px_rgba(227,6,19,0.8)]'
                                }`}>
                                <div className="w-full h-full rounded-full overflow-hidden bg-slate-900">
                                    <Image
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200"
                                        alt="Profile"
                                        width={56}
                                        height={56}
                                        unoptimized
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className={`w-8 h-px mt-4 mb-3 shrink-0 ${isMiles ? 'bg-white/10' : 'bg-black/10'}`} />

                        {/* Scrollable icon rail */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar py-1">
                            <nav className="flex flex-col items-center gap-4 px-2">
                                {links.map((link) => {
                                    const isActive = pathname === link.href;
                                    const Icon = link.icon;
                                    return (
                                        <Link
                                            key={link.name}
                                            href={link.href}
                                            title={link.name}
                                            onClick={onClose}
                                            className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 group ${isActive
                                                ? isMiles ? 'bg-white/10 text-accent-pink shadow-glow-pink' : 'bg-black/5 text-accent-red shadow-glow-red'
                                                : isMiles ? 'text-white/35 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-black/5'
                                                }`}
                                        >
                                            <Icon className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                                            <span className="sr-only">{link.name}</span>
                                            {link.notify && !isActive && (
                                                <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border border-black/80" />
                                            )}
                                        </Link>
                                    );
                                })}
                            </nav>
                        </div>

                        <div className={`w-8 h-px mt-3 mb-2 shrink-0 ${isMiles ? 'bg-white/10' : 'bg-black/10'}`} />

                        {/* Bottom icons */}
                        <div className="shrink-0 flex flex-col items-center gap-3 pb-1">
                            <button
                                onClick={onLogout}
                                title="Logout"
                                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isMiles ? 'text-white/35 hover:text-red-400 hover:bg-red-500/10' : 'text-slate-500 hover:text-red-600 hover:bg-red-500/10'
                                    }`}
                            >
                                <LogOut className="w-5 h-5" />
                            </button>

                            <div title="Live" className={`w-10 h-10 rounded-full flex items-center justify-center opacity-35 ${isMiles ? 'text-white' : 'text-slate-700'}`}>
                                <Activity className="w-4 h-4" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
