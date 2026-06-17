import { Compass, Camera, Scissors, Rocket } from "lucide-react";

const steps = [
  {
    title: "Strategy",
    description:
      "We map your niche, voice and content pillars — a founder-first system built around your story and the audience you want to own.",
    icon: Compass,
  },
  {
    title: "Shoot / Record",
    description:
      "Cinematic in-person or remote shoots. Podcasts, founder content, UGC — captured with intention and pro-grade gear.",
    icon: Camera,
  },
  {
    title: "Edit & Distribute",
    description:
      "Premium editing, hooks engineered for retention, then distributed across every platform your audience lives on.",
    icon: Scissors,
  },
  {
    title: "Scale Organically",
    description:
      "We track, iterate and compound. Authority builds, inbound demand grows — attention you actually own.",
    icon: Rocket,
  },
];

export default function HowWeWork() {
  return (
    <section style={{ padding: "96px 0", background: "var(--bg-soft)", borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
      <div className="om-container">
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <p className="om-eyebrow" style={{ marginBottom: 18 }}>How We Work</p>
          <h2 className="om-heading" style={{ fontSize: "clamp(32px, 5vw, 50px)" }}>
            A process built to <span className="om-heading-italic">compound</span>
          </h2>
        </div>

        <div className="om-hww-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 40 }}>
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={s.title} style={{ position: "relative" }}>
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: "50%",
                    border: "1px solid var(--border-gold)",
                    background: "var(--gold-soft)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginBottom: 24,
                    position: "relative",
                  }}
                >
                  <Icon size={24} color="var(--gold)" strokeWidth={1.6} />
                  <span
                    style={{
                      position: "absolute",
                      top: -6,
                      right: -6,
                      width: 22,
                      height: 22,
                      borderRadius: "50%",
                      background: "var(--bg)",
                      border: "1px solid var(--border-gold)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 10,
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 700,
                      color: "var(--gold)",
                    }}
                  >
                    {i + 1}
                  </span>
                </div>
                <h3 className="om-heading" style={{ fontSize: 21, marginBottom: 10 }}>{s.title}</h3>
                <p className="om-body" style={{ fontSize: 14.5, maxWidth: 260 }}>{s.description}</p>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        @media (max-width: 920px) {
          .om-hww-grid { grid-template-columns: repeat(2, 1fr) !important; gap: 48px !important; }
        }
        @media (max-width: 540px) {
          .om-hww-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
