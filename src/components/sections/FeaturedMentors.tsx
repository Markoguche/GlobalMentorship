import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { mentors } from '../../data/mentors';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MentorCard = ({ mentor }: { mentor: typeof mentors[0] }) => {
  return (
    <Link to={`/mentor/${mentor.id}`} className="block h-full">
      <motion.div 
        whileHover={{ y: -8 }}
        className="group relative rounded-2xl border border-border bg-card overflow-hidden h-full transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5"
      >
        {/* Changed aspect ratio to 4/5 for better portrait fit */}
        <div className="aspect-[4/5] overflow-hidden relative">
          <img 
            src={mentor.image} 
            alt={mentor.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/400x400/1e293b/ffffff?text=${mentor.name.split(' ').map(n=>n[0]).join('')}`; }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        </div>
        
        <div className="p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-primary font-medium">{mentor.title}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star size={14} fill="currentColor" />
              <span className="text-xs text-foreground">{mentor.rating}</span>
            </div>
          </div>
          
          <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">{mentor.name}</h3>
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{mentor.bio}</p>
          
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <div>
              <span className="font-display text-xl font-bold text-foreground">${mentor.price}</span>
              <span className="text-muted-foreground text-sm"> /session</span>
            </div>
            <div className="flex items-center text-primary text-sm font-medium group-hover:translate-x-1 transition-transform">
              View Profile <ArrowRight className="ml-1 h-4 w-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
};

const FeaturedMentors: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.mentor-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 60, opacity: 0, duration: 0.8, delay: i * 0.1, ease: "power2.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4"
          >
            World-Class Talent
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4"
          >
            Featured Mentors
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Learn from the best. Our mentors have built successful companies and are ready to guide you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="mentor-card">
              <MentorCard mentor={mentor} />
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            to="/mentors"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg 
            bg-primary text-white hover:bg-white hover:text-primary
            dark:bg-white dark:text-primary dark:hover:bg-primary dark:hover:text-white"
          >
            View All Mentors
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedMentors;