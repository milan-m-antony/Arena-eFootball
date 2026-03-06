"use client";

import { useTheme } from "@/context/ThemeContext";
import { CinematicWrapper } from "@/components/layout/CinematicWrapper";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { DashboardHeader } from "@/components/layout/DashboardHeader";
import { AppSidebar } from "@/components/layout/AppSidebar";

type UserRole = 'admin' | 'super_admin' | 'player' | 'moderator';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { theme } = useTheme();
    const isMiles = theme === "miles";
    const router = useRouter();
    const [userRole] = useState<UserRole>('admin');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleLogout = () => {
        router.push("/login");
    };

    return (
        <CinematicWrapper className="flex h-screen overflow-hidden">
            {/* Unified Header */}
            <DashboardHeader isMiles={isMiles} role={userRole} onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

            {/* Redesigned Floating Sidebar */}
            <AppSidebar
                isMiles={isMiles}
                onLogout={handleLogout}
                role={userRole}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
            />

            {/* Main Content Area - Locked to Viewport */}
            <main className="flex-1 relative z-10 overflow-hidden flex flex-col pt-32">
                <div className="flex-1 overflow-y-auto custom-scrollbar px-6 md:px-12 pb-12 w-full max-w-7xl mx-auto">
                    {children}
                </div>
            </main>

            <style jsx global>{`
                .shadow-glow-pink { box-shadow: 0 0 20px rgba(254,1,154,0.3); }
                .shadow-glow-red { box-shadow: 0 0 20px rgba(227,6,19,0.3); }
                /* Ensure no outer scroll */
                body { overflow: hidden; }
            `}</style>
        </CinematicWrapper>
    );
}
