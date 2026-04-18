import React from 'react';
import ContentFlywheel from './ContentFlywheel';
import Hero from './components/sections/Hero';
import TrustedBy from './components/sections/TrustedBy';
import Stats from './components/sections/Stats';
import ShortFormSection from './components/sections/ShortFormSection';
import ViralAndTrailersSections from './components/sections/Viralandtrailerssections';
import HeroVideo from './components/sections/LaunchWithImpact';
import ProcessCard from './components/sections/Process';
import ShortTestimonials from './components/sections/ShortTEstimonials';
function App() {
  return (
    <div className="App">
      <ContentFlywheel />
      <Hero />
      <TrustedBy/>
      <Stats/>
      <ShortFormSection/>
      <ViralAndTrailersSections/>
      <HeroVideo/>
      <ShortTestimonials/>
      <ProcessCard/>
    </div>
  );
}

export default App;