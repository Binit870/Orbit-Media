import Hero from "../components/sections/Hero";
import Stats from "../components/sections/Stats";
import Services from "../components/sections/Services";
import FAQ from "../components/sections/FAQ";
import CTASection from "../components/sections/CTASection";

export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Services />
      <FAQ />
      <CTASection />
    </>
  );
}
