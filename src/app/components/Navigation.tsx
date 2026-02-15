"use client";
import { useState, useEffect } from "react";

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme === "light") {
            setIsLightMode(true);
            document.body.classList.add("light-mode");
        }
    }, []);

    const toggleTheme = () => {
        const newMode = !isLightMode;
        setIsLightMode(newMode);
        if (newMode) {
            document.body.classList.add("light-mode");
            localStorage.setItem("theme", "light");
        } else {
            document.body.classList.remove("light-mode");
            localStorage.setItem("theme", "dark");
        }
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    return (
        <nav
            className="nav-pixel"
            style={{
                boxShadow: scrolled ? "0 4px 0 rgba(0,0,0,0.3)" : "none",
            }}
        >
            <div
                style={{
                    maxWidth: "1200px",
                    margin: "0 auto",
                    padding: "16px 24px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                {/* Logo */}
                <a
                    href="#home"
                    style={{
                        fontFamily: "var(--ff-pixel)",
                        fontSize: "14px",
                        color: "var(--accent)",
                        textDecoration: "none",
                        letterSpacing: "2px",
                        display: "flex",
                        alignItems: "center",
                        gap: "6px",
                        whiteSpace: "nowrap",
                    }}
                >
                    <span style={{ color: "var(--text-secondary)" }}>&lt;</span>
                    AKP
                    <span style={{ color: "var(--text-secondary)" }}>/&gt;</span>
                </a>

                {/* Theme toggle */}
                <button
                    onClick={toggleTheme}
                    style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--accent)",
                        cursor: "pointer",
                        padding: "8px",
                        display: "flex",
                        alignItems: "center",
                    }}
                    aria-label="Toggle Theme"
                >
                    {isLightMode ? (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                    ) : (
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                    )}
                </button>
            </div>
        </nav>
    );
}
