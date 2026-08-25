import { Link } from "react-router-dom";
import OrbitIcon from "../ui/OrbitIcon";

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle
          cx="17.5"
          cy="6.5"
          r="1"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
  {
    label: "X / Twitter",
    href: "#",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "YouTube",
    href: "#",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon
          points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"
          fill="currentColor"
          stroke="none"
        />
      </svg>
    ),
  },
];

// Snake-like zigzag arrow
function ArrowUpRightIcon() {
  return (
    <svg
      className="om-cta-arrow"
      width="1em"
      height="1em"
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="3 33 8 24 12 30 16 21 20 27 24 18 28 24 32 9" />
      <polyline points="20 9 32 9 32 21" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer
      style={{
        background: "#6D28D9",
        borderTop: "1px solid rgba(255,255,255,0.15)",
        color: "#fff",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,600&display=swap');

        .om-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: #fff;
          background: transparent;
          border: 1px solid rgba(255,255,255,0.35);
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }

        .om-social-btn:hover {
          color: #000;
          background: #fff;
          border-color: #fff;
        }

        .om-footer-description {
          color: rgba(255,255,255,0.8) !important;
        }

        .om-footer-bottom-text {
          color: rgba(255,255,255,0.65) !important;
        }

        .om-footer-credit {
          color: #fff !important;
        }

        .om-footer-credit:hover {
          color: #000 !important;
        }

        footer a.om-footer-cta {
          display: inline-flex !important;
          align-items: center !important;
          gap: 0.3em !important;
          font-family: 'Playfair Display', Georgia, 'Times New Roman', serif !important;
          font-style: italic !important;
          font-size: clamp(36px, 5.5vw, 64px) !important;
          line-height: 1 !important;
          font-weight: 600 !important;
          letter-spacing: -0.01em !important;
          color: #fff !important;
          text-decoration: none !important;
          white-space: nowrap;
        }

        .om-cta-arrow {
          width: 0.85em !important;
          height: 0.85em !important;
          transform: rotate(0deg);
          transition: transform 0.3s ease, color 0.3s ease;
          flex-shrink: 0;
        }

        .om-footer-cta:hover {
          color: #000 !important;
        }

        .om-footer-cta:hover .om-cta-arrow {
          transform: rotate(6deg) translate(3px, -3px);
        }

        @media (max-width: 760px) {
          .om-footer-grid {
            grid-template-columns: 1fr !important;
            gap: 44px !important;
          }

          footer a.om-footer-cta {
            font-size: clamp(30px, 9vw, 44px) !important;
          }
        }
      `}</style>

      <div className="om-container" style={{ padding: "64px 24px 40px" }}>
        <div
          className="om-footer-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr auto",
            alignItems: "center",
            gap: 40,
          }}
        >
          {/* Brand column */}
          <div>
            <Link
              to="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 9,
                textDecoration: "none",
                marginBottom: 16,
              }}
            >
              <OrbitIcon size={28} style={{ color: "#fff" }} />

              <span
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: 21,
                  color: "#fff",
                }}
              >
                Orbit <span style={{ color: "#000" }}>Media</span>
              </span>
            </Link>

            <p
              className="om-body om-footer-description"
              style={{
                fontSize: 14.5,
                maxWidth: 320,
                marginBottom: 22,
              }}
            >
              The media engine for founders, startups &amp; venture-backed
              brands.
            </p>

            <div style={{ display: "flex", gap: 8 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  className="om-social-btn"
                  aria-label={s.label}
                  target="_blank"
                  rel="noreferrer"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Big CTA — routes to the internal booking page so the whole
              booking flow (and its analytics) stays on-site. */}
          <Link to="/book-a-call" className="om-footer-cta">
            Start a Project
            <ArrowUpRightIcon />
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="om-container"
        style={{
          borderTop: "1px solid rgba(255,255,255,0.15)",
          padding: "20px 24px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <span
          className="om-footer-bottom-text"
          style={{
            fontFamily: "Switzer, sans-serif",
            fontSize: 13,
          }}
        >
          © {new Date().getFullYear()} Orbit Media. All rights reserved.
        </span>

        <span
          className="om-footer-bottom-text"
          style={{
            fontFamily: "Switzer, sans-serif",
            fontSize: 13,
            display: "flex",
            gap: 16,
          }}
        >
          <Link to="/privacy" className="om-footer-credit" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
            Privacy Policy
          </Link>
          <Link to="/terms" className="om-footer-credit" style={{ color: "rgba(255,255,255,0.65)", textDecoration: "none" }}>
            Terms
          </Link>
        </span>

        <span
          className="om-footer-bottom-text"
          style={{
            fontFamily: "Switzer, sans-serif",
            fontSize: 13,
          }}
        >
          Designed &amp; Developed by{" "}
          <a
            href="https://technivaran.in"
            target="_blank"
            rel="noreferrer"
            className="om-footer-credit"
            style={{
              color: "#fff",
              textDecoration: "none",
            }}
          >
            Tech Nivaran
          </a>
        </span>
      </div>
    </footer>
  );
}