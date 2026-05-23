import logo from '../../assets/logo.png'; // adjust path as needed
const navItems = [
    { label: "How It Works", href: "#process" },
    { label: "Services", href: "#services" },
    { label: "Work", href: "#work" },
    { label: "Case Studies", href: "#case-studies" },
    { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
    return (
        <header
            className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5"
            style={{ background: "rgba(9, 5, 26, 0.95)", fontFamily: "'Bricolage Grotesque', sans-serif" }}
        >
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Caveat:wght@500&display=swap');

        .nav-link {
          font-size: 15px;
          font-weight: 500;
          color: rgba(255,255,255,0.6);
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: color 0.2s;
          padding: 6px 0;
          position: relative;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1.5px;
          background: #a78bfa;
          transition: width 0.25s ease;
          border-radius: 99px;
        }

        .nav-link:hover {
          color: #fff;
        }

        .nav-link:hover::after {
          width: 100%;
        }

        .nav-cta {
          font-family: 'Bricolage Grotesque', sans-serif;
          font-size: 14px;
          font-weight: 600;
          color: #fff;
          background: linear-gradient(135deg, #7c3aed, #a78bfa);
          padding: 9px 20px;
          border-radius: 8px;
          text-decoration: none;
          letter-spacing: -0.01em;
          transition: opacity 0.2s;
        }

        .nav-cta:hover {
          opacity: 0.88;
        }
      `}</style>

            <div
                style={{
                    maxWidth: 1100,
                    margin: "0 auto",
                    padding: "0 40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    height: 90,
                }}
            >
                {/* Logo — replace with your <img> or SVG */}
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

                {/* Nav links */}
                <nav style={{ display: "flex", alignItems: "center", gap: 28 }}>
                    {navItems.map((item) => (
                        <a key={item.label} href={item.href} className="nav-link">
                            {item.label}
                        </a>
                    ))}
                </nav>

                {/* CTA */}
                <a href="#contact" className="nav-cta">
                    Book a Call
                </a>
            </div>
        </header>
    );
}