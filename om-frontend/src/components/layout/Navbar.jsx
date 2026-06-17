import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import OrbitIcon from "../ui/OrbitIcon";
import { GoldButton } from "../ui/Button";
import { services } from "../../data/services";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);

  const closeMenus = () => {
    setMobileOpen(false);
    setServicesOpen(false);
  };

  const openDropdown = () => {
    clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setServicesOpen(false), 140);
  };

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "color-mix(in srgb, var(--bg) 88%, transparent)",
        backdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--hairline)",
      }}
    >
      <style>{`
        .om-nav-link {
          font-family: 'Playfair Display', serif;
          font-style: italic;
          font-size: 15.5px;
          color: var(--text);
          text-decoration: none;
          opacity: 0.82;
          transition: opacity 0.2s ease, color 0.2s ease;
          display: flex;
          align-items: center;
          gap: 4px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 0;
        }
        .om-nav-link:hover { opacity: 1; color: var(--gold); }
        .om-nav-divider { width: 1px; height: 16px; background: var(--hairline); }

        .om-dropdown {
          position: absolute;
          top: calc(100% + 14px);
          left: 50%;
          transform: translateX(-50%);
          width: 360px;
          background: var(--bg-elevated);
          border: 1px solid var(--hairline);
          border-radius: 14px;
          box-shadow: var(--shadow);
          padding: 10px;
          opacity: 0;
          visibility: hidden;
          translate: 0 -6px;
          transition: opacity 0.18s ease, translate 0.18s ease, visibility 0.18s;
        }
        .om-dropdown.open {
          opacity: 1;
          visibility: visible;
          translate: 0 0;
        }
        .om-dropdown-item {
          display: flex;
          align-items: baseline;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 9px;
          text-decoration: none;
          transition: background 0.15s ease;
        }
        .om-dropdown-item:hover { background: var(--gold-soft); }
        .om-dropdown-num {
          font-family: 'Inter', sans-serif;
          font-size: 11px;
          color: var(--gold);
          font-weight: 600;
        }
        .om-dropdown-name {
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          color: var(--text);
        }

        .om-mobile-panel {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
          border-top: 1px solid var(--hairline);
        }
        .om-mobile-panel.open { max-height: 600px; }
      `}</style>

      <div
        className="om-container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 84,
        }}
      >
        <Link to="/" onClick={closeMenus} style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
          <OrbitIcon size={30} style={{ color: "var(--gold)" }} />
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 23, color: "var(--text)", lineHeight: 1 }}>
            Orbit{" "}
            <span style={{ fontStyle: "italic", color: "var(--gold)" }}>Media</span>
          </span>
        </Link>

        <nav style={{ display: "none", alignItems: "center", gap: 26 }} className="om-desktop-nav">
          <div
            ref={dropdownRef}
            style={{ position: "relative" }}
            onMouseEnter={openDropdown}
            onMouseLeave={scheduleClose}
          >
            <button className="om-nav-link" onClick={() => setServicesOpen((o) => !o)}>
              Services <ChevronDown size={13} strokeWidth={2} style={{ marginTop: 2 }} />
            </button>
            <div className={`om-dropdown${servicesOpen ? " open" : ""}`}>
              {services.map((s) => (
                <Link key={s.slug} to={`/services/${s.slug}`} className="om-dropdown-item" onClick={closeMenus}>
                  <span className="om-dropdown-num">{s.number}</span>
                  <span className="om-dropdown-name">{s.name}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className="om-nav-divider" />
          <Link to="/case-studies" className="om-nav-link" onClick={closeMenus}>Case Studies</Link>
          <div className="om-nav-divider" />
          <Link to="/contact" className="om-nav-link" onClick={closeMenus}>Contact</Link>
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div className="om-desktop-nav" style={{ display: "none" }}>
            <GoldButton to="/contact">Book a Call</GoldButton>
          </div>
          <button
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((o) => !o)}
            className="om-mobile-trigger"
            style={{
              display: "none",
              background: "none",
              border: "1px solid var(--hairline)",
              borderRadius: 9,
              width: 40,
              height: 40,
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text)",
              cursor: "pointer",
            }}
          >
            {mobileOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        </div>
      </div>

      <div className={`om-mobile-panel ${mobileOpen ? "open" : ""}`} style={{ display: "none" }} id="om-mobile-panel-wrap">
        <div className="om-container" style={{ padding: "18px 24px 28px", display: "flex", flexDirection: "column", gap: 4 }}>
          <span className="om-eyebrow" style={{ margin: "6px 0" }}>Services</span>
          {services.map((s) => (
            <Link
              key={s.slug}
              to={`/services/${s.slug}`}
              onClick={closeMenus}
              style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "10px 0", textDecoration: "none" }}
            >
              <span style={{ fontSize: 11, color: "var(--gold)", fontFamily: "Inter, sans-serif" }}>{s.number}</span>
              <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "var(--text)" }}>{s.name}</span>
            </Link>
          ))}
          <div style={{ height: 1, background: "var(--hairline)", margin: "10px 0" }} />
          <Link to="/case-studies" onClick={closeMenus} style={{ padding: "10px 0", fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 17, color: "var(--text)", textDecoration: "none" }}>Case Studies</Link>
          <Link to="/contact" onClick={closeMenus} style={{ padding: "10px 0", fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 17, color: "var(--text)", textDecoration: "none" }}>Contact</Link>
          <div style={{ marginTop: 14 }}>
            <GoldButton to="/contact" onClick={closeMenus} style={{ width: "100%" }}>Book a Call</GoldButton>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 920px) {
          .om-desktop-nav { display: flex !important; }
          .om-mobile-trigger { display: none !important; }
          #om-mobile-panel-wrap { display: none !important; }
        }
        @media (max-width: 919px) {
          .om-mobile-trigger { display: flex !important; }
          #om-mobile-panel-wrap { display: block !important; }
        }
      `}</style>
    </header>
  );
}
