import { Quote } from "lucide-react";
import VideoCard from "../ui/VideoCard";
import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  return (
    <section style={{ padding: "96px 0" }}>
      <div className="om-container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="om-eyebrow" style={{ marginBottom: 18 }}>Testimonials</p>
          <h2 className="om-heading" style={{ fontSize: "clamp(32px, 5vw, 50px)" }}>
            What Our Clients Say
          </h2>
        </div>

        <div style={{ maxWidth: 760, margin: "0 auto 48px" }}>
          <VideoCard title="Client testimonial" tag="Orbit Media" />
        </div>

        <div className="om-testi-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 920, margin: "0 auto" }}>
          {testimonials.map((t, i) => (
            <div key={i} className="om-card" style={{ padding: 28 }}>
              <Quote size={20} color="var(--accent)" style={{ marginBottom: 14 }} />
              <p className="om-body" style={{ fontSize: 14.5, marginBottom: 18 }}>{t.quote}</p>
              <div style={{ fontFamily: "'Switzer', sans-serif", fontSize: 15, color: "var(--text)" }}>{t.name}</div>
              <div style={{ fontFamily: "Switzer, sans-serif", fontSize: 12.5, color: "var(--text-faint)" }}>{t.role}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .om-testi-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
