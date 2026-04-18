const testimonials = [
  {
    text: (
      <>
        For 3 years, Metro Media House has been my go-to team —{" "}
        <span className="t-highlight">helping deliver top-quality content for 7–9 figure clients</span>{" "}
        with great communication, fast turnaround, and flawless editing.
      </>
    ),
    name: "Patrick Crosby",
    role: "Founder, Omni Media Group",
    size: "large",
  },
  {
    text: (
      <>
        Holy F*cking shit. Excuse my language but{" "}
        <span className="t-highlight">I took a sneak peek at the edits and they are unreal.</span>{" "}
        So stoked about this.
      </>
    ),
    name: "George Munguia",
    role: "Founder, Tryharmony.ai",
    size: "medium",
  },
  {
    text: (
      <>
        Love the vibe and overall execution.{" "}
        <span className="t-highlight">Edits are crisp, song choice & energy is a vibe, broll is on point, fonts are awesome.</span>{" "}
        Great work!
      </>
    ),
    name: "Drew Rogers",
    role: "Founder, Stabledash Studios",
    size: "medium",
  },
  {
    text: (
      <>
        Metro Media House helped me rapidly build my personal brand online. Saksham is more than a supplier —{" "}
        <span className="t-highlight">he's a true partner with vision, strategy, and 24/7 support</span>
      </>
    ),
    name: "Christian Schute",
    role: "Founder",
    size: "medium",
  },
  {
    text: (
      <>
        Working with MMH has been an absolute pleasure. They produced several videos for Fluid Focus, and we were genuinely impressed by the creativity they brought to each concept.{" "}
        <span className="t-highlight">Their modern editing style gave our content a fresh, engaging feel</span>{" "}
        that really captured our brand. Professional, imaginative, and easy to collaborate with —
      </>
    ),
    name: "Fluid Focus Team",
    role: "Fluid Focus",
    size: "large",
  },
  {
    text: (
      <>
        In just six weeks, Saksham and his team at Metro Media House helped me grow my brand significantly,{" "}
        <span className="t-highlight">increasing my income by thousands of dollars and securing three key client calls.</span>{" "}
        Highly recommend their approachable team and effective strategies.
      </>
    ),
    name: "Brand Partner",
    role: "Entrepreneur",
    size: "large",
  },
];

export default function Testimonials() {
  // Split into 3 columns
  const col1 = [testimonials[0], testimonials[3]];
  const col2 = [testimonials[1], testimonials[4]];
  const col3 = [testimonials[2], testimonials[5]];

  return (
    <section style={{ background: "#0d0d0d", padding: "80px 40px", fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

        .t-inner {
          max-width: 1200px;
          margin: 0 auto;
        }

        .t-header {
          margin-bottom: 48px;
        }

        .t-title {
          font-size: clamp(40px, 5.5vw, 68px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -2px;
          line-height: 1;
          margin: 0 0 14px;
          position: relative;
          display: inline-block;
        }

        .t-title span {
          color: #f5a623;
        }

        .t-title-accent {
          position: absolute;
          top: -10px;
          right: -32px;
        }

        .t-subtitle {
          color: #888;
          font-size: 16px;
          margin: 0;
          font-weight: 400;
        }

        .t-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          align-items: start;
        }

        .t-col {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .t-card {
          background: #141414;
          border: 1px solid #232323;
          border-radius: 12px;
          padding: 28px 26px;
          transition: border-color 0.25s;
        }

        .t-card:hover {
          border-color: #3a3a3a;
        }

        .t-text {
          font-size: 15px;
          color: #cccccc;
          line-height: 1.7;
          margin: 0 0 22px;
          font-weight: 400;
        }

        .t-highlight {
          color: #f5a623;
        }

        .t-name {
          font-size: 15px;
          font-weight: 700;
          color: #ffffff;
          letter-spacing: -0.2px;
          margin: 0 0 2px;
        }

        .t-role {
          font-size: 13px;
          color: #666;
          margin: 0;
          font-weight: 400;
        }

        @media (max-width: 900px) {
          .t-grid { grid-template-columns: 1fr 1fr; }
        }

        @media (max-width: 600px) {
          .t-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <div className="t-inner">
        {/* Header */}
        <div className="t-header">
          <h2 className="t-title">
            Client <span>Testimonials</span>
            <svg className="t-title-accent" width="46" height="36" viewBox="0 0 46 36" fill="none">
              <line x1="14" y1="4" x2="40" y2="4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="26" y1="14" x2="46" y2="0" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="32" y1="10" x2="46" y2="10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="t-subtitle">Hear from their experience</p>
        </div>

        {/* 3 column masonry-style grid */}
        <div className="t-grid">
          <div className="t-col">
            {col1.map((t, i) => (
              <div className="t-card" key={i}>
                <p className="t-text">{t.text}</p>
                <p className="t-name">{t.name}</p>
                <p className="t-role">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="t-col">
            {col2.map((t, i) => (
              <div className="t-card" key={i}>
                <p className="t-text">{t.text}</p>
                <p className="t-name">{t.name}</p>
                <p className="t-role">{t.role}</p>
              </div>
            ))}
          </div>
          <div className="t-col">
            {col3.map((t, i) => (
              <div className="t-card" key={i}>
                <p className="t-text">{t.text}</p>
                <p className="t-name">{t.name}</p>
                <p className="t-role">{t.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}