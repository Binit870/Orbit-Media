import { useState } from "react";

const services = [
  {
    id: "media",
    name: "Orbit Media",
    sub: "Personal branding & content systems",
    color: "#a78bfa",
    desc: "We turn founders into the most recognisable voice in their niche — short-form content, founder-led growth, and the systems behind both.",
    points: ["Personal branding", "Short-form content", "Founder-led growth", "Content systems"],
    demoText: "Live short-form content dashboard — track reach, saves & follower growth across platforms.",
    stats: [
      { label: "Avg. follower growth / mo", val: "82%", pct: 82 },
      { label: "Content output / week", val: "12 pieces", pct: 70 },
      { label: "Engagement rate", val: "6.4%", pct: 64 },
    ],
    pricing: [
      {
        tier: "Basic",
        amount: "$997",
        period: "/mo",
        features: ["2 short-form videos/wk", "Brand strategy doc", "Monthly report"],
      },
      {
        tier: "Premium",
        amount: "$2,497",
        period: "/mo",
        features: ["5 short-form videos/wk", "Full content calendar", "Weekly performance call", "Hook library"],
        featured: true,
      },
      {
        tier: "Enterprise",
        amount: "Custom",
        period: "tailored",
        features: ["Unlimited output", "Dedicated strategist", "Priority edits", "White-glove onboarding"],
      },
    ],
  },
  {
    id: "cast",
    name: "Orbit Cast",
    sub: "Podcast production & distribution",
    color: "#818cf8",
    desc: "From cinematic recording to multi-platform distribution — we handle the entire podcast pipeline so founders only show up and speak.",
    points: ["Setup & recording", "Cinematic editing", "Multi-platform publishing", "Clip distribution"],
    demoText: "End-to-end podcast workflow — from raw recording to published episode across Spotify, Apple & YouTube.",
    stats: [
      { label: "Avg. episodes / mo", val: "8 eps", pct: 60 },
      { label: "Clip repurposing rate", val: "94%", pct: 94 },
      { label: "Listener retention", val: "71%", pct: 71 },
    ],
    pricing: [
      {
        tier: "Basic",
        amount: "$797",
        period: "/mo",
        features: ["2 episodes/mo", "Audio editing", "Show notes"],
      },
      {
        tier: "Premium",
        amount: "$1,997",
        period: "/mo",
        features: ["4 episodes/mo", "Video + audio edit", "5 clips per ep", "Distribution setup"],
        featured: true,
      },
      {
        tier: "Enterprise",
        amount: "Custom",
        period: "tailored",
        features: ["Unlimited episodes", "Full production team", "Live event support", "Sponsorship strategy"],
      },
    ],
  },
  {
    id: "ugc",
    name: "Orbit UGC",
    sub: "Creator campaigns & UGC ads",
    color: "#c4b5fd",
    desc: "Authentic creator-led content that converts — UGC ads, product storytelling and brand collaborations engineered for performance.",
    points: ["Creator campaigns", "UGC ads", "Product storytelling", "Brand collaborations"],
    demoText: "Performance UGC dashboard — track ad spend, ROAS, and creator campaign results in real time.",
    stats: [
      { label: "Avg. ROAS", val: "4.2x", pct: 75 },
      { label: "Creator match rate", val: "97%", pct: 97 },
      { label: "Avg. CTR on UGC ads", val: "3.8%", pct: 55 },
    ],
    pricing: [
      {
        tier: "Basic",
        amount: "$1,297",
        period: "/mo",
        features: ["3 UGC videos", "2 creators", "Ad-ready delivery"],
      },
      {
        tier: "Premium",
        amount: "$3,197",
        period: "/mo",
        features: ["8 UGC videos", "5 creators", "A/B variations", "Performance report"],
        featured: true,
      },
      {
        tier: "Enterprise",
        amount: "Custom",
        period: "tailored",
        features: ["Unlimited creators", "Campaign strategy", "Paid media support", "Dedicated manager"],
      },
    ],
  },
];

const TABS = ["Overview", "Demo", "Pricing"];

function StatBar({ label, val, pct }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
      <span style={{ fontSize: 11, color: "#6d5fa0", textTransform: "uppercase", letterSpacing: "0.1em" }}>
        {label}
      </span>
      <div style={{ height: 4, borderRadius: 99, background: "rgba(139,92,246,0.12)" }}>
        <div
          style={{
            height: 4,
            borderRadius: 99,
            background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
            width: `${pct}%`,
          }}
        />
      </div>
      <span style={{ fontSize: 12, color: "#a78bfa", fontWeight: 600 }}>{val}</span>
    </div>
  );
}

function PricingCard({ plan }) {
  return (
    <div
      style={{
        borderRadius: 14,
        border: plan.featured ? "1.5px solid rgba(167,139,250,0.5)" : "1px solid rgba(139,92,246,0.2)",
        background: plan.featured ? "rgba(109,40,217,0.1)" : "rgba(255,255,255,0.02)",
        padding: "22px 18px",
        position: "relative",
      }}
    >
      {plan.featured && (
        <div
          style={{
            position: "absolute",
            top: -11,
            left: "50%",
            transform: "translateX(-50%)",
            background: "linear-gradient(90deg, #7c3aed, #a78bfa)",
            color: "#fff",
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            padding: "3px 12px",
            borderRadius: 99,
            whiteSpace: "nowrap",
          }}
        >
          Most popular
        </div>
      )}

      <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.18em", textTransform: "uppercase", color: plan.featured ? "#c4b5fd" : "#7c3aed", margin: "0 0 10px" }}>
        {plan.tier}
      </p>
      <p style={{ fontSize: 32, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1, margin: "0 0 4px" }}>
        {plan.amount}
      </p>
      <p style={{ fontSize: 12, color: "#6d5fa0", margin: "0 0 16px" }}>{plan.period}</p>

      <div style={{ height: 1, background: "rgba(139,92,246,0.15)", margin: "0 0 16px" }} />

      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
        {plan.features.map((f) => (
          <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#9ca3af" }}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M2.5 7L5.5 10L11.5 4" stroke={plan.featured ? "#a78bfa" : "#7c3aed"} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </div>
        ))}
      </div>

      <button
        style={{
          width: "100%",
          padding: "10px",
          borderRadius: 8,
          fontFamily: "'Bricolage Grotesque', sans-serif",
          fontSize: 13,
          fontWeight: 600,
          cursor: "pointer",
          border: plan.featured ? "none" : "1px solid rgba(139,92,246,0.3)",
          background: plan.featured ? "linear-gradient(135deg, #7c3aed, #a78bfa)" : "transparent",
          color: plan.featured ? "#fff" : "#a78bfa",
        }}
      >
        Get started
      </button>
    </div>
  );
}

function ServiceBlock({ service }) {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <div
      style={{
        marginBottom: 48,
        borderRadius: 20,
        border: "1px solid rgba(139,92,246,0.18)",
        background: "rgba(255,255,255,0.03)",
        overflow: "hidden",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 14,
          padding: "20px 24px",
          borderBottom: "1px solid rgba(139,92,246,0.12)",
        }}
      >
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: service.color, flexShrink: 0 }} />
        <span style={{ fontSize: 20, fontWeight: 700, color: "#fff", letterSpacing: "-0.03em", flex: 1 }}>
          {service.name}
        </span>
        <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: "#6d5fa0" }}>
          {service.sub}
        </span>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", padding: "0 24px", borderBottom: "1px solid rgba(139,92,246,0.12)" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              fontFamily: "'Bricolage Grotesque', sans-serif",
              fontSize: 13,
              fontWeight: 500,
              color: activeTab === tab ? "#c4b5fd" : "#6d5fa0",
              padding: "12px 16px",
              cursor: "pointer",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #7c3aed" : "2px solid transparent",
              background: "none",
              letterSpacing: "-0.01em",
              transition: "color 0.2s, border-color 0.2s",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Panel */}
      <div style={{ padding: "28px 24px" }}>

        {/* Overview */}
        {activeTab === "Overview" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>
            <div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#9ca3af", margin: "0 0 20px" }}>
                {service.desc}
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {service.points.map((p) => (
                  <div key={p} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#e2e0ff" }}>
                    <div style={{ width: 6, height: 6, borderRadius: "50%", background: service.color, flexShrink: 0 }} />
                    {p}
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {service.stats.map((s) => (
                <StatBar key={s.label} {...s} />
              ))}
            </div>
          </div>
        )}

        {/* Demo */}
        {activeTab === "Demo" && (
          <div
            style={{
              borderRadius: 14,
              border: "1px solid rgba(139,92,246,0.2)",
              background: "rgba(109,40,217,0.07)",
              padding: 28,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 160,
              gap: 12,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" aria-hidden="true">
              <rect width="40" height="40" rx="10" fill="rgba(124,58,237,0.2)" />
              <path d="M16 14l10 6-10 6V14z" fill="#a78bfa" />
            </svg>
            <p style={{ fontSize: 13, color: "#6d5fa0", textAlign: "center", lineHeight: 1.5, margin: 0, maxWidth: 360 }}>
              {service.demoText}
            </p>
            <button
              style={{
                marginTop: 8,
                padding: "8px 20px",
                borderRadius: 8,
                fontFamily: "'Bricolage Grotesque', sans-serif",
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                border: "1px solid rgba(139,92,246,0.35)",
                background: "transparent",
                color: "#a78bfa",
              }}
            >
              Watch demo ↗
            </button>
          </div>
        )}

        {/* Pricing */}
        {activeTab === "Pricing" && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14 }}>
            {service.pricing.map((plan) => (
              <PricingCard key={plan.tier} plan={plan} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrbitServices() {
  return (
    <section
      style={{
        background: "#09051a",
        padding: " 40px",
        fontFamily: "'Bricolage Grotesque', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:wght@400;500;600;700;800&family=Caveat:wght@500&display=swap');

        .ob-grid-bg {
          position: absolute;
          inset: 0;
          opacity: 0.035;
          background-image:
            linear-gradient(rgba(167,139,250,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(167,139,250,0.5) 1px, transparent 1px);
          background-size: 48px 48px;
          pointer-events: none;
        }
      `}</style>

      <div className="ob-grid-bg" />

      <div style={{ maxWidth: 1100, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <p style={{ fontFamily: "'Caveat', cursive", fontSize: 20, color: "#a78bfa", margin: "0 0 14px" }}>
          — Three verticals, one orbit
        </p>
        <h2
          style={{
            fontSize: "clamp(36px, 5vw, 60px)",
            fontWeight: 800,
            color: "#fff",
            lineHeight: 0.97,
            letterSpacing: "-0.05em",
            margin: "0 0 56px",
          }}
        >
          Built for founders<br />
          who want a{" "}
          <em
            style={{
              fontFamily: "'Caveat', cursive",
              fontStyle: "normal",
              color: "#c4b5fd",
              fontSize: "clamp(40px, 5.5vw, 66px)",
            }}
          >
            moat.
          </em>
        </h2>

        {services.map((s) => (
          <ServiceBlock key={s.id} service={s} />
        ))}
      </div>
    </section>
  );
}