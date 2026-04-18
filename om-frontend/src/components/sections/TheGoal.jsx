export default function TheGoal() {
  return (
    <section
      style={{
        background: "#0d0d0d",
        padding: "100px 40px",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&display=swap');

        .goal-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .goal-left {}

        .goal-heading {
          font-size: clamp(48px, 6vw, 76px);
          font-weight: 800;
          color: #ffffff;
          letter-spacing: -2px;
          line-height: 1;
          margin: 0 0 20px;
          position: relative;
          display: inline-block;
        }

        .goal-heading span {
          color: #f5a623;
        }

        .goal-accent {
          position: absolute;
          top: -12px;
          right: -28px;
        }

        .goal-subtext {
          font-size: 17px;
          color: #888;
          font-weight: 400;
          margin: 0;
          letter-spacing: -0.1px;
        }

        .goal-right {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        .goal-right p {
          font-size: clamp(16px, 1.8vw, 20px);
          color: #dddddd;
          font-weight: 400;
          line-height: 1.6;
          margin: 0;
          letter-spacing: -0.2px;
        }

        .goal-right p:first-child {
          font-size: clamp(18px, 2.2vw, 24px);
          font-weight: 600;
          color: #ffffff;
          letter-spacing: -0.4px;
        }

        @media (max-width: 768px) {
          .goal-inner {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>

      <div className="goal-inner">
        {/* Left */}
        <div className="goal-left">
          <h2 className="goal-heading">
            The <span>Goal</span>
            {/* accent lines like in image */}
            <svg className="goal-accent" width="44" height="36" viewBox="0 0 44 36" fill="none">
              <line x1="14" y1="4" x2="38" y2="4" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="24" y1="14" x2="44" y2="0" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
              <line x1="30" y1="10" x2="44" y2="10" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round"/>
            </svg>
          </h2>
          <p className="goal-subtext">We become your brains and brawn.</p>
        </div>

        {/* Right */}
        <div className="goal-right">
          <p>Max content output with minimal input.</p>
          <p>
            Our clients typically film 3-5 hours a month, we take care of the rest.
            In other cases, they have footage and need no extra work.
          </p>
          <p>Growth focused organic content that brings results. Always.</p>
        </div>
      </div>
    </section>
  );
}