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
                    className="fixed inset-0 z-[65] md:hidden bg-black/60 backdrop-blur-md animate-fade-in"
                    onClick={onClose}
                />
            )}

            {/* Main Sidebar Wrapper */}
            <div className={`fixed z-[70] flex flex-col items-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] 
                md:hidden
                max-md:right-6 max-md:top-1/2 max-md:-translate-y-1/2
                ${isOpen ? 'max-md:translate-x-0 max-md:opacity-100' : 'max-md:translate-x-32 max-md:opacity-0 max-md:pointer-events-none'}
            `}>
                <div className={`flex flex-col items-center py-10 gap-6 rounded-full border backdrop-blur-3xl transition-all duration-500 shadow-2xl ${isMiles ? 'bg-black/80 border-white/10 shadow-glow-pink/20' : 'bg-white/90 border-black/5 shadow-xl'
                    } w-[76px]`}>

                    {/* User Avatar - High intensity glow as per image */}
                    <div className="relative group cursor-pointer">
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

                    {/* Top Separator */}
                    <div className={`w-6 h-[1px] opacity-10 ${isMiles ? 'bg-white' : 'bg-black'}`} />

                    {/* Nav Links */}
                    <nav className="flex flex-col gap-6">
                        {links.map((link) => {
                            const isActive = pathname === link.href;
                            const Icon = link.icon;
                            return (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    title={link.name}
                                    onClick={() => { if (window.innerWidth < 768) onClose(); }}
                                    className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 group ${isActive
                                        ? isMiles ? 'bg-white/10 text-accent-pink shadow-glow-pink' : 'bg-black/5 text-accent-red shadow-glow-red'
                                        : isMiles ? 'text-white/30 hover:text-white' : 'text-slate-400 hover:text-slate-900'
                                        }`}
                                >
                                    <Icon className="w-6 h-6 transition-transform duration-300 group-hover:scale-110" />
                                    {link.notify && !isActive && (
                                        <span className="absolute top-1 right-1 h-2.5 w-2.5 rounded-full bg-red-500 border-2 border-black" />
                                    )}
                                </Link>
                            )
                        })}

                        {/* Logout Icon - As per image */}
                        <button
                            onClick={onLogout}
                            className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${isMiles ? 'text-white/30 hover:text-red-400' : 'text-slate-400 hover:text-red-600'
                                }`}
                        >
                            <LogOut className="w-6 h-6" />
                        </button>
                    </nav>

                    {/* Bottom Separator */}
                    <div className={`w-6 h-[1px] opacity-10 ${isMiles ? 'bg-white' : 'bg-black'}`} />

                    {/* Pulse Icon (Bottom decoration as per Image) */}
                    <div className={`opacity-30 ${isMiles ? 'text-white' : 'text-slate-900'}`}>
                        <Activity className="w-6 h-6" />
                    </div>
                </div>
            </div>
        </>
    );
}
