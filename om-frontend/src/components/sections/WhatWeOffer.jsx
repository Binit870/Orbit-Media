import { useRef, useState, useEffect } from "react";
import { motion as Motion, AnimatePresence, useInView } from "framer-motion";
import { Search, Mic2, Wand2, Share2 } from "lucide-react";

const ICONS = [Search, Mic2, Wand2, Share2];

function Step({ index, title, description, active, onEnter, registerRef }) {
  const ref = useRef(null);
  const inView = useInView(ref, { margin: "-40% 0px -40% 0px" });

  useEffect(() => {
    if (inView) onEnter(index);
  }, [inView, index, onEnter]);

  useEffect(() => {
    registerRef(index, ref);
  }, [index, registerRef]);

  return (
    <div
      ref={ref}
      style={{ padding: "28px 0", borderBottom: "1px solid var(--hairline)", cursor: "pointer" }}
      onClick={() => ref.current?.scrollIntoView({ behavior: "smooth", block: "center" })}
    >
      <div style={{ display: "flex", gap: 22, alignItems: "flex-start" }}>
        <span
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            color: "var(--gold)",
            opacity: active ? 1 : 0.45,
            transition: "opacity 0.35s ease",
            paddingTop: 4,
          }}
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div style={{ flex: 1 }}>
          <h4
            className="om-heading"
            style={{ fontSize: 22, opacity: active ? 1 : 0.4, transition: "opacity 0.35s ease", margin: 0 }}
          >
            {title}
          </h4>
          <Motion.div
            initial={false}
            animate={{ height: active ? "auto" : 0, opacity: active ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
          >
            <p className="om-body" style={{ fontSize: 15, marginTop: 10, maxWidth: 420 }}>
              {description}
            </p>
          </Motion.div>
        </div>
      </div>
    </div>
  );
}

export default function WhatWeOffer({ service }) {
  const items = service.offer ?? service.included;
  const [active, setActive] = useState(0);
  const refs = useRef({});

  const registerRef = (i, ref) => {
    refs.current[i] = ref;
  };

  const goTo = (i) => {
    refs.current[i]?.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <section style={{ padding: "86px 0" }}>
      <div className="om-container">
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p className="om-eyebrow" style={{ marginBottom: 16 }}>Complete Service</p>
          <h2 className="om-heading" style={{ fontSize: "clamp(34px, 5vw, 54px)" }}>
            What We Offer
          </h2>
        </div>

        <div
          className="om-offer-grid"
          style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}
        >
          <div>
            {items.map((item, i) => (
              <Step
                key={item.title ?? item}
                index={i}
                title={item.title ?? item}
                description={item.description ?? ""}
                active={active === i}
                onEnter={setActive}
                registerRef={registerRef}
              />
            ))}
          </div>

          <div
            className="om-offer-visual"
            style={{ position: "sticky", top: 120, display: "flex", flexDirection: "column", alignItems: "center", gap: 22 }}
          >
            <div style={{ width: "100%", maxWidth: 420 }}>
              <AnimatePresence mode="wait">
                {(() => {
                  const activeItem = items[active];
                  const image = activeItem?.image;

                  if (image) {
                    return (
                      <Motion.div
                        key={active}
                        initial={{ opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.96 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                        style={{ width: "105%", aspectRatio: "9 / 5", borderRadius: 14, overflow: "hidden" }}
                      >
                        <img
                          src={image}
                          alt={activeItem.title ?? ""}
                          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                        />
                      </Motion.div>
                    );
                  }

                  const Icon = ICONS[active % ICONS.length];
                  return (
                    <div
                      style={{
                        width: "100%",
                        aspectRatio: "9 / 5",
                        borderRadius: 20,
                        background: "linear-gradient(160deg, var(--gold-soft), transparent 70%)",
                        border: "1px solid var(--border-gold)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        overflow: "hidden",
                      }}
                    >
                      <Motion.div
                        key={active}
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                      >
                        <Icon size={72} color="var(--gold)" strokeWidth={1.4} />
                      </Motion.div>
                    </div>
                  );
                })()}
              </AnimatePresence>
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to step ${i + 1}`}
                  style={{
                    width: active === i ? 22 : 7,
                    height: 7,
                    borderRadius: 4,
                    border: "none",
                    background: active === i ? "var(--gold)" : "var(--border-gold)",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                    padding: 0,
                  }}
                />
              ))}
            </div>

            <p className="om-body" style={{ fontSize: 12.5, opacity: 0.6, fontStyle: "italic" }}>
              Scroll to explore each step
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 820px) {
          .om-offer-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .om-offer-visual { position: relative !important; top: 0 !important; }
        }
      `}</style>
    </section>
  );
}