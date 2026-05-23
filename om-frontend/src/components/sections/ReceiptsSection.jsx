import { useEffect, useState, useRef } from "react";

function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    let start = 0;
    const increment = numeric / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [started, value]);

  const suffix = value.replace(/[0-9.]/g, "");
  return (
    <span ref={ref}>
      {Number(count.toFixed(1)).toLocaleString()}
      {suffix}
    </span>
  );
}

const caseStudies = [
  {
    tag: "Case study",
    username: "@visual.ayush",
    instagram: "https://www.instagram.com/visual.ayush/",
    name: "Ayush Kumar",
    subtitle: "Founder, Orbit Media",
    description:
      "Built a founder-led personal brand from zero — a content system that turned a 0-follower account into an inbound lead engine.",
    stats: [
      { label: "Views Generated", value: "12M+" },
      { label: "Audience Growth", value: "+18K" },
      { label: "Inbound Demos", value: "4x" },
    ],
    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop",
  },
  {
    tag: "Case study",
    username: "@reflyofficial",
    instagram: "https://www.instagram.com/reflyofficial/",
    name: "ReFly",
    subtitle: "Travel & Transportation · 72.5K followers",
    description:
      "Performance-driven content engine for a category-defining travel-tech brand. Cinematic short-form built around real passenger stories.",
    stats: [
      { label: "Monthly Reach", value: "8M+" },
      { label: "Follower Growth", value: "+42%" },
      { label: "Engagement Lift", value: "5.2x" },
    ],
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",
  },
  {
    tag: "Case study",
    username: "@thenextbigthing_media",
    instagram: "https://www.instagram.com/thenextbigthing_media/",
    name: "The Next Big Thing",
    subtitle: "Tech media · 13K followers",
    description:
      "Spotlighting culture-shaping tech narratives. We engineered the visual language and hook formulas behind their breakout reels.",
    stats: [
      { label: "Reel Views", value: "6.4M" },
      { label: "New Followers", value: "+11K" },
      { label: "Save Rate", value: "+310%" },
    ],
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1600&auto=format&fit=crop",
  },
];

function ReceiptCard({ item, index }) {
  const isEven = index % 2 !== 0;

  const ImageBlock = (
    <div style={{ position: "relative", overflow: "hidden", height: "100%", minHeight: 0 }}>
      <img
        src={item.image}
        alt={item.name}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          filter: "brightness(0.85) contrast(1.1) saturate(1.1)",
          position: "absolute",
          inset: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: isEven
            ? "linear-gradient(to left, rgba(9,5,26,0.3), rgba(9,5,26,0.75))"
            : "linear-gradient(to right, rgba(9,5,26,0.3), rgba(9,5,26,0.75))",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: 16,
          left: 16,
          background: "rgba(9,5,26,0.55)",
          border: "1px solid rgba(167,139,250,0.25)",
          borderRadius: 99,
          padding: "4px 14px",
          fontSize: 11,
          fontWeight: 600,
          color: "#a78bfa",
          letterSpacing: "0.05em",
        }}
      >
        ● {item.tag}
      </div>
    </div>
  );

  const ContentBlock = (
    <div
      style={{
        padding: "32px 28px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: 16,
      }}
    >
      <div>
        <p
          style={{
            fontSize: 11,
            fontWeight: 600,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "#7c3aed",
            margin: "0 0 8px",
          }}
        >
          {item.username}
        </p>
        <h3
          style={{
            fontSize: "clamp(28px, 3vw, 40px)",
            fontWeight: 800,
            color: "#fff",
            letterSpacing: "-0.04em",
            lineHeight: 1,
            margin: "0 0 6px",
          }}
        >
          {item.name}
        </h3>
        <p style={{ fontSize: 13, color: "#6d5fa0", margin: "0 0 18px" }}>
          {item.subtitle}
        </p>
        <p
          style={{
            fontSize: 15,
            lineHeight: 1.75,
            color: "#9ca3af",
            margin: 0,
            maxWidth: 480,
          }}
        >
          {item.description}
        </p>
      </div>

      <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
        {item.stats.map((stat) => (
          <div key={stat.label}>
            <p
              style={{
                fontSize: 10,
                textTransform: "uppercase",
                letterSpacing: "0.16em",
                color: "#6d5fa0",
                margin: "0 0 4px",
              }}
            >
              {stat.label}
            </p>
            <p
              style={{
                fontSize: 34,
                fontWeight: 800,
                color: "#c4b5fd",
                letterSpacing: "-0.04em",
                lineHeight: 1,
                margin: 0,
              }}
            >
              <CountUp value={stat.value} />
            </p>
          </div>
        ))}
      </div>

      <div>
        <div style={{ height: 1, background: "rgba(139,92,246,0.12)", marginBottom: 16 }} />
        <a
          href={item.instagram}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            fontWeight: 600,
            color: "#6d5fa0",
            textDecoration: "none",
          }}
        >
          View on Instagram{" "}
          <span style={{ color: "#7c3aed" }}>↗</span>
        </a>
      </div>
    </div>
  );

  return (
    <div
      style={{
        borderRadius: 20,
        border: "1px solid rgba(139,92,246,0.18)",
        background: "rgba(255,255,255,0.025)",
        overflow: "hidden",
        display: "grid",
        gridTemplateColumns: "340px 1fr",
        alignItems: "stretch",
        direction: isEven ? "rtl" : "ltr",
      }}
    >
      <div style={{ direction: "ltr", height: "100%" }}>{ImageBlock}</div>
      <div style={{ direction: "ltr" }}>{ContentBlock}</div>
    </div>
  );
}

export default function ReceiptsSection() {
  return (
    <section
      style={{
        background: "#09051a",
        padding: "80px 40px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Caveat:wght@500&display=swap');

        .rs-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image:
            linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .rs-blob {
          position: absolute;
          width: 400px;
          height: 400px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(109,40,217,0.18) 0%, transparent 68%);
          top: -80px;
          right: -60px;
          pointer-events: none;
        }

        @media (max-width: 768px) {
          .rs-card {
            grid-template-columns: 1fr !important;
            direction: ltr !important;
          }
          .rs-card > div {
            height: auto !important;
          }
          .rs-card > div:first-child {
            min-height: 220px;
          }
        }
      `}</style>

      <div className="rs-grid-bg" />
      <div className="rs-blob" />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <p
          style={{
            fontFamily: "'Caveat', cursive",
            fontSize: 20,
            color: "#a78bfa",
            margin: "0 0 14px",
          }}
        >
          — Receipts, not promises
        </p>

        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 0.97,
            letterSpacing: "-0.05em",
            margin: "0 0 52px",
          }}
        >
          Real founders.
          <br />
          <em
            style={{
              fontFamily: "'Caveat', cursive",
              fontStyle: "normal",
              color: "#c4b5fd",
              fontSize: "clamp(40px, 5.5vw, 66px)",
            }}
          >
            Real results.
          </em>
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          {caseStudies.map((item, index) => (
            <ReceiptCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}