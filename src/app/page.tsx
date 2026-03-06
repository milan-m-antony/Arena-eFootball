"use client";

import { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";
import { Navbar } from "@/components/layout/Navbar";
import { ChevronRight, Info, Trophy, Calendar, DollarSign, Zap, Shield, Sword } from "lucide-react";
import { Button } from "@/components/ui/button";

const MILES_IMAGES = [
  "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?q=80&w=1200",
  "https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?q=80&w=1200",
  "https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=1200",
  "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?q=80&w=1200",
  "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200",
];

const PETER_IMAGES = [
  "https://images.unsplash.com/photo-1594737625785-a6bad33ff113?q=80&w=1200",
  "https://images.unsplash.com/photo-1604200213928-ba3cf4fc8433?q=80&w=1200",
  "https://images.unsplash.com/photo-1634828221818-503587f33d02?q=80&w=1200",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200",
  "https://images.unsplash.com/photo-1561731216-c3a4d99437d5?q=80&w=1200",
];


// ── SUB-COMPONENTS for New Sections ──

function SectionHeader({ title, subtitle, isMiles }: { title: string; subtitle: string; isMiles: boolean }) {
  return (
    <div className="flex flex-col items-center mb-16 space-y-4">
      <div className="flex items-center gap-4">
        <span className={`h-[1px] w-12 ${isMiles ? "bg-accent-pink" : "bg-accent-red"} opacity-50`} />
        <span className={`text-[10px] md:text-[12px] font-black tracking-[0.6em] uppercase opacity-70 ${isMiles ? "text-white" : "text-foreground"}`}>{subtitle}</span>
        <span className={`h-[1px] w-12 ${isMiles ? "bg-accent-pink" : "bg-accent-red"} opacity-50`} />
      </div>
      <h3 className={`text-4xl md:text-6xl font-black italic uppercase tracking-tighter ${isMiles ? "text-white" : "text-foreground"}`}>{title}</h3>
    </div>
  );
}

function TournamentCard({ title, prize, date, status, isMiles }: { title: string; prize: string; date: string; status: string; isMiles: boolean }) {
  const accent = isMiles ? "accent-pink" : "accent-red";
  return (
    <div className={`group relative glass-panel rounded-[2rem] p-8 border ${isMiles ? 'border-white/10' : 'border-black/5'} transition-all duration-500 hover:scale-[1.02] hover:border-white/20`}>
      <div className="flex justify-between items-start mb-8">
        <div className={`p-4 rounded-2xl ${isMiles ? 'bg-white/5 border-white/10' : 'bg-black/5 border-black/10'} border text-${accent}`}>
          <Trophy className="w-6 h-6" />
        </div>
        <div className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-${accent}/10 text-${accent} border border-${accent}/20`}>
          {status}
        </div>
      </div>
      <h4 className={`text-2xl font-black uppercase italic mb-2 ${isMiles ? "text-white" : "text-foreground"}`}>{title}</h4>
      <div className={`flex items-center gap-6 opacity-70 text-sm mb-8 font-medium ${isMiles ? "text-white" : "text-foreground"}`}>
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4" />
          <span>{prize}</span>
        </div>
      </div>
      <Button className={`w-full h-14 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-500 ${isMiles ? "bg-accent-pink hover:bg-accent-pink/80 shadow-glow-pink text-white" : "bg-accent-red hover:bg-accent-red/80 shadow-glow-red text-white"
        }`}>
        Join Tournament
      </Button>
    </div>
  );
}

function LeaderboardRow({ rank, name, points, winRate, isMiles }: { rank: number; name: string; points: string; winRate: string; isMiles: boolean }) {
  const isTop = rank <= 3;
  const accent = isMiles ? "accent-pink" : "accent-red";
  return (
    <div className={`flex items-center justify-between p-6 rounded-3xl border transition-all duration-500 ${isMiles ? 'hover:bg-white/5' : 'hover:bg-black/5'} ${isTop ? `${isMiles ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.03] border-black/10'}` : "bg-transparent border-transparent"
      }`}>
      <div className="flex items-center gap-6">
        <span className={`text-2xl font-black italic w-8 ${isTop ? `text-${accent}` : "text-foreground/30"}`}>
          {rank.toString().padStart(2, '0')}
        </span>
        <div className="flex flex-col">
          <span className={`font-black uppercase tracking-wider ${isMiles ? "text-white" : "text-foreground"}`}>{name}</span>
          <span className={`text-[10px] uppercase tracking-widest opacity-60 ${isMiles ? "text-white" : "text-foreground"}`}>Pro Player</span>
        </div>
      </div>
      <div className={`flex items-center gap-12 ${isMiles ? "text-white" : "text-foreground"}`}>
        <div className="hidden md:flex flex-col items-end">
          <span className="text-xs font-black uppercase tracking-widest opacity-60">Win Rate</span>
          <span className={`text-sm font-black text-${accent}`}>{winRate}</span>
        </div>
        <div className="flex flex-col items-end min-w-[100px]">
          <span className="text-xs font-black uppercase tracking-widest opacity-60">Arena Points</span>
          <span className={`text-lg font-black ${isMiles ? "text-white" : ""}`}>{points}</span>
        </div>
      </div>
    </div>
  );
}

function RuleCard({ title, icon: Icon, desc, isMiles }: { title: string; icon: LucideIcon; desc: string; isMiles: boolean }) {
  const accent = isMiles ? "accent-pink" : "accent-red";
  return (
    <div className={`glass-panel p-8 rounded-[2rem] border ${isMiles ? 'border-white/5 hover:border-white/10' : 'border-black/5 hover:border-black/10'} space-y-4 transition-colors`}>
      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-${accent}/10 text-${accent}`}>
        <Icon className="w-6 h-6" />
      </div>
      <h4 className={`text-xl font-black uppercase italic ${isMiles ? "text-white" : "text-foreground"}`}>{title}</h4>
      <p className={`text-sm leading-relaxed font-medium ${isMiles ? "text-white/70" : "text-foreground/70"}`}>{desc}</p>
    </div>
  );
}

export default function HomePage() {
  const { theme } = useTheme();
  const [activeIdx, setActiveIdx] = useState(0);
  const [hoveredButton, setHoveredButton] = useState<"register" | "tournaments" | null>(null);
  const isMiles = theme === "miles";
  const images = isMiles ? MILES_IMAGES : PETER_IMAGES;

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % images.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <main
      suppressHydrationWarning
      className={`min-h-screen transition-all duration-700 ${isMiles ? "dark-miles bg-[#050505]" : "light-peter bg-slate-50"}`}>
      <div suppressHydrationWarning className="relative">
        <Navbar />

        {/* ── HERO SECTION ── */}
        <section id="home" className="relative min-h-[100dvh] flex flex-col justify-center items-center px-6 md:px-12 overflow-hidden pt-20">

          {/* Clean static ambient behind hero */}
          <div suppressHydrationWarning className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
            <Image
              src={images[activeIdx]}
              alt=""
              fill
              unoptimized
              sizes="100vw"
              className={`w-full h-full object-cover transition-all duration-[2000ms] ${isMiles ? "opacity-[0.14] scale-110" : "opacity-[0.35] scale-100"}`}
            />
          </div>



          {/* ── MAIN CONTENT ── */}
          <div className="relative z-[40] w-full max-w-[1700px] mx-auto px-6 md:px-16 flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-8 lg:gap-20 h-full py-6 lg:py-0">

            {/* LEFT: Hero text + CTAs */}
            <div className="flex-none lg:flex-1 flex flex-col items-center lg:items-start gap-6 md:gap-10 text-center lg:text-left w-full relative z-[50] animate-fade-in-up">
              <div className="flex items-center gap-4">
                <span className={`h-1 w-28 hidden lg:block ${isMiles ? "bg-accent-pink shadow-glow-pink" : "bg-accent-red shadow-glow-red"}`} />
                <span className={`text-[10px] md:text-[13px] font-black tracking-[0.8em] uppercase opacity-70 ${isMiles ? "text-white" : "text-foreground"}`}>Elite Arena 24</span>
              </div>

              <h2 className="text-6xl sm:text-8xl md:text-[10rem] font-black italic tracking-tighter leading-[0.75] uppercase drop-shadow-3xl text-foreground">
                <span className={`block italic ${isMiles ? "text-white opacity-100" : "opacity-95"}`}>Unleash</span>
                <span className={`block ${isMiles ? "text-accent-pink text-glow-pink" : "text-accent-red text-glow-red"}`}>Power</span>
              </h2>

              <div className="mt-8 lg:mt-6 lg:-ml-2 flex flex-nowrap sm:flex-wrap gap-4 md:gap-8 w-full justify-center lg:justify-start pointer-events-auto relative z-[60]">
                <Link
                  href="/register"
                  className="flex-1 sm:flex-none"
                  onMouseEnter={() => setHoveredButton("register")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Button className={`w-full h-14 sm:h-20 md:h-24 px-6 sm:px-12 md:px-16 rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs border border-white/10 transition-all duration-500 hover:scale-110 active:scale-95 group overflow-hidden ${(hoveredButton === "tournaments")
                    ? "bg-white/10 text-white/60 hover:text-white"
                    : isMiles ? "bg-accent-pink text-white shadow-glow-pink hover:bg-accent-pink/80" : "bg-accent-red text-white shadow-glow-red hover:bg-accent-red/80"
                    }`}>
                    <span className="flex items-center justify-center gap-2 whitespace-nowrap">
                      Register <ChevronRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </span>
                  </Button>
                </Link>
                <Link
                  href="/#tournaments"
                  className="flex-1 sm:flex-none"
                  onMouseEnter={() => setHoveredButton("tournaments")}
                  onMouseLeave={() => setHoveredButton(null)}
                >
                  <Button variant="outline" className={`w-full h-14 sm:h-20 md:h-24 px-6 sm:px-12 md:px-16 rounded-[1.5rem] sm:rounded-[2rem] font-black uppercase tracking-[0.2em] sm:tracking-[0.3em] text-[10px] sm:text-xs transition-all duration-500 hover:scale-105 flex items-center justify-center gap-3 whitespace-nowrap backdrop-blur-xl ${(hoveredButton === "tournaments")
                    ? isMiles ? "bg-accent-pink border-accent-pink text-white shadow-glow-pink" : "bg-accent-red border-accent-red text-white shadow-glow-red"
                    : isMiles ? 'bg-accent-pink/10 border border-accent-pink/40 text-accent-pink hover:bg-accent-pink/20 shadow-[0_0_30px_rgba(254,1,154,0.2)]'
                      : 'bg-accent-red/10 border border-accent-red/60 text-accent-red hover:bg-accent-red/20 shadow-[0_0_30px_rgba(227,6,19,0.1)]'
                    }`}>
                    Tournaments
                  </Button>
                </Link>
              </div>
            </div>

            {/* RIGHT: 5-Image fan gallery */}
            <div className="flex-1 relative w-full h-[50vh] md:h-[65vh] lg:h-[85vh] flex items-center justify-center z-20 -mt-16 sm:-mt-24 md:mt-4 lg:mt-0">
              <div className="relative w-full h-full flex items-center justify-center">
                {images.map((img, idx) => {
                  const isActive = idx === activeIdx;
                  const isPrev = idx === (activeIdx - 1 + images.length) % images.length;
                  const isNext = idx === (activeIdx + 1) % images.length;
                  const isFarPrev = idx === (activeIdx - 2 + images.length) % images.length;
                  const isFarNext = idx === (activeIdx + 2) % images.length;

                  let style: React.CSSProperties = { opacity: 0, transform: "scale(0.5) translateY(150px)", zIndex: 0 };

                  if (isActive) {
                    style = { opacity: 1, transform: "scale(1) translate(0,0) rotate(0deg)", zIndex: 50 };
                  } else if (isPrev) {
                    style = { opacity: 0.5, transform: "scale(0.82) translate(-44%,-8%) rotate(-12deg)", zIndex: 40 };
                  } else if (isNext) {
                    style = { opacity: 0.5, transform: "scale(0.82) translate(44%,8%) rotate(12deg)", zIndex: 40 };
                  } else if (isFarPrev) {
                    style = { opacity: 0.2, transform: "scale(0.65) translate(-88%,-18%) rotate(-22deg)", zIndex: 30 };
                  } else if (isFarNext) {
                    style = { opacity: 0.2, transform: "scale(0.65) translate(88%,18%) rotate(22deg)", zIndex: 30 };
                  }

                  return (
                    <div
                      key={`main-${idx}`}
                      className="absolute transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]"
                      style={style}
                    >
                      <div className={`relative rounded-[2rem] sm:rounded-[3rem] overflow-hidden border-2 glass-panel ${isActive
                        ? isMiles ? "border-accent-pink shadow-glow-pink" : "border-accent-red shadow-glow-red"
                        : "border-white/10 shadow-2xl"
                        }`}>
                        <Image
                          src={img}
                          alt=""
                          width={360}
                          height={560}
                          unoptimized
                          className="w-52 sm:w-64 md:w-80 lg:w-[360px] h-[280px] sm:h-[360px] md:h-[480px] lg:h-[560px] object-cover saturate-150 contrast-125"
                        />
                        {isActive && (
                          <div className={`absolute inset-x-0 bottom-0 p-5 md:p-10 pt-14 md:pt-28 bg-gradient-to-t ${isMiles ? 'from-black/95 via-black/30' : 'from-white/95 via-white/30'} to-transparent`}>
                            <div className="flex items-center justify-between mb-1">
                              <span className={`text-[9px] md:text-[11px] font-black uppercase tracking-[0.4em] opacity-50 ${isMiles ? "text-white" : "text-foreground"}`}>Suit Integration</span>
                              <Info className={`w-4 h-4 opacity-30 ${isMiles ? "text-white" : "text-foreground"}`} />
                            </div>
                            <p className={`text-lg md:text-3xl font-black italic uppercase tracking-tighter leading-none ${isMiles ? "text-white" : "text-foreground"}`}>Nanotech Suit</p>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status badge */}
              <div className="absolute top-4 right-4 md:top-12 md:right-8 animate-float-slow z-[60]">
                <div className={`glass-panel py-3 px-5 md:py-4 md:px-8 rounded-[1.5rem] md:rounded-[2rem] flex items-center gap-3 border ${isMiles ? "border-white/20" : "border-black/10"}`}>
                  <div className={`w-2.5 h-2.5 md:w-3.5 md:h-3.5 rounded-full ${isMiles ? "bg-accent-pink shadow-glow-pink" : "bg-accent-red shadow-glow-red"} animate-pulse`} />
                  <span className={`text-[9px] sm:text-[10px] md:text-[12px] font-black uppercase tracking-[0.3em] opacity-80 whitespace-nowrap ${isMiles ? "text-white" : "text-foreground"}`}>Battle Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="absolute bottom-6 md:bottom-12 left-1/2 -translate-x-1/2 flex gap-3 md:gap-5 z-50">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIdx(i)}
                className={`h-0.5 sm:h-1 rounded-full transition-all duration-700 ${i === activeIdx
                  ? `w-10 sm:w-16 md:w-24 ${isMiles ? "bg-accent-pink shadow-glow-pink" : "bg-accent-red shadow-glow-red"}`
                  : "w-3 sm:w-6 md:w-10 bg-white/10 hover:bg-white/40"
                  }`}
              />
            ))}
          </div>
        </section>

        {/* ── TOURNAMENTS SECTION ── */}
        <section id="tournaments" className="relative py-24 md:py-32 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <SectionHeader title="Active Arenas" subtitle="Tournament Schedule" isMiles={isMiles} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TournamentCard title="Nexus Open '24" prize="$25,000" date="Oct 12-14" status="Registering" isMiles={isMiles} />
              <TournamentCard title="Midnight Melee" prize="$10,000" date="Oct 18" status="Coming Soon" isMiles={isMiles} />
              <TournamentCard title="Zenith Finals" prize="$50,000" date="Nov 05" status="Elite Only" isMiles={isMiles} />
            </div>
          </div>
        </section>

        <div className={`h-px w-full max-w-5xl mx-auto ${isMiles ? 'bg-white/5' : 'bg-black/5'}`} />

        {/* ── LEADERBOARD SECTION ── */}
        <section id="leaderboard" className="relative py-24 md:py-32 px-6 md:px-12 z-10">
          <div className="max-w-4xl mx-auto">
            <SectionHeader title="Top Contenders" subtitle="Global Rankings" isMiles={isMiles} />
            <div className="glass-panel rounded-[2.5rem] p-4 md:p-8 space-y-2 border border-white/5">
              <LeaderboardRow rank={1} name="SpiderGwen_99" points="14,250" winRate="78%" isMiles={isMiles} />
              <LeaderboardRow rank={2} name="Venomous_V" points="12,800" winRate="72%" isMiles={isMiles} />
              <LeaderboardRow rank={3} name="Prowler_X" points="12,100" winRate="70%" isMiles={isMiles} />
              <LeaderboardRow rank={4} name="Ham_Thanos" points="11,400" winRate="65%" isMiles={isMiles} />
              <LeaderboardRow rank={5} name="Octo_Doc" points="10,950" winRate="63%" isMiles={isMiles} />
            </div>
          </div>
        </section>

        <div className={`h-px w-full max-w-5xl mx-auto ${isMiles ? 'bg-white/5' : 'bg-black/5'}`} />

        {/* ── RULES SECTION ── */}
        <section id="rules" className="relative py-24 md:py-32 px-6 md:px-12 z-10">
          <div className="max-w-7xl mx-auto">
            <SectionHeader title="Codex of Honor" subtitle="Platform Protocols" isMiles={isMiles} />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <RuleCard icon={Shield} title="Fair Play" desc="Zero tolerance for exploitative behavior or third-party assistance tools." isMiles={isMiles} />
              <RuleCard icon={Zap} title="Integrity" desc="Verified identities are mandatory for all prize-tier competitive events." isMiles={isMiles} />
              <RuleCard icon={Sword} title="Combat" desc="Custom matches utilize standard tournament rule-sets unless specified otherwise." isMiles={isMiles} />
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer className={`py-20 px-6 md:px-12 border-t ${isMiles ? 'border-white/5 bg-black/80' : 'border-black/5 bg-white/90'} z-10`}>
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-1 md:col-span-2 space-y-8">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-xl ${isMiles ? "bg-accent-pink/20 text-accent-pink" : "bg-accent-red/20 text-accent-red"}`}>
                  <Shield className="w-6 h-6" />
                </div>
                <span className={`text-2xl font-black italic tracking-tighter ${isMiles ? "text-white" : "text-foreground"}`}>ARENA-X</span>
              </div>
              <p className={`max-w-xs text-sm leading-relaxed font-medium italic ${isMiles ? "text-white/70" : "text-foreground/60"}`}>
                The ultimate battleground for elite eFootball competition. Join the multiverse of champions today.
              </p>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h5 className={`font-black uppercase tracking-widest text-xs ${isMiles ? "text-white" : "text-foreground"}`}>Ecosystem</h5>
              <div className={`flex flex-col gap-4 text-sm font-medium uppercase tracking-wider ${isMiles ? "text-white/70" : "text-foreground/70"}`}>
                <a href="#" className={`hover:text-foreground transition-colors ${isMiles ? "hover:text-white" : ""}`}>Tournaments</a>
                <a href="#" className={`hover:text-foreground transition-colors ${isMiles ? "hover:text-white" : ""}`}>Leaderboards</a>
                <a href="#" className={`hover:text-foreground transition-colors ${isMiles ? "hover:text-white" : ""}`}>Pro Rules</a>
              </div>
            </div>
            <div className="space-y-6 text-center md:text-left">
              <h5 className={`font-black uppercase tracking-widest text-xs ${isMiles ? "text-white" : "text-foreground"}`}>Connect</h5>
              <div className={`flex flex-col gap-4 text-sm font-medium uppercase tracking-wider ${isMiles ? "text-white/70" : "text-foreground/70"}`}>
                <a href="#" className={`hover:text-foreground transition-colors ${isMiles ? "hover:text-white" : ""}`}>Twitter / X</a>
                <a href="#" className={`hover:text-foreground transition-colors ${isMiles ? "hover:text-white" : ""}`}>Discord</a>
                <a href="#" className={`hover:text-foreground transition-colors ${isMiles ? "hover:text-white" : ""}`}>Twitch</a>
              </div>
            </div>
          </div>
          <div className={`max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] ${isMiles ? "text-white/40" : "text-foreground/40"}`}>
            <span>© 2024 ARENA-X MULTIVERSE</span>
            <div className="flex gap-8">
              <a href="#">Security</a>
              <a href="#">Service Status</a>
            </div>
          </div>
        </footer>
      </div>
      <style jsx global>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(60px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes float-slow {
          0%,100% { transform: translateY(0) rotate(0deg) scale(1); }
          50%     { transform: translateY(-20px) rotate(3deg) scale(1.02); }
        }
        .animate-fade-in-up { animation: fade-in-up 1.8s cubic-bezier(0.23,1,0.32,1) forwards; }
        .animate-float-slow { animation: float-slow 12s ease-in-out infinite; }
        .text-glow-pink  { text-shadow:  0 0 45px rgba(254,1,154,0.6);  }
        .shadow-glow-pink{ box-shadow:   0 0 50px rgba(254,1,154,0.45); }
        .shadow-glow-red { box-shadow:   0 0 50px rgba(227,6,19,0.45);  }
        .drop-shadow-3xl { filter: drop-shadow(0 25px 35px rgba(0,0,0,0.8)); }
        .glass-panel {
          background: ${isMiles ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.03)"};
          border: 1px solid ${isMiles ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
        }
      `}</style>
    </main >
  );
}
