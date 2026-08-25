import { AccentButton, ArrowLink } from "../ui/Button";
import { stats } from "../../data/stats";
import { clients } from "../../data/clients";

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
          padding: clamp(72px, 13vh, 120px) 24px 48px;
          display: flex;
          flex-direction: column;
          align-items: stretch;
          overflow: hidden;
          background: var(--bg, #fff);
        }

        /* =========================================================
           MAIN HERO CONTENT (centered, single column)
           ========================================================= */

        .om-hero-grid {
          position: relative;
          z-index: 2;
          width: min(100%, 900px);
          margin: 0 auto;
          display: flex;
          justify-content: center;
        }

        .om-hero-text {
          width: 100%;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .om-hero-text .om-heading {
          width: 100%;
          max-width: 760px;
          margin: 0;
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(26px, 5.4vw, 46px);
          line-height: 1.05;
          font-weight: 600;
          letter-spacing: -0.045em;
        }

        .om-heading-gradient {
          color: var(--accent);
        }

        .om-hero-text .om-body {
          width: min(100%, 480px);
          margin: 24px auto 0;
          font-family: "Inter Tight", sans-serif;
          font-size: clamp(12px, 1.6vw, 14px);
          line-height: 1.65;
          font-weight: 400;
          color: var(--text-body, #2b2b30);
        }

        .om-hero-cta {
          margin-top: 34px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 24px;
          flex-wrap: wrap;
        }

        .om-hero-stats {
          display: flex;
          justify-content: center;
          gap: 32px;
          margin-top: 64px;
          flex-wrap: wrap;
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
          font-family: "Inter Tight", sans-serif;
          font-weight: 700;
          font-size: clamp(22px, 2.6vw, 30px);
          color: var(--accent);
          line-height: 1.1;
        }

        .om-hero-stat-label {
          font-family: "Inter Tight", sans-serif;
          font-size: 11px;
          letter-spacing: 0.03em;
          color: var(--text-faint);
          margin-top: 4px;
        }

        /* =========================================================
           CLIENT STRIP
           ========================================================= */

        .om-hero-clients {
          position: relative;
          z-index: 2;
          width: min(100%, 1240px);
          margin: clamp(64px, 9vh, 96px) auto 0;
          text-align: center;
        }

        .om-hero-clients-label {
          font-family: "Inter Tight", sans-serif;
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--text-faint);
        }

        .om-hero-clients-row {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: center;
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
          font-family: "Inter Tight", sans-serif;
          font-size: 17px;
          font-weight: 600;
          color: var(--text);
        }
/* =========================================================
   BUTTON HOVER STATES
   ========================================================= */

.om-hero-cta .om-btn {
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.om-hero-cta .om-btn:hover {
  background-color: var(--text, #111);
  color: var(--bg, #fff);
}

.om-hero-cta .om-link-accent {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 13px 26px;
  border-radius: 999px;
  border: 1px solid var(--hairline, #d9d9de);
  font-family: "Inter Tight", sans-serif;
  font-size: 14px;
  font-weight: 600;
  color: var(--text, #111);
  transition: background-color 0.25s ease, color 0.25s ease, border-color 0.25s ease;
}

.om-hero-cta .om-link-accent:hover {
  background-color: var(--text, #111);
  border-color: var(--text, #111);
  color: var(--bg, #fff);
}

.om-hero-cta .om-link-accent:hover svg {
  color: var(--bg, #fff);
}
        /* =========================================================
           RESPONSIVE
           ========================================================= */

        @media (max-width: 900px) {
          .om-hero-section {
            padding: clamp(60px, 11vh, 88px) 20px 40px;
          }
          .om-hero-cta {
            gap: 18px;
          }
        }

        @media (max-width: 600px) {
          .om-hero-text .om-body {
            font-size: 13px;
            line-height: 1.6;
          }
          .om-hero-cta {
            margin-top: 26px;
            gap: 14px;
          }
          .om-hero-stats {
            gap: 20px;
            margin-top: 48px;
          }
          .om-hero-clients {
            margin-top: 56px;
          }
          .om-hero-stat {
            padding-left: 16px;
          }
          .om-hero-client-logo {
            width: 26px;
            height: 26px;
          }
          .om-hero-client-name {
            font-size: 15px;
          }
        }

        @media (max-width: 480px) {
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
          <h1 className="om-heading">
            <span>Distributing</span>{" "}
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
      </div>

      <div className="om-hero-clients">
        <div className="om-hero-clients-label" style={{ marginBottom: 24 }}>
          Our Clients
        </div>
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