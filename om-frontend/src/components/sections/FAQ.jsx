import { useState } from "react";

const faqs = [
  {
    question: "Who is this for?",
    answer:
      "This is for brands, founders, and businesses who want to stand out online with high-quality content. Whether you're just starting or scaling, we help you build a compelling digital presence.",
  },
  {
    question: "What is the timeline of results?",
    answer:
      "Most clients start seeing measurable results within the first 30–60 days. Long-term growth compounds over time as your content strategy matures and your audience builds trust.",
  },
  {
    question: "Is there any guarantee?",
    answer:
      "We stand behind our work. If you're not satisfied within the first two weeks, we'll revise your deliverables until you are — no questions asked.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      style={{
        background: "#0d0d0d",
        padding: "80px 40px",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&display=swap');

        .faq-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 60px;
          align-items: start;
        }

        .faq-title {
          font-size: clamp(48px, 6vw, 80px);
          font-weight: 800;
          color: #ffffff;
          line-height: 1;
          letter-spacing: -2px;
          position: relative;
          display: inline-block;
        }

        .faq-title-accent {
          position: absolute;
          top: -10px;
          right: -18px;
          width: 38px;
          height: 38px;
        }

        .faq-item {
          border: 1px solid #2a2a2a;
          border-radius: 8px;
          margin-bottom: 12px;
          overflow: hidden;
          background: #161616;
          transition: border-color 0.2s;
        }

        .faq-item:hover {
          border-color: #444;
        }

        .faq-question {
          width: 100%;
          background: none;
          border: none;
          color: #e5e5e5;
          font-family: 'Syne', sans-serif;
          font-size: 17px;
          font-weight: 500;
          text-align: left;
          padding: 22px 24px;
          cursor: pointer;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          letter-spacing: -0.2px;
        }

        .faq-icon {
          flex-shrink: 0;
          width: 28px;
          height: 28px;
          border: 1.5px solid #444;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.3s ease, border-color 0.2s;
          color: #888;
        }

        .faq-icon.open {
          transform: rotate(45deg);
          border-color: #fff;
          color: #fff;
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.35s ease, padding 0.3s ease;
          padding: 0 24px;
          color: #888;
          font-size: 15px;
          line-height: 1.7;
          font-family: 'Syne', sans-serif;
        }

        .faq-answer.open {
          max-height: 200px;
          padding: 0 24px 22px;
        }

        @media (max-width: 768px) {
          .faq-wrapper {
            grid-template-columns: 1fr;
            gap: 32px;
          }
        }
      `}</style>

      <div className="faq-wrapper">
        {/* Left: Title */}
        <div>
          <h2 className="faq-title">
            FAQs
            {/* Decorative accent lines like in image */}
            <svg
              className="faq-title-accent"
              viewBox="0 0 38 38"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="10" y1="4" x2="28" y2="4" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="18" y1="12" x2="32" y2="0" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="26" y1="8" x2="38" y2="8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
          </h2>
        </div>

        {/* Right: Accordion */}
        <div>
          {faqs.map((faq, i) => (
            <div className="faq-item" key={i}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.question}</span>
                <span className={`faq-icon${openIndex === i ? " open" : ""}`}>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <line x1="6" y1="0" x2="6" y2="12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="0" y1="6" x2="12" y2="6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className={`faq-answer${openIndex === i ? " open" : ""}`}>
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}