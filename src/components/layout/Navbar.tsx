"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, Sun, Zap, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";

export function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const lastScrollY = useRef(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const isMiles = theme === "miles";

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            setIsScrolled(currentScrollY > 50);
            if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
                setIsVisible(false);
                setMobileMenuOpen(false);
            } else {
                setIsVisible(true);
            }
            lastScrollY.current = currentScrollY;
        };
        window.addEventListener("scroll", handleScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const navLinks = [
        { name: "Home", href: "/#home" },
        { name: "Tournaments", href: "/#tournaments" },
        { name: "Leaderboard", href: "/#leaderboard" },
        { name: "Rules", href: "/#rules" },
    ];

    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href.startsWith("/#") && window.location.pathname === "/") {
            e.preventDefault();
            const element = document.getElementById(href.substring(2));
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    };

    return (
        <>
            <div
                suppressHydrationWarning
                className={`fixed top-3 md:top-6 left-0 right-0 z-50 flex justify-center w-full px-3 md:px-8 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${isVisible ? "translate-y-0 opacity-100" : "-translate-y-32 opacity-0"
                    }`}>
                <nav suppressHydrationWarning className={`relative w-full max-w-5xl rounded-[1.75rem] md:rounded-[3rem] border border-white/10 transition-all duration-500 glass-panel overflow-hidden ${isScrolled ? "py-2 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)]" : "py-3 md:py-4 px-5 md:px-8"
                    }`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent pointer-events-none -translate-x-full animate-shimmer opacity-30" />

                    <div className="relative flex h-11 md:h-14 items-center justify-between z-10">
                        {/* Logo */}
                        <Link href="/#home" className="flex items-center group shrink-0">
                            <div className={`p-1.5 md:p-2 rounded-xl transition-all duration-500 group-hover:scale-110 ${isMiles ? "bg-accent-pink/20 text-accent-pink" : "bg-accent-red/20 text-accent-red"
                                }`}>
                                <Gamepad2 className="w-5 h-5 md:w-6 md:h-6 fill-current" />
                            </div>
                        </Link>

                        {/* Desktop nav — truly centered */}
                        <div className="absolute left-1/2 -translate-x-1/2 hidden lg:flex items-center gap-8 xl:gap-11">
                            {navLinks.map(link => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className={`text-[11px] xl:text-[13px] font-black uppercase tracking-[0.18em] xl:tracking-[0.25em] transition-all relative group cursor-pointer ${isMiles ? "text-white/70 hover:text-white" : "text-foreground/70 hover:text-foreground"}`}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.name}
                                    <span className={`absolute -bottom-2 left-0 w-0 h-0.5 transition-all duration-500 ${isMiles ? "bg-accent-pink shadow-glow-pink" : "bg-accent-red shadow-glow-red"
                                        } group-hover:w-full`} />
                                </a>
                            ))}
                        </div>

                        {/* Right actions */}
                        <div className="flex items-center gap-2 md:gap-4 shrink-0">
                            <button
                                onClick={toggleTheme}
                                title="Toggle Theme"
                                className={`p-2.5 md:p-3 rounded-xl md:rounded-2xl border border-white/5 transition-all duration-500 hover:scale-110 active:scale-90 group relative overflow-hidden ${isMiles ? "bg-accent-pink/10 text-accent-pink shadow-glow-pink" : "bg-accent-red/10 text-accent-red shadow-glow-red"
                                    }`}
                            >
                                <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                                {isMiles ? <Zap className="h-4 w-4 md:h-5 md:w-5 fill-current" /> : <Sun className="h-4 w-4 md:h-5 md:w-5" />}
                            </button>

                            <Link href="/login" className="shrink-0">
                                <Button className={`rounded-xl md:rounded-[1.5rem] font-black uppercase tracking-[0.15em] text-[8px] md:text-[10px] px-5 md:px-8 h-10 md:h-12 transition-all duration-500 border border-white/10 overflow-hidden relative ${isMiles ? "bg-accent-pink hover:bg-accent-pink/80 shadow-glow-pink" : "bg-accent-red hover:bg-accent-red/80 shadow-glow-red"
                                    }`}>
                                    Login
                                </Button>
                            </Link>

                            <button
                                className={`lg:hidden p-2 transition-colors shrink-0 ${isMiles ? "text-white" : "text-foreground"}`}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            >
                                {mobileMenuOpen ? <X className="h-6 w-6" strokeWidth={2.5} /> : <Menu className="h-6 w-6" strokeWidth={2.5} />}
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            <div
                suppressHydrationWarning
                className={`fixed inset-0 z-[60] ${isMiles ? "dark-miles bg-black/98 text-white" : "light-peter bg-white/98 text-black"} backdrop-blur-3xl lg:hidden flex flex-col items-center justify-center transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${mobileMenuOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
                    }`}>
                <button className={`absolute top-8 right-8 p-4 ${isMiles ? "text-white/70 hover:text-white" : "text-black/70 hover:text-black"} transition-all`} onClick={() => setMobileMenuOpen(false)}>
                    <X className="w-8 h-8" strokeWidth={2.5} />
                </button>
                <div suppressHydrationWarning className="flex flex-col items-center gap-7 md:gap-10 w-full px-10">
                    {navLinks.map((link, idx) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => {
                                handleNavClick(e, link.href);
                                setMobileMenuOpen(false);
                            }}
                            className={`text-3xl md:text-5xl font-black uppercase tracking-[0.3em] transition-all hover:scale-110 active:scale-95 text-center cursor-pointer ${isMiles ? "text-white" : "text-black/80 hover:text-black"}`}
                            style={{ transitionDelay: `${idx * 40}ms` }}
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className={`w-24 h-0.5 md:w-32 rounded-full ${isMiles ? "bg-accent-pink" : "bg-accent-red"} my-4 opacity-50`} />
                        <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                        <Button className={`h-14 px-12 rounded-2xl border border-white/10 font-black text-base uppercase tracking-widest ${isMiles ? "bg-accent-pink shadow-glow-pink" : "bg-accent-red shadow-glow-red"
                            }`}>Login</Button>
                    </Link>
                </div>
            </div>

            <style jsx global>{`
        @keyframes shimmer { 0%{transform:translateX(-100%)} 100%{transform:translateX(100%)} }
        .animate-shimmer { animation: shimmer 4s infinite linear; }
        .shadow-glow-pink { box-shadow: 0 0 30px rgba(254,1,154,0.4); }
        .shadow-glow-red  { box-shadow: 0 0 30px rgba(227,6,19,0.4);  }
      `}</style>
        </>
    );
}
