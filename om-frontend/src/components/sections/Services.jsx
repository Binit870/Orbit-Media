import { useEffect, useRef, useState } from "react";
import { motion as Motion, AnimatePresence, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { services } from "../../data/services";
import { Link } from "react-router-dom";

const SLIDE_INTERVAL = 5000;
const DEFAULT_THUMB =
  "https://res.cloudinary.com/db2ehmua9/image/upload/v1782801029/Gemini_Generated_Image_9ej1iv9ej1iv9ej1_lfvevy.png";

/**
 * Auto-cycling video preview for a service card's front face.
 */
function ServiceCardMedia({ videos, name }) {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { once: true, margin: "200px" });
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!inView || !videos || videos.length < 2) return;
    const t = setInterval(() => {
      setIndex((i) => (i + 1) % videos.length);
    }, SLIDE_INTERVAL);
    return () => clearInterval(t);
  }, [inView, videos]);

  if (!videos || videos.length === 0) return null;

  return (
    <div ref={wrapRef} style={{ position: "absolute", inset: 0 }}>
      {inView && (
        <AnimatePresence mode="wait">
          <Motion.video
            key={videos[index]}
            src={videos[index]}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
          />
        </AnimatePresence>
      )}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 45%, transparent 70%)",
        }}
      />
      {videos.length > 1 && (
        <div style={{ position: "absolute", bottom: 14, left: 20, display: "flex", gap: 5 }} aria-hidden="true">
          {videos.map((v, i) => (
            <div
              key={v}
              style={{
                width: i === index ? 16 : 5,
                height: 5,
                borderRadius: 3,
                background: i === index ? "var(--accent)" : "rgba(255,255,255,0.5)",
                transition: "width 0.3s ease, background 0.3s ease",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function ServiceCard({ service }) {
  const thumbnail = service.offer?.[0]?.image || DEFAULT_THUMB;

  return (
    <Link
      to={`/services/${service.slug}`}
      className="om-service-card om-flip-card"
      aria-label={`Explore ${service.name}`}
      style={{
        position: "relative",
        flexShrink: 0,
        width: "var(--om-svc-card-w)",
        height: "var(--om-svc-card-h)",
        marginRight: 24,
        textDecoration: "none",
        display: "block",
      }}
    >
      <div className="om-flip-card-inner">
        {/* front face — video preview + title */}
        <div
          className="om-flip-face"
          style={{
            border: "1px solid var(--hairline)",
            background: "var(--bg-soft)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: 24,
          }}
        >
          <ServiceCardMedia videos={service.videos} name={service.name} />
          <div style={{ position: "relative", zIndex: 1 }}>
            <h3
              className="om-heading"
              style={{ fontSize: "clamp(22px, 2.4vw, 30px)", color: "#fff", marginBottom: 8 }}
            >
              {service.name}
            </h3>
            <p
              style={{
                fontFamily: "Switzer, sans-serif",
                fontSize: 14,
                lineHeight: 1.55,
                color: "rgba(255,255,255,0.82)",
                maxWidth: "88%",
                margin: 0,
              }}
            >
              {service.shortDescription}
            </p>
          </div>
        </div>

        {/* back face — blurred still + Explore now, revealed on hover/flip */}
        <div
          className="om-flip-face om-flip-face-back"
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: `url(${thumbnail})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              filter: "blur(14px) brightness(0.55)",
              transform: "scale(1.15)",
            }}
          />
          <div aria-hidden="true" style={{ position: "absolute", inset: 0, background: "rgba(30, 20, 60, 0.35)" }} />
          <div style={{ position: "relative", zIndex: 1, textAlign: "center", padding: 24 }}>
            <h3 className="om-heading" style={{ fontSize: "clamp(20px, 2.2vw, 26px)", color: "#fff", marginBottom: 20 }}>
              {service.name}
            </h3>
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "Switzer, sans-serif",
                fontSize: 14,
                fontWeight: 700,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "#fff",
                background: "var(--accent)",
                borderRadius: 999,
                padding: "13px 26px",
              }}
            >
              Explore now
              <ArrowUpRight size={16} strokeWidth={2.4} />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

/**
 * Continuously auto-sliding horizontal rail. Card list is rendered twice
 * back-to-back and the track animates to -50% on a linear infinite loop, so
 * it wraps seamlessly. Hovering (or focusing) anywhere on the track pauses
 * the animation via CSS — no scroll-jacking, no JS timers driving motion.
 */
export default function Services() {
  return (
    <section id="services" style={{ padding: "clamp(64px, 10vh, 120px) 0" }}>
      <div className="om-container" style={{ marginBottom: 48, textAlign: "center" }}>
        <p className="om-eyebrow" style={{ marginBottom: 18 }}>Services</p>
        <h2 className="om-heading" style={{ fontSize: "clamp(34px, 5vw, 54px)", maxWidth: 620, margin: "0 auto" }}>
          What We Do
        </h2>
        <p className="om-body" style={{ fontSize: 16, maxWidth: 480, marginTop: 16, margin: "16px auto 0" }}>
          Five disciplines, one media engine. Hover a card to explore.
        </p>
      </div>

      <div className="om-marquee-fade" style={{ padding: "4px 0" }}>
        <div className="om-marquee-track-auto om-services-track">
          {[...services, ...services].map((s, i) => (
            <ServiceCard key={`${s.slug}-${i}`} service={s} />
          ))}
        </div>
      </div>

      <style>{`
        :root {
          --om-svc-card-w: min(46vw, 620px);
          --om-svc-card-h: 480px;
        }
        .om-service-card {
          border-radius: 22px;
        }
        @media (max-width: 860px) {
          :root { --om-svc-card-w: 86vw; --om-svc-card-h: 420px; }
        }
        @media (max-width: 480px) {
          :root { --om-svc-card-h: 380px; }
        }
        .om-services-track {
          padding-left: 24px;
        }
      `}</style>
    </section>
  );
}