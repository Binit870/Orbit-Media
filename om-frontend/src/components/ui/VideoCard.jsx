import { Play } from "lucide-react";
import OrbitIcon from "./OrbitIcon";

/**
 * Polished placeholder for a video embed.
 *
 * No real videos/logos were available yet (the brief's Drive folder
 * wasn't accessible), so every video slot on the site uses this card.
 * Swap it for a real <iframe>/<video> once footage is ready — the
 * `title`/`tag` props are designed to map 1:1 onto a real embed's
 * channel name + video title.
 */
export default function VideoCard({ title = "Sample reel", tag = "Orbit Media", variant = 0 }) {
  const angles = [135, 160, 110, 145];
  const angle = angles[variant % angles.length];

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        aspectRatio: "16 / 9",
        borderRadius: 14,
        overflow: "hidden",
        border: "1px solid var(--border-gold)",
        background: `linear-gradient(${angle}deg, var(--bg-soft) 0%, var(--bg-elevated) 55%, var(--bg-soft) 100%)`,
      }}
    >
      {/* faint concentric ornament for texture */}
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

      {/* top-left channel chip */}
      <div
        style={{
          position: "absolute",
          top: 14,
          left: 14,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
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
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12,
            fontWeight: 600,
            color: "var(--text)",
          }}
        >
          {tag}
        </span>
      </div>

      {/* center play button */}
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

      {/* bottom title + placeholder tag */}
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
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 12.5,
            fontWeight: 500,
            color: "var(--text-body)",
            maxWidth: "65%",
          }}
        >
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
