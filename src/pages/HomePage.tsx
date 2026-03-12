import React from 'react';
import Hero from '../components/sections/Hero';
import WhyMentorship from '../components/sections/WhyMentorship';
import HowItWorks from '../components/sections/HowItWorks';
import FeaturedMentors from '../components/sections/FeaturedMentors';
import Impact from '../components/sections/Impact';
import Testimonials from '../components/sections/Testimonials';
import CTA from '../components/sections/CTA';

import SEO from '../components/common/SEO';

const HomePage: React.FC = () => {
  return (
    <main>
      <SEO 
        title="Home" 
        description="Global Mentorship Program connects ambitious professionals with world-class mentors for career growth and business success."
      />
      <Hero />
      <WhyMentorship />
      <HowItWorks />
      <FeaturedMentors />
      <Impact />
      <Testimonials />
      <CTA />
    </main>
  );
};

export default HomePage;