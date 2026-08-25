import { AccentButton, ArrowLink } from "../ui/Button";
import { stats } from "../../data/stats";
import { clients } from "../../data/clients";

// Swap these for real portfolio/work stills, thumbnails, or client shots —
// placeholders just to demonstrate the sliding effect.
const SHOWCASE_COL_1 = [
  "https://picsum.photos/seed/orbit1/480/620",
  "https://picsum.photos/seed/orbit2/480/620",
  "https://picsum.photos/seed/orbit3/480/620",
  "https://picsum.photos/seed/orbit4/480/620",
];
const SHOWCASE_COL_2 = [
  "https://picsum.photos/seed/orbit5/480/620",
  "https://picsum.photos/seed/orbit6/480/620",
  "https://picsum.photos/seed/orbit7/480/620",
  "https://picsum.photos/seed/orbit8/480/620",
];

function ShowcaseColumn({ images, direction = "up", duration = 28 }) {
  // Render the list twice back-to-back so the CSS animation can loop
  // seamlessly from -50% back to 0 with no visible seam/jump.
  const doubled = [...images, ...images];

  return (
    <div className="om-showcase-col">
      <div
        className={`om-showcase-track om-showcase-track--${direction}`}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((src, i) => (
          <div className="om-showcase-card" key={i}>
            <img src={src} alt="" loading="lazy" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="om-hero-section">
      <style>{`
        /* =========================================================
           HERO
           ========================================================= */

        .om-hero-section {
          position: relative;
          width: 100%;
          padding: clamp(28px, 5vh, 56px) 24px 48px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          overflow: hidden;
          background: var(--bg, #fff);
        }

        /* =========================================================
           MAIN HERO GRID
           ========================================================= */

        .om-hero-grid {
          position: relative;
          z-index: 2;

          width: min(100%, 1240px);
          margin: 0 auto;

          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);

          align-items: center;

          gap: clamp(28px, 4vw, 64px);
        }

        .om-hero-text {
          width: 100%;
          min-width: 0;
          text-align: left;
        }

        /* =========================================================
           EYEBROW
           ========================================================= */

        .om-hero-text .om-eyebrow {
          margin-bottom: 22px;
          font-size: clamp(10px, 0.8vw, 12px);
          line-height: 1.4;
        }

        /* =========================================================
           HEADING
           ========================================================= */

        .om-hero-text .om-heading {
          width: 100%;
          max-width: 760px;

          margin: 0;

          font-family: "Switzer", sans-serif;
          font-size: clamp(40px, 4.6vw, 64px);
          line-height: 0.98;
          font-weight: 600;
          letter-spacing: -0.045em;

          overflow: hidden;
        }

        .om-hero-text .om-heading > span {
          display: block;
          max-width: 100%;
        }

        .om-heading-gradient {
          color: var(--accent);
        }

        /* =========================================================
           BODY
           ========================================================= */

        .om-hero-text .om-body {
          width: min(100%, 440px);

          margin-top: 24px;
          margin-bottom: 0;

          font-family: "Switzer", sans-serif;
          font-size: clamp(14px, 1.2vw, 16px);
          line-height: 1.65;
          font-weight: 400;

          color: var(--text-body, #2b2b30);
        }

        /* =========================================================
           CTA
           ========================================================= */

        .om-hero-cta {
          margin-top: 34px;

          display: flex;
          align-items: center;

          gap: 24px;

          flex-wrap: wrap;
        }

        /* =========================================================
           STATS
           ========================================================= */

        .om-hero-stats {
          display: flex;
          gap: 32px;
          margin-top: 36px;
        }

        .om-hero-stat {
          text-align: left;
          padding-left: 24px;
          border-left: 1px solid var(--hairline);
        }

        .om-hero-stat:first-child {
          padding-left: 0;
          border-left: none;
        }

        .om-hero-stat-value {
          font-family: "Switzer", sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 2.6vw, 30px);
          color: var(--accent);
          line-height: 1.1;
        }

        .om-hero-stat-label {
          font-family: "Switzer", sans-serif;
          font-size: 11px;
          letter-spacing: 0.03em;
          color: var(--text-faint);
          margin-top: 4px;
        }

        /* =========================================================
           SLIDING IMAGE SHOWCASE (right side)
           ========================================================= */

        .om-hero-showcase {
          position: relative;

          width: 100%;
          height: clamp(460px, 62vh, 640px);

          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;

          overflow: hidden;
          border-radius: 20px;
        }

        /* soft fade at top/bottom so cards don't hard-cut */
        .om-hero-showcase::before,
        .om-hero-showcase::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          height: 72px;
          z-index: 2;
          pointer-events: none;
        }
        .om-hero-showcase::before {
          top: 0;
          background: linear-gradient(to bottom, var(--bg, #fff), transparent);
        }
        .om-hero-showcase::after {
          bottom: 0;
          background: linear-gradient(to top, var(--bg, #fff), transparent);
        }

        .om-showcase-col {
          position: relative;
          height: 100%;
          overflow: hidden;
        }

        .om-showcase-col:nth-child(2) {
          margin-top: -60px; /* stagger the two columns */
        }

        .om-showcase-track {
          display: flex;
          flex-direction: column;
          gap: 16px;
          animation-name: om-scroll-up;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
          will-change: transform;
        }

        .om-showcase-track--down {
          animation-name: om-scroll-down;
        }

        @keyframes om-scroll-up {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }

        @keyframes om-scroll-down {
          from { transform: translateY(-50%); }
          to { transform: translateY(0); }
        }

        .om-showcase-card {
          flex: 0 0 auto;
          width: 100%;
          aspect-ratio: 3 / 4;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 16px 32px -18px rgba(76, 60, 180, 0.35);
          transition: transform 0.35s ease;
        }

        .om-showcase-card:hover {
          transform: scale(1.03);
        }

        .om-showcase-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        @media (prefers-reduced-motion: reduce) {
          .om-showcase-track {
            animation: none;
          }
        }

        /* =========================================================
           CLIENT STRIP
           ========================================================= */

        .om-hero-clients {
          position: relative;
          z-index: 2;
          width: min(100%, 1240px);
          margin: clamp(36px, 5vh, 56px) auto 0;
        }

        .om-hero-clients-label {
          font-family: "Switzer", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
          margin-bottom: 20px;
        }

        .om-hero-clients-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 36px;
        }

        .om-hero-client {
          display: flex;
          align-items: center;
          gap: 12px;
          opacity: 0.7;
        }

        .om-hero-client-logo {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          object-fit: cover;
          flex-shrink: 0;
        }

        .om-hero-client-name {
          font-family: "Switzer", sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--text);
        }

        /* =========================================================
           LARGE TABLET / SMALL LAPTOP
           ========================================================= */

        @media (max-width: 1100px) {
          .om-hero-section {
            padding-left: 20px;
            padding-right: 20px;
          }

          .om-hero-grid {
            gap: 28px;
          }

          .om-hero-text .om-heading {
            font-size: clamp(36px, 5.6vw, 54px);
          }

          .om-hero-showcase {
            height: clamp(420px, 56vh, 560px);
          }
        }

        /* =========================================================
           TABLET
           ========================================================= */

        @media (max-width: 900px) {
          .om-hero-section {
            padding: 24px 0 40px;
          }

          .om-hero-grid {
            width: 100%;
            grid-template-columns: 1fr;
            gap: 32px;
            padding: 8px 24px 0;
          }

          .om-hero-text {
            width: 100%;
            max-width: 760px;
            margin: 0 auto;
            text-align: center;
            order: 1;
          }

          .om-hero-text .om-eyebrow {
            margin-bottom: 18px;
          }

          .om-hero-text .om-heading {
            max-width: 760px;
            margin-left: auto;
            margin-right: auto;
            font-size: clamp(38px, 9vw, 58px);
            line-height: 1;
            letter-spacing: -0.045em;
          }

          .om-hero-text .om-body {
            width: min(100%, 560px);
            margin: 22px auto 0;
            font-size: 15px;
            line-height: 1.65;
          }

          .om-hero-cta {
            justify-content: center;
            margin-top: 30px;
            gap: 18px;
          }

          .om-hero-stats {
            justify-content: center;
          }

          .om-hero-showcase {
            order: 2;
            height: min(70vw, 420px);
          }

          .om-hero-clients-row {
            justify-content: center;
          }
        }

        /* =========================================================
           MOBILE
           ========================================================= */

        @media (max-width: 600px) {
          .om-hero-text .om-eyebrow {
            margin-bottom: 15px;
            font-size: 10px;
            letter-spacing: 0.26em;
          }

          .om-hero-text .om-heading {
            font-size: clamp(36px, 11vw, 52px);
            line-height: 1;
            letter-spacing: -0.045em;
          }

          .om-hero-text .om-body {
            width: min(100%, 500px);
            margin-top: 20px;
            font-size: 14px;
            line-height: 1.6;
          }

          .om-hero-cta {
            margin-top: 26px;
            gap: 14px;
            justify-content: center;
          }

          .om-hero-stats {
            gap: 20px;
            margin-top: 32px;
          }

          .om-hero-stat {
            padding-left: 16px;
          }

          .om-hero-showcase {
            height: min(90vw, 360px);
            grid-template-columns: 1fr 1fr;
          }

          .om-hero-client-logo {
            width: 26px;
            height: 26px;
          }

          .om-hero-client-name {
            font-size: 15px;
          }
        }

        /* =========================================================
           SMALL PHONES
           ========================================================= */

        @media (max-width: 480px) {
          .om-hero-grid {
            padding-left: 16px;
            padding-right: 16px;
          }

          .om-hero-text .om-heading {
            font-size: clamp(34px, 11vw, 46px);
          }

          .om-hero-text .om-body {
            font-size: 14px;
            line-height: 1.58;
          }

          .om-hero-cta {
            flex-direction: column;
            gap: 14px;
            width: 100%;
          }

          .om-hero-cta > * {
            max-width: 100%;
          }

          .om-hero-stats {
            flex-wrap: wrap;
          }
        }
      `}</style>

      <div className="om-hero-grid">
        <div className="om-hero-text">
          <div className="om-eyebrow">Shaping Tech Media</div>

          <h1 className="om-heading">
            <span>Distributing</span>
            <span className="om-heading-gradient">Tech Media</span>
          </h1>

          <p className="om-body">
            The media engine for founders, startups &amp; venture-backed
            brands — podcasting, launch videos, founder brands and AI UGC,
            produced and distributed.
          </p>

          <div className="om-hero-cta">
            <AccentButton to="/book-a-call">Book a Call</AccentButton>
            <ArrowLink to="/case-studies">See the work</ArrowLink>
          </div>

          <div className="om-hero-stats">
            {stats.map((s) => (
              <div key={s.label} className="om-hero-stat">
                <div className="om-hero-stat-value">
                  {s.value}
                  {s.suffix}
                </div>
                <div className="om-hero-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="om-hero-showcase" aria-hidden="true">
          <ShowcaseColumn images={SHOWCASE_COL_1} direction="up" duration={30} />
          <ShowcaseColumn images={SHOWCASE_COL_2} direction="down" duration={34} />
        </div>
      </div>

      <div className="om-hero-clients">
        <div className="om-hero-clients-label">Trusted by teams at</div>
        <div className="om-hero-clients-row">
          {clients.map((client) => (
            <div key={client.name} className="om-hero-client">
              <img
                src={client.logo}
                alt=""
                aria-hidden="true"
                className="om-hero-client-logo"
                loading="lazy"
              />
              <span className="om-hero-client-name">{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}