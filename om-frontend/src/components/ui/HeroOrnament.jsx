/**
 * HeroOrnament
 * ------------------------------------------------------------------
 * Ambient scene behind the hero headline. Three layers:
 *   1. Slow-morphing "aurora" gradient blobs for atmosphere/depth.
 *   2. A ring of animated equalizer bars behind the copy — a live
 *      "voiceprint" halo, since podcasting/audio is the core of what
 *      Orbit Media does.
 *   3. A handful of floating glass cards, one per service line
 *      (podcasting, launch videos, founder brands, AI UGC), drifting
 *      gently around the edges.
 *
 * Pure CSS animation + one-time JS to lay out the halo bars and
 * sparkle particles (randomized once on mount, not per-frame), so
 * it's cheap to keep running.
 * ------------------------------------------------------------------
 */
import { Mic, Video, UserRound, Sparkles } from "lucide-react";

const HALO_COUNT = 64;
const HALO_RADIUS = 250;

// Randomized once at module load (not during render) — every mount of
// HeroOrnament reuses this same layout, which keeps the component pure
// while still giving the halo/sparkles an organic, non-repeating feel.
const HALO_BARS = Array.from({ length: HALO_COUNT }, (_, i) => {
  const angle = (360 / HALO_COUNT) * i;
  return {
    angle,
    height: 10 + Math.round(Math.random() * 20),
    duration: 0.7 + Math.random() * 0.9,
    delay: Math.random() * 1.5,
  };
});

const SPARKLES = Array.from({ length: 20 }, () => ({
  top: Math.random() * 100,
  left: Math.random() * 100,
  duration: 2 + Math.random() * 3,
  delay: Math.random() * 4,
}));

const CARDS = [
  { Icon: Mic, label: "Podcasting", className: "om-fc-1" },
  { Icon: Video, label: "Launch videos", className: "om-fc-2" },
  { Icon: UserRound, label: "Founder brands", className: "om-fc-3" },
  { Icon: Sparkles, label: "AI UGC", className: "om-fc-4" },
];

export default function HeroOrnament() {
  return (
    <div className="om-hero-ornament" aria-hidden="true">
      <div className="om-blob om-blob-1" />
      <div className="om-blob om-blob-2" />
      <div className="om-blob om-blob-3" />

      <div className="om-halo">
        {HALO_BARS.map((bar, i) => (
          <div
            key={i}
            className="om-hbar"
            style={{
              height: bar.height,
              "--a": `${bar.angle}deg`,
              "--r": `-${HALO_RADIUS}px`,
              animationDuration: `${bar.duration}s`,
              animationDelay: `${bar.delay}s`,
            }}
          />
        ))}
      </div>

      {CARDS.map((card) => (
        <div key={card.label} className={`om-float-card ${card.className}`}>
          <div className="om-fc-icon">
            <card.Icon size={14} strokeWidth={2} />
          </div>
          <div className="om-fc-label">{card.label}</div>
        </div>
      ))}

      {SPARKLES.map((s, i) => (
        <div
          key={i}
          className="om-spark"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}

      <style>{`
        .om-hero-ornament {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 0;
        }

        /* ---- aurora blobs ---- */
        .om-blob {
          position: absolute;
          top: 50%;
          left: 50%;
          border-radius: 50%;
          filter: blur(70px);
          will-change: transform;
        }
        .om-blob-1 {
          width: 560px;
          height: 560px;
          margin: -280px 0 0 -280px;
          background: radial-gradient(circle, rgba(124,58,237,0.30), rgba(124,58,237,0) 70%);
          animation: om-blob-drift-1 16s ease-in-out infinite;
        }
        .om-blob-2 {
          width: 420px;
          height: 420px;
          margin: -210px 0 0 -210px;
          background: radial-gradient(circle, rgba(236,72,153,0.18), rgba(236,72,153,0) 70%);
          animation: om-blob-drift-2 20s ease-in-out infinite;
        }
        .om-blob-3 {
          width: 460px;
          height: 460px;
          margin: -230px 0 0 -230px;
          background: radial-gradient(circle, rgba(59,130,246,0.14), rgba(59,130,246,0) 70%);
          animation: om-blob-drift-3 24s ease-in-out infinite;
        }
        @keyframes om-blob-drift-1 {
          0%, 100% { transform: translate(-40px, -20px) scale(1); }
          50% { transform: translate(30px, 25px) scale(1.12); }
        }
        @keyframes om-blob-drift-2 {
          0%, 100% { transform: translate(50px, 20px) scale(1); }
          50% { transform: translate(-40px, -30px) scale(0.9); }
        }
        @keyframes om-blob-drift-3 {
          0%, 100% { transform: translate(-20px, 30px) scale(1.05); }
          50% { transform: translate(35px, -25px) scale(0.95); }
        }

        /* ---- live audio halo (equalizer ring) ---- */
        .om-halo {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 1px;
          height: 1px;
        }
        .om-hbar {
          position: absolute;
          left: 0;
          top: 0;
          width: 2.5px;
          border-radius: 2px;
          background: var(--accent);
          transform-origin: 50% 0;
          animation-name: om-hbar-pulse;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes om-hbar-pulse {
          0%, 100% { opacity: 0.16; transform: rotate(var(--a)) translateY(var(--r)) scaleY(0.5); }
          50% { opacity: 0.6; transform: rotate(var(--a)) translateY(var(--r)) scaleY(1); }
        }

        /* ---- floating service cards ---- */
        .om-float-card {
          position: absolute;
          width: 118px;
          padding: 12px 14px;
          border-radius: 16px;
          background: rgba(255,255,255,0.55);
          backdrop-filter: blur(18px) saturate(180%);
          -webkit-backdrop-filter: blur(18px) saturate(180%);
          border: 1px solid rgba(255,255,255,0.6);
          box-shadow: 0 16px 40px -12px rgba(124,58,237,0.25);
          animation-name: om-card-float;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        .om-fc-icon {
          width: 26px;
          height: 26px;
          border-radius: 8px;
          background: var(--accent);
          color: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 8px;
        }
        .om-fc-label {
          font-family: 'Switzer', sans-serif;
          font-size: 10.5px;
          font-weight: 600;
          color: var(--text);
          letter-spacing: 0.01em;
        }
        .om-fc-1 { top: 16%; left: 8%; animation-duration: 7s; }
        .om-fc-2 { bottom: 20%; left: 13%; animation-duration: 8.5s; animation-delay: 0.6s; }
        .om-fc-3 { top: 18%; right: 8%; animation-duration: 7.5s; animation-delay: 1.1s; }
        .om-fc-4 { bottom: 22%; right: 12%; animation-duration: 9s; animation-delay: 1.6s; }
        @keyframes om-card-float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-16px) rotate(-2deg); }
        }

        /* ---- sparkle particles ---- */
        .om-spark {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--accent);
          animation-name: om-spark-twinkle;
          animation-timing-function: ease-in-out;
          animation-iteration-count: infinite;
        }
        @keyframes om-spark-twinkle {
          0%, 100% { opacity: 0; transform: scale(0.6); }
          50% { opacity: 0.65; transform: scale(1.4); }
        }

        @media (prefers-reduced-motion: reduce) {
          .om-blob-1, .om-blob-2, .om-blob-3, .om-hbar, .om-float-card, .om-spark {
            animation: none;
          }
        }

        @media (max-width: 767px) {
          .om-float-card { display: none; }
          .om-halo { transform: scale(0.7); }
        }
      `}</style>
    </div>
  );
}