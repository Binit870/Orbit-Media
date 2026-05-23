import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Counter Animation
function CountUp({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;

    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [end, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
}

const stats = [
  {
    value: 250,
    suffix: "M+",
    label: "Impressions Curated",
  },
  {
    value: 80,
    suffix: "+",
    label: "Founders Scaled",
  },
  {
    value: 12,
    suffix: "M+",
    label: "Followers Gained",
  },
  {
    value: 4,
    suffix: "X",
    label: "Avg. Engagement Lift",
  },
];

export default function StatsSection() {
  return (
    <section
      className="relative overflow-hidden py-28"
      style={{
        background:
          "linear-gradient(90deg, rgba(41,18,107,1) 0%, rgba(4,18,40,1) 30%, rgba(3,19,44,1) 100%)",
      }}
    >
      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 px-6 lg:grid-cols-2">

        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >

          {/* Top label */}
          <p
            className="mb-8 text-[20px] text-[#F5B52E]"
            style={{
              fontFamily: "'Caveat', cursive",
            }}
          >
            — Our Philosophy
          </p>

          {/* Heading */}
          <h2
            className="max-w-[680px] text-[68px] font-black leading-[0.95] tracking-[-0.06em] text-white"
            style={{
              fontFamily: "'Inter', sans-serif",
            }}
          >
            We turn founders
            <br />

            into{" "}
            <span className="text-[#F5B52E]">
              niche authorities
            </span>
            .
          </h2>

          {/* Paragraph */}
          <p className="mt-10 max-w-[720px] text-[20px] leading-[1.8] text-white/60">
            Orbit is not just a content shop. We engineer
            organic growth systems — a cinematic blend of
            storytelling, distribution and founder positioning
            that compounds trust, attention and inbound demand.
            No ads. No noise. Just authority.
          </p>

          {/* Pills */}
          <div className="mt-10 flex flex-wrap gap-4">

            {[
              "Founder-led storytelling",
              "Content systems",
              "Distribution-first",
              "Long-term moat",
            ].map((item) => (
              <div
                key={item}
                className="rounded-full border border-white/10 bg-white/[0.03] px-6 py-3 text-[18px] text-white/80 backdrop-blur-sm"
              >
                {item}
              </div>
            ))}

          </div>
        </motion.div>

        {/* RIGHT STATS GRID */}
        <div className="grid grid-cols-2 gap-6">

          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: index * 0.15,
              }}
              viewport={{ once: true }}
              className="
                rounded-[34px]
                border border-white/10
                bg-white/[0.03]
                p-10
                backdrop-blur-md
                shadow-[0_0_40px_rgba(0,0,0,0.25)]
              "
            >

              {/* Number */}
              <h3
                className="
                  text-[72px]
                  font-black
                  leading-none
                  tracking-[-0.06em]
                "
                style={{
                  fontFamily: "'Inter', sans-serif",
                  background:
                    "linear-gradient(90deg, #F5B52E 0%, #D96BE8 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                />
              </h3>

              {/* Label */}
              <p className="mt-5 text-[20px] font-medium text-white/60">
                {stat.label}
              </p>

            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
}