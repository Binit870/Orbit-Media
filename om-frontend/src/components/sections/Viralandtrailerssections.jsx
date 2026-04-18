import { useRef, useState } from "react";
import { FaPlay, FaPause } from "react-icons/fa";

// Replace with your actual video imports
const video1 = "https://www.w3schools.com/html/mov_bbb.mp4";
const video2 = "https://www.w3schools.com/html/mov_bbb.mp4";
const video3 = "https://www.w3schools.com/html/mov_bbb.mp4";
const video4 = "https://www.w3schools.com/html/mov_bbb.mp4";
const video5 = "https://www.w3schools.com/html/mov_bbb.mp4";
const video6 = "https://www.w3schools.com/html/mov_bbb.mp4";
const video7 = "https://www.w3schools.com/html/mov_bbb.mp4";

// ─── Portrait Phone Video Card ────────────────────────────────────────────────
function PhoneVideoCard({ src, caption }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
  };

  return (
    <div className="group relative w-[170px] sm:w-[190px] lg:w-[210px] mx-auto cursor-pointer">
      <div
        className="relative rounded-[2rem] bg-neutral-900 p-[8px] ring-1 ring-black/40 transition-transform duration-300 group-hover:scale-[1.03]"
        style={{
          aspectRatio: "9/19",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), inset 0 0 0 1.5px rgba(255,255,255,0.08)",
        }}
      >
        <div className="relative w-full h-full rounded-[1.6rem] overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={src}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute top-1.5 left-1/2 -translate-x-1/2 w-16 h-4 bg-black rounded-full z-10" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
            >
              {playing
                ? <FaPause className="w-3.5 h-3.5 text-black" />
                : <FaPlay className="w-3.5 h-3.5 text-black ml-0.5" />}
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-3 px-2 flex justify-center z-30">
            <span className="bg-black/80 backdrop-blur-sm text-white text-[10px] sm:text-[11px] px-2 py-1 rounded-md font-medium text-center">
              {caption}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Landscape Video Card ─────────────────────────────────────────────────────
function LandscapeVideoCard({ src, caption }) {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const togglePlay = () => {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) { vid.play(); setPlaying(true); }
    else { vid.pause(); setPlaying(false); }
  };

  return (
    <div className="group relative w-full cursor-pointer">
      <div
        className="relative rounded-[1.75rem] bg-neutral-900 p-[8px] ring-1 ring-black/40 transition-transform duration-300 group-hover:scale-[1.02]"
        style={{
          aspectRatio: "16/10",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.8), inset 0 0 0 1.5px rgba(255,255,255,0.08)",
        }}
      >
        <div className="relative w-full h-full rounded-[1.4rem] overflow-hidden bg-black">
          <video
            ref={videoRef}
            src={src}
            autoPlay loop muted playsInline
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 z-10" />
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button
              type="button"
              aria-label={playing ? "Pause" : "Play"}
              onClick={togglePlay}
              className="w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl hover:scale-110 transition-transform"
            >
              {playing
                ? <FaPause className="w-3.5 h-3.5 text-black" />
                : <FaPlay className="w-3.5 h-3.5 text-black ml-0.5" />}
            </button>
          </div>
          <div className="absolute inset-x-0 bottom-4 px-3 flex justify-center z-30">
            <span className="bg-black/80 backdrop-blur-sm text-white text-xs px-2.5 py-1.5 rounded-md font-medium text-center">
              {caption}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Section 1: ViralVideosSection ───────────────────────────────────────────
const viralItems = [
  { src: video1, caption: "what you believe the world will" },
  { src: video2, caption: "and mind, and your things are" },
  { src: video3, caption: "congestion when making what should be" },
  { src: video4, caption: "And you, me, we have drawn" },
];

const ViralVideosSection = () => (
  <section id="work" className="relative py-24 lg:py-32 bg-[#0d1117]">
    <div className="px-8 sm:px-12 lg:px-24 xl:px-32">

      {/* Single-line fluid heading */}
      <h2
        className="font-extrabold tracking-tight leading-none whitespace-nowrap"
        style={{ fontSize: "clamp(1.4rem, 4vw, 2.6rem)" }}
      >
        <span className="text-white">Short Form Videos That </span>
        <span className="relative text-orange-500">
          Go Viral
          <svg
            aria-hidden="true"
            className="absolute -top-3 -right-6 w-7 h-7 text-green-400"
            viewBox="0 0 32 32" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round"
          >
            <path d="M22 4 L26 10" />
            <path d="M28 14 L30 18" />
            <path d="M18 6 L18 2" />
          </svg>
        </span>
      </h2>

      <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl">
        We clip content and add our touch to make them viral
      </p>

      <div className="mt-14 px-12 sm:px-20 lg:px-28 xl:px-36 grid grid-cols-2 lg:grid-cols-4 gap-0.5 sm:gap-1 lg:gap-1.5">
        {viralItems.map((item, i) => (
          <PhoneVideoCard key={i} src={item.src} caption={item.caption} />
        ))}
      </div>
    </div>
  </section>
);

// ─── Section 2: TrailersSection ───────────────────────────────────────────────
const trailerItems = [
  { src: video5, caption: "They use ChatGPT." },
  { src: video6, caption: "stablecoins are being used in Latin" },
  { src: video7, caption: "March." },
];

const TrailersSection = () => (
  <section id="trailers" className="relative py-24 lg:py-32 bg-[#0d1117]">
    <div className="px-8 sm:px-12 lg:px-24 xl:px-32">

      {/* Single-line fluid heading */}
      <h2
        className="font-extrabold tracking-tight leading-none whitespace-nowrap"
        style={{ fontSize: "clamp(1.4rem, 4vw, 2.6rem)" }}
      >
        <span className="text-white">Trailers and </span>
        <span className="relative text-orange-500">
          Long form
          <svg
            aria-hidden="true"
            className="absolute -top-3 -right-6 w-7 h-7 text-blue-400"
            viewBox="0 0 32 32" fill="none" stroke="currentColor"
            strokeWidth="2.2" strokeLinecap="round"
          >
            <path d="M22 4 L26 10" />
            <path d="M28 14 L30 18" />
            <path d="M18 6 L18 2" />
          </svg>
        </span>
      </h2>

      <p className="mt-4 text-gray-400 text-base sm:text-lg max-w-xl">
        Podcast trailers, B2B videos and more
      </p>

      <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
        {trailerItems.map((item, i) => (
          <LandscapeVideoCard key={i} src={item.src} caption={item.caption} />
        ))}
      </div>
    </div>
  </section>
);

// ─── Combined Export ──────────────────────────────────────────────────────────
const ViralAndTrailersSections = () => (
  <>
    <ViralVideosSection />
    <TrailersSection />
  </>
);

export default ViralAndTrailersSections;