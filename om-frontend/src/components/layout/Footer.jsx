export default function Footer() {
  const navLinks = ["Process", "Portfolio", "Testimonials", "FAQs"];

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

  return (
    <footer
      style={{
        background: "#0d0d0d",
        borderTop: "1px solid #1e1e1e",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700&display=swap');

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 40px 40px 32px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 32px;
          flex-wrap: wrap;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 12px;
          text-decoration: none;
        }

        .footer-logo-icon {
          width: 32px;
          height: 32px;
          opacity: 0.9;
        }

        .footer-brand-name {
          font-size: 17px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.3px;
        }

        .footer-nav {
          display: flex;
          align-items: center;
          gap: 6px;
          list-style: none;
          margin: 0;
          padding: 0;
          flex-wrap: wrap;
        }

        .footer-nav a {
          text-decoration: none;
          color: #aaa;
          font-size: 14px;
          font-weight: 500;
          padding: 6px 12px;
          border-radius: 4px;
          transition: color 0.2s, background 0.2s;
          letter-spacing: 0.1px;
        }

        .footer-nav a:hover {
          color: #fff;
          background: #1e1e1e;
        }

        .footer-nav a.active {
          color: #fff;
          border: 1px solid #333;
          padding: 5px 11px;
        }

        .footer-socials {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 6px;
          color: #888;
          background: transparent;
          text-decoration: none;
          transition: color 0.2s, background 0.2s;
        }

        .social-btn:hover {
          color: #fff;
          background: #1e1e1e;
        }

        .footer-bottom {
          max-width: 1200px;
          margin: 0 auto;
          padding: 16px 40px;
          border-top: 1px solid #1e1e1e;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }

        .footer-copy {
          color: #555;
          font-size: 13px;
        }

        .footer-credit {
          color: #555;
          font-size: 13px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .footer-credit a {
          color: #888;
          text-decoration: underline;
          text-underline-offset: 2px;
          transition: color 0.2s;
        }

        .footer-credit a:hover {
          color: #fff;
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

      <div className="footer-inner">
        {/* Brand */}
        <a href="/" className="footer-brand">
          {/* Metro Media House style M logo */}
          <svg className="footer-logo-icon" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 28V8l8 10 8-10v20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M20 18l8-10v20" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <span className="footer-brand-name">Orbit Media</span>
        </a>

        {/* Nav Links */}
        <nav>
          <ul className="footer-nav">
            {navLinks.map((link) => (
              <li key={link}>
                <a
                  href={`#${link.toLowerCase()}`}
                  className={link === "Process" ? "active" : ""}
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Social Icons */}
        <div className="footer-socials">
          {socials.map((s) => (
            <a key={s.label} href={s.href} className="social-btn" aria-label={s.label} target="_blank" rel="noreferrer">
              {s.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <span className="footer-copy">© 2026 Orbit Media. All rights reserved.</span>
        <span className="footer-credit">
          Made with ❤️ by{" "}
          <a href="https://technivaran.in" target="_blank" rel="noreferrer">
            Tech Nivaran
          </a>
        </span>
      </div>
    </footer>
  );
}