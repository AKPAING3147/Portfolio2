"use client";
import { useState, useRef, useEffect, useCallback } from "react";

interface Track {
    title: string;
    artist: string;
    src: string;
}

const TRACKS: Track[] = [
    { title: "Вот Как То Так", artist: "Slowed", src: "/music/bg-music.mp3" },
];

export default function MusicPlayer() {
    const [isOpen, setIsOpen] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTrack, setCurrentTrack] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [bars, setBars] = useState<number[]>([3, 5, 7, 4, 6, 8, 3, 5, 7, 4, 6, 8]);


    const audioRef = useRef<HTMLAudioElement | null>(null);
    const animFrameRef = useRef<number>(0);
    const barIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Animate equalizer bars
    const animateBars = useCallback(() => {
        if (isPlaying) {
            barIntervalRef.current = setInterval(() => {
                setBars(prev =>
                    prev.map(() => Math.floor(Math.random() * 10) + 1)
                );
            }, 150);
        } else {
            if (barIntervalRef.current) {
                clearInterval(barIntervalRef.current);
            }
            setBars([3, 2, 4, 2, 3, 5, 2, 4, 3, 2, 4, 3]);
        }
    }, [isPlaying]);

    useEffect(() => {
        animateBars();
        return () => {
            if (barIntervalRef.current) clearInterval(barIntervalRef.current);
        };
    }, [animateBars]);

    // Update progress
    const updateProgress = useCallback(() => {
        if (audioRef.current) {
            const curr = audioRef.current.currentTime;
            const dur = audioRef.current.duration || 0;
            setCurrentTime(curr);
            setDuration(dur);
            setProgress(dur > 0 ? (curr / dur) * 100 : 0);
        }
        animFrameRef.current = requestAnimationFrame(updateProgress);
    }, []);

    useEffect(() => {
        animFrameRef.current = requestAnimationFrame(updateProgress);
        return () => cancelAnimationFrame(animFrameRef.current);
    }, [updateProgress]);

    // Load track
    useEffect(() => {
        if (audioRef.current) {
            const wasPlaying = isPlaying;
            audioRef.current.src = TRACKS[currentTrack].src;
            audioRef.current.volume = volume;

            if (wasPlaying) {
                audioRef.current.play().catch(() => { });
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentTrack]);

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.volume = volume;
        }
    }, [volume]);

    const togglePlay = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
            setIsPlaying(false);
        } else {
            audioRef.current.play().then(() => {
                setIsPlaying(true);
            }).catch(() => { });
        }
    };

    const nextTrack = () => {
        setCurrentTrack((prev) => (prev + 1) % TRACKS.length);
    };

    const prevTrack = () => {
        setCurrentTrack((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    };

    const selectTrack = (index: number) => {
        setCurrentTrack(index);
        setIsPlaying(true);
        setTimeout(() => {
            audioRef.current?.play().catch(() => { });
        }, 100);
    };

    const seekTo = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!audioRef.current || !duration) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const pct = x / rect.width;
        audioRef.current.currentTime = pct * duration;
    };

    const formatTime = (t: number) => {
        if (isNaN(t)) return "0:00";
        const m = Math.floor(t / 60);
        const s = Math.floor(t % 60);
        return `${m}:${s.toString().padStart(2, "0")}`;
    };

    const handleEnded = () => {
        nextTrack();
    };

    return (
        <>
            <audio
                ref={audioRef}
                onEnded={handleEnded}
                preload="metadata"
            />

            {/* Floating Music Button */}
            <button
                id="music-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    position: "fixed",
                    bottom: "24px",
                    right: "24px",
                    zIndex: 1001,
                    width: "52px",
                    height: "52px",
                    background: isPlaying ? "var(--accent)" : "var(--bg-card)",
                    color: isPlaying ? "var(--bg-primary)" : "var(--accent)",
                    border: "3px solid var(--accent)",
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    boxShadow: "4px 4px 0px 0px rgba(0,0,0,0.4)",
                    fontFamily: "var(--ff-pixel)",
                }}
                aria-label="Toggle Music Player"
            >
                {isPlaying ? (
                    /* Animated music bars icon */
                    <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "20px" }}>
                        {[0, 1, 2, 3].map((i) => (
                            <div
                                key={i}
                                style={{
                                    width: "3px",
                                    height: `${bars[i] * 2}px`,
                                    background: "currentColor",
                                    transition: "height 0.15s steps(3)",
                                }}
                            />
                        ))}
                    </div>
                ) : (
                    /* Music note icon */
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
                    </svg>
                )}
            </button>

            {/* Music Player Panel */}
            <div
                id="music-player-panel"
                style={{
                    position: "fixed",
                    bottom: "88px",
                    right: "24px",
                    zIndex: 1001,
                    width: "320px",
                    background: "var(--bg-card)",
                    border: "3px solid var(--accent)",
                    boxShadow: "8px 8px 0px 0px rgba(0,0,0,0.5)",
                    transition: "all 0.3s ease",
                    transform: isOpen ? "translateY(0) scale(1)" : "translateY(20px) scale(0.9)",
                    opacity: isOpen ? 1 : 0,
                    pointerEvents: isOpen ? "auto" : "none",
                    overflow: "hidden",
                }}
            >
                {/* Header */}
                <div
                    style={{
                        padding: "12px 16px",
                        borderBottom: "2px solid var(--border-color)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <span
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "10px",
                            color: "var(--accent)",
                            letterSpacing: "2px",
                        }}
                    >
                        ♪ MUSIC
                    </span>
                    <button
                        onClick={() => setIsOpen(false)}
                        style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--text-secondary)",
                            cursor: "pointer",
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "10px",
                        }}
                    >
                        ✕
                    </button>
                </div>

                {/* Equalizer Visualizer */}
                <div
                    style={{
                        height: "48px",
                        padding: "8px 16px",
                        display: "flex",
                        alignItems: "flex-end",
                        justifyContent: "center",
                        gap: "3px",
                        borderBottom: "2px solid var(--border-color)",
                        background: "var(--bg-secondary)",
                    }}
                >
                    {bars.map((h, i) => (
                        <div
                            key={i}
                            style={{
                                width: "6px",
                                height: `${h * 3}px`,
                                maxHeight: "32px",
                                background: isPlaying
                                    ? "var(--accent)"
                                    : "var(--border-color)",
                                transition: "height 0.15s steps(4), background 0.3s ease",
                            }}
                        />
                    ))}
                </div>

                {/* Now Playing */}
                <div style={{ padding: "16px" }}>
                    <div
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "11px",
                            color: "var(--accent)",
                            marginBottom: "4px",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {TRACKS[currentTrack].title}
                    </div>
                    <div
                        style={{
                            fontFamily: "var(--ff-vt)",
                            fontSize: "16px",
                            color: "var(--text-secondary)",
                            marginBottom: "12px",
                        }}
                    >
                        {TRACKS[currentTrack].artist}
                    </div>



                    {/* Progress Bar */}
                    <div
                        onClick={seekTo}
                        style={{
                            width: "100%",
                            height: "8px",
                            background: "var(--bg-secondary)",
                            border: "2px solid var(--border-color)",
                            cursor: "pointer",
                            marginBottom: "6px",
                            position: "relative",
                        }}
                    >
                        <div
                            style={{
                                width: `${progress}%`,
                                height: "100%",
                                background: "var(--accent)",
                                transition: "width 0.1s linear",
                            }}
                        />
                    </div>

                    {/* Time */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "8px",
                            color: "var(--text-secondary)",
                            marginBottom: "16px",
                        }}
                    >
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(duration)}</span>
                    </div>

                    {/* Controls */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: "16px",
                            marginBottom: "16px",
                        }}
                    >
                        {/* Prev */}
                        <button
                            onClick={prevTrack}
                            style={{
                                background: "transparent",
                                border: "2px solid var(--border-color)",
                                color: "var(--accent)",
                                width: "36px",
                                height: "36px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = "var(--accent)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = "var(--border-color)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            aria-label="Previous Track"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
                            </svg>
                        </button>

                        {/* Play/Pause */}
                        <button
                            onClick={togglePlay}
                            style={{
                                background: "var(--accent)",
                                color: "var(--bg-primary)",
                                border: "none",
                                width: "48px",
                                height: "48px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                boxShadow: "4px 4px 0px 0px var(--accent-dim)",
                                transition: "all 0.1s ease",
                            }}
                            onMouseDown={(e) => {
                                e.currentTarget.style.transform = "translate(2px, 2px)";
                                e.currentTarget.style.boxShadow = "2px 2px 0px 0px var(--accent-dim)";
                            }}
                            onMouseUp={(e) => {
                                e.currentTarget.style.transform = "translate(0, 0)";
                                e.currentTarget.style.boxShadow = "4px 4px 0px 0px var(--accent-dim)";
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = "translate(0, 0)";
                                e.currentTarget.style.boxShadow = "4px 4px 0px 0px var(--accent-dim)";
                            }}
                            aria-label={isPlaying ? "Pause" : "Play"}
                        >
                            {isPlaying ? (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                                </svg>
                            ) : (
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                            )}
                        </button>

                        {/* Next */}
                        <button
                            onClick={nextTrack}
                            style={{
                                background: "transparent",
                                border: "2px solid var(--border-color)",
                                color: "var(--accent)",
                                width: "36px",
                                height: "36px",
                                cursor: "pointer",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                transition: "all 0.2s ease",
                            }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.borderColor = "var(--accent)";
                                e.currentTarget.style.transform = "translateY(-2px)";
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.borderColor = "var(--border-color)";
                                e.currentTarget.style.transform = "translateY(0)";
                            }}
                            aria-label="Next Track"
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
                            </svg>
                        </button>
                    </div>

                    {/* Volume */}
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            marginBottom: "16px",
                        }}
                    >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="var(--text-secondary)">
                            <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
                        </svg>
                        <div
                            style={{
                                flex: 1,
                                height: "6px",
                                background: "var(--bg-secondary)",
                                border: "1px solid var(--border-color)",
                                position: "relative",
                                cursor: "pointer",
                            }}
                            onClick={(e) => {
                                const rect = e.currentTarget.getBoundingClientRect();
                                const x = e.clientX - rect.left;
                                const pct = Math.max(0, Math.min(1, x / rect.width));
                                setVolume(pct);
                            }}
                        >
                            <div
                                style={{
                                    width: `${volume * 100}%`,
                                    height: "100%",
                                    background: "var(--accent)",
                                }}
                            />
                        </div>
                        <span
                            style={{
                                fontFamily: "var(--ff-pixel)",
                                fontSize: "8px",
                                color: "var(--text-secondary)",
                                minWidth: "28px",
                                textAlign: "right",
                            }}
                        >
                            {Math.round(volume * 100)}%
                        </span>
                    </div>

                    {/* Track List Divider */}
                    <div
                        style={{
                            width: "100%",
                            height: "2px",
                            background: "repeating-linear-gradient(90deg, var(--border-color) 0px, var(--border-color) 6px, transparent 6px, transparent 12px)",
                            marginBottom: "12px",
                        }}
                    />

                    {/* Track List Label */}
                    <div
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "8px",
                            color: "var(--text-secondary)",
                            letterSpacing: "2px",
                            marginBottom: "8px",
                        }}
                    >
                        PLAYLIST
                    </div>

                    {/* Track List */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                        {TRACKS.map((track, i) => (
                            <button
                                key={i}
                                onClick={() => selectTrack(i)}
                                style={{
                                    background:
                                        i === currentTrack
                                            ? "var(--accent)"
                                            : "transparent",
                                    color:
                                        i === currentTrack
                                            ? "var(--bg-primary)"
                                            : "var(--text-secondary)",
                                    border: "2px solid",
                                    borderColor:
                                        i === currentTrack
                                            ? "var(--accent)"
                                            : "var(--border-color)",
                                    padding: "8px 12px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "10px",
                                    transition: "all 0.2s ease",
                                    textAlign: "left",
                                    width: "100%",
                                }}
                                onMouseOver={(e) => {
                                    if (i !== currentTrack) {
                                        e.currentTarget.style.borderColor = "var(--accent)";
                                        e.currentTarget.style.color = "var(--accent)";
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (i !== currentTrack) {
                                        e.currentTarget.style.borderColor = "var(--border-color)";
                                        e.currentTarget.style.color = "var(--text-secondary)";
                                    }
                                }}
                            >
                                <span
                                    style={{
                                        fontFamily: "var(--ff-pixel)",
                                        fontSize: "9px",
                                        minWidth: "16px",
                                    }}
                                >
                                    {i === currentTrack && isPlaying ? "►" : `${i + 1}.`}
                                </span>
                                <div>
                                    <div
                                        style={{
                                            fontFamily: "var(--ff-pixel)",
                                            fontSize: "9px",
                                            marginBottom: "2px",
                                        }}
                                    >
                                        {track.title}
                                    </div>
                                    <div
                                        style={{
                                            fontFamily: "var(--ff-vt)",
                                            fontSize: "14px",
                                            opacity: 0.7,
                                        }}
                                    >
                                        {track.artist}
                                    </div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
