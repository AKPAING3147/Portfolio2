"use client";
import { useState } from "react";

export default function PixelAvatar() {
    const size = 200;
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className="pixel-avatar-container"
            style={{
                width: size,
                height: size,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                borderRadius: "50%",
            }}
        >
            {/* Loading spinner */}
            {isLoading && (
                <div
                    style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "var(--bg-secondary, #111)",
                        zIndex: 2,
                        gap: "12px",
                    }}
                >
                    {/* Pixel loading animation */}
                    <div style={{ display: "flex", gap: "6px" }}>
                        {[0, 1, 2].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: "8px",
                                    height: "8px",
                                    background: "var(--accent, #fff)",
                                    animation: `pixelBounce 0.6s ${i * 0.15}s infinite ease-in-out alternate`,
                                }}
                            />
                        ))}
                    </div>
                    <p
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "8px",
                            color: "var(--text-secondary, #888)",
                            letterSpacing: "2px",
                        }}
                    >
                        LOADING
                    </p>
                    <style>{`
                        @keyframes pixelBounce {
                            0% { transform: translateY(0); opacity: 0.4; }
                            100% { transform: translateY(-8px); opacity: 1; }
                        }
                    `}</style>
                </div>
            )}

            <video
                src="/ssss.mp4"
                autoPlay
                loop
                muted
                playsInline
                onCanPlayThrough={() => setIsLoading(false)}
                onPlaying={() => setIsLoading(false)}
                style={{
                    width: "110%",
                    height: "110%",
                    objectFit: "cover",
                    imageRendering: "pixelated",
                    opacity: isLoading ? 0 : 1,
                    transition: "opacity 0.3s ease",
                }}
            />
        </div>
    );
}
