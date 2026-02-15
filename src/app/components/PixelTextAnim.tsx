"use client";
import { useEffect, useState } from "react";

interface PixelTextAnimProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
}

export default function PixelTextAnim({ text, className = "", style = {} }: PixelTextAnimProps) {
    const [displayedChars, setDisplayedChars] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [scramblePhase, setScramblePhase] = useState(true);

    const pixelChars = "░▒▓█▀▄■□◆◇●○★☆";

    useEffect(() => {
        if (currentIndex >= text.length) return;

        const scrambleDuration = 80;
        const revealDelay = 40;

        if (scramblePhase) {
            // Show scrambled character first
            const scrambleTimer = setInterval(() => {
                setDisplayedChars((prev) => {
                    const updated = [...prev];
                    updated[currentIndex] = pixelChars[Math.floor(Math.random() * pixelChars.length)];
                    return updated;
                });
            }, 30);

            const revealTimer = setTimeout(() => {
                clearInterval(scrambleTimer);
                setScramblePhase(false);
            }, scrambleDuration);

            return () => {
                clearInterval(scrambleTimer);
                clearTimeout(revealTimer);
            };
        } else {
            // Reveal actual character
            setDisplayedChars((prev) => {
                const updated = [...prev];
                updated[currentIndex] = text[currentIndex];
                return updated;
            });

            const nextTimer = setTimeout(() => {
                setCurrentIndex((prev) => prev + 1);
                setScramblePhase(true);
            }, revealDelay);

            return () => clearTimeout(nextTimer);
        }
    }, [currentIndex, scramblePhase, text]);

    return (
        <span className={className} style={style}>
            {displayedChars.map((char, i) => (
                <span
                    key={i}
                    style={{
                        display: "inline-block",
                        color: i === currentIndex && scramblePhase ? "var(--text-secondary)" : "var(--text-primary)",
                        transition: "color 0.15s ease",
                        minWidth: char === " " ? "0.35em" : undefined,
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
            {currentIndex < text.length && (
                <span
                    style={{
                        display: "inline-block",
                        width: "3px",
                        height: "1em",
                        background: "var(--accent)",
                        marginLeft: "2px",
                        verticalAlign: "text-bottom",
                        animation: "blink 0.6s step-end infinite",
                    }}
                />
            )}
        </span>
    );
}
