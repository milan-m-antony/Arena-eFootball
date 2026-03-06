"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

type Theme = "miles" | "peter";

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof window === "undefined") return "miles";
        const savedTheme = localStorage.getItem("arena-theme");
        return savedTheme === "miles" || savedTheme === "peter" ? savedTheme : "miles";
    });

    const toggleTheme = () => {
        setTheme((prev) => (prev === "miles" ? "peter" : "miles"));
    };

    useEffect(() => {
        localStorage.setItem("arena-theme", theme);
        document.documentElement.setAttribute("data-theme", theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <div suppressHydrationWarning className={theme === "miles" ? "dark-miles" : "light-peter"}>
                {children}
            </div>
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}
