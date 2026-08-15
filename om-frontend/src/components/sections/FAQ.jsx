import { useState } from "react";
import { faqs } from "../../data/faqs";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section style={{ padding: "96px 0" }}>
      <style>{`
        .om-faq-grid {
          display: grid;
          grid-template-columns: 280px 1fr;
          gap: 56px;
          align-items: start;
        }
        .om-faq-item {
          border-radius: 12px;
          border: 1px solid var(--hairline);
          background: var(--bg-soft);
          overflow: hidden;
          transition: border-color 0.2s ease;
        }
        .om-faq-item:hover { border-color: var(--border-accent); }
        .om-faq-item.open { border-color: var(--border-accent); }
        .om-faq-question {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          padding: 18px 20px;
          color: var(--text);
          font-family: 'Switzer', sans-serif;
          font-size: 15px;
          font-weight: 500;
          width: 100%;
          background: none;
          border: none;
          text-align: left;
          cursor: pointer;
        }
        .om-faq-icon {
          flex-shrink: 0;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 1px solid var(--border-accent);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent);
          transition: transform 0.3s ease, background 0.2s ease;
        }
        .om-faq-item.open .om-faq-icon { background: var(--accent-soft); transform: rotate(45deg); }
        .om-faq-answer-wrap {
          display: grid;
          grid-template-rows: 0fr;
          transition: grid-template-rows 0.35s ease;
        }
        .om-faq-item.open .om-faq-answer-wrap { grid-template-rows: 1fr; }
        .om-faq-answer-inner { overflow: hidden; }
        .om-faq-answer {
          padding: 0 20px 18px;
          color: var(--text-body);
          font-family: 'Switzer', sans-serif;
          font-size: 14px;
          line-height: 1.7;
          border-top: 1px solid var(--hairline);
          padding-top: 14px;
        }
        @media (max-width: 700px) {
          .om-faq-grid { grid-template-columns: 1fr; gap: 28px; }
        }
      `}</style>

      <div className="om-container om-faq-grid">
        <div>
          <p className="om-eyebrow" style={{ marginBottom: 16 }}>FAQ</p>
          <h2 className="om-heading" style={{ fontSize: "clamp(30px, 4.5vw, 44px)", marginBottom: 14 }}>
            Got <span className="om-heading-italic">questions?</span>
          </h2>
          <p className="om-body" style={{ fontSize: 14.5 }}>
            Everything you need to know before getting started.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {faqs.map((faq, i) => (
            <div key={i} className={`om-faq-item${openIndex === i ? " open" : ""}`}>
              <button className="om-faq-question" onClick={() => toggle(i)} aria-expanded={openIndex === i}>
                <span>{faq.question}</span>
                <span className="om-faq-icon" aria-hidden="true">
                  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
                    <line x1="5.5" y1="0" x2="5.5" y2="11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    <line x1="0" y1="5.5" x2="11" y2="5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div className="om-faq-answer-wrap">
                <div className="om-faq-answer-inner">
                  <div className="om-faq-answer">{faq.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
