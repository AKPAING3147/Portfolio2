"use client";
import { useState, useEffect } from "react";

export default function LoadingScreen({ ready, onHidden }: { ready: boolean; onHidden?: () => void }) {
    const [fadeOut, setFadeOut] = useState(false);
    const [hidden, setHidden] = useState(false);
    const [dots, setDots] = useState("");

    // Animate the dots
    useEffect(() => {
        const interval = setInterval(() => {
            setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
        }, 400);
        return () => clearInterval(interval);
    }, []);

    // When video is ready, trigger fade out
    useEffect(() => {
        if (ready) {
            const timer = setTimeout(() => {
                setFadeOut(true);
                setTimeout(() => {
                    setHidden(true);
                    onHidden?.();
                }, 600);
            }, 300);
            return () => clearTimeout(timer);
        }
    }, [ready]);

    if (hidden) return null;

    return (
        <div
            style={{
                position: "fixed",
                inset: 0,
                zIndex: 9999,
                background: "var(--bg-primary, #000)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "32px",
                transition: "opacity 0.5s ease, transform 0.5s ease",
                opacity: fadeOut ? 0 : 1,
                transform: fadeOut ? "scale(1.05)" : "scale(1)",
                pointerEvents: fadeOut ? "none" : "auto",
            }}
        >
            {/* Pixel art logo */}
            <div
                style={{
                    fontFamily: "var(--ff-pixel)",
                    fontSize: "clamp(20px, 4vw, 36px)",
                    color: "var(--accent, #fff)",
                    letterSpacing: "6px",
                    textAlign: "center",
                    animation: "glowPulse 2s infinite ease-in-out",
                }}
            >
                AKP DEV
            </div>

            {/* Pixel loading bar */}
            <div
                style={{
                    width: "240px",
                    maxWidth: "80vw",
                    height: "20px",
                    border: "3px solid var(--accent, #fff)",
                    position: "relative",
                    background: "var(--bg-secondary, #111)",
                    boxShadow: "4px 4px 0px rgba(0,0,0,0.5)",
                    overflow: "hidden",
                }}
            >
                <div
                    style={{
                        height: "100%",
                        width: ready ? "100%" : "70%",
                        background: "repeating-linear-gradient(90deg, var(--accent, #fff) 0px, var(--accent, #fff) 10px, rgba(255,255,255,0.7) 10px, rgba(255,255,255,0.7) 12px)",
                        transition: "width 0.3s steps(8)",
                        boxShadow: "inset 0 -2px 0 rgba(0,0,0,0.3)",
                        animation: ready ? "none" : "indeterminate 1.5s infinite ease-in-out",
                    }}
                />
            </div>

            {/* Loading text */}
            <div
                style={{
                    fontFamily: "var(--ff-pixel)",
                    fontSize: "10px",
                    color: "var(--text-secondary, #888)",
                    letterSpacing: "3px",
                    minWidth: "140px",
                    textAlign: "center",
                }}
            >
                {ready ? "READY!" : `LOADING${dots}`}
            </div>

            {/* Bouncing pixels */}
            <div style={{ display: "flex", gap: "8px", marginTop: "8px" }}>
                {[0, 1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        style={{
                            width: "6px",
                            height: "6px",
                            background: "var(--accent, #fff)",
                            animation: `pixelDance 0.8s ${i * 0.12}s infinite ease-in-out alternate`,
                        }}
                    />
                ))}
            </div>

            <style>{`
                @keyframes glowPulse {
                    0%, 100% { opacity: 1; text-shadow: 0 0 10px rgba(255,255,255,0.2); }
                    50% { opacity: 0.7; text-shadow: 0 0 20px rgba(255,255,255,0.4); }
                }
                @keyframes pixelDance {
                    0% { transform: translateY(0) scale(1); opacity: 0.3; }
                    100% { transform: translateY(-12px) scale(1.2); opacity: 1; }
                }
                @keyframes indeterminate {
                    0% { transform: translateX(-30%); }
                    50% { transform: translateX(0%); }
                    100% { transform: translateX(-30%); }
                }
            `}</style>
        </div>
    );
}
