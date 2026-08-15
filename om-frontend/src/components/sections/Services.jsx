import { useRef } from "react";
import { motion as Motion, useScroll, useTransform } from "framer-motion";
import { Mic, Rocket, UserRound, Sparkles, Wand2, ArrowUpRight } from "lucide-react";
import { services } from "../../data/services";
import { Link } from "react-router-dom";

const ICONS = [Mic, Rocket, UserRound, Sparkles, Wand2];

/**
 * Scroll-linked horizontal card rail. The section is pinned for the height
 * of one extra viewport while the user scrolls, and that vertical scroll
 * distance is mapped onto horizontal translation of the card track — the
 * same technique used for premium agency "services" sections.
 */
export default function Services() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // how far the track needs to travel horizontally = its scrollWidth - viewport
  const x = useTransform(scrollYProgress, [0, 1], ["1%", "-62%"]);

  return (
    <section
      ref={sectionRef}
      style={{ position: "relative", height: "260vh" }}
      id="services"
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <div className="om-container" style={{ marginBottom: 48 }}>
          <p className="om-eyebrow" style={{ marginBottom: 18 }}>Services</p>
          <h2 className="om-heading" style={{ fontSize: "clamp(34px, 5vw, 54px)", maxWidth: 620 }}>
            What We Do
          </h2>
          <p className="om-body" style={{ fontSize: 16, maxWidth: 480, marginTop: 16 }}>
            Five disciplines, one media engine. Scroll to move through them.
          </p>
        </div>

        <Motion.div
          ref={trackRef}
          style={{
            x,
            display: "flex",
            gap: 24,
            padding: "4px 24px 4px calc(50vw - 340px)",
            width: "max-content",
          }}
          className="om-services-track"
        >
          {services.map((s, i) => {
            const Icon = ICONS[i % ICONS.length];
            return (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="om-service-card"
                style={{
                  position: "relative",
                  width: "min(78vw, 420px)",
                  minHeight: 420,
                  flexShrink: 0,
                  borderRadius: 22,
                  border: "1px solid var(--hairline)",
                  background: "var(--bg-soft)",
                  padding: 36,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  textDecoration: "none",
                  overflow: "hidden",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 28,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "Switzer, sans-serif",
                        fontSize: 13,
                        fontWeight: 600,
                        color: "var(--accent)",
                      }}
                    >
                      {s.number}
                    </span>
                    <div
                      style={{
                        width: 46,
                        height: 46,
                        borderRadius: 14,
                        background: "var(--accent-soft)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon size={20} color="var(--accent)" strokeWidth={1.6} />
                    </div>
                  </div>

                  <h3 className="om-heading" style={{ fontSize: "clamp(24px, 2.6vw, 30px)", marginBottom: 14 }}>
                    {s.name}
                  </h3>
                  <p className="om-body" style={{ fontSize: 15, lineHeight: 1.6 }}>
                    {s.shortDescription}
                  </p>
                </div>

                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    fontFamily: "Switzer, sans-serif",
                    fontSize: 14.5,
                    fontWeight: 600,
                    color: "var(--text)",
                  }}
                >
                  Explore service
                  <ArrowUpRight size={16} strokeWidth={2.2} color="var(--accent)" />
                </div>

                <div className="om-service-card-glow" aria-hidden="true" />
              </Link>
            );
          })}

          {/* trailing spacer so the last card can fully clear the viewport edge */}
          <div style={{ width: "1px", flexShrink: 0 }} />
        </Motion.div>
      </div>

      <style>{`
        .om-service-card {
          transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), border-color 0.35s ease;
        }
        .om-service-card:hover {
          transform: translateY(-6px);
          border-color: var(--border-accent);
        }
        .om-service-card-glow {
          position: absolute;
          inset: auto -40% -40% auto;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, var(--accent) 0%, transparent 70%);
          opacity: 0.08;
          pointer-events: none;
        }
        @media (max-width: 720px) {
          section#services { height: auto !important; }
          section#services > div { position: relative !important; height: auto !important; }
          .om-services-track {
            transform: none !important;
            overflow-x: auto !important;
            padding-left: 24px !important;
            scroll-snap-type: x mandatory;
          }
          .om-service-card { scroll-snap-align: start; }
        }
      `}</style>
    </section>
  );
}
