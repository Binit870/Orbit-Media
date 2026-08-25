import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function LegalPage({ eyebrow, title, updated, sections }) {
  return (
    <div className="om-container" style={{ padding: "40px 24px 96px", maxWidth: 780 }}>
      

      <p className="om-eyebrow" style={{ marginBottom: 14, textAlign: "center" }}>{eyebrow}</p>
      <h1 className="om-heading" style={{ fontSize: "clamp(30px, 4.6vw, 46px)",textAlign: "center" }}>
        {title}
      </h1>
      <p className="om-body" style={{ fontSize: 13.5, color: "var(--text-faint)", marginTop: 12,textAlign: "center" }}>
        Last updated {updated}
      </p>

      <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 32 }}>
        {sections.map((s) => (
          <section key={s.heading}>
            <h2 className="om-heading" style={{ fontSize: 20, marginBottom: 10 }}>
              {s.heading}
            </h2>
            <p className="om-body" style={{ fontSize: 15.5 }}>{s.body}</p>
          </section>
        ))}
      </div>
    </div>
  );
}
