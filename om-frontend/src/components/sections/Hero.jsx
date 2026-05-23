import { useRef, useState, useEffect } from "react";

/* ─── Creator Card with Video ─── */
const CreatorCard = ({ video, image, name, followers, instagramUrl, nameStyle }) => {
  const videoRef = useRef(null);
  const [muted, setMuted] = useState(true);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.preload = "auto";
          el.load();
          el.play().catch(() => {});
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleMouseEnter = () => {
    setHovered(true);
    videoRef.current?.pause();
  };

  const handleMouseLeave = () => {
    setHovered(false);
    videoRef.current?.play().catch(() => {});
  };

  const handleUnmute = (e) => {
    e.stopPropagation();
    const newMuted = !muted;
    setMuted(newMuted);
    if (videoRef.current) videoRef.current.muted = newMuted;
    if (!newMuted) {
      document.querySelectorAll("video").forEach((v) => {
        if (v !== videoRef.current) {
          v.muted = true;
          v.dispatchEvent(new CustomEvent("force-mute"));
        }
      });
    }
  };

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const handler = () => setMuted(true);
    el.addEventListener("force-mute", handler);
    return () => el.removeEventListener("force-mute", handler);
  }, []);

  return (
    <div
      className="relative overflow-hidden rounded-2xl bg-white/10 group mb-4 cursor-pointer"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={() => instagramUrl && window.open(instagramUrl, "_blank")}
    >
      <video
        ref={videoRef}
        src={video}
        preload="none"
        muted
        loop
        playsInline
        poster={image}
        className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
      />

      {/* Hover overlay */}
      <div
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${
          hovered ? "opacity-100" : "opacity-0"
        }`}
        style={{ background: "rgba(0,0,0,0.28)" }}
      >
        <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white">
            <rect x="6" y="4" width="4" height="16" rx="1"/>
            <rect x="14" y="4" width="4" height="16" rx="1"/>
          </svg>
        </div>
        {instagramUrl && (
          <div
            className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-white text-xs font-medium"
            style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)", whiteSpace: "nowrap" }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            View on Instagram
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div
              className="flex items-center justify-center shrink-0 rounded-md"
              style={{ width: 28, height: 28, background: "linear-gradient(135deg, #F9CE34, #EE2A7B, #6228D7)" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
              </svg>
            </div>
            <div className="leading-tight">
              {nameStyle === "serif" ? (
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Georgia', serif", letterSpacing: "0.02em" }}>{name}</p>
              ) : nameStyle === "mono" ? (
                <p className="text-white text-sm font-semibold" style={{ fontFamily: "'Courier New', monospace", letterSpacing: "0.05em" }}>{name}</p>
              ) : (
                <p className="text-white text-sm font-semibold">{name}</p>
              )}
              {followers && <p className="text-white/80 text-xs">{followers}</p>}
            </div>
          </div>

          <button
            onClick={handleUnmute}
            className="shrink-0 flex items-center justify-center rounded-full transition-all"
            style={{
              width: 30, height: 30,
              background: muted ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.9)",
              backdropFilter: "blur(4px)",
              border: "none",
              cursor: "pointer",
            }}
            title={muted ? "Unmute" : "Mute"}
          >
            {muted ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <line x1="23" y1="9" x2="17" y2="15"/>
                <line x1="17" y1="9" x2="23" y2="15"/>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#111" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              </svg>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ─── Navbar ─── */
const navItems = ["Process", "Solutions", "Work", "Testimonials"];

const Navbar = () => (
  <header className="sticky top-0 z-50 backdrop-blur-md border-b border-white/5" style={{ background: "rgba(10, 22, 40, 0.85)" }}>
    <div className="mx-auto px-40 flex items-center justify-between py-4">
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <div className="flex flex-col gap-1">
          <div className="w-7 h-1.5 bg-white rounded-sm -skew-x-[20deg]" />
          <div className="w-7 h-1.5 bg-white rounded-sm -skew-x-[20deg]" />
        </div>
        <span className="text-white font-bold text-2xl tracking-tight">Orbit Media</span>
      </a>
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-lg text-white/80 hover:text-white transition-colors no-underline"
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          className="text-black font-semibold px-5 py-2.5 rounded-lg hover:brightness-110 transition no-underline"
          style={{ background: "#f5a623" }}
        >
          Contact
        </a>
      </nav>
    </div>
  </header>
);

/* ─── Creator Data ─── */
const colA = [
  {
    video: "https://bylqrtnrbsniwsaursaz.supabase.co/storage/v1/object/public/ORBIT%20MEDIA/0521(1).mp4",
    name: "visual.ayush",
    instagramUrl: "https://www.instagram.com/visual.ayush/",
  },
  {
    video: "https://bylqrtnrbsniwsaursaz.supabase.co/storage/v1/object/public/ORBIT%20MEDIA/4.mp4",
    name: "elevatorgoods",
    instagramUrl: "https://www.instagram.com/elevatorgoods/",
  },
  {
    video: "https://bylqrtnrbsniwsaursaz.supabase.co/storage/v1/object/public/ORBIT%20MEDIA/3.mp4",
    name: "Orbit Media",
    instagramUrl: "https://www.instagram.com/orbit.media.in/",
  },
];

const colB = [
  {
    video: "https://bylqrtnrbsniwsaursaz.supabase.co/storage/v1/object/public/ORBIT%20MEDIA/5.mp4",
    name: "thenextbigthing_media",
    instagramUrl: "https://www.instagram.com/thenextbigthing_media/",
  },
  {
    video: "https://bylqrtnrbsniwsaursaz.supabase.co/storage/v1/object/public/ORBIT%20MEDIA/1.mp4",
    name: "ace.me",
    nameStyle: "serif",
    instagramUrl: "https://www.instagram.com/acedotme/",
  },
  {
    video: "https://bylqrtnrbsniwsaursaz.supabase.co/storage/v1/object/public/ORBIT%20MEDIA/6.mp4",
    name: "Refly Official",
    instagramUrl: "https://www.instagram.com/reflyofficial/",
  },
];

/* ─── Main Hero Page ─── */
const Hero = () => (
  <div className="min-h-screen text-white" style={{ background: "#0d1b2e" }}>

    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Caveat:wght@500;700&display=swap');
      body { font-family: 'Inter', sans-serif; }

      @keyframes scrollUp {
        0%   { transform: translateY(0); }
        100% { transform: translateY(-50%); }
      }
      @keyframes scrollDown {
        0%   { transform: translateY(-50%); }
        100% { transform: translateY(0); }
      }
      .animate-scroll-up   { animation: scrollUp   20s linear infinite; }
      .animate-scroll-down { animation: scrollDown 20s linear infinite; }

      .col-scroll:hover .animate-scroll-up,
      .col-scroll:hover .animate-scroll-down {
        animation-play-state: paused;
      }
    `}</style>

    <Navbar />

    <main className="relative">
      {/* Blue-tinted grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          opacity: 0.10,
          backgroundImage:
            "linear-gradient(rgba(100,160,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(100,160,255,0.5) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="mx-auto px-40 relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch pt-12 pb-24 lg:pt-0 lg:pb-0">

        {/* Left: copy */}
        <div className="flex flex-col justify-center lg:min-h-[calc(100vh-5rem)] lg:py-16">
          <h1 className="text-[64px] leading-[0.95] font-black tracking-[-0.04em] text-white max-w-[780px]">
            Helping{" "}
            <span style={{ color: "#f5a623" }}>
              Entrepreneurs
            </span>
            <br />

            build organic
            <br />

            brands
            <br />

            as{" "}
            <span
              className="relative inline-block"
              style={{ color: "#f5a623" }}
            >
              niche authorities

              <svg
                className="absolute -top-2 -right-8 w-8 h-8"
                style={{ color: "#f5a623" }}
                viewBox="0 0 32 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.4"
                strokeLinecap="round"
              >
                <path d="M6 16 L14 16" />
                <path d="M16 8 L20 4" />
                <path d="M22 14 L28 12" />
                <path d="M18 22 L22 26" />
              </svg>
            </span>
          </h1>

          <p className="mt-10 text-[#94A3B8] max-w-[620px] text-[18px] leading-[1.7] font-medium">
            Scaling brands for niche authorities with world class
            organic content. Currently working with personal brands,
            funded startups, Crypto/trading ventures and much more.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="#contact"
              className="inline-block text-white font-semibold px-8 py-4 rounded-xl hover:brightness-110 transition no-underline"
              style={{
                background: "#5000fd",
                boxShadow: "0 10px 30px rgba(80,0,253,0.45)",
              }}
            >
              Book a Discovery Call
            </a>

            <div className="relative">
              <span
                className="text-green-400 text-2xl inline-block -rotate-[368deg]"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                It's Free
              </span>
              <svg
                className="absolute -bottom-4 -left-2 w-12 h-8 text-green-400"
                style={{ transform: "scaleX(-1)" }}
                viewBox="0 0 48 32"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <path d="M4 4 C 14 18, 26 24, 40 22" />
                <path d="M40 22 L 34 18" />
                <path d="M40 22 L 38 28" />
              </svg>
            </div>
          </div>
        </div>

        {/* Right: creator marquee */}
        <div className="lg:h-[calc(100vh-5rem)] lg:overflow-hidden relative">

          {/* Mobile: simple grid */}
          <div className="grid grid-cols-2 gap-4 lg:hidden">
            {[...colA, ...colB].map((c) => <CreatorCard key={c.name} {...c} />)}
          </div>

          {/* Desktop: two infinite scroll columns */}
          <div className="hidden lg:grid grid-cols-2 gap-4 h-full">

            <div className="relative overflow-hidden col-scroll">
              <div className="flex flex-col gap-4 animate-scroll-up">
                {[...colA, ...colA].map((c, i) => <CreatorCard key={`a-${i}`} {...c} />)}
              </div>
            </div>

            <div className="relative overflow-hidden col-scroll">
              <div className="flex flex-col gap-4 animate-scroll-down">
                {[...colB, ...colB].map((c, i) => <CreatorCard key={`b-${i}`} {...c} />)}
              </div>
            </div>

            {/* Fades — match navy background */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 col-span-2" style={{ background: "linear-gradient(to bottom, #0d1b2e, transparent)" }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 col-span-2" style={{ background: "linear-gradient(to top, #0d1b2e, transparent)" }} />
          </div>
        </div>

      </div>
    </main>

  </div>
);

export default Hero;