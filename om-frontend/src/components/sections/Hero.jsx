import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion as Motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ServicesOrbit3D from "../ui/ServicesOrbit3D";
import OrbitIcon from "../ui/OrbitIcon";
import { AccentButton, ArrowLink } from "../ui/Button";
import { SESSION_KEY as LOADER_SESSION_KEY } from "../ui/Loader";

const lineVariants = {
  hidden: { opacity: 0, y: 22, filter: "blur(6px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1], delay: 0.12 + i * 0.1 },
  }),
};

const TEXT_SIDE = "left";
const DESKTOP_QUERY = "(min-width: 901px)";

function backToIntro() {
  try {
    sessionStorage.removeItem(LOADER_SESSION_KEY);
  } catch {
    /* sessionStorage unavailable (privacy mode etc.) — ignore */
  }
  window.location.href = "/";
}

// Only true above the 900px grid breakpoint. Used to decide whether the
// top bar gets pinned (desktop, via portal) or scrolls in normal flow
// (mobile, rendered inline as the section's second stacked block).
function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia(DESKTOP_QUERY).matches : true
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);
    const handler = (e) => setIsDesktop(e.matches);
    handler(mq);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return isDesktop;
}

function HeroTopBar() {
  const isDesktop = useIsDesktop();

  const content = (
    <div className="om-hero-topbar">
      <Motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        className="om-back-btn"
        onClick={backToIntro}
        aria-label="Back to intro"
      >
        <ArrowLeft size={18} strokeWidth={2} />
      </Motion.button>

      <Motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="om-hero-logo"
      >
        <OrbitIcon size={isDesktop ? 34 : 26} style={{ color: "var(--accent)" }} />
        <span className="om-hero-logo-text">
          Orbit <span style={{ color: "var(--accent)" }}>Media</span>
        </span>
      </Motion.div>

      <div className="om-hero-topbar-spacer" />
    </div>
  );

  // Desktop: portal into <body> so `position: fixed` centers against the
  // real viewport, immune to any ancestor transform. Mobile: render right
  // where it sits in the tree so it scrolls with the page like everything else.
  if (isDesktop && typeof document !== "undefined") {
    return createPortal(content, document.body);
  }
  return content;
}

export default function Hero() {
  const textOrder = TEXT_SIDE === "left" ? 1 : 2;
  const orbitOrder = TEXT_SIDE === "left" ? 2 : 1;

  return (
    <section className="om-hero-section">
      <style>{`
        .om-hero-section {
          position: relative;
          overflow: hidden;
          padding: 120px 24px 96px;
          min-height: 88vh;
          display: flex;
          align-items: center;
        }
        @media (max-width: 900px) {
          .om-hero-section {
            flex-direction: column;
            align-items: stretch;
            min-height: auto;
            padding: 0 0 56px;
            overflow: visible;
          }
        }

        /* ---- Canvas: full-bleed background on desktop, stacked block first on mobile ---- */
        .om-hero-canvas-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
        }
                @media (max-width: 900px) {
          .om-hero-canvas-bg {
            position: relative;
            inset: auto;
            width: 100%;
            height: 85vw;
            max-height: 480px;
            min-height: 300px;
            order: 2;
          }
        }

        /* ---- Top bar: fixed+centered on desktop, in-flow+scrollable on mobile ---- */
        .om-hero-topbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 9999;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          padding: 24px 26px;
          pointer-events: none;
        }
               @media (max-width: 900px) {
          .om-hero-topbar {
            position: static;
            order: 1;
            padding: 18px 20px 4px;
            pointer-events: auto;
          }
        }
        .om-back-btn {
          grid-column: 1;
          justify-self: start;
          pointer-events: auto;
          width: 40px;
          height: 40px;
          border-radius: 10px;
          border: 1px solid var(--hairline, #e5e5ea);
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: var(--text);
          box-shadow: 0 1px 2px rgba(16, 16, 20, 0.06);
          transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
        }
        .om-back-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateX(-2px);
        }
        .om-hero-logo {
          grid-column: 2;
          justify-self: center;
          pointer-events: auto;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .om-hero-logo-text {
          font-family: 'Switzer', sans-serif;
          font-size: 30px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text);
          line-height: 1;
          white-space: nowrap;
        }
        .om-hero-topbar-spacer { grid-column: 3; }
        @media (max-width: 900px) {
          .om-hero-logo-text { font-size: 20px; }
        }

        /* ---- Text + CTA grid ---- */
        .om-hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          align-items: center;
          gap: 48px;
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
        }
        .om-hero-text {
          text-align: ${TEXT_SIDE === "left" ? "left" : "right"};
          order: ${textOrder};
        }
        .om-hero-cta {
          justify-content: ${TEXT_SIDE === "left" ? "flex-start" : "flex-end"};
        }
        .om-hero-orbit {
          order: ${orbitOrder};
          width: 100%;
          max-width: 520px;
          aspect-ratio: 1 / 1;
          margin: 0 auto;
        }

        @media (max-width: 900px) {
          .om-hero-grid {
            grid-template-columns: 1fr;
            gap: 8px;
            order: 3;
            padding: 4px 24px 0;
          }
          .om-hero-text { text-align: center; order: 1; }
          .om-hero-cta { justify-content: center; }
          /* real animation already renders above as its own block —
             this spacer div is only needed to balance the desktop grid */
          .om-hero-orbit { display: none; }
        }

        /* Floating service chip labels rendered inside the WebGL scene */
        .om-hero-orbit-card {
          display: flex;
          align-items: center;
          gap: 10px;
          background: #fff;
          border: 1px solid var(--hairline, #e6e4f0);
          border-radius: 999px;
          padding: 8px 16px 8px 8px;
          box-shadow: 0 10px 24px -14px rgba(76, 60, 180, 0.3);
          width: max-content;
          max-width: 158px;
          text-align: left;
        }
        .om-hero-orbit-card-icon {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: linear-gradient(135deg, #8b7cff, #6c5ce7);
          color: #fff;
        }
        .om-hero-orbit-card-label {
          display: block;
          font-size: 12.5px;
          font-weight: 600;
          line-height: 1.25;
          color: var(--text, #17162b);
        }
        @media (max-width: 480px) {
          .om-hero-orbit-card { max-width: 120px; padding: 6px 12px 6px 6px; gap: 6px; }
          .om-hero-orbit-card-icon { width: 24px; height: 24px; }
          .om-hero-orbit-card-icon svg { width: 12px; height: 12px; }
          .om-hero-orbit-card-label { font-size: 10.5px; }
        }
      `}</style>

      <ServicesOrbit3D />
      <HeroTopBar />

      <div className="om-hero-grid">
        <div className="om-hero-text">
          <Motion.div
            custom={0}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="om-eyebrow"
            style={{ marginBottom: 22 }}
          >
            Shaping Tech Media
          </Motion.div>

          <h1
            className="om-heading"
            style={{
              fontSize: "clamp(38px, 5.4vw, 72px)",
              margin: 0,
              overflow: "hidden",
            }}
          >
            <Motion.span custom={1} initial="hidden" animate="visible" variants={lineVariants} style={{ display: "block" }}>
              Distributing
            </Motion.span>
            <Motion.span
              custom={2}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="om-heading-gradient"
              style={{ display: "block" }}
            >
              Tech Media
            </Motion.span>
          </h1>

          <Motion.p
            custom={3}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="om-body"
            style={{
              fontSize: "clamp(13.5px, 1.3vw, 15px)",
              marginTop: 26,
              maxWidth: 440,
            }}
          >
            The media engine for founders, startups &amp; venture-backed brands —
            podcasting, launch videos, founder brands and AI UGC, produced and distributed.
          </Motion.p>

          <Motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="om-hero-cta"
            style={{
              marginTop: 40,
              display: "flex",
              alignItems: "center",
              gap: 24,
              flexWrap: "wrap",
            }}
          >
            <AccentButton to="https://cal.com/ayush-kumar-ujqipk/15min">
              Book a Call
            </AccentButton>
            <ArrowLink to="/case-studies">See the work</ArrowLink>
          </Motion.div>
        </div>

        <div className="om-hero-orbit" />
      </div>
    </section>
  );
}