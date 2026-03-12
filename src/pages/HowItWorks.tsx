import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { Search, UserCheck, CreditCard, FileSignature, Video } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Search, title: "Browse Mentors", desc: "Filter by expertise, industry, and price" },
  { icon: UserCheck, title: "Choose a Mentor", desc: "Review profiles and select your match" },
  { icon: CreditCard, title: "Pay Securely", desc: "Transparent pricing, no hidden fees" },
  { icon: FileSignature, title: "Sign Agreement", desc: "Quick digital agreement for clarity" },
  { icon: Video, title: "Attend Session", desc: "Virtual or physical, your choice" },
];

const HowItWorks: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.step-card').forEach((card, i) => {
        gsap.from(card, {
          scrollTrigger: { trigger: card, start: "top 85%" },
          y: 50,
          opacity: 0,
          duration: 0.6,
          ease: "power2.out"
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-500/5 to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <span className="inline-block text-brand-400 font-medium text-sm uppercase tracking-wider mb-4">
            Simple Process
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            How It Works
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {steps.map((step, i) => (
            <React.Fragment key={i}>
              <div className="step-card text-center relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 transition-transform hover:scale-110">
                  <step.icon className="text-brand-400" size={28} />
                </div>
                <div className="font-display text-white font-semibold mb-2">{step.title}</div>
                <p className="text-sm text-slate-400">{step.desc}</p>
              </div>
              {i < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center absolute top-8 left-1/2 right-0 z-0" style={{ left: `${i * 20 + 10}%`, width: '20%' }}>
                   <div className="h-px w-full bg-gradient-to-r from-brand-500/50 to-transparent" />
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;