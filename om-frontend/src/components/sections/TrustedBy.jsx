import { trustedBy } from "../../data/trustedBy";

export default function TrustedBy() {
  const loop = [...trustedBy, ...trustedBy, ...trustedBy];

  return (
    <section style={{ padding: "56px 0 64px", borderBottom: "1px solid var(--hairline)" }}>
      <style>{`
        @keyframes om-marquee-scroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-33.3333%); }
        }
        .om-marquee-track {
          animation: om-marquee-scroll 26s linear infinite;
        }
        .om-marquee-wrap:hover .om-marquee-track {
          animation-play-state: paused;
        }
        .om-trusted-img {
          height: 100px;
          width: 100px;
          object-fit: cover;
          border-radius: 50%;
          opacity: 0.72;
          filter: grayscale(30%);
          transition: opacity 0.2s, filter 0.2s;
          flex-shrink: 0;
        }
        .om-marquee-wrap:hover .om-trusted-img:hover {
          opacity: 1;
          filter: grayscale(0%);
        }
      `}</style>

      <p className="om-eyebrow" style={{ textAlign: "center", marginBottom: 34 }}>
        Trusted by the best
      </p>

      <div className="om-marquee-fade om-marquee-wrap" style={{ overflow: "hidden" }}>
        <div
          className="om-marquee-track"
          style={{ display: "flex", gap: 80, alignItems: "center", width: "max-content" }}
        >
          {loop.map((item, i) => (
            <img
              key={i}
              src={item.url}
              alt={`Client ${(i % trustedBy.length) + 1}`}
              className="om-trusted-img"
            />
          ))}
        </div>
      </div>
    </section>
  );
}