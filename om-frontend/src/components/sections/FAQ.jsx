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
  {
    question: "What does your content strategy include?",
    answer:
      "Our strategy covers audience research, content planning, copywriting, visual direction, and distribution recommendations. We tailor every element to your brand's unique voice and goals.",
  },
  {
    question: "Do you work with early-stage startups?",
    answer:
      "Absolutely. Many of our best partnerships started at the idea stage. We offer flexible engagement models that scale as your business grows.",
  },
  {
    question: "How do we get started?",
    answer:
      "Book a 20-minute discovery call. We'll walk through your goals, assess the opportunity, and outline a plan before any commitment is made.",
  },
  {
    question: "Can I cancel anytime?",
    answer:
      "Yes. We work on a rolling monthly basis with no long-term lock-in. We believe in earning your business every single month.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section style={{ background: "#0f0a1e", padding: "72px 40px", fontFamily: "'DM Sans', sans-serif",  position: "relative", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;700&display=swap');

        .faq-bg-blob {
          position: absolute;
          width: 380px;
          height: 380px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(124,58,237,0.18) 0%, transparent 70%);
          top: -80px;
          right: -80px;
          pointer-events: none;
        }

        .faq-bg-blob2 {
          position: absolute;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(167,139,250,0.10) 0%, transparent 70%);
          bottom: 40px;
          left: -40px;
          pointer-events: none;
        }

        .faq-inner {
          max-width: 900px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 220px 1fr;
          gap: 56px;
          align-items: start;
          position: relative;
          z-index: 1;
        }

        .faq-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: #a78bfa;
          background: rgba(167,139,250,0.12);
          border: 1px solid rgba(167,139,250,0.25);
          border-radius: 99px;
          padding: 4px 12px;
          margin-bottom: 20px;
        }

        .faq-title {
          font-size: 48px;
          font-weight: 700;
          color: #ffffff;
          line-height: 1.05;
          letter-spacing: -1.5px;
          margin: 0 0 16px;
        }

        .faq-title-accent {
          font-style: normal;
          background: linear-gradient(135deg, #a78bfa, #c4b5fd);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .faq-divider {
          width: 32px;
          height: 2px;
          background: linear-gradient(90deg, #7c3aed, transparent);
          margin: 20px 0;
          border-radius: 2px;
        }

        .faq-subtitle {
          font-size: 13px;
          color: #6b6b8a;
          line-height: 1.6;
          margin: 0;
        }

        .faq-count {
          font-size: 12px;
          color: #4b4b6a;
          font-weight: 500;
          margin-top: 14px;
        }

        .faq-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .faq-item {
          border-radius: 12px;
          border: 1px solid rgba(124,58,237,0.15);
          background: rgba(255,255,255,0.03);
          overflow: hidden;
          transition: border-color 0.25s ease, background 0.25s ease;
          cursor: pointer;
        }

        .faq-item:hover {
          border-color: rgba(167,139,250,0.35);
          background: rgba(124,58,237,0.06);
        }

        .faq-item.open {
          border-color: rgba(167,139,250,0.4);
          background: rgba(124,58,237,0.08);
        }

        .faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          color: #e2e0ff;
          font-size: 15px;
          font-weight: 500;
          font-family: 'DM Sans', sans-serif;
          letter-spacing: -0.2px;
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
        }

        .faq-icon-wrap {
          flex-shrink: 0;
          width: 26px;
          height: 26px;
          border-radius: 50%;
          border: 1.5px solid rgba(167,139,250,0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.25s, border-color 0.25s, transform 0.35s cubic-bezier(0.34,1.56,0.64,1);
          color: #7c5cbf;
        }

        .faq-item.open .faq-icon-wrap {
          background: rgba(124,58,237,0.25);
          border-color: rgba(167,139,250,0.6);
          color: #c4b5fd;
          transform: rotate(45deg);
        }

        .faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.38s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .faq-item.open .faq-answer-wrap {
          grid-template-rows: 1fr;
        }

        .faq-answer-inner {
          overflow: hidden;
        }

        .faq-answer {
          padding: 14px 20px 18px;
          color: #8880a8;
          font-size: 14px;
          line-height: 1.75;
          font-family: 'DM Sans', sans-serif;
          border-top: 1px solid rgba(124,58,237,0.12);
        }

        @media (max-width: 640px) {
          .faq-inner {
            grid-template-columns: 1fr;
            gap: 28px;
          }
          .faq-title {
            font-size: 36px;
          }
        }
      `}</style>

      <div className="faq-bg-blob" />
      <div className="faq-bg-blob2" />

      <div className="faq-inner">
        {/* Left: Title */}
        <div>
          <div className="faq-badge">
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <circle cx="4" cy="4" r="4" fill="#a78bfa" />
            </svg>
            Support
          </div>
          <h2 className="faq-title">
            Got<br />
            <em className="faq-title-accent">questions?</em>
          </h2>
          <div className="faq-divider" />
          <p className="faq-subtitle">Everything you need to know before getting started.</p>
          <p className="faq-count">{faqs.length} questions</p>
        </div>

        {/* Right: Accordion */}
        <div className="faq-list">
          {faqs.map((faq, i) => (
            <div key={i} className={`faq-item${openIndex === i ? " open" : ""}`}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={openIndex === i}
              >
                <span>{faq.question}</span>
                <span className="faq-icon-wrap" aria-hidden="true">
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className="faq-answer-wrap">
                <div className="faq-answer-inner">
                  <div className="faq-answer">{faq.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}