import React from 'react';
import { motion } from 'framer-motion';
import { testimonials } from '../../data/mentors'; // Correct import

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="inline-block text-brand-400 font-medium text-sm uppercase tracking-wider mb-4">
            Success Stories
          </span>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-4">
            What Our Mentees Say
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div 
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-slate-800 bg-slate-900/30"
            >
              <p className="text-slate-300 mb-6">"{t.content}"</p>
              <div className="flex items-center gap-3">
                {/* Avatar property now exists */}
                <img 
                   src={t.avatar} 
                   alt={t.name} 
                   className="w-10 h-10 rounded-full object-cover bg-slate-700" 
                />
                <div>
                  <div className="font-medium text-white">{t.name}</div>
                  <div className="text-sm text-slate-400">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;