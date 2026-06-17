import { useParams, Link, Navigate } from "react-router-dom";
import { Check } from "lucide-react";
import { services, getServiceBySlug } from "../data/services";
import VideoCard from "../components/ui/VideoCard";
import CTASection from "../components/sections/CTASection";
import { ArrowLink } from "../components/ui/Button";

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/" replace />;

  const others = services.filter((s) => s.slug !== slug);

  return (
    <>
      <section style={{ padding: "72px 24px 0" }}>
        <div className="om-container" style={{ textAlign: "center" }}>
          <p className="om-eyebrow" style={{ marginBottom: 18 }}>Service {service.number}</p>
          <h1 className="om-heading" style={{ fontSize: "clamp(40px, 7vw, 72px)" }}>
            {service.name}
          </h1>
        </div>
      </section>

      <section style={{ padding: "56px 0 0" }}>
        <div className="om-container">
          <div className="om-svc-video-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22 }}>
            <VideoCard title={`${service.name} — sample 1`} variant={0} />
            <VideoCard title={`${service.name} — sample 2`} variant={1} />
            <VideoCard title={`${service.name} — sample 3`} variant={2} />
          </div>
        </div>
      </section>

      <section style={{ padding: "72px 0" }}>
        <div className="om-container" style={{ maxWidth: 720 }}>
          <p className="om-body" style={{ fontSize: 18, textAlign: "center" }}>
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section style={{ padding: "0 0 96px" }}>
        <div className="om-container" style={{ maxWidth: 640 }}>
          <p className="om-eyebrow" style={{ marginBottom: 22, textAlign: "center" }}>What's Included</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {service.included.map((item) => (
              <div key={item} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span
                  style={{
                    flexShrink: 0,
                    width: 22,
                    height: 22,
                    borderRadius: "50%",
                    background: "var(--gold-soft)",
                    border: "1px solid var(--border-gold)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 1,
                  }}
                >
                  <Check size={12} color="var(--gold)" strokeWidth={2.4} />
                </span>
                <span className="om-body" style={{ fontSize: 15.5 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTASection
        heading={`Want to start with ${service.name}?`}
        subheading="Book a free call and we'll map out what this looks like for your brand."
      />

      <section style={{ padding: "72px 0", borderTop: "1px solid var(--hairline)" }}>
        <div className="om-container">
          <p className="om-eyebrow" style={{ textAlign: "center", marginBottom: 32 }}>Explore Other Services</p>
          <div className="om-other-svc-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {others.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                className="om-card"
                style={{ display: "block", padding: 24, textDecoration: "none" }}
              >
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: 11, color: "var(--gold)", fontWeight: 600 }}>{s.number}</span>
                <h3 className="om-heading" style={{ fontSize: 22, margin: "8px 0 14px" }}>{s.name}</h3>
                <ArrowLink to={`/services/${s.slug}`}>Explore</ArrowLink>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 820px) {
          .om-svc-video-grid { grid-template-columns: 1fr !important; }
          .om-other-svc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
