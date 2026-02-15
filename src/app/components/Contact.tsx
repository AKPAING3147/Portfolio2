"use client";
import { useState } from "react";
import ScrollReveal from "./ScrollReveal";

export default function Contact() {

    const [formData, setFormData] = useState({ user_name: "", user_email: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState("");

    const sendEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        setSending(true);
        setError("");

        try {
            const response = await fetch('https://formsubmit.co/ajax/aungp5979@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitted(true);
                setFormData({ user_name: "", user_email: "", message: "" });
                setTimeout(() => setSubmitted(false), 5000);
            } else {
                throw new Error('Failed to send message');
            }
        } catch (err: any) {
            console.error(err);
            setError("Failed to send. Please try again later.");
        } finally {
            setSending(false);
        }
    };

    return (
        <section
            id="contact"
            className="pixel-grid"
            style={{
                padding: "100px 24px",
                maxWidth: "1000px",
                margin: "0 auto",
            }}
        >
            <ScrollReveal animation="fade-up">
                <h2 className="section-title">CONTACT</h2>
                <div className="section-divider" />
            </ScrollReveal>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                    gap: "48px",
                }}
            >
                {/* Left side - Info */}
                <ScrollReveal animation="fade-right" delay={150}>
                    <div>
                        <p
                            style={{
                                fontFamily: "var(--ff-vt)",
                                fontSize: "24px",
                                color: "var(--text-primary)",
                                lineHeight: "1.6",
                                marginBottom: "32px",
                            }}
                        >
                            Got a project in mind? Want to collaborate? Or just want to say hi?
                            Drop me a message and I&apos;ll get back to you!
                        </p>

                        {/* Contact methods */}
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "20px",
                            }}
                        >
                            {[
                                {
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <rect x="1" y="4" width="18" height="12" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                            <polyline points="1,4 10,11 19,4" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                        </svg>
                                    ),
                                    label: "EMAIL",
                                    value: "aungp5979@gmail.com",
                                },
                                {
                                    icon: (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <circle cx="10" cy="10" r="8" fill="none" stroke="currentColor" strokeWidth="1.5" />
                                            <circle cx="10" cy="10" r="3" fill="currentColor" />
                                        </svg>
                                    ),
                                    label: "LOCATION",
                                    value: "Thailand, BKK",
                                },
                            ].map((contact) => (
                                <div
                                    key={contact.label}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: "16px",
                                    }}
                                >
                                    <div className="contact-icon-box">{contact.icon}</div>
                                    <div>
                                        <p
                                            style={{
                                                fontFamily: "var(--ff-pixel)",
                                                fontSize: "8px",
                                                color: "var(--text-secondary)",
                                                marginBottom: "4px",
                                                letterSpacing: "2px",
                                            }}
                                        >
                                            {contact.label}
                                        </p>
                                        <p
                                            style={{
                                                fontFamily: "var(--ff-vt)",
                                                fontSize: "22px",
                                                color: "var(--accent)",
                                            }}
                                        >
                                            {contact.value}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Social links */}
                        <div
                            style={{
                                display: "flex",
                                gap: "12px",
                                marginTop: "32px",
                            }}
                        >
                            {[
                                { name: "GitHub", url: "https://github.com/AKPAING3147" },
                                { name: "LinkedIn", url: "#" },
                                { name: "Twitter", url: "#" },
                            ].map((social) => (
                                <a
                                    key={social.name}
                                    href={social.url}
                                    className="pixel-btn-outline"
                                    style={{
                                        fontSize: "9px",
                                        padding: "10px 16px",
                                        textDecoration: "none",
                                    }}
                                >
                                    {social.name.toUpperCase()}
                                </a>
                            ))}
                        </div>
                    </div>
                </ScrollReveal>

                {/* Right side - Form */}
                <ScrollReveal animation="fade-left" delay={300}>
                    <div
                        className="pixel-border-thin"
                        style={{
                            background: "var(--bg-card)",
                            overflow: "hidden",
                        }}
                    >
                        {/* Form header */}
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
                                message.exe
                            </span>
                        </div>

                        <form
                            onSubmit={sendEmail}
                            style={{
                                padding: "24px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "16px",
                            }}
                        >
                            <div>
                                <label
                                    style={{
                                        fontFamily: "var(--ff-pixel)",
                                        fontSize: "9px",
                                        color: "var(--text-secondary)",
                                        display: "block",
                                        marginBottom: "8px",
                                        letterSpacing: "1px",
                                    }}
                                >
                                    &gt; NAME
                                </label>
                                <input
                                    type="text"
                                    name="user_name"
                                    className="pixel-input"
                                    placeholder="Enter your name..."
                                    value={formData.user_name}
                                    onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    style={{
                                        fontFamily: "var(--ff-pixel)",
                                        fontSize: "9px",
                                        color: "var(--text-secondary)",
                                        display: "block",
                                        marginBottom: "8px",
                                        letterSpacing: "1px",
                                    }}
                                >
                                    &gt; EMAIL
                                </label>
                                <input
                                    type="email"
                                    name="user_email"
                                    className="pixel-input"
                                    placeholder="Enter your email..."
                                    value={formData.user_email}
                                    onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                                    required
                                />
                            </div>

                            <div>
                                <label
                                    style={{
                                        fontFamily: "var(--ff-pixel)",
                                        fontSize: "9px",
                                        color: "var(--text-secondary)",
                                        display: "block",
                                        marginBottom: "8px",
                                        letterSpacing: "1px",
                                    }}
                                >
                                    &gt; MESSAGE
                                </label>
                                <textarea
                                    name="message"
                                    className="pixel-input"
                                    placeholder="Type your message..."
                                    rows={5}
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    required
                                    style={{
                                        resize: "vertical",
                                        minHeight: "120px",
                                        fontFamily: "var(--ff-vt)",
                                        fontSize: "20px",
                                    }}
                                />
                            </div>

                            {error && (
                                <p style={{ color: "red", fontFamily: "var(--ff-vt)", fontSize: "16px" }}>
                                    {error}
                                </p>
                            )}

                            <button
                                type="submit"
                                className="pixel-btn"
                                style={{ width: "100%", marginTop: "8px", opacity: sending ? 0.7 : 1, cursor: sending ? "wait" : "pointer" }}
                                disabled={sending}
                            >
                                {sending ? "SENDING..." : submitted ? "✓ MESSAGE SENT!" : "SEND MESSAGE ▶"}
                            </button>

                            {submitted && (
                                <p
                                    style={{
                                        fontFamily: "var(--ff-vt)",
                                        fontSize: "18px",
                                        color: "var(--accent)",
                                        textAlign: "center",
                                    }}
                                >
                                    Thanks! I&apos;ll get back to you soon.
                                </p>
                            )}
                        </form>
                    </div>
                </ScrollReveal>
            </div >
        </section >
    );
}
