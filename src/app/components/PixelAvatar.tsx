"use client";

export default function PixelAvatar() {
    const size = 200;

    return (
        <div
            className="pixel-avatar-container"
            style={{
                width: size,
                height: size,
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                borderRadius: "50%",
            }}
        >
            <video
                src="/ssss.mp4"
                autoPlay
                loop
                muted
                playsInline
                style={{
                    width: "110%",
                    height: "110%",
                    objectFit: "cover",
                    imageRendering: "pixelated",
                }}
            />
        </div>
    );
}
