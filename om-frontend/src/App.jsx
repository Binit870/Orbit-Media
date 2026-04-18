import React from 'react';
import ContentFlywheel from './ContentFlywheel';
import Hero from './components/sections/Hero';
import TrustedBy from './components/sections/TrustedBy';
import Stats from './components/sections/Stats';
import ShortFormSection from './components/sections/ShortFormSection';
import ViralAndTrailersSections from './components/sections/Viralandtrailerssections';
function App() {
  return (
    <div className="App">
      <ContentFlywheel />
      <Hero />
      <TrustedBy/>
      <Stats/>
      <ShortFormSection/>
      <ViralAndTrailersSections/>
    </div>
  );
}

export default App;