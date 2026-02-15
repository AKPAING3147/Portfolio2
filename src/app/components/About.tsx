import ScrollReveal from "./ScrollReveal";

export default function About() {
    return (
        <section
            id="about"
            style={{
                padding: "100px 24px",
                maxWidth: "1000px",
                margin: "0 auto",
            }}
        >
            <ScrollReveal animation="fade-up">
                <h2 className="section-title">ABOUT ME</h2>
                <div className="section-divider" />
            </ScrollReveal>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr",
                    gap: "48px",
                }}
            >
                {/* Terminal-style about */}
                <ScrollReveal animation="fade-up" delay={100}>
                    <div
                        className="pixel-border-thin"
                        style={{
                            background: "var(--bg-card)",
                            overflow: "hidden",
                        }}
                    >
                        {/* Terminal header */}
                        <div
                            style={{
                                padding: "10px 16px",
                                borderBottom: "2px solid var(--border-color)",
                                display: "flex",
                                alignItems: "center",
                                gap: "8px",
                                background: "var(--bg-secondary)",
                            }}
                        >
                            <div style={{ width: "8px", height: "8px", background: "var(--text-secondary)" }} />
                            <div style={{ width: "8px", height: "8px", background: "var(--text-secondary)" }} />
                            <div style={{ width: "8px", height: "8px", background: "var(--text-secondary)" }} />
                            <span
                                style={{
                                    fontFamily: "var(--ff-pixel)",
                                    fontSize: "8px",
                                    color: "var(--text-secondary)",
                                    marginLeft: "8px",
                                }}
                            >
                                about.exe
                            </span>
                        </div>

                        {/* Terminal content */}
                        <div
                            style={{
                                padding: "24px",
                                fontFamily: "var(--ff-vt)",
                                fontSize: "20px",
                                lineHeight: "1.8",
                                color: "var(--text-primary)",
                            }}
                        >
                            <p style={{ color: "var(--text-secondary)", marginBottom: "16px" }}>
                                <span style={{ color: "var(--accent)" }}>$</span> cat about.txt
                            </p>
                            <p style={{ marginBottom: "16px" }}>
                                Hi there! I&apos;m a passionate <span style={{ color: "var(--accent)" }}>full-stack developer</span> who
                                loves building creative digital experiences. With a strong foundation in both
                                front-end and back-end technologies, I bring ideas to life through clean code
                                .
                            </p>
                            <p style={{ marginBottom: "16px" }}>
                                My journey started with a curiosity for how things work on the web, and it has
                                evolved into a deep passion for crafting <span style={{ color: "var(--accent)" }}>user-friendly applications</span> that
                                make a real impact.
                            </p>
                            <p style={{ marginBottom: "24px" }}>
                                When I&apos;m not coding, you&apos;ll find me exploring retro games or contributing to open-source projects.
                            </p>
                            <p style={{ color: "var(--text-secondary)" }}>
                                <span style={{ color: "var(--accent)" }}>$</span> _
                                <span className="blink-cursor" />
                            </p>
                        </div>
                    </div>
                </ScrollReveal>

                {/* Info cards grid */}
                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {[
                        { icon: "📍", label: "Location", value: "Thailand, BKK" },
                        { icon: "🎓", label: "Education", value: "Computer Science" },
                        { icon: "💼", label: "Status", value: "Open to Work" },
                        { icon: "🌐", label: "Languages", value: "EN / MY" },
                    ].map((item, index) => (
                        <ScrollReveal key={item.label} animation="zoom-in" delay={200 + index * 100}>
                            <div
                                className="pixel-border-thin"
                                style={{
                                    padding: "20px",
                                    background: "var(--bg-card)",
                                    textAlign: "center",
                                    transition: "all 0.3s ease",
                                }}
                            >
                                <div style={{ fontSize: "28px", marginBottom: "8px" }}>{item.icon}</div>
                                <p
                                    style={{
                                        fontFamily: "var(--ff-pixel)",
                                        fontSize: "8px",
                                        color: "var(--text-secondary)",
                                        marginBottom: "8px",
                                        textTransform: "uppercase",
                                        letterSpacing: "2px",
                                    }}
                                >
                                    {item.label}
                                </p>
                                <p
                                    style={{
                                        fontFamily: "var(--ff-vt)",
                                        fontSize: "20px",
                                        color: "var(--accent)",
                                    }}
                                >
                                    {item.value}
                                </p>
                            </div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
