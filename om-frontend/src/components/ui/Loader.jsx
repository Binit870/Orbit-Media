import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence } from "framer-motion";
import { useInView } from "framer-motion";
import { useNavigate } from "react-router-dom";
import OrbitIcon from "./OrbitIcon";
import MediaOrbit from "./MediaOrbit";
import { stats } from "../../data/stats";

export const SESSION_KEY = "om-loader-seen";
const CALENDLY_URL = "https://cal.com/ayush-kumar-ujqipk/15min";
// "See portfolio" takes people into the main site, not the (placeholder)
// case studies route.
const PORTFOLIO_ROUTE = "/";

const CLIENTS = [
  "Northwind",
  "Lumen Labs",
  "Vertex",
  "Anchorline",
  "Kestrel",
  "Solace",
  "Meridian",
  "Haloworks",
];

function StatCounter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1100;
    const start = performance.now();
    let raf;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

const WORDMARK = "Orbit Media";
const ACCENT_FROM_INDEX = 6; // "Orbit " is 6 chars — "Media" onward is accent-colored

const wordmarkContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.035, delayChildren: 0.35 },
  },
};
const letterVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.6, 0, 0.4, 1] } },
};

function Wordmark() {
  return (
    <Motion.div
      variants={wordmarkContainer}
      initial="hidden"
      animate="visible"
      style={{
        fontFamily: "'Switzer', sans-serif",
        fontSize: 32,
        fontWeight: 700,
        color: "var(--text)",
        letterSpacing: "-0.01em",
        display: "flex",
      }}
      aria-label={WORDMARK}
    >
      {WORDMARK.split("").map((ch, i) => (
        <Motion.span
          key={i}
          variants={letterVariants}
          style={{
            display: "inline-block",
            color: i >= ACCENT_FROM_INDEX ? "var(--accent)" : "inherit",
          }}
        >
          {ch === " " ? "\u00A0" : ch}
        </Motion.span>
      ))}
    </Motion.div>
  );
}

export default function Loader({ onDone }) {
  const navigate = useNavigate();
  const [exiting, setExiting] = useState(false);
  const [skip] = useState(
    () => typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1"
  );

  const finish = () => {
    if (exiting) return;
    sessionStorage.setItem(SESSION_KEY, "1");
    document.body.style.overflow = "";
    setExiting(true);
    setTimeout(() => onDone?.(), 600);
  };

  useEffect(() => {
    if (skip) {
      onDone?.();
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skip]);

  const goToPortfolio = () => {
    finish();
    navigate(PORTFOLIO_ROUTE);
  };

  function openCalendly() {
    const open = () => window.Calendly?.initPopupWidget({ url: CALENDLY_URL });
    if (window.Calendly) {
      open();
      return;
    }
    if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = "https://assets.calendly.com/assets/external/widget.css";
      document.head.appendChild(link);
    }
    if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
      const script = document.createElement("script");
      script.src = "https://assets.calendly.com/assets/external/widget.js";
      script.async = true;
      script.onload = open;
      document.body.appendChild(script);
    } else {
      const check = setInterval(() => {
        if (window.Calendly) {
          clearInterval(check);
          open();
        }
      }, 100);
    }
  }

  if (skip) return null;

  return (
    <AnimatePresence>
      {!exiting && (
        <Motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.55, ease: [0.6, 0, 0.4, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            overflow: "hidden",
            height: "100dvh",
            width: "100vw",
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            // pinned to the top, not centered in the viewport
            justifyContent: "flex-start",
            overflowY: "auto",
          }}
        >
          {/*
            Three-zone vertical layout, pinned to the full viewport height:
            logo/wordmark at the very top → tagline + stats + buttons
            vertically centered in the remaining space → client logos
            pinned to the bottom edge. The side "media orbit" graphics are
            purely decorative and absolutely positioned against the
            viewport center, so they never affect this rhythm.
          */}
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              left: "clamp(24px, 6vw, 96px)",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            <MediaOrbit size={220} />
          </div>
          <div
            className="hidden lg:block"
            style={{
              position: "absolute",
              right: "clamp(24px, 6vw, 96px)",
              top: "50%",
              transform: "translateY(-50%)",
              pointerEvents: "none",
            }}
            aria-hidden="true"
          >
            <MediaOrbit size={220} />
          </div>

          {/* content column */}
          <div
            style={{
              position: "relative",
              zIndex: 1,
              maxWidth: 640,
              width: "100%",
              minHeight: "100vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "clamp(20px, 3vh, 32px) 24px 40px",
            }}
          >
              {/* logo + wordmark — top of the screen */}
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <Motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
                  animate={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <OrbitIcon size={42} style={{ color: "var(--accent)" }} />
                </Motion.div>
                <Wordmark />
              </div>

              {/* tagline + stats + buttons — vertically centered in the
                  space left between the logo above and the clients below */}
              <div
                style={{
                  flex: 1,
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}>
                <Motion.p
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.85, ease: [0.6, 0, 0.4, 1] }}
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "clamp(15px, 1.8vw, 18px)",
                    color: "var(--text-muted)",
                    maxWidth: 480,
                    lineHeight: 1.55,
                    margin: 0,
                  }}
                >
                  We create content that performs — podcasts, launch videos and
                  founder brands, produced and distributed.
                </Motion.p>

                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.95, ease: [0.6, 0, 0.4, 1] }}
                  style={{ display: "flex", gap: 32 }}
                >
                  {stats.map((s, i) => (
                    <div
                      key={s.label}
                      style={{
                        textAlign: "center",
                        paddingLeft: i === 0 ? 0 : 24,
                        borderLeft: i === 0 ? "none" : "1px solid var(--hairline)",
                      }}
                    >
                      <div
                        style={{
                          fontFamily: "'Switzer', sans-serif",
                          fontWeight: 700,
                          fontSize: "clamp(20px, 2.6vw, 28px)",
                          color: "var(--accent)",
                        }}
                      >
                        <StatCounter value={s.value} suffix={s.suffix} />
                      </div>
                      <div
                        style={{
                          fontFamily: "'Switzer', sans-serif",
                          fontSize: 11,
                          letterSpacing: "0.03em",
                          color: "var(--text-faint)",
                          marginTop: 4,
                        }}
                      >
                        {s.label}
                      </div>
                    </div>
                  ))}
                </Motion.div>

                <Motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 1.05, ease: [0.6, 0, 0.4, 1] }}
                  style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}
                >
                  <button
                    onClick={goToPortfolio}
                    style={{
                      fontFamily: "'Switzer', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "var(--text)",
                      background: "var(--bg)",
                      border: "1px solid var(--hairline)",
                      borderRadius: 10,
                      padding: "13px 26px",
                      cursor: "pointer",
                      transition: "border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
                    onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--hairline)")}
                  >
                    See portfolio
                  </button>
                  <button
                    onClick={openCalendly}
                    style={{
                      fontFamily: "'Switzer', sans-serif",
                      fontSize: 15,
                      fontWeight: 600,
                      color: "#fff",
                      background: "var(--accent)",
                      border: "1px solid var(--accent)",
                      borderRadius: 10,
                      padding: "13px 26px",
                      cursor: "pointer",
                      transition: "opacity 0.2s ease",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                  >
                    Book a call
                  </button>
                </Motion.div>
                </div>
              </div>

              {/* client logos — pinned to the bottom */}
              <Motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.15, ease: [0.6, 0, 0.4, 1] }}
                style={{ width: "100%" }}
              >
                <div
                  style={{
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: "0.03em",
                    color: "var(--text-faint)",
                    marginBottom: 16,
                  }}
                >
                  Our clients
                </div>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    alignItems: "center",
                    columnGap: 32,
                    rowGap: 12,
                  }}
                >
                  {CLIENTS.map((name) => (
                    <span
                      key={name}
                      style={{
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: 15,
                        fontWeight: 600,
                        color: "var(--text)",
                        opacity: 0.4,
                      }}
                    >
                      {name}
                    </span>
                  ))}
                </div>
              </Motion.div>
          </div>
        </Motion.div>
      )}
    </AnimatePresence>
  );
}