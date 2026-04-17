import { useState, useEffect, useRef } from "react";

const PLATFORMS = [
  {
    id: "linkedin_posts",
    label: "LinkedIn Posts",
    icon: "in",
    color: "#0A66C2",
    glow: "#0A66C2",
    angle: 270, // top
    desc: "Thought leadership & insights",
  },
  {
    id: "instagram_reels",
    label: "Instagram Reels",
    icon: "▶",
    color: "#E1306C",
    glow: "#E1306C",
    angle: 330,
    desc: "Short-form visual stories",
  },
  {
    id: "youtube_shorts",
    label: "YouTube Shorts",
    icon: "▷",
    color: "#FF0000",
    glow: "#FF0000",
    angle: 30,
    desc: "Vertical video content",
  },
  {
    id: "instagram_carousel",
    label: "IG Carousel",
    icon: "◫",
    color: "#F77737",
    glow: "#F77737",
    angle: 90, // bottom
    desc: "Swipeable slide decks",
  },
  {
    id: "tiktok",
    label: "TikTok",
    icon: "♪",
    color: "#69C9D0",
    glow: "#69C9D0",
    angle: 150,
    desc: "Trending short videos",
  },
  {
    id: "linkedin_carousel",
    label: "LinkedIn Carousel",
    icon: "≡",
    color: "#70B5F9",
    glow: "#70B5F9",
    angle: 210,
    desc: "Document-style posts",
  },
];

const R = 190; // orbit radius
const CENTER = 300;

function toXY(angleDeg, radius) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

export default function ContentFlywheel() {
  const [rotation, setRotation] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const [visible, setVisible] = useState(Array(6).fill(false));
  const rafRef = useRef(null);
  const lastTimeRef = useRef(null);
  const containerRef = useRef(null);

  // Smooth rotation loop
  useEffect(() => {
    const animate = (time) => {
      if (lastTimeRef.current != null) {
        const delta = time - lastTimeRef.current;
        setRotation((r) => (r + (delta / 8000) * 360) % 360);
      }
      lastTimeRef.current = time;
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  // Scroll-driven reveal
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const totalHeight = el.scrollHeight - window.innerHeight;
      const scrolled = Math.max(0, -rect.top) / Math.max(1, totalHeight);
      setScrollY(scrolled);

      setVisible(
        PLATFORMS.map((_, i) => {
          const start = 0.05 + i * 0.12;
          return scrolled >= start;
        })
      );
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Arc path for the flywheel ring
  const arcPoints = Array.from({ length: 361 }, (_, i) => {
    const p = toXY(i, R);
    return `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`;
  }).join(" ");

  return (
    <div
      ref={containerRef}
      style={{
        background: "#000",
        minHeight: "350vh",
        fontFamily: "'DM Mono', 'Fira Mono', 'Courier New', monospace",
        position: "relative",
      }}
    >
      {/* Sticky canvas */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* Background grain */}
        <svg
          style={{ position: "absolute", inset: 0, opacity: 0.04 }}
          width="100%"
          height="100%"
        >
          <filter id="grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.75"
              numOctaves="4"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#grain)" />
        </svg>

        {/* Title */}
        <div
          style={{
            position: "absolute",
            top: "6%",
            textAlign: "center",
            zIndex: 10,
          }}
        >
          <div
            style={{
              fontSize: "11px",
              letterSpacing: "0.35em",
              color: "#555",
              textTransform: "uppercase",
              marginBottom: "6px",
            }}
          >
            scroll to build your
          </div>
          <div
            style={{
              fontSize: "clamp(22px, 4vw, 38px)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              color: "#fff",
              fontFamily: "'DM Mono', monospace",
            }}
          >
            Content Flywheel
          </div>
        </div>

        {/* SVG Flywheel */}
        <svg
          viewBox="0 0 600 600"
          width="min(92vw, 600px)"
          height="min(92vw, 600px)"
          style={{ position: "relative", zIndex: 2, overflow: "visible" }}
        >
          <defs>
            {/* Spinning gradient ring */}
            <linearGradient
              id="ringGrad"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
              gradientTransform={`rotate(${rotation}, 300, 300)`}
            >
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.06" />
              <stop offset="40%" stopColor="#ffffff" stopOpacity="0.25" />
              <stop offset="60%" stopColor="#aaaaff" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0.06" />
            </linearGradient>

            {/* Center glow */}
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000" stopOpacity="0" />
            </radialGradient>

            {/* Per-platform glows */}
            {PLATFORMS.map((p) => (
              <radialGradient key={p.id} id={`glow_${p.id}`} cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor={p.glow} stopOpacity="0.5" />
                <stop offset="100%" stopColor={p.glow} stopOpacity="0" />
              </radialGradient>
            ))}

            {/* Dash animation filter */}
            <filter id="softGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Outer ambient glow disk */}
          <circle cx={CENTER} cy={CENTER} r={R + 40} fill="url(#centerGlow)" />

          {/* Dashed tick marks on the ring */}
          {Array.from({ length: 60 }, (_, i) => {
            const a = i * 6;
            const inner = toXY(a, R - 10);
            const outer = toXY(a, R + 10);
            return (
              <line
                key={i}
                x1={inner.x}
                y1={inner.y}
                x2={outer.x}
                y2={outer.y}
                stroke="#fff"
                strokeOpacity={i % 5 === 0 ? 0.18 : 0.06}
                strokeWidth={i % 5 === 0 ? 1.5 : 0.8}
              />
            );
          })}

          {/* Main orbit ring */}
          <circle
            cx={CENTER}
            cy={CENTER}
            r={R}
            fill="none"
            stroke="url(#ringGrad)"
            strokeWidth="2"
            filter="url(#softGlow)"
          />

          {/* Spoke lines */}
          {PLATFORMS.map((p, i) => {
            const pos = toXY(p.angle, R);
            const opacity = visible[i] ? 0.3 : 0;
            return (
              <line
                key={p.id}
                x1={CENTER}
                y1={CENTER}
                x2={pos.x}
                y2={pos.y}
                stroke={p.color}
                strokeWidth="1"
                strokeOpacity={opacity}
                strokeDasharray="4 6"
                style={{ transition: "stroke-opacity 0.6s ease" }}
              />
            );
          })}

          {/* Center hub */}
          <circle cx={CENTER} cy={CENTER} r={56} fill="#0a0a0a" stroke="#222" strokeWidth="1" />
          <circle cx={CENTER} cy={CENTER} r={44} fill="none" stroke="#333" strokeWidth="1" strokeDasharray="3 4" />
          <text
            x={CENTER}
            y={CENTER - 8}
            textAnchor="middle"
            fill="#fff"
            fontSize="11"
            fontFamily="'DM Mono', monospace"
            letterSpacing="0.1em"
          >
            YOUR
          </text>
          <text
            x={CENTER}
            y={CENTER + 8}
            textAnchor="middle"
            fill="#888"
            fontSize="9"
            fontFamily="'DM Mono', monospace"
            letterSpacing="0.2em"
          >
            CONTENT
          </text>
          <text
            x={CENTER}
            y={CENTER + 22}
            textAnchor="middle"
            fill="#555"
            fontSize="8"
            fontFamily="'DM Mono', monospace"
            letterSpacing="0.25em"
          >
            ENGINE
          </text>

          {/* Platform nodes */}
          {PLATFORMS.map((p, i) => {
            const pos = toXY(p.angle, R);
            const isVisible = visible[i];
            const scale = isVisible ? 1 : 0.4;
            const opacity = isVisible ? 1 : 0;

            // Label offset
            const isTop = p.angle > 225 && p.angle < 315;
            const isBottom = p.angle > 45 && p.angle < 135;
            const isRight = p.angle >= 315 || p.angle <= 45 || (p.angle > 270 && p.angle <= 330);
            const isLeft = p.angle >= 135 && p.angle <= 225;

            let labelX = pos.x;
            let labelY = pos.y;
            let textAnchor = "middle";
            const LABEL_OFFSET = 52;

            if (isTop) { labelY -= LABEL_OFFSET; }
            else if (isBottom) { labelY += LABEL_OFFSET; }
            else if (p.angle > 300 || p.angle < 60) {
              labelX += LABEL_OFFSET + 10;
              textAnchor = "start";
            } else if (p.angle >= 60 && p.angle <= 120) {
              labelX += LABEL_OFFSET + 10;
              textAnchor = "start";
            } else if (p.angle >= 240 && p.angle <= 300) {
              labelX -= LABEL_OFFSET + 10;
              textAnchor = "end";
            } else if (p.angle >= 120 && p.angle <= 240) {
              labelX -= LABEL_OFFSET + 10;
              textAnchor = "end";
            }

            return (
              <g
                key={p.id}
                style={{
                  transform: `translate(${pos.x}px, ${pos.y}px) scale(${scale})`,
                  transformOrigin: `${pos.x}px ${pos.y}px`,
                  opacity,
                  transition: "transform 0.7s cubic-bezier(0.34,1.56,0.64,1), opacity 0.5s ease",
                }}
              >
                {/* Glow halo */}
                <circle cx={0} cy={0} r={32} fill={`url(#glow_${p.id})`} />
                {/* Node ring */}
                <circle
                  cx={0}
                  cy={0}
                  r={22}
                  fill="#0a0a0a"
                  stroke={p.color}
                  strokeWidth="1.5"
                />
                {/* Icon */}
                <text
                  x={0}
                  y={1}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={p.color}
                  fontSize="12"
                  fontFamily="'DM Mono', monospace"
                  fontWeight="bold"
                >
                  {p.icon}
                </text>
              </g>
            );
          })}

          {/* Labels outside SVG transform group for clarity */}
          {PLATFORMS.map((p, i) => {
            const pos = toXY(p.angle, R);
            const isVisible = visible[i];

            let lx = pos.x;
            let ly = pos.y;
            let anchor = "middle";
            const OFF = 52;

            if (p.angle > 225 && p.angle < 315) { ly -= OFF; }
            else if (p.angle > 45 && p.angle < 135) { ly += OFF; }

            if (p.angle >= 315 || p.angle <= 60) { lx += OFF + 12; anchor = "start"; }
            else if (p.angle >= 60 && p.angle <= 120) { lx += OFF + 12; anchor = "start"; }
            else if (p.angle > 120 && p.angle <= 240) { lx -= OFF + 12; anchor = "end"; }
            else if (p.angle > 240 && p.angle <= 315) { lx -= OFF + 12; anchor = "end"; }

            return (
              <g
                key={`label_${p.id}`}
                style={{ opacity: isVisible ? 1 : 0, transition: "opacity 0.6s ease 0.2s" }}
              >
                <text
                  x={lx}
                  y={ly - 5}
                  textAnchor={anchor}
                  fill="#fff"
                  fontSize="9.5"
                  fontFamily="'DM Mono', monospace"
                  letterSpacing="0.08em"
                  fontWeight="600"
                >
                  {p.label.toUpperCase()}
                </text>
                <text
                  x={lx}
                  y={ly + 9}
                  textAnchor={anchor}
                  fill="#555"
                  fontSize="7.5"
                  fontFamily="'DM Mono', monospace"
                  letterSpacing="0.06em"
                >
                  {p.desc}
                </text>
              </g>
            );
          })}

          {/* Rotating indicator dot */}
          {(() => {
            const dotPos = toXY(rotation, R);
            return (
              <circle
                cx={dotPos.x}
                cy={dotPos.y}
                r={4}
                fill="#fff"
                opacity={0.7}
                filter="url(#softGlow)"
              />
            );
          })()}
        </svg>

        {/* Scroll cue */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            opacity: scrollY > 0.05 ? 0 : 1,
            transition: "opacity 0.4s ease",
          }}
        >
          <div
            style={{
              fontSize: "9px",
              letterSpacing: "0.3em",
              color: "#444",
              textTransform: "uppercase",
            }}
          >
            scroll to reveal
          </div>
          <div style={{ color: "#333", fontSize: "18px", animation: "bob 1.8s ease-in-out infinite" }}>
            ↓
          </div>
        </div>

        {/* Counter */}
        <div
          style={{
            position: "absolute",
            bottom: "5%",
            right: "5%",
            fontSize: "9px",
            letterSpacing: "0.2em",
            color: "#333",
            fontFamily: "'DM Mono', monospace",
          }}
        >
          {visible.filter(Boolean).length} / {PLATFORMS.length} channels
        </div>
      </div>

      <style>{`
        @keyframes bob {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </div>
  );
}