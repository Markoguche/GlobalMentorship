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
      gsap.from(".hero-text", { y: 80, opacity: 0, duration: 1, stagger: 0.15, ease: "power3.out", delay: 0.3 });
      gsap.from(".hero-btn", { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: "power2.out", delay: 0.8 });
      gsap.from(".hero-visual", { scale: 0.8, opacity: 0, duration: 1.2, ease: "elastic.out(1, 0.5)", delay: 0.5 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // Update to show all 7 mentors
  const floatingMentors = mentors; 
  // Increased radius to 220 to space out 7 avatars properly
  const radius = 220; 

  return (
    <div>
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden pt-24 lg:pt-0 bg-background">
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-20 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(hsl(var(--foreground) / 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* LEFT COLUMN */}
          <div className="text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="hero-text inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/30 bg-primary/10 backdrop-blur-sm mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-accent-emerald animate-pulse" />
              <span className="text-sm text-primary font-medium">Global Mentorship Program 2026</span>
            </motion.div>
            
            <h1 className="hero-text font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight">
              Unlock Your Potential:<br />
              <span className="gradient-text">Empowering Future Leaders</span>
            </h1>
            
            <p className="hero-text text-lg text-muted-foreground max-w-xl mx-auto lg:mx-0 mb-8 font-body">
              Connect with experienced global leaders who have built companies, created impact, and are ready to guide you to the next level.
            </p>
            
            <div className="hero-btn flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link to="/mentors">
                <Button size="lg" className="group shadow-lg shadow-primary/20">
                  Find a Mentor
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg">Learn More</Button>
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
                  <div className="font-display text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* RIGHT COLUMN: Visual */}
          <div className="relative h-[500px] lg:h-[600px] hero-visual">
            {/* Center Rocket Container */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center shadow-2xl shadow-primary/40 border border-primary/20 z-10">
              <div className="w-36 h-36 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border">
                <Rocket size={64} className="text-primary transform -rotate-45" strokeWidth={1.5} />
              </div>
            </div>
            
            {/* Orbiting Avatars - Now 7 mentors, spaced out with radius 220 */}
            {floatingMentors.map((mentor, index) => {
              // Calculate angle for even distribution
              const angle = (index / floatingMentors.length) * 360;
              const x = Math.cos((angle * Math.PI) / 180) * radius;
              const y = Math.sin((angle * Math.PI) / 180) * radius;
              const centerOffset = 40; // Half of w-20 (80px)
              
              return (
                <motion.div
                  key={mentor.id}
                  className="absolute top-1/2 left-1/2 w-20 h-20 rounded-full overflow-hidden border-2 border-border shadow-xl bg-card"
                  initial={{ opacity: 0, scale: 0.5, x: x - centerOffset, y: y - centerOffset }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: [
                      y - centerOffset,      
                      y - centerOffset - 10, // Float effect
                      y - centerOffset       
                    ]
                  }}
                  transition={{ 
                    opacity: { duration: 0.5, delay: index * 0.05 }, 
                    scale: { duration: 0.5, delay: index * 0.05 }, 
                    y: {
                      duration: 2.5 + index * 0.2, 
                      repeat: Infinity, 
                      ease: "easeInOut",
                      delay: index * 0.3
                    }
                  }}
                >
                  <img src={mentor.image} alt={mentor.name} className="w-full h-full object-cover" />
                </motion.div>
              );
            })}
            
            {/* Decorative Lines - Increased size to match radius */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[440px] h-[440px] border border-dashed border-border rounded-full pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-border/50 rounded-full pointer-events-none" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;