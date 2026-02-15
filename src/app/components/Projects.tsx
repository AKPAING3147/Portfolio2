"use client";
import ScrollReveal from "./ScrollReveal";

const projects = [
    {
        title: "INVENTORY SYSTEM",
        description: "A modern Inventory Management System built with Next.js, TypeScript, Prisma, and Neon. Features secure authentication, real-time tracking, and a sleek interface.",
        tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS", "NextAuth"],
        link: "https://invoice-app-akp.vercel.app/",
        github: "https://github.com/AKPAING3147",
        image: "/inventory-project.png", // Using the image you provided
    },
    {
        title: "TELEGRAM MOVIE BOT",
        description: "A powerful Telegram bot built with Next.js that allows users to search for movies using the TMDB API and share them directly to a Telegram channel with rich formatting.",
        tags: ["Next.js 14", "Telegram Bot API", "TMDB API", "TypeScript", "Webhook"],
        link: "https://t.me/WakeZawBot",
        github: "#",
        image: "/telegram-bot.png",
    },
    {
        title: "ZAW AND THAR",
        description: "A magical pixel-themed wedding invitation featuring a parallax sky background, wandering clouds, and an interactive love story timeline.",
        tags: ["Next.js", "React Spring", "Parallax", "Pixel Art", "Tailwind CSS"],
        link: "https://wedding-gamma-five.vercel.app/",
        github: "#",
        image: "/Zaw.png",
    },
];

export default function Projects() {
    return (
        <section
            id="projects"
            className="pixel-grid"
            style={{
                padding: "100px 24px",
                maxWidth: "1000px",
                margin: "0 auto",
            }}
        >
            <ScrollReveal animation="fade-up">
                <h2 className="section-title">PROJECTS</h2>
                <div className="section-divider" />
            </ScrollReveal>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "24px",
                }}
            >
                {projects.map((project, index) => (
                    <ScrollReveal
                        key={project.title}
                        animation="fade-up"
                        delay={index * 100}
                    >
                        <div className="project-card" style={{ padding: "0", overflow: "hidden" }}>
                            {/* Project Image */}
                            <div
                                style={{
                                    width: "100%",
                                    aspectRatio: "16/9",
                                    borderBottom: "2px solid var(--border-color)",
                                    position: "relative",
                                    background: "var(--bg-secondary)", // Reverted to variable
                                }}
                            >
                                {/* Image with fallback */}
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: "100%",
                                        height: "100%",
                                        objectFit: "cover",
                                        objectPosition: "top",
                                        // Optional: pixelate slightly to match theme, or keep crisp
                                        // imageRendering: "pixelated", 
                                    }}
                                    onError={(e) => {
                                        e.currentTarget.style.display = "none";
                                        // Show ASCII fallback text if image fails
                                        const fallback = e.currentTarget.parentElement?.querySelector('.ascii-fallback') as HTMLElement;
                                        if (fallback) fallback.style.display = 'flex';
                                    }}
                                />

                                {/* ASCII Fallback (hidden by default, shown if image missing) */}
                                <div
                                    className="ascii-fallback"
                                    style={{
                                        display: "none",
                                        width: "100%",
                                        height: "100%",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontFamily: "var(--ff-vt)",
                                        fontSize: "14px",
                                        color: "var(--text-secondary)",
                                        whiteSpace: "pre",
                                        textAlign: "center"
                                    }}
                                >
                                    {`┌──────────────┐
│  NO IMAGE    │
│  AVAILABLE   │
└──────────────┘`}
                                </div>
                            </div>

                            {/* Content */}
                            <div style={{ padding: "24px" }}>
                                <h3
                                    style={{
                                        fontFamily: "var(--ff-pixel)",
                                        fontSize: "14px",
                                        color: "var(--accent)",
                                        marginBottom: "12px",
                                        letterSpacing: "2px",
                                    }}
                                >
                                    ◈ {project.title}
                                </h3>
                                <p
                                    style={{
                                        fontFamily: "var(--ff-vt)",
                                        fontSize: "18px",
                                        color: "var(--text-secondary)",
                                        lineHeight: "1.5",
                                        marginBottom: "16px",
                                    }}
                                >
                                    {project.description}
                                </p>

                                {/* Tags */}
                                <div
                                    style={{
                                        display: "flex",
                                        flexWrap: "wrap",
                                        gap: "4px",
                                        marginBottom: "20px",
                                    }}
                                >
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="pixel-tag">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Links */}
                                <div style={{ display: "flex", gap: "12px" }}>
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            fontFamily: "var(--ff-pixel)",
                                            fontSize: "9px",
                                            color: "var(--accent)",
                                            textDecoration: "none",
                                            padding: "8px 16px",
                                            border: "2px solid var(--accent)",
                                            transition: "all 0.2s ease",
                                        }}
                                        onMouseOver={(e) => {
                                            e.currentTarget.style.background = "var(--accent)";
                                            e.currentTarget.style.color = "var(--bg-primary)";
                                        }}
                                        onMouseOut={(e) => {
                                            e.currentTarget.style.background = "transparent";
                                            e.currentTarget.style.color = "var(--accent)";
                                        }}
                                    >
                                        LIVE DEMO ↗
                                    </a>
                                    {/* Hidden GitHub button if URL is # */}
                                    {project.github !== "#" && (
                                        <a
                                            href={project.github}
                                            style={{
                                                fontFamily: "var(--ff-pixel)",
                                                fontSize: "9px",
                                                color: "var(--text-secondary)",
                                                textDecoration: "none",
                                                padding: "8px 16px",
                                                border: "2px solid var(--border-color)",
                                                transition: "all 0.2s ease",
                                            }}
                                            onMouseOver={(e) => {
                                                e.currentTarget.style.borderColor = "var(--accent)";
                                                e.currentTarget.style.color = "var(--accent)";
                                            }}
                                            onMouseOut={(e) => {
                                                e.currentTarget.style.borderColor = "var(--border-color)";
                                                e.currentTarget.style.color = "var(--text-secondary)";
                                            }}
                                        >
                                            CODE &lt;/&gt;
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
