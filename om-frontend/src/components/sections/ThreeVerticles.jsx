const cards = [
  {
    title: "Orbit Media",
    subtitle: "PERSONAL BRANDING & CONTENT SYSTEMS",
    description:
      "We turn founders into the most recognisable voice in their niche — short-form content, founder-led growth, and the systems behind both.",
    points: [
      "Personal branding",
      "Short-form content",
      "Founder-led growth",
      "Content systems",
    ],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=600&auto=format&fit=crop",
    accent: "#6C2BFF",
  },

  {
    title: "Orbit Cast",
    subtitle: "PODCAST PRODUCTION & DISTRIBUTION",
    description:
      "From cinematic recording to multi-platform distribution — we handle the entire podcast pipeline so founders only show up and speak.",
    points: [
      "Setup & recording",
      "Cinematic editing",
      "Multi-platform publishing",
      "Clip distribution",
    ],
    image:
      "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=600&auto=format&fit=crop",
    accent: "#F5B52E",
  },

  {
    title: "Orbit UGC",
    subtitle: "CREATOR CAMPAIGNS & UGC ADS",
    description:
      "Authentic creator-led content that converts — UGC ads, product storytelling and brand collaborations engineered for performance.",
    points: [
      "Creator campaigns",
      "UGC ads",
      "Product storytelling",
      "Brand collaborations",
    ],
    image:
      "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600&auto=format&fit=crop",
    accent: "#6C2BFF",
  },
];

function OrbitCard({ card }) {
  return (
    <div
  className="
    group
    relative overflow-hidden
    rounded-[30px]
    border border-white/10
    bg-[#111827]/80
    p-9
    backdrop-blur-xl
    transition-all duration-500
    hover:-translate-y-2
  "
      style={{
        background:
          "linear-gradient(180deg, rgba(103,53,255,0.18) 0%, rgba(6,18,39,0.95) 70%)",
        boxShadow: "0 0 60px rgba(0,0,0,0.35)",
      }}
    >
      {/* Glow */}
      <div
        className="
            absolute inset-0
            opacity-20
            transition-all duration-500
            group-hover:opacity-100
        "
        style={{
          background: `
            radial-gradient(
                circle at top right,
                ${card.accent}88 0%,
                transparent 55%
            )
            `,
            filter: "blur(10px)",
        }}
      />
      <div
  className="
    absolute inset-0
    opacity-0
    transition-opacity duration-500
    group-hover:opacity-100
    pointer-events-none
  "
  style={{
    boxShadow: `0 0 80px ${card.accent}55`,
  }}
/>

      {/* Content */}
      <div className="relative z-10">

        {/* Image */}
        <div
          className="
            w-[86px] h-[86px]
            rounded-[22px]
            overflow-hidden
            mb-8
            border border-white/10
          "
        >
          <img
            src={card.image}
            alt={card.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Title */}
        <h3 className="text-white text-[42px] font-black tracking-[-0.05em] leading-none">
          {card.title}
        </h3>

        {/* Subtitle */}
        <p
          className="mt-4 text-[14px] tracking-[0.18em] uppercase font-semibold"
          style={{
            color: card.accent,
          }}
        >
          {card.subtitle}
        </p>

        {/* Description */}
        <p className="mt-5 text-[17px] leading-[1.65] text-white/60 max-w-[95%] min-h-[120px]">
          {card.description}
        </p>

        {/* Bullet points */}
        <div className="mt-7 space-y-3 min-h-[120px]">

          {card.points.map((point) => (
            <div
              key={point}
              className="flex items-center gap-3"
            >

              <div
                className="w-2 h-2 rounded-full"
                style={{
                  background: card.accent,
                }}
              />

              <span className="text-[15px] text-white/75">
                {point}
              </span>

            </div>
          ))}

        </div>

        {/* CTA */}
        <button
        className="
            mt-auto pt-6
            flex items-center gap-3
            text-white
            text-[21px]
            font-semibold
            group
          "
        >
          Book a call

          <span
            className="
              transition-transform duration-300
              group-hover:translate-x-1
            "
            style={{
              color: card.accent,
            }}
          >
            ↗
          </span>
        </button>

        <div
          className="mt-2 h-px w-[120px]"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </div>
    </div>
  );
}

export default function ShortFormSection() {
  return (
    <section
      className="relative overflow-hidden py-28"
      style={{
        background:
          "linear-gradient(90deg, rgba(5,16,38,1) 0%, rgba(2,18,42,1) 100%)",
      }}
    >

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1800px] px-[180px]">

        {/* Top label */}
        <p
          className="text-[20px] text-[#F5B52E]"
          style={{
            fontFamily: "'Caveat', cursive",
          }}
        >
          — Three verticals, one orbit
        </p>

        {/* Heading */}
        <h2 className="mt-4 max-w-[900px] text-[82px] font-black leading-[0.95] tracking-[-0.06em] text-white">
          Built for founders
          <br />

          who want a{" "}
          <span className="text-[#F5B52E]">
            moat
          </span>
          .
        </h2>

        {/* Cards */}
        <div className="mt-20 grid grid-cols-1 gap-8 xl:grid-cols-3">

          {cards.map((card) => (
            <OrbitCard
              key={card.title}
              card={card}
            />
          ))}

        </div>
      </div>
    </section>
  );
}