import { useParams, Link, Navigate } from "react-router-dom";
import { services, getServiceBySlug } from "../data/services";
import VideoCard from "../components/ui/VideoCard";
import WhatWeOffer from "../components/sections/WhatWeOffer";
import CTASection from "../components/sections/CTASection";
import { ArrowLink } from "../components/ui/Button";

export default function ServicePage() {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) return <Navigate to="/" replace />;

  const others = services.filter((s) => s.slug !== slug);
  const videos = service.videos || [];
  const featured = videos[0];
  const gridVideos = videos.slice(1);

  // these services show ALL videos as vertical grid, no horizontal featured
  const verticalOnlyServices = ["founder-brands", "motion-graphics", "ai-ugc-commercials"];
  const isVerticalOnly = verticalOnlyServices.includes(slug);

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

      {/* video section — only renders if there are videos */}
      {videos.length > 0 && (
        <section style={{ padding: "56px 0 0" }}>
          <div className="om-container">

            {/* vertical-only services — all videos in a 3-col grid */}
            {isVerticalOnly && (
              <div
                className="om-svc-video-grid"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 22,
                  maxWidth: 1180,
                  margin: "0 auto",
                }}
              >
                {videos.map((src, i) => (
                  <VideoCard
                    key={src}
                    src={src}
                    title={`${service.name} — ${i + 1}`}
                    variant={i}
                    aspectRatio="1080 / 1920"
                  />
                ))}
              </div>
            )}

            {/* other services — 1 horizontal featured + vertical grid below */}
            {!isVerticalOnly && (
              <>
                <div style={{ maxWidth: 1180, margin: "0 auto 24px" }}>
                  <VideoCard
                    src={featured}
                    title={`${service.name} — reel`}
                    variant={0}
                    aspectRatio="auto"
                  />
                </div>

                {gridVideos.length > 0 && (
                  <div
                    className="om-svc-video-grid"
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(3, 1fr)",
                      gap: 22,
                      maxWidth: 1180,
                      margin: "0 auto",
                    }}
                  >
                    {gridVideos.map((src, i) => (
                      <VideoCard
                        key={src}
                        src={src}
                        title={`${service.name} — ${i + 2}`}
                        variant={i + 1}
                        aspectRatio="1080 / 1920"
                      />
                    ))}
                  </div>
                )}
              </>
            )}

          </div>
        </section>
      )}

      {/* placeholder grid when no videos yet */}
      {videos.length === 0 && (
        <section style={{ padding: "56px 0 0" }}>
          <div className="om-container">
            <div style={{ maxWidth: 1180, margin: "0 auto 24px" }}>
              <VideoCard title={`${service.name} — featured`} variant={0} aspectRatio="1920 / 620" fit="cover" />
            </div>
            <div
              className="om-svc-video-grid"
              style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 22, maxWidth: 1180, margin: "0 auto" }}
            >
              {[1, 2, 3].map((n, i) => (
                <VideoCard key={n} title={`${service.name} — sample ${n}`} variant={i + 1} aspectRatio="1080 / 1920" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section style={{ padding: "72px 0" }}>
        <div className="om-container" style={{ maxWidth: 720 }}>
          <p className="om-body" style={{ fontSize: 18, textAlign: "center" }}>
            {service.shortDescription}
          </p>
        </div>
      </section>

      <WhatWeOffer service={service} />

      <CTASection
        heading={`Want to start with ${service.name}?`}
        subheading="Book a free call and we'll map out what this looks like for your brand."
      />

      <section style={{ padding: "72px 0", borderTop: "1px solid var(--hairline)" }}>
        <div className="om-container">
          <p className="om-eyebrow" style={{ textAlign: "center", marginBottom: 32 }}>Explore Other Services</p>
          <div
            className="om-other-svc-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}
          >
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
          .om-svc-video-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .om-other-svc-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 540px) {
          .om-svc-video-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
      `}</style>
    </>
  );
}