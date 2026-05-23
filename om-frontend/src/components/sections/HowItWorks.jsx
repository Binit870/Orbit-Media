import {
  Compass,
  Camera,
  Scissors,
  Rocket,
} from "lucide-react";

const steps = [
  {
    step: "STEP 01",
    title: "Strategy",
    description:
      "We map your niche, voice and content pillars — a founder-first system built around your story and the audience you want to own.",
    icon: Compass,
  },

  {
    step: "STEP 02",
    title: "Shoot / Record",
    description:
      "Cinematic in-person or remote shoots. Podcasts, founder content, UGC — captured with intention and pro-grade gear.",
    icon: Camera,
  },

  {
    step: "STEP 03",
    title: "Edit & Distribution",
    description:
      "Premium editing, hooks engineered for retention, then distributed across every platform your audience lives on.",
    icon: Scissors,
  },

  {
    step: "STEP 04",
    title: "Scale Organically",
    description:
      "We track, iterate and compound. Authority builds. Inbound demand grows. No ads. Just attention you actually own.",
    icon: Rocket,
  },
];

export default function ProcessSection() {
  return (
    <section
      className="relative overflow-hidden py-32"
      style={{
        background:
          "linear-gradient(90deg, rgba(4,17,40,1) 0%, rgba(3,20,45,1) 100%)",
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

      <div className="relative z-10 mx-auto max-w-[1800px] px-6 lg:px-[180px]">

        {/* Top label */}
        <p
          className="text-[20px] text-[#F5B52E]"
          style={{
            fontFamily: "'Caveat', cursive",
          }}
        >
          — How it works
        </p>

        {/* Heading */}
        <h2 className="mt-5 max-w-[900px] text-[82px] font-black leading-[0.95] tracking-[-0.06em] text-white">

          A 4-step system
          <br />

          built to{" "}

          <span className="text-[#F5B52E]">
            compound
          </span>
          .

        </h2>

        {/* Steps */}
        <div className="relative mt-28">

          {/* Connecting line */}
          <div className="absolute top-[56px] left-0 right-0 border-t border-dashed border-white/20 hidden xl:block" />

          <div className="grid grid-cols-1 gap-16 xl:grid-cols-4">

            {steps.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={index}
                  className="relative"
                >

                  {/* Circle icon */}
                  <div
                    className="
                      relative
                      z-10
                      flex
                      h-[112px]
                      w-[112px]
                      items-center
                      justify-center
                      rounded-full
                      border
                      border-[#5B21FF]
                      bg-[#121B44]/80
                      shadow-[0_0_40px_rgba(91,33,255,0.25)]
                    "
                  >

                    <Icon
                      className="h-10 w-10 text-white"
                      strokeWidth={2.2}
                    />

                  </div>

                  {/* Step label */}
                  <p
                    className="
                      mt-10
                      text-[15px]
                      uppercase
                      tracking-[0.35em]
                      text-[#F5B52E]
                    "
                  >
                    {item.step}
                  </p>

                  {/* Title */}
                  <h3 className="mt-4 text-[30px] font-bold text-white tracking-[-0.04em]">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-5 max-w-[340px] text-[17px] leading-[1.7] text-white/60">
                    {item.description}
                  </p>

                </div>
              );
            })}

          </div>
        </div>
      </div>
    </section>
  );
}