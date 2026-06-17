import { Link } from "react-router-dom";
import OrbitIcon from "../ui/OrbitIcon";
import { services } from "../../data/services";

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
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
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer style={{ background: "var(--bg-soft)", borderTop: "1px solid var(--hairline)" }}>
      <style>{`
        .om-footer-heading {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--text-muted);
          margin-bottom: 18px;
        }
        .om-footer-link {
          display: block;
          font-family: 'Inter', sans-serif;
          font-size: 14.5px;
          color: var(--text-body);
          text-decoration: none;
          padding: 6px 0;
          transition: color 0.2s ease;
        }
        .om-footer-link:hover { color: var(--gold); }
        .om-social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          color: var(--text-body);
          background: transparent;
          border: 1px solid var(--hairline);
          text-decoration: none;
          transition: color 0.2s, border-color 0.2s;
        }
        .om-social-btn:hover { color: var(--gold); border-color: var(--border-gold); }
      `}</style>

      <div className="om-container" style={{ padding: "64px 24px 40px" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: 40,
          }}
          className="om-footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link to="/" style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none", marginBottom: 16 }}>
              <OrbitIcon size={28} style={{ color: "var(--gold)" }} />
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, color: "var(--text)" }}>
                Orbit <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Media</span>
              </span>
            </Link>
            <p className="om-body" style={{ fontSize: 14.5, maxWidth: 320, marginBottom: 22 }}>
              The media engine for founders, startups &amp; venture-backed brands.
            </p>
            <div style={{ display: "flex", gap: 8 }}>
              {socials.map((s) => (
                <a key={s.label} href={s.href} className="om-social-btn" aria-label={s.label} target="_blank" rel="noreferrer">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Explore column */}
          <div>
            <div className="om-footer-heading">Explore</div>
            <Link to="/" className="om-footer-link">Home</Link>
            <Link to="/case-studies" className="om-footer-link">Case Studies</Link>
            <Link to="/contact" className="om-footer-link">Contact</Link>
          </div>

          {/* Services column */}
          <div>
            <div className="om-footer-heading">Services</div>
            {services.map((s) => (
              <Link key={s.slug} to={`/services/${s.slug}`} className="om-footer-link">{s.name}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="om-container" style={{ borderTop: "1px solid var(--hairline)", padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--text-faint)" }}>
          © {new Date().getFullYear()} Orbit Media. All rights reserved.
        </span>
        <span style={{ fontFamily: "Inter, sans-serif", fontSize: 13, color: "var(--text-faint)" }}>
          Designed &amp; Developed by{" "}
          <a href="https://technivaran.in" target="_blank" rel="noreferrer" style={{ color: "var(--text-muted)" }}>
            Tech Nivaran
          </a>
        </span>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .om-footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 520px) {
          .om-footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  );
}
