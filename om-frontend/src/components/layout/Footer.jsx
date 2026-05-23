import logo from '../../assets/logo.png'; // same path
const navLinks = [
  { label: "How It Works", href: "#process" },
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Case Studies", href: "#case-studies" },
  { label: "FAQs", href: "#faqs" },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
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
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
        <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "#09051a",
        borderTop: "1px solid rgba(139,92,246,0.15)",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Caveat:wght@500&display=swap');

        .footer-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.03;
          background-image:
            linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .footer-inner {
          max-width: 1100px;
          margin: 0 auto;
          padding: 40px 40px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
        }

        .footer-brand-name {
          font-size: 17px;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -0.04em;
        }

        .footer-nav {
          display: flex;
          align-items: center;
          gap: 4px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex-wrap: wrap;
        }

        .footer-nav a {
          text-decoration: none;
          color: #6d5fa0;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 6px;
          transition: color 0.2s, background 0.2s;
          letter-spacing: -0.01em;
        }

        .footer-nav a:hover {
          color: #c4b5fd;
          background: rgba(124,58,237,0.1);
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 8px;
          color: #6d5fa0;
          background: transparent;
          border: 1px solid rgba(139,92,246,0.15);
          text-decoration: none;
          transition: color 0.2s, background 0.2s, border-color 0.2s;
        }

        .social-btn:hover {
          color: #c4b5fd;
          background: rgba(124,58,237,0.1);
          border-color: rgba(167,139,250,0.35);
        }

        .footer-bottom {
          max-width: 1100px;
          margin: 0 auto;
          padding: 16px 40px;
          border-top: 1px solid rgba(139,92,246,0.1);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .footer-copy {
          color: #4b4b6a;
          font-size: 13px;
        }

        .footer-credit {
          color: #4b4b6a;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .footer-credit a {
          color: #6d5fa0;
          
          
          transition: color 0.2s;
        }

        .footer-credit a:hover {
          color: #a78bfa;
        }

        @media (max-width: 768px) {
          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
            gap: 24px;
          }
          .footer-bottom {
            flex-direction: column;
            align-items: flex-start;
            gap: 8px;
          }
        }
      `}</style>

      <div className="footer-grid-bg" />

      <div className="footer-inner">
        {/* Logo — replace SVG with your actual logo */}
        <a
          href="/"
          className="footer-brand"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            textDecoration: "none",
          }}
        >
          <img
            src={logo}
            alt="Orbit Media"
            style={{
              height: 130,
              width: "auto",
              objectFit: "contain",
               marginRight: "-65px",
            }}
          />
        
          <span
            className="footer-brand-name"
            style={{
              fontSize: "28px",
              fontWeight: 800,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              color: "#fff",
              fontFamily: "'Bricolage Grotesque', sans-serif",
            }}
          >
            Orbit{" "}
            <span
              style={{
                color: "#a78bfa",
                fontFamily: "'Caveat', cursive",
                fontWeight: 700,
                fontSize: "32px",
              }}
            >
              Media
            </span>
          </span>
        </a>

        {/* Nav */}
        <nav>
          <ul className="footer-nav">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Socials */}
        <div className="footer-socials">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="social-btn"
              aria-label={s.label}
              target="_blank"
              rel="noreferrer"
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Orbit Media. All rights reserved.</span>
        <span className="footer-credit">
          Designed & Developed by{" "}
          <a href="https://technivaran.in" target="_blank" rel="noreferrer">
            Tech Nivaran
          </a>
        </span>
      </div>
    </footer>
  );
}