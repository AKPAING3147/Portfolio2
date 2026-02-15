import ScrollReveal from "./ScrollReveal";

export default function Education() {
    const timeline = [
        {
            year: "2019",
            title: "The Foundation",
            subtitle: "Matriculation Exam",
            location: "Myanmar",
            description:
                "Successfully passed the Matriculation Exam in Myanmar, setting the stage for a journey into technology and engineering.",
            tags: ["High School", "Foundation", "Science"],
        },
        {
            year: "2020",
            title: "Computer Science",
            subtitle: "Inet College",
            location: "Myanmar",
            description:
                "Enrolled in Inet College to study Computer Science. Drove deep into algorithms, programming structures, and web development fundamentals.",
            tags: ["Coding", "Web Dev", "Algorithms"],
        },
        {
            year: "2021",
            title: "Resilience",
            subtitle: "Persisting Through Adversity",
            location: "Myanmar",
            description:
                "A challenging year. The coup happened in Myanmar. Despite the political turmoil and internet disruptions, I persisted in my studies and remained focused on my goals.",
            tags: ["Resilience", "Self-Study", "Persistence"],
        },
        {
            year: "2024",
            title: "UCLan Graduate",
            subtitle: "BSc (Hons) Computer Science",
            location: "University of Central Lancashire",
            description:
                "Achieved a major milestone: Graduated with a Degree in Computer Science from the University of Central Lancashire (UCLan).",
            tags: ["Graduation", "BSc Hons", "Software Engineering"],
        },

    ];

    return (
        <section
            id="education"
            style={{
                padding: "100px 24px",
                maxWidth: "1000px",
                margin: "0 auto",
            }}
        >
            <ScrollReveal animation="fade-up">
                <h2 className="section-title">EDUCATION</h2>
                <div className="section-divider" />
            </ScrollReveal>

            <div style={{ paddingLeft: "16px" }}>
                {timeline.map((item, index) => (
                    <ScrollReveal key={index} animation="fade-left" delay={index * 200}>
                        <div className="timeline-item">
                            {/* Year badge */}
                            <div
                                style={{
                                    fontFamily: "var(--ff-pixel)",
                                    fontSize: "10px",
                                    color: "var(--accent)",
                                    background: "var(--bg-secondary)",
                                    padding: "4px 8px",
                                    display: "inline-block",
                                    marginBottom: "12px",
                                    border: "1px solid var(--accent)",
                                }}
                            >
                                {item.year}
                            </div>

                            {/* Title & Subtitle */}
                            <h3
                                style={{
                                    fontFamily: "var(--ff-pixel)",
                                    fontSize: "14px",
                                    color: "var(--text-primary)",
                                    marginBottom: "4px",
                                    letterSpacing: "1px",
                                }}
                            >
                                {item.title}
                            </h3>
                            <p
                                style={{
                                    fontFamily: "var(--ff-vt)",
                                    fontSize: "20px",
                                    color: "var(--accent)",
                                    marginBottom: "4px",
                                }}
                            >
                                {item.subtitle}
                            </p>

                            <p
                                style={{
                                    fontFamily: "var(--ff-pixel)",
                                    fontSize: "9px",
                                    color: "var(--text-secondary)",
                                    marginBottom: "12px",
                                    letterSpacing: "1px",
                                }}
                            >
                                📍 {item.location}
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
                                {item.description}
                            </p>

                            {/* Tags */}
                            <div
                                style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    gap: "4px",
                                }}
                            >
                                {item.tags.map((tag) => (
                                    <span key={tag} className="pixel-tag">
                                        {tag}
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
