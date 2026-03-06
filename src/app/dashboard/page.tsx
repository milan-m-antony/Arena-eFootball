"use client";

import { useTheme } from "@/context/ThemeContext";
import { useId, useState } from "react";
import type { LucideIcon } from "lucide-react";
import {
    Home, User, Trophy, Swords, BarChart3, Wallet, Bell, HelpCircle, Settings,
    ChevronRight, LogOut, Upload, Edit3, Target, Zap, Clock, Shield, MessageSquare,
    Eye, CheckCircle2, AlertTriangle, CreditCard, History, UserPlus
} from "lucide-react";
import { useRouter } from "next/navigation";

interface SubItem {
    label: string;
    icon: LucideIcon;
    action?: () => void;
    href?: string;
    description?: string;
}

interface MenuCategory {
    id: string;
    label: string;
    icon: LucideIcon;
    color: string;
    subItems: SubItem[];
}

export default function DashboardHome() {
    const { theme } = useTheme();
    const isMiles = theme === "miles";
    const [expandedId, setExpandedId] = useState<string | null>("dashboard");
    const instanceId = useId().replace(/:/g, "").toUpperCase();
    const { push } = useRouter();

    const handleLogout = () => {
        push("/login");
    };

    const categories: MenuCategory[] = [
        {
            id: "dashboard",
            label: "Dashboard",
            icon: Home,
            color: isMiles ? "accent-pink" : "accent-red",
            subItems: [
                { label: "Overview", icon: BarChart3, description: "Real-time stats monitor" },
                { label: "Upcoming Matches", icon: Clock },
                { label: "Registered Tournaments", icon: CheckCircle2 },
                { label: "Notifications", icon: Bell },
                { label: "UPI Summary", icon: Wallet, description: "Balance & transactions" },
            ]
        },
        {
            id: "profile",
            label: "Profile",
            icon: User,
            color: "blue",
            subItems: [
                { label: "View Profile", icon: Eye },
                { label: "Edit Profile", icon: Edit3 },
                { label: "Upload Avatar", icon: Upload },
                { label: "Complete Profile Status", icon: CheckCircle2 },
                { label: "eFootball ID", icon: Target, description: "ID: 452-985-120" },
            ]
        },
        {
            id: "tournaments",
            label: "Tournaments",
            icon: Trophy,
            color: "yellow",
            subItems: [
                { label: "Browse Tournaments", icon: Trophy, href: "/tournaments" },
                { label: "My Tournaments", icon: Target },
                { label: "Ongoing", icon: Zap },
                { label: "Upcoming", icon: Clock },
                { label: "Completed", icon: CheckCircle2 },
                { label: "Tournament Rules", icon: Shield },
            ]
        },
        {
            id: "matches",
            label: "Matches",
            icon: Swords,
            color: "red",
            subItems: [
                { label: "Match Schedule", icon: Clock },
                { label: "Submit Score", icon: Edit3 },
                { label: "Opponent Details", icon: User },
                { label: "Match Results", icon: BarChart3 },
                { label: "Disputes", icon: AlertTriangle },
            ]
        },
        {
            id: "leaderboard",
            label: "Leaderboard",
            icon: BarChart3,
            color: "orange",
            subItems: [
                { label: "Tournament Ranking", icon: Trophy },
                { label: "Win/Loss Stats", icon: BarChart3 },
            ]
        },
        {
            id: "payments",
            label: "Payments (UPI)",
            icon: Wallet,
            color: "green",
            subItems: [
                { label: "Pay Entry Fee", icon: CreditCard },
                { label: "Payment History", icon: History },
                { label: "Pending Payments", icon: Clock },
                { label: "Refund Status", icon: AlertTriangle },
            ]
        },
        {
            id: "notifications",
            label: "Notifications",
            icon: Bell,
            color: "purple",
            subItems: [
                { label: "Announcements", icon: Zap },
                { label: "Match Reminders", icon: Clock },
                { label: "Payment Alerts", icon: Wallet },
            ]
        },
        {
            id: "support",
            label: "Support",
            icon: HelpCircle,
            color: "indigo",
            subItems: [
                { label: "Raise Ticket", icon: MessageSquare },
                { label: "FAQs", icon: HelpCircle },
                { label: "Contact Admin", icon: UserPlus },
            ]
        },
        {
            id: "settings",
            label: "Settings",
            icon: Settings,
            color: "slate",
            subItems: [
                { label: "Change Password", icon: Shield },
                { label: "Privacy Settings", icon: Eye },
                { label: "Logout", icon: LogOut, action: handleLogout },
            ]
        },
    ];

    return (
        <div className="min-h-full py-8 space-y-8 animate-fade-in custom-scrollbar overflow-y-auto pr-2">
            {/* Header section */}
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                    <span className={`h-1 w-12 ${isMiles ? "bg-accent-pink shadow-glow-pink" : "bg-accent-red shadow-glow-red"}`} />
                    <span className={`text-[10px] font-black tracking-[0.4em] uppercase opacity-70 ${isMiles ? "text-white" : "text-slate-900"}`}>Operational Hub</span>
                </div>
                <h1 className={`text-4xl md:text-5xl font-black italic uppercase tracking-tighter ${isMiles ? "text-white" : "text-slate-900"}`}>
                    System <span className={isMiles ? "text-accent-pink text-glow-pink" : "text-accent-red"}>Dashboard</span>
                </h1>
            </div>

            {/* Glass Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
                {categories.map((cat) => {
                    const isExpanded = expandedId === cat.id;
                    const Icon = cat.icon;

                    return (
                        <div
                            key={cat.id}
                            onClick={() => setExpandedId(isExpanded ? null : cat.id)}
                            className={`group relative overflow-hidden rounded-[2.5rem] border transition-all duration-700 cursor-pointer ${isExpanded
                                ? `col-span-1 md:col-span-2 row-span-2 ${isMiles ? 'bg-black/60 border-accent-pink/50 shadow-glow-pink/20' : 'bg-white/80 border-accent-red/50 shadow-glow-red/20'}`
                                : `${isMiles ? 'bg-black/20 border-white/5 opacity-60 hover:opacity-100 hover:scale-[1.02]' : 'bg-white/40 border-black/5 opacity-80 hover:opacity-100 hover:scale-[1.02]'}`
                                } p-8`}
                        >
                            {/* Card Background Decoration */}
                            {isExpanded && (
                                <div className={`absolute top-0 right-0 w-64 h-64 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none ${isMiles ? 'bg-accent-pink/10' : 'bg-accent-red/10'
                                    }`} />
                            )}

                            <div className="flex items-start justify-between relative z-10">
                                <div className="flex items-center gap-6">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isExpanded
                                        ? isMiles ? 'bg-accent-pink/20 text-accent-pink' : 'bg-accent-red/20 text-accent-red'
                                        : isMiles ? 'bg-white/5 text-white/40' : 'bg-black/5 text-slate-500'
                                        }`}>
                                        <Icon className="w-7 h-7" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className={`text-2xl font-black italic uppercase tracking-tighter transition-colors ${isExpanded
                                            ? isMiles ? 'text-white' : 'text-slate-900'
                                            : isMiles ? 'text-white/40' : 'text-slate-500'
                                            }`}>{cat.label}</h3>
                                        {!isExpanded && (
                                            <span className={`text-[10px] font-bold uppercase tracking-widest opacity-40 ${isMiles ? "text-white" : "text-slate-900"}`}>
                                                {cat.subItems.length} Options Available
                                            </span>
                                        )}
                                    </div>
                                </div>
                                {isExpanded && (
                                    <div className={`p-2 rounded-lg ${isMiles ? 'text-accent-pink' : 'text-accent-red'}`}>
                                        <div className="w-2 h-2 rounded-full animate-pulse bg-current shadow-[0_0_10px_currentColor]" />
                                    </div>
                                )}
                            </div>

                            {/* Expanded Content */}
                            <div className={`relative z-10 transition-all duration-700 ${isExpanded ? 'mt-10 opacity-100 max-h-250' : 'mt-0 opacity-0 max-h-0 pointer-events-none'
                                }`}>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {cat.subItems.map((sub) => {
                                        const SubIcon = sub.icon;
                                        return (
                                            <div
                                                key={sub.label}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    if (sub.action) sub.action();
                                                }}
                                                className={`flex items-center gap-4 p-4 rounded-3xl border transition-all duration-300 hover:scale-[1.02] ${isMiles ? 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/20' : 'bg-black/5 border-black/5 hover:bg-black/10 hover:border-black/10'
                                                    }`}
                                            >
                                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isMiles ? 'bg-white/5 text-white' : 'bg-black/5 text-slate-900'
                                                    }`}>
                                                    <SubIcon className="w-5 h-5" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className={`text-xs font-black uppercase tracking-wider ${isMiles ? "text-white" : "text-slate-900"}`}>{sub.label}</span>
                                                    {sub.description && (
                                                        <span className={`text-[10px] font-medium opacity-40 uppercase ${isMiles ? "text-white" : "text-slate-900"}`}>{sub.description}</span>
                                                    )}
                                                </div>
                                                <ChevronRight className={`w-4 h-4 ml-auto opacity-20 ${isMiles ? "text-white" : "text-slate-900"}`} />
                                            </div>
                                        )
                                    })}
                                </div>

                                {/* Bottom Action Line */}
                                <div className={`mt-8 h-px w-full opacity-10 ${isMiles ? 'bg-white' : 'bg-black'}`} />
                                <div className={`mt-4 text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${isMiles ? "text-white" : "text-slate-900"}`}>
                                    Terminal Instance ID: {instanceId}
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>

            <style jsx global>{`
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
                .text-glow-pink { text-shadow: 0 0 20px rgba(254,1,154,0.5); }
                .shadow-glow-pink { box-shadow: 0 0 40px rgba(254,1,154,0.15); }
                .shadow-glow-red { box-shadow: 0 0 40px rgba(227,6,19,0.1); }
            `}</style>
        </div>
    );
}
