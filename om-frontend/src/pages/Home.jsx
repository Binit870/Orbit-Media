import Hero from "../components/sections/Hero";
import TrustedBy from "../components/sections/TrustedBy";
import Stats from "../components/sections/Stats";
import WhatWeDo from "../components/sections/WhatWeDo";
import HowWeWork from "../components/sections/HowWeWork";
import Testimonials from "../components/sections/Testimonials";
import FAQ from "../components/sections/FAQ";
import CTASection from "../components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Stats />
      <WhatWeDo />
      <HowWeWork />
      <Testimonials />
      <FAQ />
      <CTASection />
    </>
  );
}
