"use client";
import { useEffect, useRef, useState } from "react";
import ScrollReveal from "./ScrollReveal";
import SpaceGame from "./SpaceGame";

const skills = [
    {
        category: "FRONTEND",
        items: [
            { name: "React / Next.js", level: 90 },
            { name: "TypeScript", level: 85 },
            { name: "HTML / CSS", level: 95 },
            { name: "Tailwind CSS", level: 85 },
            { name: "Three.js", level: 60 },
        ],
    },
    {
        category: "BACKEND",
        items: [
            { name: "Node.js", level: 85 },
            { name: "Python", level: 75 },
            { name: "PostgreSQL", level: 80 },
            { name: "MongoDB", level: 70 },
            { name: "REST APIs", level: 90 },
        ],
    },
    {
        category: "TOOLS",
        items: [
            { name: "Git / GitHub", level: 90 },
            { name: "Docker", level: 65 },
            { name: "Figma", level: 75 },
            { name: "Linux", level: 70 },
            { name: "CI/CD", level: 60 },
        ],
    },
];

function SkillBar({ name, level, animate }: { name: string; level: number; animate: boolean }) {
    return (
        <div style={{ marginBottom: "16px" }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "6px",
                    alignItems: "center",
                }}
            >
                <span
                    style={{
                        fontFamily: "var(--ff-vt)",
                        fontSize: "20px",
                        color: "var(--text-primary)",
                    }}
                >
                    {name}
                </span>
                <span
                    style={{
                        fontFamily: "var(--ff-pixel)",
                        fontSize: "10px",
                        color: "var(--text-secondary)",
                    }}
                >
                    {level}%
                </span>
            </div>
            <div className="skill-bar-container">
                <div
                    className="skill-bar-fill"
                    style={{
                        width: animate ? `${level}%` : "0%",
                    }}
                />
            </div>
        </div>
    );
}

export default function Skills() {
    const [animate, setAnimate] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setAnimate(true);
                }
            },
            { threshold: 0.2 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="skills"
            ref={sectionRef}
            style={{
                padding: "100px 24px",
                maxWidth: "1000px",
                margin: "0 auto",
            }}
        >
            <ScrollReveal animation="fade-up">
                <h2 className="section-title">SKILLS</h2>
                <div className="section-divider" />
            </ScrollReveal>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
                    gap: "32px",
                }}
            >
                {skills.map((category, index) => (
                    <ScrollReveal key={category.category} animation="fade-up" delay={index * 150}>
                        <div
                            className="pixel-border-thin"
                            style={{
                                padding: "24px",
                                background: "var(--bg-card)",
                            }}
                        >
                            <h3
                                style={{
                                    fontFamily: "var(--ff-pixel)",
                                    fontSize: "12px",
                                    color: "var(--accent)",
                                    marginBottom: "24px",
                                    paddingBottom: "12px",
                                    borderBottom: "2px dashed var(--border-color)",
                                    letterSpacing: "3px",
                                }}
                            >
                                ◆ {category.category}
                            </h3>
                            {category.items.map((skill) => (
                                <SkillBar key={skill.name} name={skill.name} level={skill.level} animate={animate} />
                            ))}
                        </div>
                    </ScrollReveal>
                ))}
            </div>

            {/* Tech tags */}
            <ScrollReveal animation="zoom-in" delay={400}>
                <div style={{ marginTop: "48px", textAlign: "center" }}>
                    <p
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "14px",
                            color: "var(--text-secondary)",
                            marginBottom: "24px",
                            letterSpacing: "2px",
                        }}
                    >
                        OTHER TECHNOLOGIES
                    </p>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            justifyContent: "center",
                            gap: "12px",
                        }}
                    >
                        {[
                            "Firebase", "GraphQL", "Redux", "Prisma",
                            "Jest", "Cypress", "AWS", "Vercel",
                            "Sass", "Webpack", "Vite", "Flutter",
                        ].map((tech) => (
                            <span
                                key={tech}
                                className="pixel-tag"
                                style={{
                                    fontSize: "14px",
                                    padding: "8px 16px",
                                }}
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </ScrollReveal>

            {/* Retro Space Game */}
            <ScrollReveal animation="fade-up" delay={500}>
                <SpaceGame />
            </ScrollReveal>
        </section>
    );
}
