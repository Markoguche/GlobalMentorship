import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CTA: React.FC = () => {
  return (
    <section className="py-32 relative overflow-hidden bg-background">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-3xl" />
      </div>
      
      <div className="max-w-4xl mx-auto px-6 text-center relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm mb-6">
            <Sparkles size={16} />
            Start Your Journey Today
          </div>
        </motion.div>

        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-bold text-foreground mb-6"
        >
          Find The Mentor That Will<br />
          <span className="gradient-text">Change Your Future</span>
        </motion.h2>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary Button: Green (Light) / White (Dark) with Swap Hover */}
          <Link 
            to="/mentors"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 shadow-lg 
            bg-primary text-white hover:bg-white hover:text-primary
            dark:bg-white dark:text-primary dark:hover:bg-primary dark:hover:text-white"
          >
            Browse Mentors
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          
          {/* Secondary Button: Green (Light) / White (Dark) with Swap Hover */}
          <Link 
            to="/contact" 
            className="inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg font-medium text-sm transition-all duration-300 border
            /* Light Mode: Outline Green -> Hover Solid Green */
            border-primary text-primary hover:bg-primary hover:text-white
            /* Dark Mode: Outline White -> Hover Solid White */
            dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-primary"
          >
            Apply as Mentor
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;