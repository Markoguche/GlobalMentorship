import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Target, Rocket, Network, Shield, Zap } from 'lucide-react';
import sec from '../../assets/sec1.jpg';

gsap.registerPlugin(ScrollTrigger);

const features = [
  { icon: Target, title: "Expert Guidance", description: "Get personalized advice from leaders who have navigated the path before you." },
  { icon: Shield, title: "Avoid Mistakes", description: "Learn from their failures so you don't have to repeat them." },
  { icon: Rocket, title: "Accelerate Growth", description: "Compress years of learning into months with targeted mentorship." },
  { icon: Network, title: "Expand Network", description: "Gain access to valuable connections and opportunities." },
  { icon: Zap, title: "Gain Clarity", description: "Develop strategic vision with someone who sees the bigger picture." }
];

const WhyMentorship: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(imageRef.current, {
        scrollTrigger: { trigger: imageRef.current, start: "top 80%" },
        scale: 1.1, opacity: 0, duration: 1.2, ease: "power2.out"
      });
      gsap.utils.toArray<HTMLElement>('.feature-item').forEach((item, i) => {
        gsap.from(item, {
          scrollTrigger: { trigger: item, start: "top 90%" },
          x: 50, opacity: 0, duration: 0.6, delay: i * 0.1, ease: "power2.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div ref={imageRef} className="relative rounded-2xl overflow-hidden h-[400px] lg:h-[500px] border border-border">
            <img src={sec} alt="Mentorship Session" className="w-full h-full object-cover" onError={(e) => { (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"; }} />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
            
            {/* Floating Stat Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }} transition={{ delay: 0.5 }}
              className="absolute bottom-6 left-6 right-6 glass rounded-xl p-4"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent-emerald/20 flex items-center justify-center">
                  <Rocket className="text-accent-emerald" size={24} />
                </div>
                <div>
                  <div className="font-display text-xl font-bold text-foreground">93% Success Rate</div>
                  <div className="text-sm text-muted-foreground">Mentees achieve their goals within 6 months</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Content Side */}
          <div className="lg:pl-8">
            <motion.span initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="inline-block text-primary font-medium text-sm uppercase tracking-wider mb-4">The Impact</motion.span>
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6">Why Mentorship Matters</motion.h2>
            <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }} className="text-lg text-muted-foreground mb-10">The right guidance at the right time can transform your entire career trajectory.</motion.p>

            <div className="space-y-4">
              {features.map((feature, index) => (
                <div key={index} className="feature-item flex items-start gap-4 p-4 rounded-xl border border-transparent hover:border-border hover:bg-muted/30 transition-all">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="text-primary" size={20} />
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-foreground mb-1">{feature.title}</h4>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyMentorship;