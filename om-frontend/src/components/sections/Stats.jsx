import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { stats } from "../../data/stats";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(value * eased));
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }, [inView, value]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section style={{ padding: "72px 0", borderBottom: "1px solid var(--hairline)" }}>
      <div
        className="om-container om-stats-grid"
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${stats.length}, 1fr)`,
        }}
      >
        {stats.map((s, i) => (
          <div
            key={s.label}
            style={{
              textAlign: "center",
              padding: "0 16px",
              borderLeft: i === 0 ? "none" : "1px solid var(--hairline)",
            }}
          >
            <div
              className="om-heading"
              style={{ fontSize: "clamp(34px, 5vw, 56px)", color: "var(--gold)" }}
            >
              <Counter value={s.value} suffix={s.suffix} />
            </div>
            <div
              className="om-eyebrow"
              style={{ marginTop: 10, fontSize: 11.5 }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .om-stats-grid {
            grid-template-columns: 1fr !important;
            gap: 32px;
          }
          .om-stats-grid > div {
            border-left: none !important;
            border-top: 1px solid var(--hairline);
            padding-top: 24px !important;
          }
          .om-stats-grid > div:first-child {
            border-top: none;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
