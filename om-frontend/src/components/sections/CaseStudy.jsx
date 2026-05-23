import { useEffect, useState,useRef } from "react";

/* ───────────────── COUNT UP ───────────────── */

function CountUp({ value }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.4,
      }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;

    const numeric = parseFloat(value.replace(/[^0-9.]/g, ""));
    let start = 0;

    const increment = numeric / 60;

    const timer = setInterval(() => {
      start += increment;

      if (start >= numeric) {
        setCount(numeric);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);

    return () => clearInterval(timer);
  }, [started, value]);

  const suffix = value.replace(/[0-9.]/g, "");

  return (
    <span ref={ref}>
      {Number(count.toFixed(1)).toLocaleString()}
      {suffix}
    </span>
  );
}
/* ───────────────── DATA ───────────────── */

const caseStudies = [
  {
    tag: "Case study",
    username: "@visual.ayush",
    instagram: "https://www.instagram.com/visual.ayush/",
    name: "Ayush Kumar",
    subtitle: "Founder, Orbit Media",
    description:
      "Built a founder-led personal brand from zero — a content system that turned a 0-follower account into an inbound lead engine.",

    stats: [
      {
        label: "Views Generated",
        value: "12M+",
      },
      {
        label: "Audience Growth",
        value: "+18K",
      },
      {
        label: "Inbound Demos",
        value: "4x",
      },
    ],

    image:
      "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1600&auto=format&fit=crop",

    accent: "#F5B52E",
  },

  {
    tag: "Case study",
    username: "@reflyofficial",
    instagram: "https://www.instagram.com/reflyofficial/",
    name: "ReFly",
    subtitle: "Travel & Transportation · 72.5K followers",

    description:
      "Performance-driven content engine for a category-defining travel-tech brand. Cinematic short-form built around real passenger stories.",

    stats: [
      {
        label: "Monthly Reach",
        value: "8M+",
      },
      {
        label: "Follower Growth",
        value: "+42%",
      },
      {
        label: "Engagement Lift",
        value: "5.2x",
      },
    ],

    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1600&auto=format&fit=crop",

    accent: "#6C2BFF",
  },

  {
    tag: "Case study",
    username: "@thenextbigthing_media",
    instagram: "https://www.instagram.com/thenextbigthing_media/",
    name: "The Next Big Thing",
    subtitle: "Tech media · 13K followers",

    description:
      "Spotlighting culture-shaping tech narratives. We engineered the visual language and hook formulas behind their breakout reels.",

    stats: [
      {
        label: "Reel Views",
        value: "6.4M",
      },
      {
        label: "New Followers",
        value: "+11K",
      },
      {
        label: "Save Rate",
        value: "+310%",
      },
    ],

    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1600&auto=format&fit=crop",

    accent: "#F5B52E",
  },
];

/* ───────────────── CARD ───────────────── */

function ReceiptCard({ item }) {
  return (
    <div
      className="
        group
        relative
        overflow-hidden
        rounded-[28px]
        border border-white/10
        bg-[#081428]
        transition-all duration-500
        hover:border-white/20
        hover:-translate-y-1
        group-hover:shadow-[0_0_80px_rgba(108,43,255,0.18)]
      "
    >

      {/* Glow */}
      <div
        className="
          absolute inset-0 opacity-0
          transition-opacity duration-500
          group-hover:opacity-100
        "
        style={{
          background: `radial-gradient(circle at top right, ${item.accent}22, transparent 45%)`,
        }}
      />

      <div className="grid md:grid-cols-[420px_1fr]">

        {/* IMAGE */}
        <div className="relative h-[290px] overflow-hidden">

          <img
            src={item.image}
            alt={item.name}
            className="
              h-full w-full object-cover
              transition-all duration-700
              group-hover:scale-105
              contrast-125
              brightness-[0.92]
              saturate-125
            "
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-[#081428]/70" />

          {/* Tag */}
          <div
            className="
              absolute left-5 top-5
              rounded-full
              border border-white/10
              bg-black/40
              px-4 py-1.5
              text-[11px]
              font-semibold
              text-white
              backdrop-blur-md
            "
          >
            ● {item.tag}
          </div>

        </div>

        {/* CONTENT */}
        <div className="relative flex flex-col justify-between p-8">

          <div>

            {/* Username */}
            <p
              className="text-[13px] font-semibold"
              style={{
                color: item.accent,
              }}
            >
              {item.username}
            </p>

            {/* Name */}
            <h3 className="mt-2 text-[44px] font-black tracking-[-0.05em] text-white">
              {item.name}
            </h3>

            {/* Subtitle */}
            <p className="mt-1 text-[14px] text-white/40">
              {item.subtitle}
            </p>

            {/* Description */}
            <p className="mt-8 max-w-[720px] text-[18px] leading-[1.75] text-white/65">
              {item.description}
            </p>

          </div>

          {/* STATS */}
          <div className="mt-10 flex flex-wrap gap-8">

            {item.stats.map((stat) => (
              <div key={stat.label}>

                <p className="text-[11px] uppercase tracking-[0.18em] text-white/30">
                  {stat.label}
                </p>

                <h4
                  className="mt-2 text-[38px] font-black tracking-[-0.05em]"
                  style={{
                    color: item.accent,
                  }}
                >
                  <CountUp value={stat.value} />
                </h4>

              </div>
            ))}

          </div>

          {/* CTA */}
          <a
            href={item.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="
              mt-8 flex items-center gap-2
              text-[14px]
              font-semibold
              text-white/70
              transition
              hover:text-white
              no-underline
            "
          >

            View on Instagram

            <span
              style={{
                color: item.accent,
              }}
            >
              ↗
            </span>

          </a>

        </div>
      </div>
    </div>
  );
}

/* ───────────────── MAIN ───────────────── */

export default function ReceiptsSection() {
  return (
    <section
      className="relative overflow-hidden py-28"
      style={{
        background:
          "linear-gradient(90deg, rgba(4,17,40,1) 0%, rgba(3,20,45,1) 100%)",
      }}
    >

      {/* Grid */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-[180px]">

        {/* Label */}
        <p
          className="text-[20px] text-[#F5B52E]"
          style={{
            fontFamily: "'Caveat', cursive",
          }}
        >
          — Receipts, not promises
        </p>

        {/* Heading */}
        <h2 className="mt-4 max-w-[780px] text-[82px] font-black leading-[0.95] tracking-[-0.06em] text-white">

          Real founders.{" "}

          <span className="text-[#F5B52E]">
            Real results.
          </span>

        </h2>

        {/* Cards */}
        <div className="mt-20 space-y-8">

          {caseStudies.map((item) => (
            <ReceiptCard
              key={item.name}
              item={item}
            />
          ))}

        </div>
      </div>
    </section>
  );
}