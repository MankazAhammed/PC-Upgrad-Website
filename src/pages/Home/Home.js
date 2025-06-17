import React from 'react';
import HeroSection from '../../components/HeroSection';
import FeaturedProjects from '../../components/FeaturedProjects';
import AboutSection from '../../components/AboutSection';
import WhyLords from "../../components/WhyLords/WhyLords"; 
import GlobalPresence from "../../components/GlobalPresence/GlobalPresence";
import ExpertiseSection from "../../components/ExpertiseSection/ExpertiseSection";

const Home = () => {
  return (
    <div>
      <HeroSection />
      <FeaturedProjects />
      <AboutSection />
      <WhyLords />
      <GlobalPresence />
      <ExpertiseSection />
    </div>
  );
};

export default Home;