"use client";
import { useState, useEffect } from "react";

const navItems = [
    { label: "HOME", href: "#home" },
    { label: "ABOUT", href: "#about" },
    { label: "SKILLS", href: "#skills" },
    { label: "PROJECTS", href: "#projects" },
    { label: "EDUCATION", href: "#education" },
    { label: "MUSIC", href: "#music" },
    { label: "CONTACT", href: "#contact" },
];

export default function Navigation() {
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState("HOME");
    const [menuOpen, setMenuOpen] = useState(false);
    const [isLightMode, setIsLightMode] = useState(false);

    useEffect(() => {
        // Check local storage or system preference
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
        const onScroll = () => {
            setScrolled(window.scrollY > 50);

            const sections = navItems.map((item) => ({
                id: item.href.replace("#", ""),
                label: item.label,
            }));

            for (const section of sections.reverse()) {
                const el = document.getElementById(section.id);
                if (el && el.getBoundingClientRect().top <= 200) {
                    setActive(section.label);
                    break;
                }
            }
        };

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
                {/* Logo - AKP DEV everywhere */}
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

                {/* Desktop Nav - Hidden on mobile, flex on desktop */}
                <div
                    className="hidden md:flex"
                    style={{ gap: "8px", alignItems: "center" }}
                >
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`nav-link ${active === item.label ? "active" : ""}`}
                            onClick={() => setActive(item.label)}
                        >
                            {item.label}
                        </a>
                    ))}

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
                            marginLeft: "8px"
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

                {/* Mobile hamburger - Flex on mobile, hidden on desktop */}
                {/* We use a wrapper div to handle visibility to avoid inline style conflicts */}
                <div className="md:hidden flex" style={{ gap: "16px", alignItems: "center" }}>
                    <button
                        onClick={toggleTheme}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--accent)",
                            cursor: "pointer",
                            padding: "0",
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

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        style={{
                            background: "transparent",
                            border: "2px solid var(--border-color)",
                            color: "var(--accent)",
                            width: "40px",
                            height: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.borderColor = "var(--accent)";
                            e.currentTarget.style.transform = "translateY(-2px)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.borderColor = "var(--border-color)";
                            e.currentTarget.style.transform = "translateY(0)";
                        }}
                        aria-label="Toggle menu"
                    >
                        {menuOpen ? (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                                <path d="M14 1.41L12.59 0L7 5.59L1.41 0L0 1.41L5.59 7L0 12.59L1.41 14L7 8.41L12.59 14L14 12.59L8.41 7L14 1.41Z" />
                            </svg>
                        ) : (
                            <svg width="18" height="14" viewBox="0 0 18 14" fill="currentColor">
                                <path d="M0 0H18V2H0V0ZM0 6H18V8H0V6ZM0 12H18V14H0V12Z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <div
                className="md:hidden"
                style={{
                    borderTop: menuOpen ? "2px solid var(--border-color)" : "none",
                    background: "var(--bg-primary)",
                    width: "100%",
                    overflow: "hidden",
                    transition: "max-height 0.3s ease-in-out, opacity 0.3s ease-in-out",
                    maxHeight: menuOpen ? "400px" : "0",
                    opacity: menuOpen ? 1 : 0,
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "20px 16px",
                        gap: "16px",
                    }}
                >
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href}
                            className={`nav-link ${active === item.label ? "active" : ""}`}
                            style={{
                                width: "100%",
                                textAlign: "center",
                                padding: "12px",
                                borderBottom: "1px dashed var(--border-color)",
                                fontSize: "14px",
                            }}
                            onClick={() => {
                                setActive(item.label);
                                setMenuOpen(false);
                            }}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
}
