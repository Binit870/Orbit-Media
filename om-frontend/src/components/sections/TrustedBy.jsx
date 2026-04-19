import { useEffect, useRef, useState } from "react";

// ── Global keyframes & font (injected once) ───────────────────────────────────
const globalStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:ital,wght@0,300;0,400;0,500;1,300&display=swap');

  .font-syne { font-family: 'Syne', sans-serif; }
  .font-dm   { font-family: 'DM Sans', sans-serif; }

  @keyframes shimmer {
    0%   { background-position: 0%; }
    100% { background-position: 200%; }
  }
  @keyframes floatUD {
    0%, 100% { transform: translateY(0px); }
    50%       { transform: translateY(-14px); }
  }
  @keyframes marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .gold-shimmer {
    background: linear-gradient(90deg, #F5C842, #FFE080, #F5C842);
    background-size: 200%;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }
  .float-ud        { animation: floatUD 5s ease-in-out infinite; }
  .float-ud-delay  { animation: floatUD 5s ease-in-out infinite 1.4s; }
  .float-ud-slow   { animation: floatUD 6.5s ease-in-out infinite 0.5s; }
  .float-ud-slow2  { animation: floatUD 7s ease-in-out infinite 2s; }
  .marquee-run     { animation: marquee 26s linear infinite; }

  .stripe-bg {
    background-image: repeating-linear-gradient(
      90deg,
      transparent,
      transparent 58px,
      rgba(255,255,255,0.025) 58px,
      rgba(255,255,255,0.025) 60px
    );
  }

  .logo-fade-mask {
    -webkit-mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
    mask-image: linear-gradient(90deg, transparent, black 12%, black 88%, transparent);
  }

  .card-smooth {
    transition: transform 0.45s cubic-bezier(0.22,1,0.36,1),
                box-shadow 0.35s ease,
                opacity 0.75s ease;
  }
`;

// ── Static data ───────────────────────────────────────────────────────────────
const LOGOS = [
  {
    name: "Google",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg",
  },
  {
    name: "Netflix",
    src: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
  },
  {
    name: "Spotify",
    src: "https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg",
  },
  {
    name: "Airbnb",
    src: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Bélo.svg",
  },
  {
    name: "Uber",
    src: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png",
  },
  {
    name: "Amazon",
    src: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
  },
];

const CARDS = [
  {
    id: "left",
    segments: [
      { text: "Metro Media House helped me grow to ", color: "white" },
      { text: "50K in just 2 months",                color: "gold"  },
      { text: " with constant support, strategy, and dedication. Their consistency made all the difference.", color: "white" },
    ],
    author: "Zeel Mehta Jain",
    role: "AI Entrepreneur",
    baseRot: -14, baseTX: 30,
    scrollRotDelta: -8, scrollTXDelta: -10,
    hoverRot: -8, hoverTX: 20,
    centered: true,
    extraClass: "-mr-5 z-[1]",
    width: "w-[260px]",
  },
  {
    id: "center",
    segments: [
      { text: "By far the ",                                            color: "white" },
      { text: "best video editing team we have ever worked with",       color: "blue"  },
      { text: " - quick, communicative, and diligent with the highest quality videos. Will be using again and have recommended to many friends!", color: "white" },
    ],
    author: "Tristan Barrett",
    role: "Creative Director @ SpaceGod Studios",
    baseRot: 0, baseTX: 0,
    scrollRotDelta: 0, scrollTXDelta: 0,
    hoverRot: 0, hoverTX: 0,
    centered: false,
    extraClass: "z-[3] border-white/[0.13]",
    width: "w-[260px]",
  },
  {
    id: "right",
    segments: [
      { text: "Very receptive to feedback, quick to adapt, and genuinely collaborative. ", color: "white" },
      { text: "Their editing always captures the tone and story we're trying to tell, and they deliver with care and attention to detail.", color: "gold" },
    ],
    author: "Liah Yoo",
    role: "Founder, Krave Beauty",
    baseRot: 13, baseTX: -30,
    scrollRotDelta: 8, scrollTXDelta: 10,
    hoverRot: 8, hoverTX: -20,
    centered: true,
    extraClass: "-ml-5 z-[1]",
    width: "w-[260px]",
  },
];

// ── SVG icons ─────────────────────────────────────────────────────────────────
function SmileyIcon() {
  return (
    <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
      <circle cx="28" cy="28" r="26" stroke="#b0f0a0" strokeWidth="2.2" />
      <circle cx="21" cy="22" r="2.5" fill="#b0f0a0" />
      <circle cx="35" cy="22" r="2.5" fill="#b0f0a0" />
      <path d="M19 34 Q28 43 37 34" stroke="#b0f0a0" strokeWidth="2.2" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ClapIcon() {
  return (
    <svg viewBox="0 0 62 62" fill="none" className="w-16 h-16">
      <path
        d="M31 4 L38 10 L46 8 L50 16 L58 18 L56 26 L62 32 L56 38 L58 46 L50 48 L46 56 L38 54 L31 60 L24 54 L16 56 L12 48 L4 46 L6 38 L0 32 L6 26 L4 18 L12 16 L16 8 L24 10 Z"
        fill="#8B7FE8"
      />
      <text x="31" y="35" textAnchor="middle" fontSize="22" fill="white">👏</text>
    </svg>
  );
}

function DecoArrow() {
  return (
    <svg
      width="58" height="44" viewBox="0 0 58 44" fill="none"
      className="absolute -top-3 -right-12 hidden sm:block pointer-events-none"
    >
      <path d="M4 38 C12 8 42 2 54 18" stroke="#F5C842" strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M48 12 L56 20 L44 22" stroke="#F5C842" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

function ScribbleTL() {
  return (
    <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
      <path d="M8 60 C15 5 50 0 80 20" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <path d="M20 62 C18 58 15 56 12 58" stroke="rgba(255,255,255,0.2)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
    </svg>
  );
}

function ScribbleTR() {
  return (
    <svg width="70" height="55" viewBox="0 0 70 55" fill="none">
      <path d="M10 10 C30 2 55 12 62 40" stroke="rgba(255,255,255,0.18)" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <ellipse cx="55" cy="44" rx="10" ry="7" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

// ── TestimonialCard ───────────────────────────────────────────────────────────
function TestimonialCard({ card, scrollProgress, visible }) {
  const [hovered, setHovered] = useState(false);

  const isLeft   = card.id === "left";
  const isRight  = card.id === "right";
  const isCenter = card.id === "center";

  // Dynamic transform
  let transform;
  if (isCenter) {
    transform = hovered ? "scale(1.04) translateY(-8px)" : "translateY(0px)";
  } else if (isLeft) {
    transform = hovered
      ? `rotate(${card.hoverRot}deg) translateX(${card.hoverTX}px) scale(1.04)`
      : `rotate(${card.baseRot + scrollProgress * card.scrollRotDelta}deg) translateX(${card.baseTX + scrollProgress * card.scrollTXDelta}px)`;
  } else {
    transform = hovered
      ? `rotate(${card.hoverRot}deg) translateX(${card.hoverTX}px) scale(1.04)`
      : `rotate(${card.baseRot + scrollProgress * card.scrollRotDelta}deg) translateX(${card.baseTX + scrollProgress * card.scrollTXDelta}px)`;
  }

  const shadow = hovered
    ? isCenter
      ? "0 20px 80px rgba(0,0,0,0.8), 0 0 0 1px rgba(245,200,66,0.2)"
      : "0 20px 70px rgba(0,0,0,0.75)"
    : isCenter
      ? "0 16px 60px rgba(0,0,0,0.7)"
      : "0 10px 50px rgba(0,0,0,0.6)";

  return (
    <div
      className={`
        card-smooth flex-shrink-0 rounded-[18px] p-8
        bg-[#0f0f10] border border-white/[0.09]
        ${card.width} ${card.extraClass}
        ${visible ? "opacity-100" : "opacity-0"}
        ${hovered ? "!z-[10]" : ""}
        max-sm:!w-full max-sm:!mx-0 max-sm:!rotate-0
      `}
      style={{ transform, boxShadow: shadow, transformOrigin: "center bottom" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Opening quote */}
      <span
        className="block text-[3.5rem] leading-[0.6] mb-3 text-[#F5C842]/20 select-none"
        style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800 }}
      >
        "
      </span>

      {/* Body text */}
      <p
        className="mb-6 leading-[1.72] text-center text-[1.2rem] font-semibold text-white/90"
        style={{ fontFamily: "'DM Sans', sans-serif" }}
      >
        {card.segments.map((seg, i) =>
          seg.color === "gold"  ? <span key={i} className="text-[#F5C842]">{seg.text}</span>
          : seg.color === "blue" ? <span key={i} className="text-[#7B9FFF]">{seg.text}</span>
          :                        <span key={i}>{seg.text}</span>
        )}
      </p>

      {/* Author */}
      <div className={card.centered ? "text-center" : "text-left"}>
        <strong
          className="block text-[0.88rem] font-bold text-white tracking-wide mb-1"
          style={{ fontFamily: "'Syne', sans-serif" }}
        >
          {card.author}
        </strong>
        <span className="text-[0.76rem] text-white/40 italic">{card.role}</span>
      </div>
    </div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
export default function TestimonialsSection() {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [visible, setVisible] = useState(false);

  const doubledLogos = [...LOGOS, ...LOGOS];  // ✅ PERFECT HERE

  // Reveal on mount
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(t);
  }, []);

  // Scroll-driven card rotation
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        if (sectionRef.current) {
          const rect = sectionRef.current.getBoundingClientRect();
          const prog = Math.max(0, Math.min(1, -rect.top / (rect.height * 0.6)));
          setScrollProgress(prog);
        }
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);



  return (
    <>
      <style>{globalStyles}</style>

      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col items-center overflow-hidden bg-[#090909] px-6 sm:px-10 pt-24 pb-36"
      >
        {/* Vertical stripe overlay */}
        <div className="stripe-bg absolute inset-0 pointer-events-none" />

        {/* Floating: smiley top-right */}
        <div className="float-ud absolute top-[14%] right-[9%] pointer-events-none hidden sm:block">
          <SmileyIcon />
        </div>

        {/* Floating: clap badge middle-left */}
        <div className="float-ud-delay absolute top-[40%] left-[9%] pointer-events-none hidden sm:block">
          <ClapIcon />
        </div>

        {/* Scribbles */}
        <div className="float-ud-slow absolute top-[4%] left-[7%] pointer-events-none opacity-60 hidden md:block">
          <ScribbleTL />
        </div>
        <div className="float-ud-slow2 absolute top-[3%] right-[12%] pointer-events-none opacity-60 hidden md:block">
          <ScribbleTR />
        </div>

        {/* ── HEADING ── */}
        <div
          className={`w-full relative z-[2] text-left mb-14 transition-all duration-700 ease-out ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        >
          <h2
            className="relative inline-block font-extrabold tracking-tight leading-tight text-transparent bg-clip-text"
            style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(2rem, 4.5vw, 3.6rem)", letterSpacing: "-0.065em" }}
          >
            <span className="text-white">Trusted by </span>
            <span className="gold-shimmer">Industry Leaders</span>
            <DecoArrow />
          </h2>
        </div>

        {/* ── LOGO MARQUEE ── */}
<div className="logo-fade-mask w-full overflow-hidden relative z-[2] mb-20">
  <div className="marquee-run flex items-center gap-14 w-max">
    {doubledLogos.map((logo, i) => (
      <div key={i} className="flex items-center justify-center min-w-[120px]">
        <img
          src={logo.src}
          alt={logo.name}
          className="
            h-6 sm:h-7 object-contain
            opacity-60 hover:opacity-100
            transition duration-300
            brightness-0 invert
          "
        />
      </div>
    ))}
  </div>
</div>

        {/* ── CARDS ── */}
        <div className="relative z-[3] flex items-center justify-center w-full max-w-5xl pt-12 flex-col sm:flex-row gap-40 sm:gap-46">
          {CARDS.map((card) => (
            <TestimonialCard
              key={card.id}
              card={card}
              scrollProgress={scrollProgress}
              visible={visible}
            />
          ))}
        </div>
      </section>
    </>
  );
}