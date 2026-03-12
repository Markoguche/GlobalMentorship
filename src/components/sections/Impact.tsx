import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { value: 700, suffix: "+", label: "Mentees Trained" },
  { value: 50, suffix: "+", label: "Expert Mentors" },
  { value: 20, suffix: "+", label: "Countries" },
  { value: 1000000, prefix: "$", suffix: "+", label: "Impact Value", short: "1M+" },
];

const Impact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const countersRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: countersRef.current,
        start: "top 80%",
        onEnter: () => {
          document.querySelectorAll('.stat-value').forEach((el) => {
            const target = parseInt(el.getAttribute('data-value') || '0');
            gsap.to(el, { textContent: target, duration: 2, snap: { textContent: 1 }, ease: "power1.out" });
          });
        },
        once: true,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10" />
      <div ref={countersRef} className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Global Impact</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Measured in careers transformed and businesses launched.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-8 rounded-2xl border border-border bg-card">
              <div className="font-display text-4xl md:text-5xl font-bold text-foreground mb-2">
                {stat.short ? <span>{stat.short}</span> : <>{stat.prefix}<span className="stat-value" data-value={stat.value}>0</span>{stat.suffix}</>}
              </div>
              <div className="text-muted-foreground">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Impact;