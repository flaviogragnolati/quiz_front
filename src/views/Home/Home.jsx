import React from 'react';
import ProductSmokingHero from './components/Goodbye';
import Inicio from './components/Inicio';
import About from './components/About';
import HowItWorks from './components/HowItWorks';
import Contact from './components/Contact';
import AppDownload from 'views/Home/components/AppDownload';


function Home() {
  return (
    <>
      <Inicio />
      <AppDownload/>
      <About />
      <HowItWorks />
      <Contact />
      <ProductSmokingHero />
    </>
  );
}

export default Home;
