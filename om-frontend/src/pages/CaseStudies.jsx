import { useState } from "react";
import { Image as ImageIcon, X } from "lucide-react";

function InstagramIcon({ size = 15 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

// ─── Fill this in with your real case studies ───────────────────────────
// Any array length works — remaining grid slots auto-fill with "Coming Soon" placeholders.
// `instagram` — the Instagram post/profile link opened when the "Case Study" hover button is clicked.
const caseStudies = [
  {
    slug: "xandhq",
    title: "XANDHQ",
    tag: "Product Design",
    summary: "Cut onboarding time by 40% with a redesigned signup flow.",
    coverImage: "https://res.cloudinary.com/db2ehmua9/image/upload/v1783431581/716809898_18594307168018326_7416983103768432065_n_vmwleh.jpg",
    instagram: "https://www.instagram.com/xandhq",
    problem: "Long paragraph here...",
    approach: "Long paragraph here...",
    result: "Long paragraph here...",
    deliverables: ["Podcast Series", "Launch Video", "Distribution"],
  },
  {
    slug: "the-next-big-thing",
    title: "The Next Big Thing",
    tag: "Product Design",
    summary: "Cut onboarding time by 40% with a redesigned signup flow.",
    coverImage: "https://res.cloudinary.com/db2ehmua9/image/upload/v1783431397/461937792_454077200374598_7043214370768099542_n_qlhio6.jpg",
    instagram: "https://www.instagram.com/thenextbigthing",
    problem: "Long paragraph here...",
    approach: "Long paragraph here...",
    result: "Long paragraph here...",
    deliverables: ["Founder Brand", "Short-Form Content", "AI UGC"],
  },

  {
    slug: "ace-me",
    title: "ACE.ME",
    tag: "Product Design",
    summary: "Cut onboarding time by 40% with a redesigned signup flow.",
    coverImage: "https://res.cloudinary.com/db2ehmua9/image/upload/v1783431484/657252874_17932121712218703_332628719443195031_n_kuhm5u.jpg",
    instagram: "https://www.instagram.com/aceme",
    problem: "Long paragraph here...",
    approach: "Long paragraph here...",
    result: "Long paragraph here...",
    deliverables: ["Podcast Series", "Distribution"],
  },
  {
    slug: "high-drop",
    title: "High Drop",
    tag: "Product Design",
    summary: "Cut onboarding time by 40% with a redesigned signup flow.",
    coverImage: "https://res.cloudinary.com/db2ehmua9/image/upload/v1783431776/freedrop.co_pkedrw.jpg",
    instagram: "https://www.instagram.com/highdrop",
    problem: "Long paragraph here...",
    approach: "Long paragraph here...",
    result: "Long paragraph here...",
    deliverables: ["AI UGC / Commercials", "Motion Graphics"],
  },
  {
    slug: "the-next-big-thing-2",
    title: "The Next Big Thing",
    tag: "Product Design",
    summary: "Cut onboarding time by 40% with a redesigned signup flow.",
    coverImage: "https://res.cloudinary.com/db2ehmua9/image/upload/v1787123653/Copy_of_554120797_18538599004005339_6790072577319082499_n_mjvqp3.jpg",
    instagram: "https://www.instagram.com/thenextbigthing2",
    problem: "Long paragraph here...",
    approach: "Long paragraph here...",
    result: "Long paragraph here...",
    deliverables: ["Founder Brand", "Launch Video"],
  },
];

const TOTAL_SLOTS = 5;

// How long one full loop of the marquee takes. Bigger number = slower drift.
const VERTICAL_LOOP_SECONDS = 10;
const HORIZONTAL_LOOP_SECONDS = 10;

function TagPill({ children }) {
  return (
    <span
      style={{
        fontFamily: "Switzer, sans-serif",
        fontSize: 10.5,
        fontWeight: 700,
        letterSpacing: "0.14em",
        textTransform: "uppercase",
        color: "var(--text-faint)",
      }}
    >
      {children}
    </span>
  );
}

function CaseStudyCard({ study, onOpen, fixedWidth }) {
  const [hovered, setHovered] = useState(false);

  const handleInstagramClick = (e) => {
    e.stopPropagation();
    if (study.instagram) {
      window.open(study.instagram, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={() => onOpen(study)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      style={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        background: "transparent",
        cursor: "pointer",
        padding: 0,
        font: "inherit",
        color: "inherit",
        width: fixedWidth ? fixedWidth : "100%",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "100%",
          background: "var(--bg-soft)",
          overflow: "hidden",
          position: "relative",
          borderRadius: 20,
          lineHeight: 0,
        }}
      >
        {study.coverImage ? (
          <img
            src={study.coverImage}
            alt={study.title}
            draggable={false}
            loading="lazy"
            style={{
              display: "block",
              width: "100%",
              height: "auto",
              filter: hovered ? "blur(6px)" : "blur(0px)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "filter 0.35s ease, transform 0.35s ease",
            }}
          />
        ) : (
          <div style={{ width: "100%", aspectRatio: "3 / 2", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageIcon size={18} color="var(--text-faint)" strokeWidth={1.5} />
          </div>
        )}

        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.28)",
            opacity: hovered ? 1 : 0,
            transition: "opacity 0.35s ease",
            pointerEvents: hovered ? "auto" : "none",
          }}
        >
          <button
            onClick={handleInstagramClick}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "12px 22px",
              borderRadius: 999,
              border: "1px solid rgba(255,255,255,0.7)",
              background: "rgba(255,255,255,0.12)",
              backdropFilter: "blur(4px)",
              color: "#fff",
              fontFamily: "Switzer, sans-serif",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: "0.03em",
              textTransform: "uppercase",
              cursor: "pointer",
              transform: hovered ? "translateY(0)" : "translateY(8px)",
              transition: "transform 0.35s ease",
            }}
          >
            <InstagramIcon size={15} />
            Case Study
          </button>
        </div>
      </div>

      <div style={{ padding: "20px 4px 0", display: "flex", flexDirection: "column", gap: 6 }}>
        <h3 className="om-heading" style={{ fontSize: 19, margin: 0 }}>
          {study.title}
          {study.tag && (
            <span style={{ fontWeight: 400, color: "var(--text-faint)" }}> ({study.tag})</span>
          )}
        </h3>
        <p className="om-body" style={{ fontSize: 14.5, lineHeight: 1.5, color: "var(--text-faint)", margin: 0 }}>
          {study.summary}
        </p>
      </div>
    </div>
  );
}

function PlaceholderCard({ fixedWidth }) {
  return (
    <div
      style={{
        border: "1px dashed var(--hairline)",
        borderRadius: 16,
        padding: 32,
        minHeight: 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: fixedWidth ? fixedWidth : "100%",
        flexShrink: 0,
        boxSizing: "border-box",
      }}
    >
      <div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: "50%",
            background: "var(--bg-soft)",
            border: "1px solid var(--hairline)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 20,
          }}
        >
          <ImageIcon size={18} color="var(--text-faint)" strokeWidth={1.5} />
        </div>
        <div className="om-skeleton" style={{ height: 16, width: "70%", borderRadius: 6, marginBottom: 10 }} />
        <div className="om-skeleton" style={{ height: 12, width: "90%", borderRadius: 6, marginBottom: 6 }} />
        <div className="om-skeleton" style={{ height: 12, width: "60%", borderRadius: 6 }} />
      </div>
      <TagPill>Coming Soon</TagPill>
    </div>
  );
}

function CaseStudyModal({ study, onClose }) {
  if (!study) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        background: "rgba(0,0,0,0.55)",
        zIndex: 1000,
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "40px 20px",
        overflowY: "auto",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "var(--bg, #fff)",
          borderRadius: 20,
          maxWidth: 760,
          width: "100%",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: "absolute",
            top: 18,
            right: 18,
            width: 36,
            height: 36,
            borderRadius: "50%",
            border: "1px solid var(--hairline)",
            background: "var(--bg-soft)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            zIndex: 2,
          }}
        >
          <X size={16} />
        </button>

        <div style={{ width: "100%", aspectRatio: "16 / 9", background: "var(--bg-soft)" }}>
          {study.coverImage && (
            <img
              src={study.coverImage}
              alt={study.title}
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          )}
        </div>

        <div style={{ padding: "36px 40px 48px" }}>
          {study.tag && <div style={{ marginBottom: 14 }}><TagPill>{study.tag}</TagPill></div>}
          <h2 className="om-heading" style={{ fontSize: 32, marginBottom: 24 }}>{study.title}</h2>

          {study.problem && (
            <div style={{ marginBottom: 24 }}>
              <TagPill>The Problem</TagPill>
              <p className="om-body" style={{ fontSize: 15, lineHeight: 1.7, marginTop: 10 }}>{study.problem}</p>
            </div>
          )}

          {study.approach && (
            <div style={{ marginBottom: 24 }}>
              <TagPill>Our Approach</TagPill>
              <p className="om-body" style={{ fontSize: 15, lineHeight: 1.7, marginTop: 10 }}>{study.approach}</p>
            </div>
          )}

          {study.result && (
            <div style={{ marginBottom: 28 }}>
              <TagPill>The Result</TagPill>
              <p className="om-body" style={{ fontSize: 15, lineHeight: 1.7, marginTop: 10 }}>{study.result}</p>
            </div>
          )}

          {study.gallery && study.gallery.length > 0 && (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: 12,
                marginBottom: 28,
              }}
            >
              {study.gallery.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt={`${study.title} detail ${i + 1}`}
                  style={{ width: "100%", borderRadius: 10, objectFit: "cover", aspectRatio: "4 / 3" }}
                  loading="lazy"
                />
              ))}
            </div>
          )}

          {study.deliverables && study.deliverables.length > 0 && (
            <div style={{ marginBottom: study.href ? 28 : 0 }}>
              <TagPill>Deliverables</TagPill>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 10 }}>
                {study.deliverables.map((item) => (
                  <span
                    key={item}
                    style={{
                      fontSize: 12,
                      padding: "6px 12px",
                      borderRadius: 999,
                      border: "1px solid var(--hairline)",
                      color: "var(--text-faint)",
                    }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}

          {study.href && (
            <a
              href={study.href}
              target="_blank"
              rel="noopener noreferrer"
              className="om-btn"
              style={{ display: "inline-flex", marginTop: 24 }}
            >
              Visit Live Site
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function CaseStudies() {
  const [activeStudy, setActiveStudy] = useState(null);

  const emptySlots = Math.max(0, TOTAL_SLOTS - caseStudies.length);
  const allCards = [
    ...caseStudies.map((study) => ({ type: "study", study })),
    ...Array.from({ length: emptySlots }, (_, i) => ({ type: "placeholder", key: i })),
  ];

  // Both columns use the same forward-ordered list (1 → N). The left track's
  // "up" animation plays it forward (1, 2, 3… at the top), and the right
  // track's "down" animation naturally plays the same list in reverse — so
  // item 1 appears on the left at the same moment the last item appears on
  // the right.
const leftColumn = allCards;
const rightColumn = [...allCards].reverse();

  const renderCard = (item, key, fixedWidth) =>
    item.type === "study" ? (
      <CaseStudyCard key={key} study={item.study} onOpen={setActiveStudy} fixedWidth={fixedWidth} />
    ) : (
      <PlaceholderCard key={key} fixedWidth={fixedWidth} />
    );

  return (
    <>
      <section id="case-studies" style={{ padding: "80px 24px 0", textAlign: "center" }}>
        <p className="om-eyebrow" style={{ marginBottom: 18 }}>Our Work</p>
        <h1 className="om-heading" style={{ fontSize: "clamp(40px, 7vw, 68px)", marginBottom: 18 }}>
          Case Studies
        </h1>
        <p className="om-body" style={{ fontSize: 16, maxWidth: 520, margin: "0 auto" }}>
          Real client results, coming soon. This page is the frame —
          the metrics, names and stories drop in as soon as they're ready.
        </p>
      </section>

      <section style={{ padding: "64px 0 96px" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px", boxSizing: "border-box" }}>

          {/* ── Large screens: two columns, continuously drifting vertically, opposite directions.
               Both columns share the same list — the up/down direction alone
               makes item 1 (left) and the last item (right) start together. ── */}
          <div
            className="om-cs-grid-desktop"
            style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 28 }}
          >
            <div className="om-cs-viewport">
              <div className="om-cs-track om-cs-track--up">
                <div className="om-cs-track-half">
                  {leftColumn.map((item, i) => renderCard(item, `lA-${i}`))}
                </div>
                <div className="om-cs-track-half" aria-hidden="true">
                  {leftColumn.map((item, i) => renderCard(item, `lB-${i}`))}
                </div>
              </div>
            </div>

            <div className="om-cs-viewport">
              <div className="om-cs-track om-cs-track--down">
                <div className="om-cs-track-half">
                  {rightColumn.map((item, i) => renderCard(item, `rA-${i}`))}
                </div>
                <div className="om-cs-track-half" aria-hidden="true">
                  {rightColumn.map((item, i) => renderCard(item, `rB-${i}`))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Small screens: two horizontal rows (top = left column, bottom = right column), drifting opposite directions ── */}
          <div className="om-cs-grid-mobile">
            <div className="om-cs-row-viewport">
              <div className="om-cs-row-track om-cs-row-track--left">
                <div className="om-cs-row-half">
                  {leftColumn.map((item, i) => renderCard(item, `mlA-${i}`, 220))}
                </div>
                <div className="om-cs-row-half" aria-hidden="true">
                  {leftColumn.map((item, i) => renderCard(item, `mlB-${i}`, 220))}
                </div>
              </div>
            </div>

            <div className="om-cs-row-viewport">
              <div className="om-cs-row-track om-cs-row-track--right">
                <div className="om-cs-row-half">
                  {rightColumn.map((item, i) => renderCard(item, `mrA-${i}`, 220))}
                </div>
                <div className="om-cs-row-half" aria-hidden="true">
                  {rightColumn.map((item, i) => renderCard(item, `mrB-${i}`, 220))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      <CaseStudyModal study={activeStudy} onClose={() => setActiveStudy(null)} />

      <style>{`
        @keyframes om-marquee-up {
          from { transform: translateY(0); }
          to   { transform: translateY(-50%); }
        }
        @keyframes om-marquee-down {
          from { transform: translateY(-50%); }
          to   { transform: translateY(0); }
        }
        @keyframes om-marquee-left {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes om-marquee-right {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }

        /* Desktop vertical marquee columns */
        .om-cs-grid-desktop {
          display: grid;
          --om-cs-gap: 28px;
        }
        .om-cs-viewport {
          overflow: hidden;
          /* Images now render at their natural aspect ratio, so card height
             varies per image — this clamp approximates a 2-card window rather
             than pinning it exactly. Nudge the clamp if your source images
             run noticeably taller/shorter than a typical Instagram post. */
          height: clamp(560px, 74vh, 820px);
          position: relative;
          -webkit-mask-image: linear-gradient(to bottom, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%);
          mask-image: linear-gradient(to bottom, transparent 0, #000 24px, #000 calc(100% - 24px), transparent 100%);
        }
        .om-cs-track {
          display: flex;
          flex-direction: column;
        }
        .om-cs-track-half {
          display: flex;
          flex-direction: column;
          gap: var(--om-cs-gap);
          padding-bottom: var(--om-cs-gap);
          flex-shrink: 0;
        }
        .om-cs-track--up { animation: om-marquee-up ${VERTICAL_LOOP_SECONDS}s linear infinite; }
        .om-cs-track--down { animation: om-marquee-down ${VERTICAL_LOOP_SECONDS}s linear infinite; }
        .om-cs-viewport:hover .om-cs-track { animation-play-state: paused; }

        /* Mobile horizontal marquee rows */
        .om-cs-grid-mobile { display: none; }
        .om-cs-row-viewport {
          overflow: hidden;
          position: relative;
          -webkit-mask-image: linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%);
          mask-image: linear-gradient(to right, transparent 0, #000 16px, #000 calc(100% - 16px), transparent 100%);
        }
        .om-cs-row-viewport + .om-cs-row-viewport { margin-top: 20px; }
        .om-cs-row-track {
          display: flex;
          flex-direction: row;
        }
        .om-cs-row-half {
          display: flex;
          flex-direction: row;
          gap: 16px;
          padding-right: 16px;
          flex-shrink: 0;
        }
        .om-cs-row-track--left { animation: om-marquee-left ${HORIZONTAL_LOOP_SECONDS}s linear infinite; }
        .om-cs-row-track--right { animation: om-marquee-right ${HORIZONTAL_LOOP_SECONDS}s linear infinite; }
        .om-cs-row-viewport:hover .om-cs-row-track { animation-play-state: paused; }

        @media (max-width: 820px) and (min-width: 541px) {
          .om-cs-grid-desktop { gap: 20px !important; }
        }

        @media (max-width: 540px) {
          .om-cs-grid-desktop { display: none !important; }
          .om-cs-grid-mobile { display: block !important; }
        }

        @media (prefers-reduced-motion: reduce) {
          .om-cs-track, .om-cs-row-track { animation: none !important; }
        }
      `}</style>
    </>
  );
}