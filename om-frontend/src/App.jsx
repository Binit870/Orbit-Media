import React from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import TrustedBy from './components/sections/TrustedBy';
import Stats from './components/sections/Stats';

import FAQ from './components/sections/FAQ';
import Footer from './components/layout/Footer';

import OrbitServices from './components/sections/OrbitServices';
import HowItWorks from './components/sections/HowItWorks';
import ReceiptsSection from './components/sections/ReceiptsSection';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <TrustedBy/>
      <Stats/>
      <OrbitServices/>
      <HowItWorks/>
      <ReceiptsSection/>
      <FAQ/>
      <Footer/> 
    </div>
  );
}

export default App;