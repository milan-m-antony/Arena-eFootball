"use client";

import { useTheme } from "@/context/ThemeContext";
import { ReactNode } from "react";

interface CinematicWrapperProps {
  children: ReactNode;
  className?: string;
  backgroundText?: string;
}

export function CinematicWrapper({ children, className = "", backgroundText }: CinematicWrapperProps) {
  const { theme } = useTheme();
  const isMiles = theme === "miles";
  const accentRgb = isMiles ? "254,1,154" : "227,6,19";

  return (
    <div
      className={`min-h-screen w-full relative overflow-hidden font-outfit`}
      style={{
        background: isMiles
          ? "radial-gradient(ellipse at 30% 20%, rgba(254,1,154,0.15) 0%, transparent 60%), #050505"
          : "radial-gradient(ellipse at 30% 20%, rgba(227,6,19,0.1) 0%, transparent 60%), #f8fafc",
      }}
    >
      {/* CINEMATIC BACKGROUND ELEMENTS */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden text-slate-400">
        {/* Animated Orbs */}
        <div
          className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full animate-orb-slow"
          style={{
            background: `radial-gradient(circle, rgba(${accentRgb},0.08) 0%, transparent 70%)`,
            filter: "blur(80px)"
          }}
        />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full animate-orb-slow-reverse"
          style={{
            background: `radial-gradient(circle, rgba(${accentRgb},0.05) 0%, transparent 70%)`,
            filter: "blur(100px)"
          }}
        />
      </div>

      {/* Main Content */}
      <div className={`relative z-10 w-full h-full min-h-screen ${className}`}>
        {children}
      </div>

      {backgroundText ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-[1] flex items-center justify-center select-none text-[16vw] font-black tracking-[0.2em] opacity-[0.03] ${isMiles ? "text-white" : "text-black"}`}
        >
          {backgroundText}
        </div>
      ) : null}

      <style jsx global>{`
        @keyframes orb-slow {
          0%, 100% { transform: translate(0,0) scale(1); }
          50% { transform: translate(5%, 5%) scale(1.1); }
        }
        @keyframes orb-slow-reverse {
          0%, 100% { transform: translate(0,0) scale(1.1); }
          50% { transform: translate(-5%, -5%) scale(1); }
        }
        .animate-orb-slow { animation: orb-slow 15s ease-in-out infinite; }
        .animate-orb-slow-reverse { animation: orb-slow-reverse 20s ease-in-out infinite; }
        
        /* Custom scrollbar for themed areas */
        .custom-scrollbar::-webkit-scrollbar {
          width: 5px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: ${isMiles ? 'rgba(254,1,154,0.2)' : 'rgba(227,6,19,0.2)'};
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: ${isMiles ? 'rgba(254,1,154,0.4)' : 'rgba(227,6,19,0.4)'};
        }
      `}</style>
    </div>
  );
}
