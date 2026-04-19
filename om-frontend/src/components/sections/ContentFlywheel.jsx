import { useState, useEffect, useRef } from "react";

const ICON_PATHS = {
  linkedin:  { color: "#0A66C2", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  youtube:   { color: "#FF0000", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
  facebook:  { color: "#1877F2", path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" },
  instagram: { color: "#E4405F", path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
  whatsapp:  { color: "#25D366", path: "M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" },
};

const PLATFORMS = [
  { id: "linkedin_posts",  label: ["LinkedIn", "Posts"],   angle: 285, icon: "linkedin"  },
  { id: "youtube_shorts",  label: ["Youtube", "Shorts"],   angle: 355, icon: "youtube"   },
  { id: "instagram_reels", label: ["Instagram", "Reels"],  angle: 75,  icon: "instagram" },
  { id: "facebook_posts",  label: ["Facebook", "Posts"],   angle: 140, icon: "facebook"  },
  { id: "whatsapp",        label: ["WhatsApp", "Channel"], angle: 220, icon: "whatsapp"  },
];

const RING_COLORS = ["#FFE500","#AAFF00","#44FF88","#00FFCC","#00BBFF","#4488FF","#9955FF","#FF44CC","#FF0055"];
const CX = 400, CY = 400, NODE_RADIUS = 235;

function buildWavePath(baseR, amplitude, phaseOffset, t, sides = 6) {
  const STEPS = 180, points = [];
  for (let i = 0; i <= STEPS; i++) {
    const frac = i / STEPS, theta = frac * Math.PI * 2;
    const hexFactor = 1 / Math.pow(
      Math.pow(Math.abs(Math.cos(sides * theta / 2)), 3) +
      Math.pow(Math.abs(Math.sin(sides * theta / 2)), 3), 1 / sides);
    const wave = amplitude * Math.sin(sides * theta + t + phaseOffset);
    const r = baseR * hexFactor + wave;
    points.push(`${(CX + r * Math.cos(theta - Math.PI / 2)).toFixed(2)},${(CY + r * Math.sin(theta - Math.PI / 2)).toFixed(2)}`);
  }
  return `M ${points.join(" L ")} Z`;
}

function polar(angleDeg, r) {
  const rad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: CX + r * Math.cos(rad), y: CY + r * Math.sin(rad) };
}

function HexRing({ elapsed }) {
  const t = elapsed * 0.00065, BASE = 182;
  return (
    <g style={{ mixBlendMode: "screen" }}>
      {RING_COLORS.map((color, i) => {
        const phase = (i / RING_COLORS.length) * Math.PI * 1.5;
        const amp = 22 - i * 1.2;
        return <path key={i} d={buildWavePath(BASE - i * 2, amp, phase, t)}
          fill="none" stroke={color} strokeWidth={1.6} strokeOpacity={0.9 - i * 0.025} />;
      })}
    </g>
  );
}

function PlatformIcon({ iconKey, x, y, size = 56 }) {
  const { color, path } = ICON_PATHS[iconKey];
  return (
    <g transform={`translate(${x}, ${y})`}>
      <g transform={`scale(${size / 24})`}>
        <path d={path} fill={color} />
      </g>
    </g>
  );
}

function PlatformNode({ platform, visible, index }) {
  const nodePos = polar(platform.angle, NODE_RADIUS);
  const a = platform.angle;
  const isLinkedIn  = platform.id === "linkedin_posts";
  const isFacebook  = platform.id === "facebook_posts";
  const isInstagram = platform.id === "instagram_reels";
  const isWhatsApp  = platform.id === "whatsapp";
  const isLeftHalf  = a > 95 && a < 265;
  const ICON_SIZE = 56, HALF = ICON_SIZE / 2, GAP = 12;

  const liShiftX = -52;
  const liIconX  = nodePos.x + GAP + liShiftX;
  const liIconY  = nodePos.y - HALF;
  const liTextX  = nodePos.x - GAP + liShiftX;

  const fbNudge = 30, fbYShift = -18;
  const fbIconX = nodePos.x - HALF + fbNudge;
  const fbIconY = nodePos.y - HALF + fbYShift;
  const fbTextX = fbIconX + ICON_SIZE + GAP;

  const igShift = 20;
  const igIconX = nodePos.x - HALF + igShift;
  const igIconY = nodePos.y - HALF;
  const igTextX = igIconX + ICON_SIZE + GAP;

  const waTextX       = nodePos.x - HALF - GAP;
  const defaultTextX  = isLeftHalf ? nodePos.x - HALF - GAP : nodePos.x + HALF + GAP;
  const defaultAnchor = isLeftHalf ? "end" : "start";

  const labelLines = (tx, anchor, baseY = nodePos.y) =>
    platform.label.map((line, li) => {
      const lineH = 22, blockH = platform.label.length * lineH;
      const lineY = baseY - blockH / 2 + li * lineH + lineH * 0.72;
      return (
        <text key={li} x={tx} y={lineY} textAnchor={anchor}
          fill="#fff" fontSize={19}
          fontFamily="'SF Pro Display', -apple-system, 'Helvetica Neue', sans-serif"
          fontWeight={600} letterSpacing="-0.01em">{line}</text>
      );
    });

  return (
    <g style={{
      opacity: visible ? 1 : 0,
      transition: `opacity 0.5s ease ${index * 0.13}s, transform 0.6s cubic-bezier(0.34,1.4,0.64,1) ${index * 0.13}s`,
      transform: visible ? "none" : "scale(0.5)",
      transformOrigin: `${nodePos.x}px ${nodePos.y}px`,
    }}>
      {isLinkedIn ? (
        <><PlatformIcon iconKey={platform.icon} x={liIconX} y={liIconY} size={ICON_SIZE} />{labelLines(liTextX, "end")}</>
      ) : isFacebook ? (
        <><PlatformIcon iconKey={platform.icon} x={fbIconX} y={fbIconY} size={ICON_SIZE} />{labelLines(fbTextX, "start", nodePos.y + fbYShift)}</>
      ) : isInstagram ? (
        <><PlatformIcon iconKey={platform.icon} x={igIconX} y={igIconY} size={ICON_SIZE} />{labelLines(igTextX, "start")}</>
      ) : isWhatsApp ? (
        <><PlatformIcon iconKey={platform.icon} x={nodePos.x - HALF} y={nodePos.y - HALF} size={ICON_SIZE} />{labelLines(waTextX, "end")}</>
      ) : (
        <><PlatformIcon iconKey={platform.icon} x={nodePos.x - HALF} y={nodePos.y - HALF} size={ICON_SIZE} />{labelLines(defaultTextX, defaultAnchor)}</>
      )}
    </g>
  );
}

export default function ContentFlywheel() {
  const [elapsed, setElapsed] = useState(0);
  const [visible, setVisible] = useState(Array(PLATFORMS.length).fill(false));
  const containerRef = useRef(null);
  const rafRef       = useRef(null);
  const t0Ref        = useRef(null);

  useEffect(() => {
    function tick(ts) {
      if (!t0Ref.current) t0Ref.current = ts;
      setElapsed(ts - t0Ref.current);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  useEffect(() => {
    function onScroll() {
      const el = containerRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const scrollable = el.scrollHeight - window.innerHeight;
      const s = Math.max(0, Math.min(1, -rect.top / Math.max(1, scrollable)));
      setVisible(PLATFORMS.map((_, i) => s >= (i + 1) / (PLATFORMS.length + 1)));
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');
        html { scroll-behavior: smooth; }
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .cfw-wrap {
          background: #000;
          min-height: 1000vh;
          position: relative;
          isolation: isolate;
          z-index: 1;
        }

        /* The sticky panel fills the entire viewport — SVG + button both live here */
        .cfw-sticky {
          position: sticky;
          top: 0;
          height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 28px;          /* space between SVG and button */
          z-index: 2;
          background: #000;
        }

        .cfw-svg {
          display: block;
          /* Shrink SVG slightly so button always fits inside the viewport */
          width: min(96vw, 780px);
          height: auto;
          flex-shrink: 0;
        }

        /* Button sits naturally BELOW the SVG inside the flex column — no negative margin */
        .cfw-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: #ff8c00;
          color: #fff;
          font-family: 'Outfit', -apple-system, sans-serif;
          font-size: 18px;
          font-weight: 700;
          letter-spacing: 0.01em;
          padding: 16px 52px;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: background 0.18s ease, transform 0.12s ease;
          white-space: nowrap;
          flex-shrink: 0;
        }
        .cfw-btn:hover  { background: #e07b00; transform: scale(1.04); }
        .cfw-btn:active { background: #c96d00; transform: scale(0.97); }
      `}</style>

      <div className="cfw-wrap" ref={containerRef}>
        <div className="cfw-sticky">

          <svg
            className="cfw-svg"
            viewBox="0 0 800 800"
            aria-label="Content Flywheel"
          >
            <circle cx={CX} cy={CY} r={180} fill="#000" />
            <HexRing elapsed={elapsed} />
            <circle cx={CX} cy={CY} r={152} fill="#000" />
            <text x={CX} y={CY - 16} textAnchor="middle" fill="#fff"
              fontSize={40} fontFamily="'SF Pro Display', -apple-system, sans-serif"
              fontWeight={700} letterSpacing="-0.025em">Content</text>
            <text x={CX} y={CY + 36} textAnchor="middle" fill="#ff8c00"
              fontSize={40} fontFamily="'SF Pro Display', -apple-system, sans-serif"
              fontWeight={700} letterSpacing="-0.025em">Flywheel</text>
            {PLATFORMS.map((p, i) => (
              <PlatformNode key={p.id} platform={p} visible={visible[i]} index={i} />
            ))}
          </svg>

          {/* Button is a direct flex child — always visible inside the sticky viewport */}
          <button className="cfw-btn">Get Started</button>

        </div>
      </div>
    </>
  );
}