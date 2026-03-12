import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import Particles from '../components/ui/Particles';
import { Button } from '../components/ui/Button';
import { Link } from 'react-router-dom';
import { ArrowRight, Target, Eye, Heart, Users, Globe } from 'lucide-react';
import SEO from '../components/common/SEO';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

const AboutPage: React.FC = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
    <SEO 
        title="About Us" 
        description="Our mission is to democratize access to world-class mentorship. Learn about our story, vision, and values." 
      />  
      {/* SECTION 1: Hero with Particles Background */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Particles
            particleColors={['#38bdf8', '#8b5cf6', '#ffffff']}
            particleCount={150}
            particleSpread={12}
            speed={0.2}
            particleBaseSize={80}
            moveParticlesOnHover
            alphaParticles
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
        </div>

        <motion.div 
          className="relative z-20 max-w-5xl mx-auto px-6 text-center"
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.div variants={fadeUp} className="mb-6">
            <span className="inline-block px-4 py-2 rounded-full border border-primary/30 bg-primary/10 text-primary text-sm font-medium mb-6 backdrop-blur-sm">
              Our Story
            </span>
          </motion.div>
          
          <motion.h1 variants={fadeUp} className="font-display text-5xl md:text-7xl font-bold mb-8 leading-tight">
            The Bridge Between <br />
            <span className="gradient-text">Potential & Greatness</span>
          </motion.h1>
          
          <motion.p variants={fadeUp} className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            We believe talent is universal, but opportunity is not. Our mission is to democratize access to world-class mentorship for every ambitious professional, anywhere in the world.
          </motion.p>

          <motion.div variants={fadeUp}>
            <Link to="/mentors">
              <Button size="lg" className="group">
                Join the Movement <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* SECTION 2: Origin Story */}
      <SectionWrapper>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-primary font-medium text-sm uppercase tracking-wider">Origin</span>
            <h2 className="font-display text-4xl md:text-5xl font-bold mt-4 mb-6 text-foreground">
              Born From Necessity
            </h2>
            <div className="space-y-4 text-muted-foreground text-lg leading-relaxed">
              <p>
                In 2024, we noticed a gap. Young professionals in emerging markets were brimming with talent and ambition, yet they lacked access to the networks and guidance taken for granted in Silicon Valley or London.
              </p>
              <p>
                We founded Global Mentorship Program to bridge that divide. We built a platform where geography is no longer a barrier to growth, connecting rising stars with seasoned leaders who have already navigated the path to success.
              </p>
            </div>
          </motion.div>

          <motion.div 
            className="relative h-[400px] rounded-2xl overflow-hidden border border-border"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img 
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" 
              alt="Team collaboration" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
          </motion.div>
        </div>
      </SectionWrapper>

      {/* SECTION 3: Mission & Vision */}
      <section className="py-24 bg-muted/30 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        
        <div className="max-w-7xl mx-auto px-6 relative">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">Our Purpose</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Guided by clarity, driven by impact.</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.div 
              className="p-10 rounded-2xl border border-border bg-card backdrop-blur-sm hover:border-primary/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Target className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Mission</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                To democratize access to world-class guidance. We exist to ensure that every entrepreneur, creator, and professional—regardless of location or background—has the support system they need to build impactful careers and businesses.
              </p>
            </motion.div>

            <motion.div 
              className="p-10 rounded-2xl border border-border bg-card backdrop-blur-sm hover:border-primary/30 transition-colors duration-500"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                <Eye className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-2xl font-bold text-foreground mb-4">Our Vision</h3>
              <p className="text-muted-foreground text-lg leading-relaxed">
                A world where geography does not dictate destiny. We see a future where a founder in Lagos has the same access to expertise as a founder in London, creating a truly global ecosystem of innovation and shared prosperity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 4: Values */}
      <SectionWrapper>
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-primary font-medium text-sm uppercase tracking-wider"
          >
            Core Values
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display text-4xl md:text-5xl font-bold mt-4 text-foreground"
          >
            What We Stand For
          </motion.h2>
        </div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: Heart, title: "Radical Generosity", desc: "We believe in giving first. Our mentors give their time and knowledge selflessly to uplift others." },
            { icon: Users, title: "Authentic Connection", desc: "We prioritize depth over breadth. Every session is a meaningful step in a mentee's journey." },
            { icon: Globe, title: "Global Inclusion", desc: "We break down borders. Talent is everywhere, and we are building the infrastructure to serve it." }
          ].map((value, i) => (
            <motion.div 
              key={i} 
              variants={fadeUp}
              className="text-center p-8 rounded-2xl border border-border bg-card hover:bg-muted/30 transition-all duration-300"
            >
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                <value.icon className="text-primary" size={28} />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3">{value.title}</h3>
              <p className="text-muted-foreground">{value.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </SectionWrapper>

    </main>
  );
};

const SectionWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <section className="py-24 relative bg-background">
    <div className="max-w-7xl mx-auto px-6">
      {children}
    </div>
  </section>
);

export default AboutPage;