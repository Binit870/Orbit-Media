/**
 * HeroOrnament
 * ------------------------------------------------------------------
 * Ambient background piece for the hero section. Reuses the same
 * "broken arc" language as <OrbitIcon /> and the favicon (brand
 * consistency) but scaled up into a set of independent rings that
 * drift at different speeds/directions, plus a slow-breathing
 * orange → violet glow behind the copy for depth.
 *
 * Pure CSS animation (no per-frame JS), so it's cheap to keep
 * running and respects prefers-reduced-motion.
 * ------------------------------------------------------------------
 */

const RINGS = [
  { radius: 210, gap: 46, offset: 0, duration: 46, direction: "normal", width: 1.4 },
  { radius: 290, gap: 120, offset: 70, duration: 64, direction: "reverse", width: 1 },
  { radius: 365, gap: 200, offset: 210, duration: 88, direction: "normal", width: 0.75 },
];

function ArcRing({ radius, gap, offset, className }) {
  const circumference = 2 * Math.PI * radius;
  return (
    <circle
      cx="450"
      cy="450"
      r={radius}
      className={className}
      fill="none"
      strokeDasharray={`${circumference - gap} ${gap}`}
      strokeDashoffset={offset}
      strokeLinecap="round"
    />
  );
}

export default function HeroOrnament() {
  return (
    <div className="om-hero-ornament" aria-hidden="true">
      <div className="om-hero-glow" />

      <svg viewBox="0 0 900 900" className="om-hero-rings">
        <defs>
          <linearGradient id="om-ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--accent)" />
            <stop offset="100%" stopColor="var(--accent-2)" />
          </linearGradient>
        </defs>

        {RINGS.map((ring, i) => (
          <g key={i} className={`om-ring-spin om-ring-spin-${i}`}>
            <ArcRing radius={ring.radius} gap={ring.gap} offset={ring.offset} className="om-ring" style={{ strokeWidth: ring.width }} />
          </g>
        ))}
      </svg>

      <style>{`
        .om-hero-ornament {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        .om-hero-glow {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(70vw, 780px);
          height: min(70vw, 780px);
          transform: translate(-50%, -50%);
          background:
            radial-gradient(circle at 32% 30%, var(--accent-soft) 0%, transparent 55%),
            radial-gradient(circle at 68% 72%, var(--accent-2-soft) 0%, transparent 55%);
          filter: blur(60px);
          animation: om-glow-breathe 10s ease-in-out infinite;
        }

        .om-hero-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          width: min(84vw, 900px);
          height: min(84vw, 900px);
          transform: translate(-50%, -50%);
        }

        .om-ring {
          stroke: url(#om-ring-gradient);
          opacity: 0.4;
        }

        .om-ring-spin {
          transform-origin: 450px 450px;
        }
        .om-ring-spin-0 { animation: om-orbit-spin 46s linear infinite; }
        .om-ring-spin-1 { animation: om-orbit-spin 64s linear infinite reverse; }
        .om-ring-spin-2 { animation: om-orbit-spin 88s linear infinite; }

        @keyframes om-orbit-spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes om-glow-breathe {
          0%, 100% { opacity: 0.75; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 1; transform: translate(-50%, -50%) scale(1.08); }
        }

        @media (prefers-reduced-motion: reduce) {
          .om-ring-spin-0, .om-ring-spin-1, .om-ring-spin-2, .om-hero-glow {
            animation: none;
          }
        }

        @media (max-width: 640px) {
          .om-hero-glow { width: 120vw; height: 120vw; }
          .om-hero-rings { width: 130vw; height: 130vw; }
        }
      `}</style>
    </div>
  );
}
