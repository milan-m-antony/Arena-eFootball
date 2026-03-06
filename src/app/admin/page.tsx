"use client";

import { useTheme } from "@/context/ThemeContext";
import {
  Play, Users, Swords, Target, Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminPage() {
  const { theme } = useTheme();
  const isMiles = theme === "miles";

  const liveMatches = [
    { title: "Quarter Finals", desc: "Pro circuit match for championship slot.", icon: Play, edition: "Elite" },
    { title: "Friendly Rumble", desc: "Standard community match.", icon: Swords, edition: "Standard" },
  ];

  return (
    <div className="space-y-10 animate-fade-in">

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Hero Banner */}
        <div className={`col-span-full relative w-full rounded-[2.5rem] overflow-hidden p-10 min-h-[360px] flex flex-col justify-between group border ${isMiles ? 'bg-black/40 border-white/10 shadow-glow-pink' : 'bg-white/80 border-black/5 shadow-2xl'}`}>
          <div className="absolute inset-y-0 right-0 w-3/5 opacity-40 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1511882150382-421056c89033?q=80&w=1000')] bg-cover bg-center group-hover:scale-110 transition-transform duration-1000" />
          <div className={`absolute inset-0 bg-gradient-to-r ${isMiles ? 'from-black via-black/80' : 'from-white via-white/80'} to-transparent`} />

          <div className="relative z-10 flex flex-col items-start gap-4">
            <div className={`px-4 py-1.5 rounded-full backdrop-blur-md text-[10px] font-black uppercase tracking-widest border flex items-center gap-3 ${isMiles ? 'bg-white/5 border-white/10 text-accent-pink' : 'bg-black/5 border-black/5 text-accent-red'}`}>
              <span className={`w-2 h-2 rounded-full animate-pulse ${isMiles ? 'bg-accent-pink' : 'bg-accent-red'}`} />
              System Nominal
            </div>
            <div className="mt-4">
              <h2 className={`text-6xl font-black italic uppercase tracking-tighter ${isMiles ? 'text-white' : 'text-slate-900'}`}>Pro League</h2>
              <p className={`max-w-md mt-4 text-sm font-medium leading-relaxed opacity-60 ${isMiles ? 'text-white' : 'text-slate-600'}`}>
                Neural link established with 1,240 active nodes. Monitoring eFootball 2024 multiverse tournaments and competitive fairness protocols.
              </p>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-4">
            <Button className={`h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs transition-all duration-300 hover:scale-105 active:scale-95 ${isMiles ? 'bg-accent-pink shadow-glow-pink hover:bg-accent-pink/80' : 'bg-accent-red shadow-glow-red hover:bg-accent-red/80'} text-white`}>
              Deploy Update <Zap className="w-4 h-4 ml-2" />
            </Button>
            <Button variant="outline" className={`h-14 px-8 rounded-2xl font-black uppercase tracking-widest text-xs border backdrop-blur-xl ${isMiles ? 'bg-white/5 border-white/10 text-white hover:bg-white/10' : 'bg-black/5 border-black/5 text-slate-900 hover:bg-black/5'}`}>
              Inspect Logs
            </Button>
          </div>
        </div>

        {/* Live Arena Monitor */}
        <div className="col-span-1 lg:col-span-2 space-y-6">
          <h3 className={`text-xl font-black uppercase italic tracking-wider px-2 ${isMiles ? 'text-white' : 'text-slate-900'}`}>Live Arena Monitor</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {liveMatches.map((match, idx) => (
              <div key={idx} className={`relative rounded-[2rem] p-8 border group transition-all duration-500 hover:scale-[1.02] ${isMiles ? 'bg-white/[0.03] border-white/10 hover:border-white/20' : 'bg-black/[0.02] border-black/5 hover:border-black/10'}`}>
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-8 ${isMiles ? 'bg-white/5 text-accent-pink' : 'bg-black/5 text-accent-red'}`}>
                  <match.icon className="w-6 h-6" />
                </div>
                <div className="space-y-2">
                  <span className={`text-[10px] font-black uppercase tracking-[0.2em] opacity-40 ${isMiles ? "text-white" : "text-slate-900"}`}>{match.edition} Circuit</span>
                  <h4 className={`text-xl font-black uppercase italic ${isMiles ? "text-white" : "text-slate-900"}`}>{match.title}</h4>
                  <p className={`text-sm font-medium opacity-60 leading-relaxed ${isMiles ? "text-white" : "text-slate-600"}`}>{match.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Statistics */}
        <div className="col-span-1 space-y-6">
          <h3 className={`text-xl font-black uppercase italic tracking-wider px-2 ${isMiles ? 'text-white' : 'text-slate-900'}`}>Global Statistics</h3>
          <div className={`rounded-[2.5rem] p-8 border relative overflow-hidden group ${isMiles ? 'bg-white/[0.03] border-white/10' : 'bg-black/[0.02] border-black/5'}`}>
            <div className="relative w-full aspect-square max-w-[180px] mx-auto flex items-center justify-center mb-8">
              <div className={`absolute inset-0 rounded-full mix-blend-screen opacity-40 blur-[4px] transform -rotate-12 animate-pulse ${isMiles ? 'bg-accent-pink' : 'bg-accent-red'}`} />
              <div className={`absolute inset-4 rounded-full border-2 border-dashed opacity-20 animate-spin-slow ${isMiles ? 'border-white' : 'border-black'}`} />
              <div className="relative z-10 flex flex-col items-center">
                <span className={`text-[10px] font-black uppercase tracking-widest opacity-40 mb-2 ${isMiles ? 'text-white' : 'text-slate-900'}`}>Prize Pool</span>
                <span className={`text-3xl font-black italic tracking-tighter ${isMiles ? 'text-white' : 'text-slate-900'}`}>$12,340</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-white/5">
              {[
                { icon: Users, val: '2.3k' },
                { icon: Swords, val: '5.4k' },
                { icon: Target, val: '4.5k' },
              ].map((s, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${isMiles ? 'bg-white/5 text-white/60' : 'bg-black/5 text-slate-500'}`}>
                    <s.icon className="w-5 h-5" />
                  </div>
                  <span className={`text-[10px] font-black uppercase ${isMiles ? 'text-white/40' : 'text-slate-400'}`}>{s.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-fade-in { animation: fade-in 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards; }
        .animate-spin-slow { animation: spin-slow 20s linear infinite; }
        .shadow-glow-pink { box-shadow: 0 0 60px rgba(254, 1, 154, 0.15); }
        .shadow-glow-red { box-shadow: 0 0 60px rgba(227,6,19,0.1); }
      `}</style>
    </div>
  );
}
