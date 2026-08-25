import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { services, getServiceBySlug } from "../data/services";
import VideoCard from "../components/ui/VideoCard";
import WhatWeOffer from "../components/sections/WhatWeOffer";

const DEFAULT_THUMB =
  "https://res.cloudinary.com/db2ehmua9/image/upload/v1782801029/Gemini_Generated_Image_9ej1iv9ej1iv9ej1_lfvevy.png";

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
      <section style={{ padding: "24px 24px 0" }}>
        <div className="om-container">
          <div style={{ textAlign: "center" }}>
            <p className="om-eyebrow" style={{ marginBottom: 18 }}>Service</p>
            <h1 className="om-heading" style={{ fontSize: "clamp(40px, 7vw, 72px)" }}>
              {service.name}
            </h1>
          </div>
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

      <section style={{ padding: "80px 0", borderTop: "1px solid var(--hairline)" }}>
        <div className="om-container">
          <p className="om-eyebrow" style={{ textAlign: "center", marginBottom: 32 }}>Explore Other Services</p>
          <div
            className="om-other-svc-grid"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}
          >
            {others.map((s) => {
              const thumb = s.offer?.[0]?.image || DEFAULT_THUMB;
              return (
                <Link
                  key={s.slug}
                  to={`/services/${s.slug}`}
                  className="om-other-svc-card"
                  style={{
                    display: "block",
                    borderRadius: 22,
                    textDecoration: "none",
                    height: 340,
                  }}
                >
                  <div className="om-flip-inner">
                    {/* front face */}
                    <div className="om-flip-face om-flip-front">
                      <img
                        src={thumb}
                        alt={s.name}
                        loading="lazy"
                        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      <div
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.1) 55%, transparent 75%)",
                        }}
                      />
                      <div style={{ position: "absolute", left: 28, right: 28, bottom: 24 }}>
                        <h3 className="om-heading" style={{ fontSize: "clamp(24px, 2.6vw, 32px)", color: "#fff" }}>
                          {s.name}
                        </h3>
                      </div>
                    </div>

                    {/* back face */}
                    <div className="om-flip-face om-flip-back">
                      <img
                        src={thumb}
                        alt=""
                        aria-hidden="true"
                        style={{
                          position: "absolute",
                          inset: 0,
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          filter: "blur(16px) brightness(0.55)",
                          transform: "scale(1.15)",
                        }}
                      />
                      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.3)" }} />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: 16,
                          padding: "0 24px",
                          textAlign: "center",
                        }}
                      >
                        <h3 className="om-heading" style={{ fontSize: "clamp(20px, 2.2vw, 26px)", color: "#fff" }}>
                          {s.name}
                        </h3>
                        <span className="om-explore-now-btn">
                          Explore Now
                          <ArrowUpRight size={15} strokeWidth={2.4} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <style>{`
        .om-other-svc-card {
          perspective: 1200px;
        }
        .om-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.6s cubic-bezier(0.16,1,0.3,1);
        }
        .om-other-svc-card:hover .om-flip-inner {
          transform: rotateY(180deg);
        }
        .om-flip-face {
          position: absolute;
          inset: 0;
          border-radius: 22px;
          overflow: hidden;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }
        .om-flip-back {
          transform: rotateY(180deg);
        }
        .om-explore-now-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-family: Switzer, sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: #111;
          background: #fff;
          padding: 12px 24px;
          border-radius: 999px;
          transition: transform 0.3s ease;
        }
        .om-other-svc-card:hover .om-explore-now-btn {
          transform: translateY(-3px);
        }
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