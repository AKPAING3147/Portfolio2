"use client";
import { useEffect, useRef, useState, ReactNode } from "react";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "zoom-in" | "pixel-reveal" | "glitch-in";

interface ScrollRevealProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    threshold?: number;
    className?: string;
    style?: React.CSSProperties;
}

export default function ScrollReveal({
    children,
    animation = "fade-up",
    delay = 0,
    duration = 600,
    threshold = 0.15,
    className = "",
    style = {},
}: ScrollRevealProps) {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            { threshold }
        );

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => observer.disconnect();
    }, [threshold]);

    const getAnimationClass = (anim: string) => {
        switch (anim) {
            case "fade-up": return "animate-fade-up";
            case "fade-left": return "animate-fade-left";
            case "zoom-in": return "animate-zoom-in";
            case "pixel-reveal": return "animate-pixel-reveal";
            default: return "animate-fade-up";
        }
    };

    return (
        <div
            ref={ref}
            className={`${className} animate-on-scroll ${getAnimationClass(animation)} ${isVisible ? "is-visible" : ""}`}
            style={{
                transitionDelay: `${delay}ms`,
                transitionDuration: `${duration}ms`,
                ...style
            }}
        >
            {children}
        </div>
    );
}
