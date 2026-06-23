import { motion as Motion } from "framer-motion";
import { services } from "../../data/services";
import { ArrowLink } from "../ui/Button";
import VideoCard from "../ui/VideoCard";

export default function WhatWeDo() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="om-container">
        <div style={{ textAlign: "center", marginBottom: 88 }}>
          <p className="om-eyebrow" style={{ marginBottom: 18 }}>Services</p>
          <h2 className="om-heading" style={{ fontSize: "clamp(34px, 5vw, 54px)" }}>
            What We Do
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 96 }}>
          {services.map((s, i) => (
            <Motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="om-wwd-row"
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 56,
                alignItems: "center",
              }}
            >
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 18 }}>
                  <span style={{ width: 1, height: 22, background: "var(--gold)" }} />
                  <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--gold)", fontWeight: 600 }}>
                    {s.number}
                  </span>
                </div>
                <h3 className="om-heading" style={{ fontSize: "clamp(28px, 4vw, 42px)", marginBottom: 18 }}>
                  {s.name}
                </h3>
                <p className="om-body" style={{ fontSize: 16, maxWidth: 440, marginBottom: 22 }}>
                  {s.shortDescription}
                </p>
                <ArrowLink to={`/services/${s.slug}`}>Explore</ArrowLink>
              </div>

              <div>
                <VideoCard title={`${s.name} reel`} variant={i} src={s.videos?.[0]} aspectRatio="1 / 1" hideBorder />
              </div>
            </Motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .om-wwd-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}