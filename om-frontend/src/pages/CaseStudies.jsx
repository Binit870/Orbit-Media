import { Image as ImageIcon } from "lucide-react";

const placeholders = Array.from({ length: 6 }, (_, i) => i);

export default function CaseStudies() {
  return (
    <>
      <section style={{ padding: "80px 24px 0", textAlign: "center" }}>
        <p className="om-eyebrow" style={{ marginBottom: 18 }}>Our Work</p>
        <h1 className="om-heading" style={{ fontSize: "clamp(40px, 7vw, 68px)", marginBottom: 18 }}>
          Case Studies
        </h1>
        <p className="om-body" style={{ fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
          Real client results, coming soon. This page is the frame —
          the metrics, names and stories drop in as soon as they're ready.
        </p>
      </section>

      <section style={{ padding: "64px 0 96px" }}>
        <div className="om-container">
          <div className="om-cs-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            {placeholders.map((i) => (
              <div
                key={i}
                style={{
                  border: "1px dashed var(--hairline)",
                  borderRadius: 16,
                  padding: 28,
                  minHeight: 260,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--bg-soft)",
                      border: "1px solid var(--hairline)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: 20,
                    }}
                  >
                    <ImageIcon size={18} color="var(--text-faint)" strokeWidth={1.5} />
                  </div>
                  <div className="om-skeleton" style={{ height: 16, width: "70%", borderRadius: 6, marginBottom: 10 }} />
                  <div className="om-skeleton" style={{ height: 12, width: "90%", borderRadius: 6, marginBottom: 6 }} />
                  <div className="om-skeleton" style={{ height: 12, width: "60%", borderRadius: 6 }} />
                </div>
                <span
                  style={{
                    fontFamily: "Switzer, sans-serif",
                    fontSize: 10.5,
                    fontWeight: 700,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "var(--text-faint)",
                  }}
                >
                  Coming Soon
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>


      <style>{`
        @media (max-width: 820px) {
          .om-cs-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 540px) {
          .om-cs-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
