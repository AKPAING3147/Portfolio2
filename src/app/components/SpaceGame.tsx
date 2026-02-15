"use client";
import { useRef, useEffect, useState, useCallback } from "react";

interface Star {
    x: number;
    y: number;
    speed: number;
    size: number;
}

interface Asteroid {
    x: number;
    y: number;
    size: number;
    speed: number;
    rotation: number;
    rotSpeed: number;
}

interface Bullet {
    x: number;
    y: number;
    speed: number;
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
    size: number;
}

interface Collectible {
    x: number;
    y: number;
    speed: number;
    pulse: number;
}

export default function SpaceGame() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const gameLoopRef = useRef<number>(0);
    const keysRef = useRef<Set<string>>(new Set());
    const [score, setScore] = useState(0);
    const [highScore, setHighScore] = useState(0);
    const [gameOver, setGameOver] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [lives, setLives] = useState(3);
    const isHoveredRef = useRef(false);
    const hasInitRef = useRef(false);
    const gameStateRef = useRef({
        ship: { x: 0, y: 0, width: 20, height: 24, invincible: 0 },
        stars: [] as Star[],
        asteroids: [] as Asteroid[],
        bullets: [] as Bullet[],
        particles: [] as Particle[],
        collectibles: [] as Collectible[],
        score: 0,
        lives: 3,
        frame: 0,
        difficulty: 1,
        gameOver: false,
        lastShot: 0,
    });

    const CANVAS_W = 400;
    const CANVAS_H = 300;

    const drawPixelShip = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, flash: boolean) => {
        const color = flash ? "#888" : "#fff";
        const accent = flash ? "#555" : "#aaa";
        ctx.fillStyle = color;

        // Ship body (pixel art) — nose
        ctx.fillRect(x + 8, y, 4, 4);
        // Upper body
        ctx.fillRect(x + 6, y + 4, 8, 4);
        // Middle body
        ctx.fillRect(x + 4, y + 8, 12, 4);
        // Lower body
        ctx.fillRect(x + 2, y + 12, 16, 4);
        // Wings
        ctx.fillRect(x, y + 16, 20, 4);
        // Engine
        ctx.fillStyle = accent;
        ctx.fillRect(x + 2, y + 20, 4, 4);
        ctx.fillRect(x + 14, y + 20, 4, 4);

        // Engine glow
        if (Math.random() > 0.3 && !flash) {
            ctx.fillStyle = "#fff";
            ctx.fillRect(x + 3, y + 24, 2, 2 + Math.floor(Math.random() * 4));
            ctx.fillRect(x + 15, y + 24, 2, 2 + Math.floor(Math.random() * 4));
        }

        // Cockpit
        ctx.fillStyle = flash ? "#666" : "#ccc";
        ctx.fillRect(x + 8, y + 6, 4, 4);
    }, []);

    const drawPixelAsteroid = useCallback((ctx: CanvasRenderingContext2D, x: number, y: number, size: number) => {
        ctx.fillStyle = "#888";
        const s = size;
        // Rough pixel asteroid shape
        ctx.fillRect(x + s * 0.2, y, s * 0.6, s * 0.2);
        ctx.fillRect(x, y + s * 0.2, s, s * 0.6);
        ctx.fillRect(x + s * 0.2, y + s * 0.8, s * 0.6, s * 0.2);
        // Detail
        ctx.fillStyle = "#666";
        ctx.fillRect(x + s * 0.3, y + s * 0.3, s * 0.2, s * 0.2);
        ctx.fillRect(x + s * 0.6, y + s * 0.5, s * 0.15, s * 0.15);
    }, []);

    const restartRequestRef = useRef(false);

    const initGame = useCallback(() => {
        const gs = gameStateRef.current;
        gs.ship = { x: CANVAS_W / 2 - 10, y: CANVAS_H - 50, width: 20, height: 24, invincible: 120 };
        gs.stars = [];
        gs.asteroids = [];
        gs.bullets = [];
        gs.particles = [];
        gs.collectibles = [];
        gs.score = 0;
        gs.lives = 3;
        gs.frame = 0;
        gs.difficulty = 1;
        gs.gameOver = false;
        gs.lastShot = 0;

        // Init stars
        for (let i = 0; i < 50; i++) {
            gs.stars.push({
                x: Math.random() * CANVAS_W,
                y: Math.random() * CANVAS_H,
                speed: 0.5 + Math.random() * 2,
                size: Math.random() > 0.7 ? 2 : 1,
            });
        }

        setScore(0);
        setLives(3);
        setGameOver(false);
    }, []);

    const startGame = useCallback(() => {
        initGame();
    }, [initGame]);

    const gameLoop = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const gs = gameStateRef.current;

        // Handle restart request
        if (restartRequestRef.current) {
            restartRequestRef.current = false;
            gs.ship = { x: CANVAS_W / 2 - 10, y: CANVAS_H - 50, width: 20, height: 24, invincible: 120 };
            gs.asteroids = [];
            gs.bullets = [];
            gs.particles = [];
            gs.collectibles = [];
            gs.score = 0;
            gs.lives = 3;
            gs.frame = 0;
            gs.difficulty = 1;
            gs.gameOver = false;
            gs.lastShot = 0;
            gs.stars = [];
            for (let i = 0; i < 50; i++) {
                gs.stars.push({
                    x: Math.random() * CANVAS_W,
                    y: Math.random() * CANVAS_H,
                    speed: 0.5 + Math.random() * 2,
                    size: Math.random() > 0.7 ? 2 : 1,
                });
            }
            setScore(0);
            setLives(3);
            setGameOver(false);
        }

        // If game over, just keep drawing the game over screen
        if (gs.gameOver) {
            // Draw background
            ctx.fillStyle = "#0a0a0a";
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
            // Draw stars still moving
            gs.stars.forEach((star) => {
                star.y += star.speed * 0.3;
                if (star.y > CANVAS_H) {
                    star.y = 0;
                    star.x = Math.random() * CANVAS_W;
                }
                const brightness = star.speed > 1.5 ? "#555" : "#333";
                ctx.fillStyle = brightness;
                ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
            });
            // Draw particles fading
            gs.particles = gs.particles.filter((p) => {
                p.x += p.vx;
                p.y += p.vy;
                p.life--;
                return p.life > 0;
            });
            gs.particles.forEach((p) => {
                const alpha = p.life / p.maxLife;
                ctx.globalAlpha = alpha;
                ctx.fillStyle = "#fff";
                ctx.fillRect(Math.floor(p.x), Math.floor(p.y), Math.floor(p.size), Math.floor(p.size));
            });
            ctx.globalAlpha = 1;
            // Game over overlay
            ctx.fillStyle = "rgba(0,0,0,0.7)";
            ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);
            ctx.fillStyle = "#fff";
            ctx.font = "16px 'Press Start 2P', monospace";
            ctx.textAlign = "center";
            ctx.fillText("GAME OVER", CANVAS_W / 2, CANVAS_H / 2 - 20);
            ctx.font = "10px 'Press Start 2P', monospace";
            ctx.fillText(`SCORE: ${gs.score}`, CANVAS_W / 2, CANVAS_H / 2 + 10);
            // Blinking text
            if (Math.floor(gs.frame / 30) % 2 === 0) {
                ctx.fillText("PRESS ENTER TO RETRY", CANVAS_W / 2, CANVAS_H / 2 + 40);
            }
            ctx.textAlign = "left";
            gs.frame++;
            gameLoopRef.current = requestAnimationFrame(gameLoop);
            return;
        }

        gs.frame++;
        const keys = keysRef.current;
        const hovered = isHoveredRef.current;

        // Ship movement — only when hovered
        if (hovered) {
            const speed = 4;
            if ((keys.has("ArrowLeft") || keys.has("a")) && gs.ship.x > 0) gs.ship.x -= speed;
            if ((keys.has("ArrowRight") || keys.has("d")) && gs.ship.x < CANVAS_W - gs.ship.width) gs.ship.x += speed;
            if ((keys.has("ArrowUp") || keys.has("w")) && gs.ship.y > 0) gs.ship.y -= speed;
            if ((keys.has("ArrowDown") || keys.has("s")) && gs.ship.y < CANVAS_H - gs.ship.height) gs.ship.y += speed;

            // Shooting
            if (keys.has(" ") && gs.frame - gs.lastShot > 8) {
                gs.bullets.push({ x: gs.ship.x + gs.ship.width / 2 - 1, y: gs.ship.y, speed: 6 });
                gs.lastShot = gs.frame;
            }

            // Invincibility countdown
            if (gs.ship.invincible > 0) gs.ship.invincible--;
        }

        // Update difficulty
        gs.difficulty = 1 + Math.floor(gs.score / 200) * 0.3;

        // Spawn asteroids
        if (gs.frame % Math.max(20, 50 - Math.floor(gs.difficulty * 5)) === 0) {
            gs.asteroids.push({
                x: Math.random() * (CANVAS_W - 24),
                y: -30,
                size: 16 + Math.random() * 20,
                speed: 1 + Math.random() * 2 * (hovered ? gs.difficulty : 1),
                rotation: 0,
                rotSpeed: (Math.random() - 0.5) * 0.1,
            });
        }

        // Spawn collectibles — only when hovered
        if (hovered && gs.frame % 180 === 0) {
            gs.collectibles.push({
                x: Math.random() * (CANVAS_W - 12),
                y: -12,
                speed: 1.5,
                pulse: 0,
            });
        }

        // Update stars
        gs.stars.forEach((star) => {
            star.y += star.speed;
            if (star.y > CANVAS_H) {
                star.y = 0;
                star.x = Math.random() * CANVAS_W;
            }
        });

        // Update bullets
        gs.bullets = gs.bullets.filter((b) => {
            b.y -= b.speed;
            return b.y > -4;
        });

        // Update asteroids
        gs.asteroids = gs.asteroids.filter((a) => {
            a.y += a.speed;
            a.rotation += a.rotSpeed;
            return a.y < CANVAS_H + 40;
        });

        // Update collectibles
        gs.collectibles = gs.collectibles.filter((c) => {
            c.y += c.speed;
            c.pulse += 0.1;
            return c.y < CANVAS_H + 12;
        });

        // Update particles
        gs.particles = gs.particles.filter((p) => {
            p.x += p.vx;
            p.y += p.vy;
            p.life--;
            return p.life > 0;
        });

        // === Collisions only when hovered ===
        if (hovered) {
            // Bullet-asteroid collisions
            gs.bullets.forEach((bullet) => {
                gs.asteroids = gs.asteroids.filter((ast) => {
                    const hit =
                        bullet.x > ast.x &&
                        bullet.x < ast.x + ast.size &&
                        bullet.y > ast.y &&
                        bullet.y < ast.y + ast.size;
                    if (hit) {
                        gs.score += 10;
                        setScore(gs.score);
                        for (let i = 0; i < 6; i++) {
                            gs.particles.push({
                                x: ast.x + ast.size / 2,
                                y: ast.y + ast.size / 2,
                                vx: (Math.random() - 0.5) * 4,
                                vy: (Math.random() - 0.5) * 4,
                                life: 15 + Math.random() * 10,
                                maxLife: 25,
                                size: 2 + Math.random() * 3,
                            });
                        }
                        bullet.y = -10;
                    }
                    return !hit;
                });
            });

            // Ship-asteroid collision
            if (gs.ship.invincible <= 0) {
                gs.asteroids.forEach((ast) => {
                    const shipCX = gs.ship.x + gs.ship.width / 2;
                    const shipCY = gs.ship.y + gs.ship.height / 2;
                    const astCX = ast.x + ast.size / 2;
                    const astCY = ast.y + ast.size / 2;
                    const dist = Math.hypot(shipCX - astCX, shipCY - astCY);
                    if (dist < (gs.ship.width / 2 + ast.size / 2) * 0.7) {
                        gs.lives--;
                        setLives(gs.lives);
                        gs.ship.invincible = 90;
                        for (let i = 0; i < 12; i++) {
                            gs.particles.push({
                                x: shipCX,
                                y: shipCY,
                                vx: (Math.random() - 0.5) * 6,
                                vy: (Math.random() - 0.5) * 6,
                                life: 20 + Math.random() * 15,
                                maxLife: 35,
                                size: 3,
                            });
                        }
                        if (gs.lives <= 0) {
                            gs.gameOver = true;
                            setGameOver(true);
                            setHighScore((prev) => Math.max(prev, gs.score));
                        }
                    }
                });
            }

            // Ship-collectible collision
            gs.collectibles = gs.collectibles.filter((c) => {
                const hit =
                    gs.ship.x < c.x + 10 &&
                    gs.ship.x + gs.ship.width > c.x &&
                    gs.ship.y < c.y + 10 &&
                    gs.ship.y + gs.ship.height > c.y;
                if (hit) {
                    gs.score += 50;
                    setScore(gs.score);
                    for (let i = 0; i < 8; i++) {
                        gs.particles.push({
                            x: c.x + 5,
                            y: c.y + 5,
                            vx: (Math.random() - 0.5) * 3,
                            vy: (Math.random() - 0.5) * 3,
                            life: 20,
                            maxLife: 20,
                            size: 2,
                        });
                    }
                }
                return !hit;
            });
        }

        // === DRAW ===
        ctx.fillStyle = "#0a0a0a";
        ctx.fillRect(0, 0, CANVAS_W, CANVAS_H);

        // Draw stars
        gs.stars.forEach((star) => {
            const brightness = star.speed > 1.5 ? "#555" : "#333";
            ctx.fillStyle = brightness;
            ctx.fillRect(Math.floor(star.x), Math.floor(star.y), star.size, star.size);
        });

        // Draw bullets
        ctx.fillStyle = "#fff";
        gs.bullets.forEach((b) => {
            ctx.fillRect(Math.floor(b.x), Math.floor(b.y), 2, 6);
        });

        // Draw asteroids
        gs.asteroids.forEach((a) => {
            drawPixelAsteroid(ctx, Math.floor(a.x), Math.floor(a.y), Math.floor(a.size));
        });

        // Draw collectibles (pulsing star)
        gs.collectibles.forEach((c) => {
            const pulse = Math.sin(c.pulse) * 0.3 + 0.7;
            ctx.globalAlpha = pulse;
            ctx.fillStyle = "#fff";
            ctx.fillRect(Math.floor(c.x + 3), Math.floor(c.y), 4, 2);
            ctx.fillRect(Math.floor(c.x), Math.floor(c.y + 3), 10, 4);
            ctx.fillRect(Math.floor(c.x + 3), Math.floor(c.y + 8), 4, 2);
            ctx.fillRect(Math.floor(c.x + 1), Math.floor(c.y + 1), 2, 2);
            ctx.fillRect(Math.floor(c.x + 7), Math.floor(c.y + 1), 2, 2);
            ctx.fillRect(Math.floor(c.x + 1), Math.floor(c.y + 7), 2, 2);
            ctx.fillRect(Math.floor(c.x + 7), Math.floor(c.y + 7), 2, 2);
            ctx.globalAlpha = 1;
        });

        // Draw particles
        gs.particles.forEach((p) => {
            const alpha = p.life / p.maxLife;
            ctx.globalAlpha = alpha;
            ctx.fillStyle = "#fff";
            ctx.fillRect(Math.floor(p.x), Math.floor(p.y), Math.floor(p.size), Math.floor(p.size));
        });
        ctx.globalAlpha = 1;

        // Draw ship
        if (gs.ship.invincible <= 0 || Math.floor(gs.frame / 4) % 2 === 0) {
            drawPixelShip(ctx, Math.floor(gs.ship.x), Math.floor(gs.ship.y), gs.ship.invincible > 0);
        }

        // HUD
        ctx.fillStyle = "#fff";
        ctx.font = "10px 'Press Start 2P', monospace";
        ctx.fillText(`SCORE ${gs.score}`, 8, 16);

        // Lives display
        for (let i = 0; i < gs.lives; i++) {
            ctx.fillStyle = "#fff";
            ctx.fillRect(CANVAS_W - 20 - i * 16, 8, 4, 4);
            ctx.fillRect(CANVAS_W - 22 - i * 16, 12, 8, 4);
            ctx.fillRect(CANVAS_W - 24 - i * 16, 16, 12, 2);
        }

        gameLoopRef.current = requestAnimationFrame(gameLoop);
    }, [drawPixelShip, drawPixelAsteroid]);

    // Auto-init game on mount
    useEffect(() => {
        if (!hasInitRef.current) {
            hasInitRef.current = true;
            initGame();
        }
    }, [initGame]);

    // Always run the game loop
    useEffect(() => {
        gameLoopRef.current = requestAnimationFrame(gameLoop);
        return () => {
            cancelAnimationFrame(gameLoopRef.current);
        };
    }, [gameLoop]);

    // Keyboard listeners — always attached but game only responds when hovered
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isHoveredRef.current) return;
            keysRef.current.add(e.key);
            if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " "].includes(e.key)) {
                e.preventDefault();
            }
            if (e.key === "Enter" && gameStateRef.current.gameOver) {
                restartRequestRef.current = true;
            }
        };
        const handleKeyUp = (e: KeyboardEvent) => {
            keysRef.current.delete(e.key);
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, []);


    const handleMouseEnter = useCallback(() => {
        isHoveredRef.current = true;
        setIsHovered(true);
        canvasRef.current?.focus();
    }, []);

    const handleMouseLeave = useCallback(() => {
        isHoveredRef.current = false;
        setIsHovered(false);
        keysRef.current.clear();
    }, []);

    const handleTouchStart = useCallback(() => {
        if (!isHoveredRef.current) {
            isHoveredRef.current = true;
            setIsHovered(true);
        }
        if (gameStateRef.current.gameOver) {
            restartRequestRef.current = true;
        }
    }, []);

    // Mobile touch button helpers
    const touchKey = useCallback((key: string, pressed: boolean) => {
        if (pressed) {
            isHoveredRef.current = true;
            setIsHovered(true);
            keysRef.current.add(key);
        } else {
            keysRef.current.delete(key);
        }
    }, []);

    const btnStyle: React.CSSProperties = {
        width: 48,
        height: 48,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--bg-secondary, rgba(128,128,128,0.1))",
        border: "2px solid var(--border-color)",
        color: "var(--text-primary)",
        fontFamily: "var(--ff-pixel)",
        fontSize: "14px",
        userSelect: "none",
        WebkitUserSelect: "none",
        touchAction: "none",
    };

    return (
        <div
            style={{
                marginTop: "48px",
                textAlign: "center",
            }}
        >

            <div
                ref={containerRef}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={{
                    display: "inline-block",
                    border: `3px solid ${isHovered ? "var(--accent)" : "var(--border-color)"}`,
                    boxShadow: isHovered ? "8px 8px 0px 0px rgba(0,0,0,0.5)" : "4px 4px 0px 0px rgba(0,0,0,0.3)",
                    position: "relative",
                    background: "#0a0a0a",
                    transition: "border-color 0.3s, box-shadow 0.3s",
                    maxWidth: "100%",
                }}
            >
                <canvas
                    ref={canvasRef}
                    width={CANVAS_W}
                    height={CANVAS_H}
                    onTouchStart={handleTouchStart}
                    style={{
                        display: "block",
                        imageRendering: "pixelated",
                        maxWidth: "100%",
                        height: "auto",
                    }}
                    tabIndex={0}
                />

                {/* Hint overlay — desktop */}
                {!isHovered && !gameOver && (
                    <div
                        className="game-desktop-hint"
                        style={{
                            position: "absolute",
                            bottom: "12px",
                            left: "50%",
                            transform: "translateX(-50%)",
                            pointerEvents: "none",
                        }}
                    >
                        <span
                            style={{
                                fontFamily: "var(--ff-pixel)",
                                fontSize: "8px",
                                color: "rgba(255,255,255,0.5)",
                                letterSpacing: "1px",
                            }}
                        >
                            HOVER TO PLAY
                        </span>
                    </div>
                )}

                {/* START button — mobile only */}
                {!isHovered && !gameOver && (
                    <div
                        className="game-mobile-start"
                        style={{
                            position: "absolute",
                            inset: 0,
                            display: "none",
                            alignItems: "center",
                            justifyContent: "center",
                            background: "rgba(0,0,0,0.5)",
                        }}
                    >
                        <button
                            onClick={() => {
                                isHoveredRef.current = true;
                                setIsHovered(true);
                            }}
                            style={{
                                fontFamily: "var(--ff-pixel)",
                                fontSize: "12px",
                                color: "#fff",
                                background: "transparent",
                                border: "2px solid #fff",
                                padding: "12px 32px",
                                cursor: "pointer",
                                letterSpacing: "2px",
                            }}
                        >
                            ► START
                        </button>
                    </div>
                )}
            </div>

            {/* Desktop Controls */}
            <div
                className="game-desktop-controls"
                style={{
                    marginTop: "16px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "24px",
                    flexWrap: "wrap",
                    opacity: isHovered ? 1 : 0.4,
                    transition: "opacity 0.3s",
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "8px",
                            color: "var(--text-secondary)",
                            border: "2px solid var(--border-color)",
                            padding: "4px 8px",
                        }}
                    >
                        ← → ↑ ↓
                    </span>
                    <span style={{ fontFamily: "var(--ff-vt)", fontSize: "16px", color: "var(--text-secondary)" }}>
                        Move
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "8px",
                            color: "var(--text-secondary)",
                            border: "2px solid var(--border-color)",
                            padding: "4px 8px",
                        }}
                    >
                        SPACE
                    </span>
                    <span style={{ fontFamily: "var(--ff-vt)", fontSize: "16px", color: "var(--text-secondary)" }}>
                        Shoot
                    </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "8px",
                            color: "var(--accent)",
                        }}
                    >
                        SCORE: {score}
                    </span>
                    <span
                        style={{
                            fontFamily: "var(--ff-pixel)",
                            fontSize: "8px",
                            color: "var(--text-secondary)",
                        }}
                    >
                        LIVES: {"♥".repeat(lives)}
                    </span>
                </div>
            </div>

            {/* Mobile Touch Controls — always rendered, visibility via CSS */}
            {
                <div
                    className="game-mobile-controls"
                    style={{
                        display: "none",
                        justifyContent: "space-between",
                        alignItems: "flex-end",
                        padding: "0 16px",
                        maxWidth: CANVAS_W,
                        margin: "16px auto 0",
                    }}
                >
                    {/* D-Pad */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                        <div
                            onTouchStart={() => touchKey("ArrowUp", true)}
                            onTouchEnd={() => touchKey("ArrowUp", false)}
                            onTouchCancel={() => touchKey("ArrowUp", false)}
                            style={btnStyle}
                        >
                            ▲
                        </div>
                        <div style={{ display: "flex", gap: "4px" }}>
                            <div
                                onTouchStart={() => touchKey("ArrowLeft", true)}
                                onTouchEnd={() => touchKey("ArrowLeft", false)}
                                onTouchCancel={() => touchKey("ArrowLeft", false)}
                                style={btnStyle}
                            >
                                ◄
                            </div>
                            <div
                                onTouchStart={() => touchKey("ArrowDown", true)}
                                onTouchEnd={() => touchKey("ArrowDown", false)}
                                onTouchCancel={() => touchKey("ArrowDown", false)}
                                style={btnStyle}
                            >
                                ▼
                            </div>
                            <div
                                onTouchStart={() => touchKey("ArrowRight", true)}
                                onTouchEnd={() => touchKey("ArrowRight", false)}
                                onTouchCancel={() => touchKey("ArrowRight", false)}
                                style={btnStyle}
                            >
                                ►
                            </div>
                        </div>
                    </div>

                    {/* Score */}
                    <div style={{ textAlign: "center" }}>
                        <span style={{ fontFamily: "var(--ff-pixel)", fontSize: "8px", color: "var(--text-primary)" }}>
                            {score}
                        </span>
                        <br />
                        <span style={{ fontFamily: "var(--ff-pixel)", fontSize: "10px", color: "var(--text-primary)" }}>
                            {"♥".repeat(lives)}
                        </span>
                    </div>

                    {/* Fire Button */}
                    <div
                        onTouchStart={() => touchKey(" ", true)}
                        onTouchEnd={() => touchKey(" ", false)}
                        onTouchCancel={() => touchKey(" ", false)}
                        style={{
                            ...btnStyle,
                            width: 72,
                            height: 72,
                            borderRadius: "50%",
                            fontSize: "10px",
                            border: "3px solid var(--accent)",
                        }}
                    >
                        FIRE
                    </div>
                </div>
            }

            {gameOver && (
                <div style={{ marginTop: "16px" }}>
                    <button
                        onClick={() => { restartRequestRef.current = true; setGameOver(false); }}
                        className="pixel-btn"
                        style={{ fontSize: "10px" }}
                    >
                        ► PLAY AGAIN
                    </button>
                </div>
            )}

            {/* Responsive CSS for mobile controls */}
            <style>{`
                @media (hover: none) and (pointer: coarse) {
                    .game-desktop-controls { display: none !important; }
                    .game-desktop-hint { display: none !important; }
                    .game-mobile-controls { display: flex !important; }
                    .game-mobile-start { display: flex !important; }
                }
                @media (hover: hover) {
                    .game-mobile-controls { display: none !important; }
                    .game-mobile-start { display: none !important; }
                }
            `}</style>
        </div>
    );
}
