export default function ProblemsSolved() {
  const cards = [
    {
      label: "Lead Creatives",
      position: "top-left",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="20" r="11" stroke="#a78bfa" strokeWidth="2" fill="none"/>
          <path d="M20 20a6 6 0 0 1 6-6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
          <path d="M26 31v4M23 35h6" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
          {/* rays */}
          <line x1="26" y1="5" x2="26" y2="2" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="38" y1="9" x2="40" y2="7" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="14" y1="9" x2="12" y2="7" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="42" y1="20" x2="45" y2="20" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="7" y1="20" x2="10" y2="20" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
          {/* clock hand */}
          <circle cx="26" cy="20" r="2" fill="#a78bfa"/>
          <line x1="26" y1="20" x2="26" y2="15" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="26" y1="20" x2="30" y2="20" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: "World-class Editors",
      position: "top-right",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <rect x="6" y="14" width="18" height="24" rx="2" stroke="#a78bfa" strokeWidth="2"/>
          <rect x="10" y="18" width="10" height="6" rx="1" stroke="#a78bfa" strokeWidth="1.5"/>
          <line x1="10" y1="28" x2="20" y2="28" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="10" y1="32" x2="18" y2="32" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
          {/* scissors */}
          <circle cx="36" cy="20" r="3" stroke="#a78bfa" strokeWidth="1.8"/>
          <circle cx="36" cy="32" r="3" stroke="#a78bfa" strokeWidth="1.8"/>
          <line x1="38.5" y1="22" x2="44" y2="38" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="33.5" y1="22" x2="28" y2="38" stroke="#a78bfa" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: "Content Writers",
      position: "mid-left",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <rect x="10" y="8" width="32" height="36" rx="3" stroke="#a78bfa" strokeWidth="2"/>
          <rect x="16" y="16" width="20" height="4" rx="1" fill="#a78bfa" opacity="0.3"/>
          <rect x="16" y="16" width="20" height="4" rx="1" stroke="#a78bfa" strokeWidth="1.5"/>
          <line x1="16" y1="25" x2="36" y2="25" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="16" y1="30" x2="30" y2="30" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1="16" y1="35" x2="28" y2="35" stroke="#a78bfa" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
    },
    {
      label: "Project Managers",
      position: "mid-right",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="18" r="8" stroke="#a78bfa" strokeWidth="2" fill="none"/>
          <path d="M10 44c0-8.837 7.163-16 16-16s16 7.163 16 16" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
          {/* badge/star */}
          <circle cx="38" cy="12" r="6" fill="#1a1a2e" stroke="#a78bfa" strokeWidth="1.5"/>
          <text x="38" y="16" textAnchor="middle" fontSize="8" fill="#a78bfa" fontWeight="bold">★</text>
        </svg>
      ),
    },
    {
      label: "Designers",
      position: "bottom-left",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="18" r="8" stroke="#a78bfa" strokeWidth="2" fill="none"/>
          <path d="M12 44c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
          {/* beret */}
          <path d="M18 14 Q26 6 34 14" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <circle cx="34" cy="14" r="2" fill="#a78bfa"/>
          {/* pen */}
          <line x1="38" y1="30" x2="44" y2="44" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
          <path d="M36 28l4 4-2 2-4-4z" stroke="#a78bfa" strokeWidth="1.5"/>
        </svg>
      ),
    },
    {
      label: "Virtual Assistants",
      position: "bottom-right",
      icon: (
        <svg width="52" height="52" viewBox="0 0 52 52" fill="none">
          <circle cx="26" cy="18" r="8" stroke="#a78bfa" strokeWidth="2" fill="none"/>
          <path d="M12 44c0-7.732 6.268-14 14-14s14 6.268 14 14" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round"/>
          {/* headset */}
          <path d="M18 10 Q26 4 34 10" stroke="#a78bfa" strokeWidth="2" strokeLinecap="round" fill="none"/>
          <rect x="14" y="12" width="5" height="8" rx="2.5" stroke="#a78bfa" strokeWidth="1.5"/>
          <rect x="33" y="12" width="5" height="8" rx="2.5" stroke="#a78bfa" strokeWidth="1.5"/>
        </svg>
      ),
    },
  ];

  const positionStyles = {
    "top-left":     { top: "0%",   left: "0%" },
    "top-right":    { top: "0%",   right: "0%" },
    "mid-left":     { top: "33%",  left: "-3%" },
    "mid-right":    { top: "33%",  right: "-3%" },
    "bottom-left":  { top: "67%",  left: "0%" },
    "bottom-right": { top: "67%",  right: "0%" },
  };

  return (
    <section style={{ background: "#0d0d0d", padding: "80px 40px", fontFamily: "'Syne', sans-serif", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

        .ps-outer {
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
          min-height: 560px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .ps-center {
          text-align: center;
          z-index: 2;
          position: relative;
        }

        .ps-title {
          font-size: clamp(36px, 5vw, 60px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -1.5px;
          line-height: 1.1;
          margin: 0 0 16px;
        }

        .ps-title span {
          color: #f5a623;
        }

        .ps-subtitle {
          color: #888;
          font-size: 16px;
          font-weight: 400;
          max-width: 380px;
          margin: 0 auto;
          line-height: 1.6;
        }

        /* Burst lines */
        .ps-burst {
          position: absolute;
          pointer-events: none;
        }

        /* Cards */
        .ps-cards-grid {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .ps-card {
          position: absolute;
          width: 220px;
          background: #161616;
          border: 1px solid #252525;
          border-radius: 14px;
          padding: 28px 20px 22px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 14px;
          transform: rotate(var(--rot, 0deg));
          transition: transform 0.3s ease, border-color 0.3s;
          pointer-events: all;
          cursor: default;
        }

        .ps-card:hover {
          border-color: #a78bfa44;
          transform: rotate(var(--rot, 0deg)) translateY(-4px);
        }

        .ps-card-label {
          font-size: 15px;
          font-weight: 600;
          color: #c4b5fd;
          letter-spacing: -0.2px;
          text-align: center;
          font-style: italic;
        }

        @media (max-width: 900px) {
          .ps-outer { min-height: auto; flex-direction: column; gap: 40px; }
          .ps-cards-grid { position: static; display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
          .ps-card { position: static; transform: none !important; width: auto; }
          .ps-burst { display: none; }
        }
      `}</style>

      <div className="ps-outer">
        {/* Cards positioned absolutely */}
        <div className="ps-cards-grid">
          {cards.map((card) => (
            <div
              key={card.label}
              className="ps-card"
              style={{
                ...positionStyles[card.position],
                "--rot": card.position.includes("left") ? "-4deg" : "4deg",
              }}
            >
              {card.icon}
              <span className="ps-card-label">{card.label}</span>
            </div>
          ))}
        </div>

        {/* Burst SVG decorations */}
        <svg className="ps-burst" style={{ top: "28%", left: "28%", width: 60, height: 60 }} viewBox="0 0 60 60" fill="none">
          <line x1="30" y1="10" x2="20" y2="0" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="10" x2="40" y2="0" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="10" x2="10" y2="18" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="50" x2="20" y2="60" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="50" x2="40" y2="60" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="50" x2="10" y2="42" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>
        <svg className="ps-burst" style={{ top: "28%", right: "28%", width: 60, height: 60 }} viewBox="0 0 60 60" fill="none">
          <line x1="30" y1="10" x2="20" y2="0" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="10" x2="40" y2="0" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="10" x2="50" y2="18" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="50" x2="20" y2="60" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="50" x2="40" y2="60" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
          <line x1="30" y1="50" x2="50" y2="42" stroke="#f5a623" strokeWidth="2.5" strokeLinecap="round"/>
        </svg>

        {/* Center content */}
        <div className="ps-center">
          <h2 className="ps-title">
            Problems <span>we solve</span>
          </h2>
          <p className="ps-subtitle">
            Think of an in house content team, that you don't have to manage.
          </p>
        </div>
      </div>
    </section>
  );
}