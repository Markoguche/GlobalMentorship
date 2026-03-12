import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Button } from '../ui/Button';
import { ArrowRight, Rocket } from 'lucide-react';
import { mentors } from '../../data/mentors';

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-text", {
        y: 80,
        opacity: 0,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        delay: 0.3
      });
      
      gsap.from(".hero-btn", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power2.out",
        delay: 0.8
      });

      gsap.from(".hero-visual", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.5)",
        delay: 0.5
      });

    }, heroRef);
    
    return () => ctx.revert();
  }, []);

  const floatingMentors = mentors.slice(0, 4);
  const radius = 180; // Orbit radius in pixels

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-0">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-surface-950 via-blue-950/30 to-surface-950 pointer-events-none" />
      
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
        backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: Text Content */}
        <div className="text-center lg:text-left">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 backdrop-blur-sm mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
            <span className="text-sm text-brand-300 font-medium">Global Mentorship Program 2026</span>
          </motion.div>

          <h1 className="hero-text font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-tight">
            Unlock Your Potential:<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-accent-violet">
              Empowering Future Leaders
            </span>
          </h1>

          <p className="hero-text text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 mb-8 font-body">
            Connect with experienced global leaders who have built companies, created impact, and are ready to guide you to the next level.
          </p>

          <div className="hero-btn flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link to="/mentors">
              <Button size="lg" className="group shadow-lg shadow-brand-500/20">
                Find a Mentor
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link to="/about">
              <Button variant="outline" size="lg">
                Learn More
              </Button>
            </Link>
          </div>

          {/* Stats Row */}
          <div className="hero-btn mt-12 grid grid-cols-3 gap-4 max-w-md mx-auto lg:mx-0">
            {[
              { value: "700+", label: "Mentees" },
              { value: "50+", label: "Experts" },
              { value: "20+", label: "Countries" },
            ].map((stat, i) => (
              <div key={i} className="text-center lg:text-left">
                <div className="font-display text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: Visual (Rocket + Avatars) */}
        <div className="relative h-[500px] lg:h-[600px] hero-visual">
          
          {/* Center Rocket Container */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-brand-600 to-accent-violet flex items-center justify-center shadow-2xl shadow-brand-500/40 border border-white/20 z-10">
            <div className="w-36 h-36 rounded-full bg-surface-950/80 backdrop-blur-sm flex items-center justify-center border border-white/10">
              <Rocket size={64} className="text-white transform -rotate-45" strokeWidth={1.5} />
            </div>
          </div>

          {/* Orbiting Avatars */}
          {floatingMentors.map((mentor, index) => {
            // Calculate angle for even distribution (0, 90, 180, 270 degrees)
            const angle = (index / floatingMentors.length) * 360;
            
            // Calculate X and Y positions
            const x = Math.cos((angle * Math.PI) / 180) * radius;
            const y = Math.sin((angle * Math.PI) / 180) * radius;

            // Offset to center the 80px (w-20) avatar on the calculated point
            const centerOffset = 40; 

            return (
              <motion.div
                key={mentor.id}
                className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full overflow-hidden border-2 border-white/20 shadow-xl bg-slate-800"
                initial={{ 
                  opacity: 0, 
                  scale: 0.5,
                  x: x - centerOffset, 
                  y: y - centerOffset 
                }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  // Keyframes for floating animation
                  y: [
                    y - centerOffset,      // Start position
                    y - centerOffset - 15, // Float up
                    y - centerOffset       // Return
                  ]
                }}
                transition={{ 
                  opacity: { duration: 0.5, delay: index * 0.1 },
                  scale: { duration: 0.5, delay: index * 0.1 },
                  y: {
                    duration: 3 + index, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: index * 0.5
                  }
                }}
              >
                <img 
                  src={mentor.image} 
                  alt={mentor.name}
                  className="w-full h-full object-cover"
                />
              </motion.div>
            );
          })}

          {/* Decorative Orbit Lines */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[360px] h-[360px] border border-dashed border-white/10 rounded-full pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full pointer-events-none" />

        </div>
      </div>
    </section>
  );
};

export default Hero;