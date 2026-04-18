/* ─── Creator Card ─── */
const CreatorCard = ({ image, name, followers }) => (
  <div className="relative overflow-hidden rounded-2xl bg-white/10 group mb-4">
    <img
      src={image}
      alt={name}
      loading="lazy"
      className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
      <div className="flex items-center gap-2">
        <div
          className="flex items-center justify-center shrink-0 rounded-md"
          style={{ width: 28, height: 28, background: "linear-gradient(135deg, #F9CE34, #EE2A7B, #6228D7)" }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
        </div>
        <div className="leading-tight">
          <p className="text-white text-sm font-semibold">{name}</p>
          {followers && <p className="text-white/80 text-xs">{followers}</p>}
        </div>
      </div>
    </div>
  </div>
);

/* ─── Navbar ─── */
const navItems = ["Process", "Solutions", "Work", "Testimonials"];

const Navbar = () => (
  <header className="sticky top-0 z-50 backdrop-blur-md bg-[hsl(220_26%_7%/0.8)] border-b border-white/5">
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-between py-4">
      <a href="#" className="flex items-center gap-2.5 no-underline">
        <div className="flex flex-col gap-1">
          <div className="w-7 h-1.5 bg-white rounded-sm -skew-x-[20deg]" />
          <div className="w-7 h-1.5 bg-white rounded-sm -skew-x-[20deg]" />
        </div>
        <span className="text-white font-bold text-lg tracking-tight">Metro Media House</span>
      </a>

      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            className="text-sm text-white/80 hover:text-white transition-colors no-underline"
          >
            {item}
          </a>
        ))}
        <a
          href="#contact"
          className="bg-orange-500 text-[hsl(220_30%_10%)] font-semibold px-5 py-2.5 rounded-lg hover:brightness-110 transition no-underline"
        >
          Contact
        </a>
      </nav>
    </div>
  </header>
);

/* ─── Creator data ─── */
const colA = [
  { image: "https://picsum.photos/seed/c1/400/500", name: "Rob Menzes" },
  { image: "https://picsum.photos/seed/c3/400/500", name: "Zeel Jain", followers: "101K+ Followers" },
  { image: "https://picsum.photos/seed/c5/400/500", name: "Andrew Sorkin", followers: "104K+ Followers" },
  { image: "https://picsum.photos/seed/c7/400/500", name: "Jake Morrow", followers: "42K+ Followers" },
];

const colB = [
  { image: "https://picsum.photos/seed/c2/400/500", name: "CJ Finley", followers: "9K+ Followers" },
  { image: "https://picsum.photos/seed/c4/400/500", name: "Drew Rogers" },
  { image: "https://picsum.photos/seed/c6/400/500", name: "Christian Schutte", followers: "16K+ Followers" },
  { image: "https://picsum.photos/seed/c8/400/500", name: "Emma Hayes", followers: "28K+ Followers" },
];

/* ─── Main Page ─── */
const Index = () => (
  <div className="min-h-screen bg-[hsl(220_26%_7%)] text-white">

    {/* Only non-Tailwind CSS: font import + scroll keyframes */}
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
      .animate-scroll-up  { animation: scrollUp  20s linear infinite; }
      .animate-scroll-down { animation: scrollDown 20s linear infinite; }
    `}</style>

    <Navbar />

    <main className="relative">
      {/* Subtle grid backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(white 1px, transparent 1px), linear-gradient(90deg, white 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 relative grid lg:grid-cols-2 gap-12 lg:gap-16 items-stretch pt-12 pb-24 lg:pt-0 lg:pb-0">

        {/* Left: copy */}
        <div className="flex flex-col justify-center lg:min-h-[calc(100vh-5rem)] lg:py-16">
          <h1 className="text-4xl sm:text-5xl lg:text-[3.75rem] font-extrabold leading-[1.05] tracking-tight">
            Helping Entrepreneurs
            <br />
            build organic brands
            <br />
            <span className="inline-flex items-baseline gap-3">
              as{" "}
              <span className="relative text-orange-400">
                niche authorities
                <svg
                  className="absolute -top-3 -right-6 w-8 h-8 text-blue-400"
                  viewBox="0 0 32 32"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                >
                  <path d="M6 16 L14 16" />
                  <path d="M16 8 L20 4" />
                  <path d="M22 14 L28 12" />
                  <path d="M18 22 L22 26" />
                </svg>
              </span>
            </span>
          </h1>

          <p className="mt-10 text-white/60 max-w-md text-base leading-relaxed">
            Scaling brands for niche authorities with world class organic content. Currently working with
            personal brands, funded startups, Crypto/trading ventures and much more.
          </p>

          <div className="mt-8 flex items-center gap-4">
            <a
              href="#contact"
              className="inline-block bg-orange-500 text-[hsl(220_30%_10%)] font-semibold px-6 py-3.5 rounded-lg hover:brightness-110 transition shadow-lg shadow-orange-500/20 no-underline"
            >
              Book a Discovery Call
            </a>

            <div className="relative">
              <span
                className="text-green-400 text-2xl inline-block -rotate-[8deg]"
                style={{ fontFamily: "'Caveat', cursive" }}
              >
                It's Free
              </span>
              <svg
                className="absolute -bottom-4 -left-2 w-12 h-8 text-green-400"
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
            <div className="relative overflow-hidden">
              <div className="flex flex-col gap-4 animate-scroll-up">
                {[...colA, ...colA].map((c, i) => <CreatorCard key={`a-${i}`} {...c} />)}
              </div>
            </div>
            <div className="relative overflow-hidden">
              <div className="flex flex-col gap-4 animate-scroll-down">
                {[...colB, ...colB].map((c, i) => <CreatorCard key={`b-${i}`} {...c} />)}
              </div>
            </div>

            {/* Fade top */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[hsl(220_26%_7%)] to-transparent col-span-2" />
            {/* Fade bottom */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[hsl(220_26%_7%)] to-transparent col-span-2" />
          </div>
        </div>
      </div>
    </main>

    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-4 text-center text-sm text-white/50">
        © {new Date().getFullYear()} Metro Media House. All rights reserved.
      </div>
    </footer>
  </div>
);

export default Index;