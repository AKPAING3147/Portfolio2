import ScrollReveal from "./ScrollReveal";

export default function Experience() {
    const experiences = [
        {
            title: "Senior Frontend Developer",
            company: "Tech Corp",
            period: "2023 - Present",
            description:
                "Leading frontend development using React and Next.js. Building scalable design systems and mentoring junior developers.",
            technologies: ["React", "Next.js", "TypeScript", "GraphQL"],
        },
        {
            title: "Full-Stack Developer",
            company: "Digital Agency",
            period: "2021 - 2023",
            description:
                "Developed web applications for various clients. Worked with both frontend and backend technologies to deliver complete solutions.",
            technologies: ["Node.js", "React", "PostgreSQL", "AWS"],
        },
        {
            title: "Junior Web Developer",
            company: "Startup Inc.",
            period: "2020 - 2021",
            description:
                "Started my professional journey building responsive websites and learning best practices in web development.",
            technologies: ["HTML/CSS", "JavaScript", "PHP", "MySQL"],
        },
    ];

    return (
        <section
            id="experience"
            style={{
                padding: "100px 24px",
                maxWidth: "1000px",
                margin: "0 auto",
            }}
        >
            <ScrollReveal animation="fade-up">
                <h2 className="section-title">EXPERIENCE</h2>
                <div className="section-divider" />
            </ScrollReveal>

            <div style={{ paddingLeft: "16px" }}>
                {experiences.map((exp, index) => (
                    <ScrollReveal key={index} animation="fade-left" delay={index * 200}>
                        <div className="timeline-item">
                            {/* Period badge */}
                            <div
                                style={{
                                    fontFamily: "var(--ff-pixel)",
                                    fontSize: "9px",
                                    color: "var(--text-secondary)",
                                    marginBottom: "8px",
                                    letterSpacing: "2px",
                                }}
                            >
                                ◇ {exp.period}
                            </div>

                            {/* Title & Company */}
                            <h3
                                style={{
                                    fontFamily: "var(--ff-pixel)",
                                    fontSize: "13px",
                                    color: "var(--accent)",
                                    marginBottom: "4px",
                                    letterSpacing: "1px",
                                }}
                            >
                                {exp.title}
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--ff-vt)",
                                    fontSize: "22px",
                                    color: "var(--text-secondary)",
                                    marginBottom: "12px",
                                }}
                            >
                                @ {exp.company}
                            </p>

                            {/* Description */}
                            <p
                                style={{
                                    fontFamily: "var(--ff-vt)",
                                    fontSize: "20px",
                                    color: "var(--text-primary)",
                                    lineHeight: "1.6",
                                    marginBottom: "16px",
                                    maxWidth: "600px",
                                }}
                            >
                                {exp.description}
                            </p>

                            {/* Technologies */}
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "4px",
                                }}
                            >
                                {exp.technologies.map((tech) => (
                                    <span key={tech} className="pixel-tag">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </ScrollReveal>
                ))}
            </div>
        </section>
    );
}
