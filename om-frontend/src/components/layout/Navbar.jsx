import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import { AnimatePresence, motion as Motion } from "framer-motion";
import OrbitIcon from "../ui/OrbitIcon";
import { AccentButton } from "../ui/Button";
import { services } from "../../data/services";

// Nav links are anchors into sections of the single-page home layout
// (Home.jsx renders Hero + Services + CaseStudies stacked on "/").
// From any other route they resolve to "/#section" and the browser/router
// handles the scroll after navigation.
const NAV_LINKS = [
  { label: "Services", hash: "services", hasDropdown: true },
  { label: "Work", hash: "work", hasDropdown: false },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const isHome = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleNavClick = (e, hash) => {
    e.preventDefault();
    setOpen(false);
    setServicesOpen(false);
    if (isHome) {
      const el = document.getElementById(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else {
      navigate(`/#${hash}`);
    }
  };

  return (
    <header className={scrolled ? "om-navbar is-scrolled" : "om-navbar"}>
      <style>{`
        .om-navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          width: 100%;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: saturate(180%) blur(10px);
          -webkit-backdrop-filter: saturate(180%) blur(10px);
          border-bottom: 1px solid transparent;
          transition: border-color 0.2s ease, box-shadow 0.2s ease;
        }

        .om-navbar.is-scrolled {
          border-bottom-color: var(--hairline);
          box-shadow: 0 1px 0 rgba(10, 10, 10, 0.02);
        }

        .om-navbar-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 10px 24px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }

        .om-navbar-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          flex-shrink: 0;
        }

        .om-navbar-logo-text {
          font-family: "Switzer", sans-serif;
          font-size: 23px;
          font-weight: 600;
          letter-spacing: -0.01em;
          color: var(--text);
          white-space: nowrap;
        }

        .om-navbar-logo-accent {
          color: var(--accent);
        }

        .om-navbar-links {
          display: flex;
          align-items: center;
          gap: 36px;
        }

        .om-navbar-link-wrap {
          position: relative;
        }

        .om-navbar-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-family: "Switzer", sans-serif;
          font-size: 14.5px;
          font-weight: 500;
          color: var(--text-body);
          text-decoration: none;
          padding: 6px 2px;
        }

        .om-navbar-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          border-radius: 2px;
          background: var(--accent);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.28s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .om-navbar-link:hover {
          color: var(--accent);
        }

        .om-navbar-link:hover::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .om-navbar-link-wrap:hover .om-navbar-link {
          color: var(--accent);
        }

        .om-navbar-link-wrap:hover .om-navbar-link::after {
          transform: scaleX(1);
          transform-origin: left;
        }

        .om-navbar-link-chevron {
          transition: transform 0.25s ease;
        }

        .om-navbar-link-wrap:hover .om-navbar-link-chevron {
          transform: rotate(180deg);
        }

        .om-services-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%);
          width: 300px;
          padding: 10px;
          background: #ffffff;
          border: 1px solid var(--hairline);
          border-radius: 16px;
          box-shadow: 0 24px 48px -20px rgba(10, 10, 10, 0.18);
          overflow: hidden;
        }

        .om-services-dropdown-item {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 10px;
          text-decoration: none;
          color: var(--text);
          transition: background 0.18s ease, padding-left 0.18s ease, color 0.18s ease;
        }

        .om-services-dropdown-item:hover {
          background: var(--accent-soft);
          color: var(--accent);
          padding-left: 17px;
        }

        .om-services-dropdown-name {
          font-family: "Switzer", sans-serif;
          font-size: 14.5px;
          font-weight: 600;
        }

        .om-navbar-actions {
          display: flex;
          align-items: center;
          gap: 28px;
        }

        .om-navbar-cta-desktop {
          display: flex;
        }

        .om-navbar-burger {
          display: none;
          width: 38px;
          height: 38px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--hairline);
          border-radius: 10px;
          background: #ffffff;
          color: var(--text);
          cursor: pointer;
          flex-shrink: 0;
          transition: border-color 0.2s ease, color 0.2s ease;
        }

        .om-navbar-burger:hover {
          border-color: var(--accent);
          color: var(--accent);
        }

        .om-navbar-mobile-panel {
          display: none;
        }

        @media (max-width: 780px) {
          .om-navbar-links {
            display: none;
          }

          .om-navbar-cta-desktop {
            display: none;
          }

          .om-navbar-burger {
            display: flex;
          }

          .om-navbar-mobile-panel.is-open {
            display: flex;
            flex-direction: column;
            gap: 4px;
            padding: 8px 24px 24px;
            border-top: 1px solid var(--hairline);
            background: #ffffff;
          }

          .om-navbar-mobile-link {
            font-family: "Switzer", sans-serif;
            font-size: 16px;
            font-weight: 500;
            color: var(--text);
            text-decoration: none;
            padding: 14px 4px;
            border-bottom: 1px solid var(--hairline);
          }

          .om-navbar-mobile-services {
            display: flex;
            flex-direction: column;
            padding: 0 4px 6px 16px;
            border-bottom: 1px solid var(--hairline);
          }

          .om-navbar-mobile-services-link {
            font-family: "Switzer", sans-serif;
            font-size: 14px;
            font-weight: 500;
            color: var(--text-muted);
            text-decoration: none;
            padding: 10px 0;
          }

          .om-navbar-mobile-panel .om-btn {
            margin-top: 16px;
            width: 100%;
          }
        }
      `}</style>

      <nav className="om-navbar-inner" aria-label="Primary">
        <Link to="/" className="om-navbar-logo" aria-label="Orbit Media home">
          <OrbitIcon size={36} style={{ color: "var(--accent)" }} />
          <span className="om-navbar-logo-text">
            Orbit <span className="om-navbar-logo-accent">Media</span>
          </span>
        </Link>

        <div className="om-navbar-links">
          {NAV_LINKS.map((link) => {
            if (!link.hasDropdown) {
              return (
                <a
                  key={link.hash}
                  href={`/#${link.hash}`}
                  className="om-navbar-link"
                  onClick={(e) => handleNavClick(e, link.hash)}
                >
                  {link.label}
                </a>
              );
            }

            return (
              <div
                key={link.hash}
                className="om-navbar-link-wrap"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <a
                  href={`/#${link.hash}`}
                  className="om-navbar-link"
                  onClick={(e) => handleNavClick(e, link.hash)}
                >
                  {link.label}
                  <ChevronDown size={14} className="om-navbar-link-chevron" />
                </a>

                <AnimatePresence>
                  {servicesOpen && (
                    <Motion.div
                      className="om-services-dropdown"
                      initial={{ opacity: 0, y: -8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {services.map((s, i) => (
                        <Motion.div
                          key={s.slug}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.22, delay: i * 0.035, ease: "easeOut" }}
                        >
                          <Link
                            to={`/services/${s.slug}`}
                            className="om-services-dropdown-item"
                            onClick={() => setServicesOpen(false)}
                          >
                            <span className="om-services-dropdown-name">{s.name}</span>
                          </Link>
                        </Motion.div>
                      ))}
                    </Motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="om-navbar-actions">
          <div className="om-navbar-cta-desktop">
            <AccentButton to="/book-a-call">Book a Call</AccentButton>
          </div>

          <button
            type="button"
            className="om-navbar-burger"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div className={open ? "om-navbar-mobile-panel is-open" : "om-navbar-mobile-panel"}>
        {NAV_LINKS.map((link) => {
          if (!link.hasDropdown) {
            return (
              <a
                key={link.hash}
                href={`/#${link.hash}`}
                className="om-navbar-mobile-link"
                onClick={(e) => handleNavClick(e, link.hash)}
              >
                {link.label}
              </a>
            );
          }

          return (
            <div key={link.hash}>
              <a
                href={`/#${link.hash}`}
                className="om-navbar-mobile-link"
                onClick={(e) => handleNavClick(e, link.hash)}
              >
                {link.label}
              </a>
              <div className="om-navbar-mobile-services">
                {services.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/services/${s.slug}`}
                    className="om-navbar-mobile-services-link"
                    onClick={() => setOpen(false)}
                  >
                    {s.name}
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
        <AccentButton to="/book-a-call">Book a Call</AccentButton>
      </div>
    </header>
  );
}