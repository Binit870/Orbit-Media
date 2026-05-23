import { useEffect, useRef } from "react";

const LOGOS = [
  "ace.me",
  "orbit.media.in",
  "visual.ayush",
  "elevatorgoods",
  "reflyofficial",
];

export default function LogoMarquee() {
  const trackRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let animId;
    let pos = 0;
    const speed = 0.6;
    const half = track.scrollWidth / 2;

    const tick = () => {
      pos += speed;
      if (pos >= half) pos = 0;
      track.style.transform = `translateX(-${pos}px)`;
      animId = requestAnimationFrame(tick);
    };

    animId = requestAnimationFrame(tick);

    const pause = () => cancelAnimationFrame(animId);
    const resume = () => { animId = requestAnimationFrame(tick); };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);

    return () => {
      cancelAnimationFrame(animId);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
    };
  }, []);

  const items = [...LOGOS, ...LOGOS, ...LOGOS];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@800;900&display=swap');

        .lm-section {
          position: relative;
          overflow: hidden;
          background: linear-gradient(135deg, #07091A 0%, #0D0A24 40%, #120B2E 70%, #07091A 100%);
          padding: 28px 0 40px;

        }

        .lm-glow-left {
          position: absolute;
          top: -80px;
          left: -100px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(139,92,246,0.28) 0%, transparent 70%);
          pointer-events: none;
        }

        .lm-glow-right {
          position: absolute;
          bottom: -80px;
          right: -100px;
          width: 320px;
          height: 320px;
          background: radial-gradient(circle, rgba(217,70,239,0.22) 0%, transparent 70%);
          pointer-events: none;
        }

        .lm-grid {
          position: absolute;
          inset: 0;
          opacity: 0.05;
          background-image:
            linear-gradient(rgba(255,255,255,0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .lm-label {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 12px;
          position: relative;
          z-index: 2;
          padding: 0 16px;
        }

        .lm-rule {
          height: 1px;
          width: 48px;
          background: linear-gradient(90deg, transparent, rgba(167,139,250,0.5));
          flex-shrink: 0;
        }

        .lm-rule.right {
          background: linear-gradient(90deg, rgba(167,139,250,0.5), transparent);
        }

        .lm-label-text {
          font-family: system-ui, -apple-system, sans-serif;
          font-size: 10px;
          letter-spacing: 0.38em;
          color: rgba(255,255,255,0.38);
          font-weight: 500;
          text-transform: uppercase;
          white-space: nowrap;
        }

        .lm-fade-wrap {
          position: relative;
          z-index: 2;
          overflow: hidden;
          -webkit-mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
          mask-image: linear-gradient(
            90deg,
            transparent 0%,
            black 8%,
            black 92%,
            transparent 100%
          );
        }

        .lm-track {
          display: flex;
          align-items: center;
          width: max-content;
          will-change: transform;
        }

        .lm-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0 30px;
          white-space: nowrap;
          cursor: default;
        }

        .lm-dot-wrap {
          position: relative;
          flex-shrink: 0;
          width: 8px;
          height: 8px;
        }

        .lm-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #A855F7;
          position: relative;
          z-index: 1;
        }

        .lm-dot-glow {
          position: absolute;
          inset: -4px;
          border-radius: 50%;
          background: rgba(168, 85, 247, 0.55);
          filter: blur(6px);
        }

        .lm-name {
          font-family: 'Syne', system-ui, sans-serif;
          font-size: 22px;
          font-weight: 900;
          letter-spacing: -0.04em;
          color: rgba(255, 255, 255, 0.6);
          transition: color 0.25s ease;
          user-select: none;
        }

        .lm-item:hover .lm-name {
          color: rgba(255, 255, 255, 1);
        }

        .lm-item:hover .lm-dot {
          background: #D946EF;
        }
      `}</style>

      <section className="lm-section">
        <div className="lm-glow-left" />
        <div className="lm-glow-right" />
        <div className="lm-grid" />

        {/* Label row */}
        <div className="lm-label">
          <div className="lm-rule" />
          <span className="lm-label-text">
            Trusted by founders, creators &amp; funded startups
          </span>
          <div className="lm-rule right" />
        </div>

        {/* Scrolling logos */}
        <div className="lm-fade-wrap">
          <div className="lm-track" ref={trackRef}>
            {items.map((logo, i) => (
              <div key={i} className="lm-item">
                <div className="lm-dot-wrap">
                  <div className="lm-dot-glow" />
                  <div className="lm-dot" />
                </div>
                <span className="lm-name">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}