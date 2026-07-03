import { useRef, useState } from "react";
import { Play, Volume2, VolumeX } from "lucide-react";
import OrbitIcon from "./OrbitIcon";

export default function VideoCard({ title = "Sample reel", tag = "Orbit Media", variant = 0, src, aspectRatio = "9 / 16", hideBorder = false, fit = "cover" }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(true);
  const angles = [135, 160, 110, 145];
  const angle = angles[variant % angles.length];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  };

  const toggleMute = (e) => {
    e.stopPropagation(); // don't trigger play/pause
    if (!videoRef.current) return;
    videoRef.current.muted = !muted;
    setMuted(!muted);
  };

  /* ── real video ── */
  if (src) {
    const isNatural = aspectRatio === "auto";
    return (
      <div
        style={{
          position: "relative",
          width: "100%",
          ...(isNatural ? {} : { aspectRatio }),
          borderRadius: 14,
          overflow: "hidden",
          border: hideBorder ? "none" : "1px solid var(--border-gold)",
          background: "var(--bg-soft)",
          cursor: "pointer",
        }}
        onClick={togglePlay}
      >
        <video
          ref={videoRef}
          src={src}
          loop
          muted
          playsInline
          style={{
            width: "100%",
            height: isNatural ? "auto" : "100%",
            objectFit: isNatural ? "fill" : fit,
            display: "block",
          }}
        />

        {/* gradient overlay — fades when playing */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)",
            opacity: playing ? 0 : 1,
            transition: "opacity 0.25s",
            pointerEvents: "none",
          }}
        />

        {/* play / pause button — center */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 54,
            height: 54,
            borderRadius: "50%",
            border: "1px solid var(--border-gold)",
            background: "var(--gold)",
            color: "var(--btn-text)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            opacity: playing ? 0 : 1,
            transition: "opacity 0.25s",
            pointerEvents: "none",
          }}
        >
          <Play size={18} fill="currentColor" strokeWidth={0} style={{ marginLeft: 2 }} />
        </div>

        {/* bottom row — title left, mute button right */}
        <div
          style={{
            position: "absolute",
            left: 14,
            right: 14,
            bottom: 12,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 10,
          }}
        >
          <span
            style={{
              fontFamily: "Inter, sans-serif",
              fontSize: 12.5,
              fontWeight: 500,
              color: "#fff",
              opacity: playing ? 0 : 1,
              transition: "opacity 0.25s",
              pointerEvents: "none",
            }}
          >
            {title}
          </span>

          {/* mute / unmute — always visible when playing */}
          <button
            type="button"
            aria-label={muted ? "Unmute" : "Mute"}
            onClick={toggleMute}
            style={{
              flexShrink: 0,
              width: 32,
              height: 32,
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.35)",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(6px)",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              opacity: playing ? 1 : 0,
              transition: "opacity 0.25s",
              pointerEvents: playing ? "auto" : "none",
            }}
          >
            {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          </button>
        </div>
      </div>
    );
  }

  /* ── placeholder ── */
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio,
        borderRadius: 14,
        overflow: "hidden",
        border: hideBorder ? "none" : "1px solid var(--border-gold)",
        background: `linear-gradient(${angle}deg, var(--bg-soft) 0%, var(--bg-elevated) 55%, var(--bg-soft) 100%)`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.07,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        aria-hidden="true"
      >
        <OrbitIcon size={220} style={{ color: "var(--gold)" }} />
      </div>

      <div style={{ position: "absolute", top: 14, left: 14, display: "flex", alignItems: "center", gap: 8 }}>
        <div
          style={{
            width: 24,
            height: 24,
            borderRadius: "50%",
            background: "var(--bg)",
            border: "1px solid var(--border-gold)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <OrbitIcon size={13} style={{ color: "var(--gold)" }} />
        </div>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12, fontWeight: 600, color: "var(--text)" }}>
          {tag}
        </span>
      </div>

      <button
        type="button"
        aria-label={`Play ${title}`}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 54,
          height: 54,
          borderRadius: "50%",
          border: "1px solid var(--border-gold)",
          background: "var(--gold)",
          color: "var(--btn-text)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
        }}
      >
        <Play size={18} fill="currentColor" strokeWidth={0} style={{ marginLeft: 2 }} />
      </button>

      <div
        style={{
          position: "absolute",
          left: 14,
          right: 14,
          bottom: 12,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 10,
        }}
      >
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 12.5, fontWeight: 500, color: "var(--text-body)", maxWidth: "65%" }}>
          {title}
        </span>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--text-faint)",
            border: "1px dashed var(--hairline)",
            borderRadius: 999,
            padding: "4px 8px",
            whiteSpace: "nowrap",
          }}
        >
          Add video
        </span>
      </div>
    </div>
  );
}