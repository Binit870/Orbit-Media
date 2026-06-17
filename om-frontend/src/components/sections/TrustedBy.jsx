import { trustedBy } from "../../data/trustedBy";

export default function TrustedBy() {
  const loop = [...trustedBy, ...trustedBy, ...trustedBy];

  return (
    <section style={{ padding: "56px 0 64px", borderBottom: "1px solid var(--hairline)" }}>
      <style>{`
        @keyframes om-marquee-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-33.3333%); }
        }
        .om-marquee-track {
          animation: om-marquee-scroll 26s linear infinite;
        }
        .om-marquee-wrap:hover .om-marquee-track {
          animation-play-state: paused;
        }
      `}</style>

      <p className="om-eyebrow" style={{ textAlign: "center", marginBottom: 34 }}>
        Trusted by the best
      </p>

      <div className="om-marquee-fade om-marquee-wrap">
        <div className="om-marquee-track" style={{ display: "flex", gap: 64 }}>
          {loop.map((name, i) => (
            <span
              key={i}
              style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: "italic",
                fontSize: 26,
                color: "var(--text-muted)",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
