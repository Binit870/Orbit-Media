export const services = [
  {
    slug: "podcasting",
    number: "01",
    name: "Podcasting",
    shortDescription:
      "End-to-end podcast production — concept, guest research, recording and distribution. Orbit is behind some of the most binge-worthy shows in tech and venture.",
    included: [
      "Guest sourcing & pre-interview research",
      "Multi-cam recording, in-studio or remote",
      "Editing, sound design & show branding",
      "Distribution across Spotify, YouTube & every major platform",
    ],
  },
  {
    slug: "launch-videos",
    number: "02",
    name: "Launch Videos",
    shortDescription:
      "Product launches and funding announcements, produced to travel. We turn your biggest moments into content that's guaranteed to get seen.",
    included: [
      "Pre-launch teaser & hype content",
      "Cinematic launch-day video production",
      "Guaranteed view thresholds on X & LinkedIn",
      "Real-time distribution on launch day",
    ],
  },
  {
    slug: "founder-brands",
    number: "03",
    name: "Founder Brands",
    shortDescription:
      "We turn founders into the most recognisable voice in their category — short-form content, founder-led storytelling, and the systems behind both.",
    included: [
      "Personal brand strategy & content pillars",
      "Weekly short-form filming & editing",
      "Ghostwritten scripts in your voice",
      "Cross-platform posting & growth tracking",
    ],
  },
  {
    slug: "ai-ugc-commercials",
    number: "04",
    name: "AI UGC / Commercials",
    shortDescription:
      "AI-powered UGC ads and commercials — authentic, scroll-stopping creative produced at the speed and scale performance marketing demands.",
    included: [
      "AI-generated & creator-shot UGC variants",
      "Hook testing across multiple angles",
      "Performance-ready cuts for Meta, TikTok & YouTube",
      "Rapid iteration based on ad performance data",
    ],
  },
];

export const getServiceBySlug = (slug) => services.find((s) => s.slug === slug);
