import {
  Compass,
  Camera,
  Scissors,
  Rocket,
} from "lucide-react";

const steps = [
  {
    step: "Step 01",
    title: "Strategy",
    description:
      "We map your niche, voice and content pillars — a founder-first system built around your story and the audience you want to own.",
    icon: Compass,
  },
  {
    step: "Step 02",
    title: "Shoot / Record",
    description:
      "Cinematic in-person or remote shoots. Podcasts, founder content, UGC — captured with intention and pro-grade gear.",
    icon: Camera,
  },
  {
    step: "Step 03",
    title: "Edit & Distribute",
    description:
      "Premium editing, hooks engineered for retention, then distributed across every platform your audience lives on.",
    icon: Scissors,
  },
  {
    step: "Step 04",
    title: "Scale Organically",
    description:
      "We track, iterate and compound. Authority builds. Inbound demand grows. No ads. Just attention you actually own.",
    icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <section
      style={{
        background: "#09051a",
        padding: "80px 40px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Caveat:wght@500&display=swap');

        .ps-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.04;
          background-image:
            linear-gradient(rgba(167,139,250,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.6) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }

        .ps-blob {
          position: absolute;
          width: 420px;
          height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(109,40,217,0.2) 0%, transparent 68%);
          top: -100px;
          right: -60px;
          pointer-events: none;
        }

        .ps-blob2 {
          position: absolute;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.1) 0%, transparent 68%);
          bottom: 0;
          left: 10%;
          pointer-events: none;
        }

        .ps-inner {
          max-width: 1100px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        .ps-eyebrow {
          font-family: 'Caveat', cursive;
          font-size: 22px;
          font-weight: 500;
          color: #a78bfa;
          margin: 0 0 18px;
        }

        .ps-heading {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 800;
          color: #fff;
          line-height: 0.97;
          letter-spacing: -0.05em;
          margin: 0 0 72px;
        }

        .ps-heading-accent {
          font-family: 'Caveat', cursive;
          font-weight: 500;
          font-size: clamp(44px, 6.5vw, 78px);
          color: #c4b5fd;
          letter-spacing: -0.02em;
          font-style: normal;
        }

        .ps-steps {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 0;
          position: relative;
        }

        .ps-connector {
          position: absolute;
          top: 55px;
          left: 56px;
          right: 56px;
          height: 1px;
          border-top: 1.5px dashed rgba(167,139,250,0.2);
          z-index: 0;
        }

        .ps-step {
          position: relative;
          z-index: 1;
          padding: 0 24px 0 0;
        }

        .ps-icon-ring {
          width: 110px;
          height: 110px;
          border-radius: 50%;
          border: 1.5px solid rgba(139,92,246,0.45);
          background: rgba(109,40,217,0.12);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 32px;
          position: relative;
        }

        .ps-icon-ring::after {
          content: '';
          position: absolute;
          inset: 6px;
          border-radius: 50%;
          border: 1px solid rgba(167,139,250,0.15);
        }

        .ps-step-num {
          position: absolute;
          top: -8px;
          right: -4px;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          background: #3b0764;
          border: 1.5px solid rgba(167,139,250,0.35);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 11px;
          font-weight: 700;
          color: #c4b5fd;
          font-family: 'Bricolage Grotesque', sans-serif;
        }

        .ps-step-label {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: #7c3aed;
          margin: 0 0 12px;
        }

        .ps-step-title {
          font-size: 26px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.04em;
          margin: 0 0 14px;
          line-height: 1.1;
        }

        .ps-step-desc {
          font-size: 14px;
          line-height: 1.75;
          color: #9ca3af;
          margin: 0;
          max-width: 260px;
        }

        @media (max-width: 900px) {
          .ps-steps {
            grid-template-columns: repeat(2, 1fr);
            gap: 48px;
          }
          .ps-connector {
            display: none;
          }
        }

        @media (max-width: 540px) {
          .ps-steps {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>

      <div className="ps-grid-bg" />
      <div className="ps-blob" />
      <div className="ps-blob2" />

      <div className="ps-inner">
        <p className="ps-eyebrow">— How it works</p>

       <h2 className="ps-heading">
  A <span className="ps-heading-accent">4-step</span> system<br />
  built to <em className="ps-heading-accent">compound.</em>
</h2>

        <div className="ps-steps">
          <div className="ps-connector" />

          {steps.map((item, index) => {
            const Icon = item.icon;
            return (
              <div className="ps-step" key={index}>
                <div className="ps-icon-ring">
                  <Icon size={32} color="#c4b5fd" strokeWidth={2} />
                  <span className="ps-step-num">0{index + 1}</span>
                </div>
                <p className="ps-step-label">{item.step}</p>
                <h3 className="ps-step-title">{item.title}</h3>
                <p className="ps-step-desc">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}