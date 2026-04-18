import React from 'react';
// import ContentFlywheel from './ContentFlywheel';
import Hero from './components/sections/Hero';
import TrustedBy from './components/sections/TrustedBy';
import Stats from './components/sections/Stats';
import ShortFormSection from './components/sections/ShortFormSection';
import ViralAndTrailersSections from './components/sections/Viralandtrailerssections';
import HeroVideo from './components/sections/LaunchWithImpact';
import ProcessCard from './components/sections/Process';
import ShortTestimonials from './components/sections/ShortTEstimonials';
import FAQ from './components/sections/FAQ';
import Footer from './components/layout/Footer';
import ProblemsSolved from './components/sections/ProblemsSolved';
import TheGoal from './components/sections/TheGoal';
import Testimonials from './components/sections/Testimonials';
function App() {
  return (
    <div className="App">
      
      <Hero />
      <TrustedBy/>
      <Stats/>
      <ShortFormSection/>
      <ViralAndTrailersSections/>
      <HeroVideo/>
      <ShortTestimonials/>
      <ProcessCard/>
      <ProblemsSolved/>
      <TheGoal/>
      <Testimonials/>
      <FAQ/>
      <Footer/> 
    </div>
  );
}

export default App;