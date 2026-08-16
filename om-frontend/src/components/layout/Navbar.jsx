import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import OrbitIcon from "../ui/OrbitIcon";
import { AccentButton } from "../ui/Button";
import { services } from "../../data/services";

export default function Navbar() {
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);
  // Once the grow-in animation has finished, the pill no longer needs to
  // clip its own contents — this lets the services dropdown and the
  // mobile menu panel render outside the pill's box instead of being cut
  // off by `overflow: hidden`.
  const [revealed, setRevealed] = useState(false);
  const dropdownRef = useRef(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    // trigger the grow-in animation just after mount
    const t = setTimeout(() => setLoaded(true), 80);
    // matches the longest transition on .om-navbar-inner (0.75s) + buffer
    const t2 = setTimeout(() => setRevealed(true), 900);
    return () => {
      clearTimeout(t);
      clearTimeout(t2);
    };
  }, []);

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
    <div className="om-navbar-outer">
      <header
        className={`om-navbar-inner ${loaded ? "loaded" : ""} ${mobileOpen ? "menu-open" : ""} ${revealed ? "revealed" : ""}`}
      >
        <style>{`
          .om-navbar-outer {
            position: fixed;
            top: 18px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 50;
            width: 94%;
            max-width: 1180px;
            display: flex;
            justify-content: center;
          }

          .om-navbar-inner {
            position: relative;
            width: 100%;
            background: color-mix(in srgb, var(--bg-elevated) 55%, transparent);
            backdrop-filter: blur(20px) saturate(180%);
            -webkit-backdrop-filter: blur(20px) saturate(180%);
            border: 1px solid color-mix(in srgb, var(--hairline) 70%, transparent);
            border-radius: 999px;
            box-shadow: 0 8px 30px rgba(0,0,0,0.14), inset 0 1px 0 rgba(255,255,255,0.06);
            overflow: hidden;

            /* start state: small + invisible */
            height: 52px;
            max-width: 220px;
            opacity: 0;
            transform: translateY(-14px) scale(0.92);
            transform-origin: top center;
            transition:
              max-width 0.75s cubic-bezier(0.16, 1, 0.3, 1),
              height 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.6s cubic-bezier(0.16, 1, 0.3, 1),
              opacity 0.5s ease,
              border-radius 0.5s ease;
          }

          .om-navbar-inner.loaded {
            height: 84px;
            max-width: 1180px;
            opacity: 1;
            transform: translateY(0) scale(1);
          }

          .om-navbar-inner.menu-open {
            border-radius: 28px;
          }

          /* Allow the services dropdown and mobile panel (both positioned
             below the pill) to render outside its bounds once the initial
             grow-in animation has completed. */
          .om-navbar-inner.revealed {
            overflow: visible;
          }

          .om-navbar-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 84px;
            padding: 0 22px 0 20px;
            white-space: nowrap;
          }

          .om-nav-link {
            font-family: 'Switzer', sans-serif;
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
          .om-nav-link:hover { opacity: 1; color: var(--accent); }
          .om-nav-divider { width: 1px; height: 16px; background: var(--hairline); }

          .om-dropdown {
            position: absolute;
            top: calc(100% + 14px);
            left: 50%;
            transform: translateX(-50%);
            width: 360px;
            background: color-mix(in srgb, var(--bg-elevated) 92%, transparent);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--hairline);
            border-radius: 18px;
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
          .om-dropdown-item:hover { background: var(--accent-soft); }
          .om-dropdown-num {
            font-family: 'Switzer', sans-serif;
            font-size: 11px;
            color: var(--accent);
            font-weight: 600;
          }
          .om-dropdown-name {
            font-family: 'Switzer', sans-serif;
            font-size: 16px;
            color: var(--text);
          }

          .om-mobile-panel {
            position: absolute;
            top: calc(100% + 10px);
            left: 0;
            right: 0;
            max-height: 0;
            overflow: hidden;
            opacity: 0;
            visibility: hidden;
            background: color-mix(in srgb, var(--bg-elevated) 92%, transparent);
            backdrop-filter: blur(16px);
            -webkit-backdrop-filter: blur(16px);
            border: 1px solid var(--hairline);
            border-radius: 22px;
            box-shadow: var(--shadow);
            transition: max-height 0.35s ease, opacity 0.25s ease, visibility 0.35s;
          }
          .om-mobile-panel.open {
            max-height: 600px;
            opacity: 1;
            visibility: visible;
          }

          @media (min-width: 920px) {
            .om-desktop-nav { display: flex !important; }
            .om-mobile-trigger { display: none !important; }
            #om-mobile-panel-wrap { display: none !important; }
          }
          @media (max-width: 919px) {
            .om-mobile-trigger { display: flex !important; }
            #om-mobile-panel-wrap { display: block !important; }
            .om-navbar-inner.loaded { max-width: 640px; }
          }
        `}</style>

        <div className="om-navbar-row">
          <Link to="/" onClick={closeMenus} style={{ display: "flex", alignItems: "center", gap: 9, textDecoration: "none" }}>
            <OrbitIcon size={30} style={{ color: "var(--accent)" }} />
            <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 23, color: "var(--text)", lineHeight: 1 }}>
              Orbit{" "}
              <span style={{ color: "var(--accent)" }}>Media</span>
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
          </nav>

          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div className="om-desktop-nav" style={{ display: "none" }}>
              <AccentButton to="https://cal.com/ayush-kumar-ujqipk/15min">
                Book a Call
              </AccentButton>
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

        <div className={`om-mobile-panel ${mobileOpen ? "open" : ""}`} id="om-mobile-panel-wrap">
          <div style={{ padding: "18px 24px 28px", display: "flex", flexDirection: "column", gap: 4 }}>
            <span className="om-eyebrow" style={{ margin: "6px 0" }}>Services</span>
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services/${s.slug}`}
                onClick={closeMenus}
                style={{ display: "flex", gap: 10, alignItems: "baseline", padding: "10px 0", textDecoration: "none" }}
              >
                <span style={{ fontSize: 11, color: "var(--accent)", fontFamily: "Switzer, sans-serif" }}>{s.number}</span>
                <span style={{ fontFamily: "'Switzer', sans-serif", fontSize: 18, color: "var(--text)" }}>{s.name}</span>
              </Link>
            ))}
            <div style={{ height: 1, background: "var(--hairline)", margin: "10px 0" }} />
            <Link to="/case-studies" onClick={closeMenus} style={{ padding: "10px 0", fontFamily: "'Switzer', sans-serif", fontSize: 17, color: "var(--text)", textDecoration: "none" }}>Case Studies</Link>
            <a
              href="https://cal.com/ayush-kumar-ujqipk/15min"
              target="_blank"
              rel="noreferrer"
              onClick={closeMenus}
              style={{ padding: "10px 0", fontFamily: "'Switzer', sans-serif", fontSize: 17, color: "var(--text)", textDecoration: "none" }}
            >
              Contact
            </a>
            <div style={{ marginTop: 14 }}>
              <AccentButton to="https://cal.com/ayush-kumar-ujqipk/15min">
                Book a Call
              </AccentButton>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}