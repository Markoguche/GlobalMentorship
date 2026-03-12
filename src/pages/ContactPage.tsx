import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Particles from '../components/ui/Particles';
import { Button } from '../components/ui/Button';
import { Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import SEO from '../components/common/SEO';


const ContactPage: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '', email: '', subject: '', message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
    setFormState({ name: '', email: '', subject: '', message: '' });
  };

  const contactInfo = [
    { icon: Mail, title: "Email Us", content: "serveleadglobal@gmail.com", link: "mailto:serveleadglobal@gmail.com" },
    { icon: Phone, title: "Call Us", content: "+44 20 3948 2749", link: "tel:+442039482749" },
    { icon: MapPin, title: "ServeLead Global Headquarters", content: "Plot 265/266 Beside KingFem Plaza, Mabushi, Abuja", link: "#" },
  ];

  return (
    <main className="relative min-h-screen bg-surface-950 overflow-hidden">
      <SEO 
        title="Contact Us" 
        description="Have questions? Reach out to the Global Mentorship Program team. We are here to help you succeed." 
      />

      {/* Particle Background - Fixed Position */}
      <div className="fixed inset-0 z-0">
        <Particles
          particleColors={['#ffffff', '#38bdf8', '#8b5cf6']}
          particleCount={100}
          particleSpread={15}
          speed={0.2}
          particleBaseSize={60}
          alphaParticles
          moveParticlesOnHover
        />
        {/* Overlay to darken particles slightly for readability */}
        <div className="absolute inset-0 bg-surface-950/60 backdrop-blur-[2px]" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Header Section */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 rounded-full border border-white/10 bg-white/5 text-brand-400 text-sm font-medium mb-6 backdrop-blur-sm">
              Contact Us
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-bold mb-6 text-white">
              Let's Start a Conversation
            </h1>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Have questions about mentorship? Want to partner with us? We'd love to hear from you.
            </p>
          </motion.div>

          {/* Main Grid: Info + Form */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            
            {/* Left Column: Contact Info */}
            <motion.div 
              className="lg:col-span-2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {contactInfo.map((item, i) => (
                <motion.a 
                  key={i}
                  href={item.link}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + (i * 0.1) }}
                  className="block p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      <item.icon className="text-brand-400" size={24} />
                    </div>
                    <div>
                      <h3 className="font-display text-lg font-semibold text-white mb-1">{item.title}</h3>
                      <p className="text-slate-300 text-sm">{item.content}</p>
                    </div>
                  </div>
                </motion.a>
              ))}

              {/* Decorative Quote */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="p-6 border-l-4 border-brand-500 bg-white/5 backdrop-blur-md rounded-r-xl"
              >
                <p className="text-slate-300 italic text-sm">
                  "We typically respond within 24 hours on business days."
                </p>
              </motion.div>
            </motion.div>

            {/* Right Column: Contact Form */}
            <motion.div 
              className="lg:col-span-3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <div className="p-8 md:p-10 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
                
                {isSubmitted ? (
                  <motion.div 
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center py-12"
                  >
                    <div className="w-16 h-16 rounded-full bg-accent-emerald/20 flex items-center justify-center mb-6">
                      <CheckCircle className="text-accent-emerald" size={32} />
                    </div>
                    <h3 className="font-display text-2xl font-bold text-white mb-2">Message Sent!</h3>
                    <p className="text-slate-400">Thank you for reaching out. We'll get back to you shortly.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                        <input 
                          type="text" 
                          name="name"
                          value={formState.name}
                          onChange={handleChange}
                          required
                          className="w-full bg-surface-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                          placeholder="John Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                        <input 
                          type="email" 
                          name="email"
                          value={formState.email}
                          onChange={handleChange}
                          required
                          className="w-full bg-surface-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Subject</label>
                      <input 
                        type="text" 
                        name="subject"
                        value={formState.subject}
                        onChange={handleChange}
                        required
                        className="w-full bg-surface-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                      <textarea 
                        rows={5}
                        name="message"
                        value={formState.message}
                        onChange={handleChange}
                        required
                        className="w-full bg-surface-950/50 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all resize-none"
                        placeholder="Write your message here..."
                      ></textarea>
                    </div>

                    <div className="pt-2">
                      <Button type="submit" size="lg" className="w-full group">
                        Send Message
                        <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </main>
  );
};

export default ContactPage;