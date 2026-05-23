// import { useEffect, useRef, useState } from "react";

// // ── Global keyframes & font ───────────────────────────────────────────────────
// const globalStyles = `
//   @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');

//   .font-syne { font-family: 'Syne', sans-serif; }
//   .font-dm   { font-family: 'DM Sans', sans-serif; }

//   @keyframes shimmer {
//     0%   { background-position: 0%; }
//     100% { background-position: 200%; }
//   }

//   @keyframes floatUD {
//     0%, 100% { transform: translateY(0px); }
//     50%      { transform: translateY(-14px); }
//   }

//   .gold-shimmer {
//     background: linear-gradient(90deg, #F5C842, #FFE080, #F5C842);
//     background-size: 200%;
//     -webkit-background-clip: text;
//     -webkit-text-fill-color: transparent;
//     animation: shimmer 3s linear infinite;
//   }

//   .float-ud        { animation: floatUD 5s ease-in-out infinite; }
//   .float-ud-delay  { animation: floatUD 5s ease-in-out infinite 1.4s; }
//   .float-ud-slow   { animation: floatUD 6.5s ease-in-out infinite 0.5s; }
//   .float-ud-slow2  { animation: floatUD 7s ease-in-out infinite 2s; }

//   .stripe-bg {
//     background-image: repeating-linear-gradient(
//       90deg,
//       transparent,
//       transparent 58px,
//       rgba(255,255,255,0.025) 58px,
//       rgba(255,255,255,0.025) 60px
//     );
//   }

//   .card-smooth {
//     transition:
//       transform 0.45s cubic-bezier(0.22,1,0.36,1),
//       box-shadow 0.35s ease,
//       opacity 0.75s ease;
//   }
// `;

// // ── TRUST BAR DATA ────────────────────────────────────────────────────────────
// const LOGOS = [
//   { name: "visual.ayush" },
//   { name: "elevatorgoods" },
//   { name: "reflyofficial" },
//   { name: "thenextbigthing_media" },
// ];

// // ── TESTIMONIAL CARDS ─────────────────────────────────────────────────────────
// const CARDS = [
//   {
//     id: "left",
//     segments: [
//       { text: "Metro Media House helped me grow to ", color: "white" },
//       { text: "50K in just 2 months", color: "gold" },
//       {
//         text: " with constant support, strategy, and dedication. Their consistency made all the difference.",
//         color: "white",
//       },
//     ],
//     author: "Zeel Mehta Jain",
//     role: "AI Entrepreneur",
//     baseRot: -14,
//     baseTX: 30,
//     scrollRotDelta: -8,
//     scrollTXDelta: -10,
//     hoverRot: -8,
//     hoverTX: 20,
//     centered: true,
//     extraClass: "-mr-5 z-[1]",
//     width: "w-[260px]",
//   },

//   {
//     id: "center",
//     segments: [
//       { text: "By far the ", color: "white" },
//       {
//         text: "best video editing team we have ever worked with",
//         color: "blue",
//       },
//       {
//         text: " - quick, communicative, and diligent with the highest quality videos.",
//         color: "white",
//       },
//     ],
//     author: "Tristan Barrett",
//     role: "Creative Director @ SpaceGod Studios",
//     baseRot: 0,
//     baseTX: 0,
//     scrollRotDelta: 0,
//     scrollTXDelta: 0,
//     hoverRot: 0,
//     hoverTX: 0,
//     centered: false,
//     extraClass: "z-[3] border-white/[0.13]",
//     width: "w-[260px]",
//   },

//   {
//     id: "right",
//     segments: [
//       {
//         text: "Very receptive to feedback, quick to adapt, and genuinely collaborative. ",
//         color: "white",
//       },
//       {
//         text: "Their editing always captures the tone and story we're trying to tell.",
//         color: "gold",
//       },
//     ],
//     author: "Liah Yoo",
//     role: "Founder, Krave Beauty",
//     baseRot: 13,
//     baseTX: -30,
//     scrollRotDelta: 8,
//     scrollTXDelta: 10,
//     hoverRot: 8,
//     hoverTX: -20,
//     centered: true,
//     extraClass: "-ml-5 z-[1]",
//     width: "w-[260px]",
//   },
// ];

// // ── Decorative SVGs ───────────────────────────────────────────────────────────
// function SmileyIcon() {
//   return (
//     <svg viewBox="0 0 56 56" fill="none" className="w-14 h-14">
//       <circle cx="28" cy="28" r="26" stroke="#b0f0a0" strokeWidth="2.2" />
//       <circle cx="21" cy="22" r="2.5" fill="#b0f0a0" />
//       <circle cx="35" cy="22" r="2.5" fill="#b0f0a0" />
//       <path
//         d="M19 34 Q28 43 37 34"
//         stroke="#b0f0a0"
//         strokeWidth="2.2"
//         strokeLinecap="round"
//       />
//     </svg>
//   );
// }

// function ClapIcon() {
//   return (
//     <svg viewBox="0 0 62 62" fill="none" className="w-16 h-16">
//       <path
//         d="M31 4 L38 10 L46 8 L50 16 L58 18 L56 26 L62 32 L56 38 L58 46 L50 48 L46 56 L38 54 L31 60 L24 54 L16 56 L12 48 L4 46 L6 38 L0 32 L6 26 L4 18 L12 16 L16 8 L24 10 Z"
//         fill="#8B7FE8"
//       />
//       <text x="31" y="35" textAnchor="middle" fontSize="22" fill="white">
//         👏
//       </text>
//     </svg>
//   );
// }

// function ScribbleTL() {
//   return (
//     <svg width="90" height="70" viewBox="0 0 90 70" fill="none">
//       <path
//         d="M8 60 C15 5 50 0 80 20"
//         stroke="rgba(255,255,255,0.2)"
//         strokeWidth="1.8"
//       />
//     </svg>
//   );
// }

// function ScribbleTR() {
//   return (
//     <svg width="70" height="55" viewBox="0 0 70 55" fill="none">
//       <path
//         d="M10 10 C30 2 55 12 62 40"
//         stroke="rgba(255,255,255,0.18)"
//         strokeWidth="1.8"
//       />
//     </svg>
//   );
// }

// // ── TESTIMONIAL CARD ──────────────────────────────────────────────────────────
// function TestimonialCard({ card, scrollProgress, visible }) {
//   const [hovered, setHovered] = useState(false);

//   const isCenter = card.id === "center";

//   let transform;

//   if (isCenter) {
//     transform = hovered
//       ? "scale(1.04) translateY(-8px)"
//       : "translateY(0px)";
//   } else {
//     transform = hovered
//       ? `rotate(${card.hoverRot}deg) translateX(${card.hoverTX}px) scale(1.04)`
//       : `rotate(${card.baseRot + scrollProgress * card.scrollRotDelta}deg)
//          translateX(${card.baseTX + scrollProgress * card.scrollTXDelta}px)`;
//   }

//   return (
//     <div
//       className={`
//         card-smooth flex-shrink-0 rounded-[18px] p-8
//         bg-[#0f0f10] border border-white/[0.09]
//         ${card.width} ${card.extraClass}
//         ${visible ? "opacity-100" : "opacity-0"}
//         max-sm:w-full max-sm:rotate-0
//       `}
//       style={{
//         transform,
//         transformOrigin: "center bottom",
//         boxShadow: "0 16px 60px rgba(0,0,0,0.7)",
//       }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <span
//         className="block text-[3.5rem] leading-[0.6] mb-3 text-[#F5C842]/20"
//         style={{ fontFamily: "'Syne', sans-serif" }}
//       >
//         "
//       </span>

//       <p
//         className="mb-6 leading-[1.72] text-center text-[1.15rem] font-semibold text-white/90"
//         style={{ fontFamily: "'DM Sans', sans-serif" }}
//       >
//         {card.segments.map((seg, i) => (
//           <span
//             key={i}
//             className={
//               seg.color === "gold"
//                 ? "text-[#F5C842]"
//                 : seg.color === "blue"
//                 ? "text-[#7B9FFF]"
//                 : ""
//             }
//           >
//             {seg.text}
//           </span>
//         ))}
//       </p>

//       <div className={card.centered ? "text-center" : "text-left"}>
//         <strong
//           className="block text-[0.88rem] font-bold text-white mb-1"
//           style={{ fontFamily: "'Syne', sans-serif" }}
//         >
//           {card.author}
//         </strong>

//         <span className="text-[0.76rem] text-white/40 italic">
//           {card.role}
//         </span>
//       </div>
//     </div>
//   );
// }

// // ── MAIN COMPONENT ────────────────────────────────────────────────────────────
// export default function TestimonialsSection() {
//   const sectionRef = useRef(null);

//   const [scrollProgress, setScrollProgress] = useState(0);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setVisible(true), 200);
//     return () => clearTimeout(t);
//   }, []);

//   useEffect(() => {
//     let ticking = false;

//     const onScroll = () => {
//       if (ticking) return;

//       ticking = true;

//       requestAnimationFrame(() => {
//         if (sectionRef.current) {
//           const rect = sectionRef.current.getBoundingClientRect();

//           const prog = Math.max(
//             0,
//             Math.min(1, -rect.top / (rect.height * 0.6))
//           );

//           setScrollProgress(prog);
//         }

//         ticking = false;
//       });
//     };

//     window.addEventListener("scroll", onScroll, { passive: true });

//     return () => window.removeEventListener("scroll", onScroll);
//   }, []);

//   return (
//   <>
//     <section
//       ref={sectionRef}
//       className="
//         relative
//         overflow-hidden
//         bg-[#071529]
//         py-28
//       "
//     >

//       {/* Grid background */}
//       <div
//         className="absolute inset-0 opacity-[0.05]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
//           backgroundSize: "48px 48px",
//         }}
//       />

//       <div className="relative z-10">

//         {/* Heading */}
//         <div className="px-6 lg:px-12">

//           <div
//             className={`transition-all duration-700 ${
//               visible
//                 ? "opacity-100 translate-y-0"
//                 : "opacity-0 translate-y-6"
//             }`}
//           >

//             <h2
//               className="
//                 text-white
//                 font-black
//                 leading-[0.92]
//                 tracking-[-0.06em]
//               "
//               style={{
//                 fontFamily: "'Syne', sans-serif",
//                 fontSize: "clamp(3rem, 7vw, 6.5rem)",
//               }}
//             >
//               Trusted by{" "}

//               <span
//                 style={{
//                   background:
//                     "linear-gradient(90deg, #F5B52E 0%, #D96BE8 100%)",
//                   WebkitBackgroundClip: "text",
//                   WebkitTextFillColor: "transparent",
//                 }}
//               >
//                 Industry Leaders
//               </span>

//             </h2>

//           </div>
//         </div>

//         {/* TRUST BAR */}
//         <div className="mt-24 overflow-hidden">

//           {/* Top label */}
//           <div className="flex items-center justify-center gap-6 mb-14 px-6">

//             <div className="h-px w-24 bg-white/10" />

//             <p
//               className="
//                 text-[12px]
//                 uppercase
//                 tracking-[0.42em]
//                 text-[#8E93A8]
//                 whitespace-nowrap
//               "
//               style={{
//                 fontFamily: "'DM Sans', sans-serif",
//               }}
//             >
//               Trusted By Founders, Creators & Funded Startups
//             </p>

//             <div className="h-px w-24 bg-white/10" />

//           </div>

//           {/* Moving logos */}
//           <div className="relative overflow-hidden w-full">

//             <div
//               className="
//                 flex
//                 items-center
//                 gap-24
//                 whitespace-nowrap
//                 w-max
//               "
//               style={{
//                 animation: "marqueeLeft 20s linear infinite",
//               }}
//             >

//               {[...LOGOS, ...LOGOS].map((logo, i) => (
//                 <div
//                   key={i}
//                   className="
//                     flex
//                     items-center
//                     gap-4
//                     shrink-0
//                   "
//                 >

//                   <div className="w-3 h-3 rounded-full bg-[#F5B52E]" />

//                   <span
//                     className="
//                       text-[34px]
//                       md:text-[42px]
//                       font-black
//                       tracking-[-0.05em]
//                       text-white/65
//                     "
//                     style={{
//                       fontFamily: "'Syne', sans-serif",
//                     }}
//                   >
//                     {logo.name}
//                   </span>

//                 </div>
//               ))}

//             </div>
//           </div>

//         </div>
//       </div>

//       {/* Inline animation */}
//       <style>
//         {`
//           @keyframes marqueeLeft {
//             0% {
//               transform: translateX(0%);
//             }

//             100% {
//               transform: translateX(-50%);
//             }
//           }
//         `}
//       </style>

//     </section>
//   </>
// );
// }

import { useEffect, useState } from "react";

const LOGOS = [
  "visual.ayush",
  "elevatorgoods",
  "reflyofficial",
  "thenextbigthing_media",
];

export default function TestimonialsSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#071529] py-20">

      {/* Grid Background */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10">

        {/* Heading */}
        <div
          className={`pl-[180px] pr-6 transition-all duration-700 ${
            visible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h2
            className="
              text-white
              font-black
              leading-[0.95]
              tracking-[-0.05em]
            "
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "clamp(2.8rem, 5vw, 5rem)",
            }}
          >
            Trusted by{" "}

            <span
              style={{
                background:
                  "linear-gradient(90deg, #F5B52E 0%, #D96BE8 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Industry Leaders
            </span>
          </h2>
        </div>

        {/* Scrolling Brand Names */}
        <div className="mt-16 overflow-hidden">

          <div
            className="flex items-center gap-20 whitespace-nowrap w-max"
            style={{
              animation: "marquee 18s linear infinite",
            }}
          >

            {[...LOGOS, ...LOGOS].map((logo, i) => (
              <div
                key={i}
                className="flex items-center gap-4 shrink-0"
              >

                <div className="w-3 h-3 rounded-full bg-[#F5B52E]" />

                <span
                  className="
                    text-[28px]
                    md:text-[36px]
                    font-black
                    tracking-[-0.04em]
                    text-white/65
                  "
                  style={{
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {logo}
                </span>

              </div>
            ))}

          </div>
        </div>
      </div>

      {/* Animation */}
      <style>
        {`
          @keyframes marquee {
            0% {
              transform: translateX(0%);
            }

            100% {
              transform: translateX(-50%);
            }
          }
        `}
      </style>

    </section>
  );
}