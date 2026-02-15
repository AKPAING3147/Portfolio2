"use client";

export default function Footer() {
    return (
        <footer
            className="footer-pixel"
            style={{
                padding: "40px 24px",
                textAlign: "center",
            }}
        >
            <div
                style={{
                    maxWidth: "1000px",
                    margin: "0 auto",
                }}
            >
                {/* Pixel art divider */}
                <div
                    style={{
                        fontFamily: "var(--ff-vt)",
                        fontSize: "14px",
                        color: "var(--border-color)",
                        marginBottom: "24px",
                        letterSpacing: "4px",
                    }}
                >
                    ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪ ▪
                </div>

                {/* Logo */}
                <p
                    style={{
                        fontFamily: "var(--ff-pixel)",
                        fontSize: "16px",
                        color: "var(--accent)",
                        marginBottom: "12px",
                        letterSpacing: "3px",
                    }}
                >
                    <span style={{ color: "var(--text-secondary)" }}>&lt;</span>
                    AKP DEV
                    <span style={{ color: "var(--text-secondary)" }}>/&gt;</span>
                </p>

                {/* Tagline */}
                <p
                    style={{
                        fontFamily: "var(--ff-vt)",
                        fontSize: "18px",
                        color: "var(--text-secondary)",
                        marginBottom: "24px",
                    }}
                >
                    Crafting digital experiences, one pixel at a time.
                </p>

                {/* Nav links */}
                <div
                    style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "24px",
                        flexWrap: "wrap",
                        marginBottom: "32px",
                    }}
                >
                    {["Home", "About", "Skills", "Projects", "Education", "Contact"].map((item) => (
                        <a
                            key={item}
                            href={`#${item.toLowerCase()}`}
                            style={{
                                fontFamily: "var(--ff-pixel)",
                                fontSize: "8px",
                                color: "var(--text-secondary)",
                                textDecoration: "none",
                                transition: "color 0.2s ease",
                                letterSpacing: "1px",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.color = "var(--accent)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.color = "var(--text-secondary)";
                            }}
                        >
                            {item.toUpperCase()}
                        </a>
                    ))}
                </div>

                {/* Copyright */}
                <p
                    style={{
                        fontFamily: "var(--ff-pixel)",
                        fontSize: "8px",
                        color: "var(--text-secondary)",
                        letterSpacing: "1px",
                    }}
                >
                    © 2026 AKP DEV. ALL RIGHTS RESERVED.
                </p>

                {/* Easter egg */}
                <p
                    style={{
                        fontFamily: "var(--ff-vt)",
                        fontSize: "14px",
                        color: "var(--accent-dim)",
                        marginTop: "16px",
                    }}
                >
                    ↑ ↑ ↓ ↓ ← → ← → B A
                </p>
            </div>
        </footer>
    );
}
