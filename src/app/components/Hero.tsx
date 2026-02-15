"use client";
import { useEffect, useState } from "react";
import PixelAvatar from "./PixelAvatar";
import PixelTextAnim from "./PixelTextAnim";

export default function Hero() {
    const [showSubtitle, setShowSubtitle] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setShowSubtitle(true), 800);
        return () => clearTimeout(timer);
    }, []);

    return (
        <section
            id="home"
            className="pixel-grid"
            style={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                overflow: "hidden",
                padding: "120px 24px 80px",
            }}
        >
            {/* Floating pixels background */}
            {Array.from({ length: 30 }).map((_, i) => (
                <div
                    key={i}
                    className="floating-pixel"
                    style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: `${Math.random() * 4 + 2}px`,
                        height: `${Math.random() * 4 + 2}px`,
                        animationDelay: `${Math.random() * 8}s`,
                        animationDuration: `${Math.random() * 6 + 5}s`,
                    }}
                />
            ))}

            {/* Matrix-like columns */}
            {Array.from({ length: 12 }).map((_, i) => (
                <div
                    key={`m-${i}`}
                    className="matrix-column"
                    style={{
                        left: `${i * 8.3}%`,
                        animationDuration: `${Math.random() * 10 + 8}s`,
                        animationDelay: `${Math.random() * 5}s`,
                    }}
                >
                    {Array.from({ length: 30 })
                        .map(() => (Math.random() > 0.5 ? "1" : "0"))
                        .join(" ")}
                </div>
            ))}

            <div
                style={{
                    maxWidth: "900px",
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "32px",
                    zIndex: 10,
                    textAlign: "center",
                }}
            >
                {/* Avatar */}
                <div className="fade-in-up" style={{ marginBottom: "16px" }}>
                    <PixelAvatar />
                </div>

                {/* Greeting text */}
                <div className="fade-in-up delay-2">
                    <p
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "12px",
                            color: "var(--text-secondary)",
                            letterSpacing: "4px",
                            marginBottom: "16px",
                            textTransform: "uppercase",
                        }}
                    >
                        ▸ Hello World! I&apos;m
                    </p>
                </div>

                {/* Name */}
                <div className="fade-in-up delay-3">
                    <h1
                        className="glitch"
                        data-text="AKP DEV"
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "clamp(28px, 5vw, 48px)",
                            color: "var(--accent)",
                            letterSpacing: "6px",
                            lineHeight: "1.4",
                        }}
                    >
                        AKP DEV
                    </h1>
                </div>

                {/* Pixel Text Animation subtitle */}
                <div className="fade-in-up delay-4">
                    <div
                        style={{
                            fontFamily: "var(--ff-vt)",
                            fontSize: "clamp(20px, 3vw, 32px)",
                            color: "var(--text-primary)",
                            minHeight: "40px",
                        }}
                    >
                        {showSubtitle && (
                            <PixelTextAnim
                                text="Full-Stack Developer"
                                style={{
                                    fontFamily: "var(--ff-vt)",
                                    fontSize: "clamp(20px, 3vw, 32px)",
                                }}
                            />
                        )}
                    </div>
                </div>

                {/* Description */}
                <div className="fade-in-up delay-5">
                    <p
                        style={{
                            fontFamily: "var(--ff-vt)",
                            fontSize: "20px",
                            color: "var(--text-secondary)",
                            maxWidth: "600px",
                            lineHeight: "1.6",
                        }}
                    >
                        Crafting high-performance digital solutions.
                        Building clean, efficient, and scalable code for the modern web.
                    </p>
                </div>



                {/* CTA Buttons */}
                <div
                    className="fade-in-up delay-7"
                    style={{
                        display: "flex",
                        gap: "16px",
                        marginTop: "16px",
                        flexWrap: "wrap",
                        justifyContent: "center",
                    }}
                >
                    <a href="#projects" className="pixel-btn">
                        VIEW PROJECTS
                    </a>
                    <a href="#contact" className="pixel-btn-outline">
                        CONTACT ME
                    </a>
                </div>

                {/* Scroll indicator */}
                <div
                    className="fade-in-up delay-8"
                    style={{
                        marginTop: "40px",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: "8px",
                    }}
                >
                    <p
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "8px",
                            color: "var(--text-secondary)",
                            letterSpacing: "2px",
                        }}
                    >
                        SCROLL DOWN
                    </p>
                    <div className="scroll-indicator"
                        style={{
                            width: "2px",
                            height: "40px",
                            background: "linear-gradient(to bottom, var(--accent), transparent)",
                            animation: "scrollBounce 2s infinite",
                        }}
                    />
                </div>
            </div>
        </section>
    );
}
