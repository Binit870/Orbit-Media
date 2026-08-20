import { useState, useEffect } from "react";
import { motion as Motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import ServicesOrbit3D from "../ui/ServicesOrbit3D";
import OrbitIcon from "../ui/OrbitIcon";
import { AccentButton, ArrowLink } from "../ui/Button";
import { SESSION_KEY as LOADER_SESSION_KEY } from "../ui/Loader";

const TEXT_SIDE = "left";
const DESKTOP_QUERY = "(min-width: 901px)";

const lineVariants = {
  hidden: {
    opacity: 0,
    y: 22,
    filter: "blur(6px)",
  },

  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
      delay: 0.12 + i * 0.1,
    },
  }),
};

function backToIntro() {
  try {
    sessionStorage.removeItem(LOADER_SESSION_KEY);
  } catch {
    // Ignore sessionStorage errors.
  }

  window.location.href = "/";
}

function useIsDesktop() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia(DESKTOP_QUERY).matches
      : true
  );

  useEffect(() => {
    const mq = window.matchMedia(DESKTOP_QUERY);

    const handler = (event) => {
      setIsDesktop(event.matches);
    };

    handler(mq);
    mq.addEventListener("change", handler);

    return () => {
      mq.removeEventListener("change", handler);
    };
  }, []);

  return isDesktop;
}

function HeroTopBar() {
  const isDesktop = useIsDesktop();

  return (
    <div className="om-hero-topbar">
      <Motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.1,
        }}
        className="om-back-btn"
        onClick={backToIntro}
        aria-label="Back to intro"
        type="button"
      >
        <ArrowLeft size={18} strokeWidth={2} />
      </Motion.button>

      <Motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: [0.16, 1, 0.3, 1],
          delay: 0.15,
        }}
        className="om-hero-logo"
      >
        <OrbitIcon
          size={isDesktop ? 34 : 26}
          style={{ color: "var(--accent)" }}
        />

        <span className="om-hero-logo-text">
          Orbit <span className="om-hero-logo-accent">Media</span>
        </span>
      </Motion.div>

      <div className="om-hero-topbar-spacer" />
    </div>
  );
}

export default function Hero() {
  const textOrder = TEXT_SIDE === "left" ? 1 : 2;
  const orbitOrder = TEXT_SIDE === "left" ? 2 : 1;

  return (
    <section className="om-hero-section">
      <style>{`
        /* =========================================================
           HERO
           ========================================================= */

        .om-hero-section {
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          padding: 0 24px 64px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          overflow: hidden;
          background: var(--bg, #fff);
        }

        /* =========================================================
           3D BACKGROUND / CANVAS
           ========================================================= */

        .om-hero-canvas-bg {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          overflow: hidden;
          pointer-events: none;
        }

        /* =========================================================
           TOP BAR
           ========================================================= */

        .om-hero-topbar {
          position: relative;
          z-index: 20;

          width: 100%;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;

          padding: 24px 2px;

          flex-shrink: 0;
        }

        .om-back-btn {
          grid-column: 1;
          justify-self: start;

          width: 40px;
          height: 40px;

          display: flex;
          align-items: center;
          justify-content: center;

          padding: 0;

          border: 1px solid var(--hairline, #e5e5ea);
          border-radius: 10px;

          background: #fff;
          color: var(--text, #17162b);

          box-shadow: 0 1px 2px rgba(16, 16, 20, 0.06);

          cursor: pointer;
          pointer-events: auto;

          transition:
            border-color 0.2s ease,
            color 0.2s ease,
            transform 0.2s ease,
            box-shadow 0.2s ease;
        }

        .om-back-btn:hover {
          border-color: var(--accent);
          color: var(--accent);
          transform: translateX(-2px);
          box-shadow: 0 6px 18px rgba(124, 58, 237, 0.1);
        }

        .om-back-btn:focus-visible {
          outline: 2px solid var(--accent);
          outline-offset: 3px;
        }

        .om-hero-logo {
          grid-column: 2;
          justify-self: center;

          display: flex;
          align-items: center;
          justify-content: center;

          gap: 10px;

          pointer-events: auto;
          min-width: 0;
        }

        .om-hero-logo-text {
          font-family: "Switzer", sans-serif;
          font-size: clamp(19px, 2vw, 30px);
          font-weight: 600;
          letter-spacing: -0.02em;
          line-height: 1;
          color: var(--text);
          white-space: nowrap;
        }

        .om-hero-logo-accent {
          color: var(--accent);
        }

        .om-hero-topbar-spacer {
          grid-column: 3;
        }

        /* =========================================================
           MAIN HERO GRID
           ========================================================= */

        .om-hero-grid {
          position: relative;
          z-index: 2;

          width: min(100%, 1240px);
          margin: 0 auto;

          flex: 1;
          min-height: 0;

          display: grid;
          grid-template-columns:
            minmax(0, 1fr)
            minmax(0, 1fr);

          align-items: center;
          align-content: center;

          gap: clamp(28px, 4vw, 64px);
        }

        .om-hero-text {
          order: ${textOrder};

          width: 100%;
          min-width: 0;

          text-align: ${TEXT_SIDE === "left" ? "left" : "right"};
        }

        .om-hero-orbit {
          order: ${orbitOrder};

          width: min(100%, 520px);
          aspect-ratio: 1 / 1;

          margin: 0 auto;

          min-width: 0;
        }

        /* =========================================================
           EYEBROW
           ========================================================= */

        .om-hero-text .om-eyebrow {
          margin-bottom: 22px;
          font-size: clamp(10px, 0.8vw, 12px);
          line-height: 1.4;
        }

        /* =========================================================
           HEADING
           ========================================================= */

        .om-hero-text .om-heading {
          width: 100%;
          max-width: 760px;

          margin: 0;

          font-family: "Switzer", sans-serif;
          font-size: clamp(44px, 5.4vw, 72px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.045em;

          overflow: hidden;
        }

        .om-hero-text .om-heading > span {
          display: block;
          max-width: 100%;
        }

        .om-heading-gradient {
          color: var(--accent);
        }

        /* =========================================================
           BODY
           ========================================================= */

        .om-hero-text .om-body {
          width: min(100%, 440px);

          margin-top: 26px;
          margin-bottom: 0;

          font-family: "Switzer", sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.65;
          font-weight: 400;

          color: var(--text-body, #2b2b30);
        }

        /* =========================================================
           CTA
           ========================================================= */

        .om-hero-cta {
          margin-top: 40px;

          display: flex;
          align-items: center;

          gap: 24px;

          flex-wrap: wrap;
        }

        /* =========================================================
           ORBIT LABELS
           ========================================================= */

        .om-hero-orbit-card {
          display: flex;
          align-items: center;
          gap: 10px;

          width: max-content;
          max-width: 158px;

          padding: 8px 16px 8px 8px;

          background: #fff;

          border: 1px solid var(--hairline, #e6e4f0);
          border-radius: 999px;

          box-shadow:
            0 10px 24px -14px rgba(76, 60, 180, 0.3);

          text-align: left;
        }

        .om-hero-orbit-card-icon {
          flex: 0 0 auto;

          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 50%;

          background: linear-gradient(
            135deg,
            #8b7cff,
            #6c5ce7
          );

          color: #fff;
        }

        .om-hero-orbit-card-label {
          display: block;

          font-size: 12.5px;
          font-weight: 600;
          line-height: 1.25;

          color: var(--text, #17162b);
        }

        /* =========================================================
           LARGE TABLET / SMALL LAPTOP
           ========================================================= */

        @media (max-width: 1100px) {
          .om-hero-section {
            padding-left: 20px;
            padding-right: 20px;
          }

          .om-hero-grid {
            gap: 28px;
          }

          .om-hero-text .om-heading {
            font-size: clamp(40px, 6vw, 62px);
          }

          .om-hero-orbit {
            width: min(100%, 460px);
          }
        }

        /* =========================================================
           TABLET
           ========================================================= */

        @media (max-width: 900px) {
          .om-hero-section {
            min-height: 100svh;

            padding: 0 0 56px;

            display: flex;
            flex-direction: column;

            overflow: hidden;
          }

          .om-hero-topbar {
            position: relative;
            z-index: 20;

            order: 1;

            padding: 18px 20px 6px;
          }

          .om-hero-grid {
            order: 3;

            width: 100%;

            flex: none;

            grid-template-columns: 1fr;

            gap: 0;

            padding: 8px 24px 0;

            align-content: start;
          }

          .om-hero-text {
            order: 1;

            width: 100%;
            max-width: 760px;

            margin: 0 auto;

            text-align: center;
          }

          .om-hero-text .om-eyebrow {
            margin-bottom: 18px;
          }

          .om-hero-text .om-heading {
            max-width: 760px;
            margin-left: auto;
            margin-right: auto;

            font-size: clamp(38px, 9vw, 58px);
            line-height: 1;

            letter-spacing: -0.045em;
          }

          .om-hero-text .om-body {
            width: min(100%, 560px);

            margin: 22px auto 0;

            font-size: 15px;
            line-height: 1.65;
          }

          .om-hero-cta {
            justify-content: center;

            margin-top: 30px;

            gap: 18px;
          }

          .om-hero-orbit {
            display: none;
          }

          /*
             ServicesOrbit3D should occupy the middle visual block
             on mobile when it uses this class.
          */
          .om-hero-canvas-bg {
            position: relative;
            inset: auto;

            order: 2;

            width: 100%;
            height: min(60vw, 520px);

            min-height: 320px;
            max-height: 520px;

            flex-shrink: 0;

            pointer-events: none;
          }
        }

        /* =========================================================
           MOBILE
           ========================================================= */

        @media (max-width: 600px) {
          .om-hero-section {
            min-height: 100svh;

            padding-bottom: 42px;
          }

          .om-hero-topbar {
            padding: 16px 16px 4px;
          }

          .om-back-btn {
            width: 38px;
            height: 38px;
            border-radius: 9px;
          }

          .om-hero-logo {
            gap: 7px;
          }

          .om-hero-logo-text {
            font-size: 20px;
          }

          .om-hero-canvas-bg {
            height: 82vw;
            min-height: 290px;
            max-height: 390px;
          }

          .om-hero-grid {
            padding: 6px 20px 0;
          }

          .om-hero-text .om-eyebrow {
            margin-bottom: 15px;

            font-size: 10px;
            letter-spacing: 0.26em;
          }

          .om-hero-text .om-heading {
            font-size: clamp(36px, 11vw, 52px);
            line-height: 1;

            letter-spacing: -0.045em;
          }

          .om-hero-text .om-body {
            width: min(100%, 500px);

            margin-top: 20px;

            font-size: 14px;
            line-height: 1.6;
          }

          .om-hero-cta {
            margin-top: 26px;

            gap: 14px;

            justify-content: center;
          }
        }

        /* =========================================================
           SMALL PHONES
           ========================================================= */

        @media (max-width: 480px) {
          .om-hero-section {
            padding-bottom: 34px;
          }

          .om-hero-topbar {
            padding-left: 14px;
            padding-right: 14px;
          }

          .om-back-btn {
            width: 36px;
            height: 36px;
          }

          .om-hero-logo-text {
            font-size: 18px;
          }

          .om-hero-canvas-bg {
            height: 82vw;
            min-height: 270px;
            max-height: 340px;
          }

          .om-hero-grid {
            padding-left: 16px;
            padding-right: 16px;
          }

          .om-hero-text .om-heading {
            font-size: clamp(34px, 11vw, 46px);
          }

          .om-hero-text .om-body {
            font-size: 14px;
            line-height: 1.58;
          }

          .om-hero-cta {
            flex-direction: column;
            gap: 14px;

            width: 100%;
          }

          .om-hero-cta > * {
            max-width: 100%;
          }

          .om-hero-orbit-card {
            max-width: 120px;
            padding: 6px 12px 6px 6px;
            gap: 6px;
          }

          .om-hero-orbit-card-icon {
            width: 24px;
            height: 24px;
          }

          .om-hero-orbit-card-icon svg {
            width: 12px;
            height: 12px;
          }

          .om-hero-orbit-card-label {
            font-size: 10.5px;
          }
        }

        /* =========================================================
           VERY SMALL PHONES
           ========================================================= */

        @media (max-width: 380px) {
          .om-hero-topbar {
            padding-top: 14px;
          }

          .om-hero-logo-text {
            font-size: 17px;
          }

          .om-back-btn {
            width: 34px;
            height: 34px;
          }

          .om-hero-canvas-bg {
            min-height: 250px;
          }

          .om-hero-text .om-heading {
            font-size: 34px;
            line-height: 1;
          }

          .om-hero-text .om-body {
            font-size: 13.5px;
          }
        }

        /* =========================================================
           LANDSCAPE PHONES
           ========================================================= */

        @media (max-width: 900px) and (orientation: landscape) {
          .om-hero-section {
            min-height: auto;
          }

          .om-hero-canvas-bg {
            height: 65vh;
            min-height: 240px;
            max-height: 400px;
          }

          .om-hero-text .om-heading {
            font-size: clamp(34px, 7vw, 48px);
          }

          .om-hero-text .om-body {
            max-width: 600px;
          }
        }

        /* =========================================================
           ACCESSIBILITY
           ========================================================= */

        @media (prefers-reduced-motion: reduce) {
          .om-hero-section *,
          .om-hero-section *::before,
          .om-hero-section *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
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
          >
            Shaping Tech Media
          </Motion.div>

          <h1 className="om-heading">
            <Motion.span
              custom={1}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
            >
              Distributing
            </Motion.span>

            <Motion.span
              custom={2}
              initial="hidden"
              animate="visible"
              variants={lineVariants}
              className="om-heading-gradient"
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
          >
            The media engine for founders, startups &amp; venture-backed
            brands — podcasting, launch videos, founder brands and AI UGC,
            produced and distributed.
          </Motion.p>

          <Motion.div
            custom={4}
            initial="hidden"
            animate="visible"
            variants={lineVariants}
            className="om-hero-cta"
          >
            <AccentButton to="https://cal.com/ayush-kumar-ujqipk/15min">
              Book a Call
            </AccentButton>

            <ArrowLink to="/case-studies">
              See the work
            </ArrowLink>
          </Motion.div>
        </div>

        <div className="om-hero-orbit" aria-hidden="true" />
      </div>
    </section>
  );
}