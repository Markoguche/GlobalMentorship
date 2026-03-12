import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800 bg-surface-950 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-400 to-accent-violet" />
              <img src="src/assets/logo.png" alt="Global Mentorship Logos" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Connecting ambitious professionals with world-class mentors.
            </p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-white mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/mentors" className="hover:text-white transition-colors">Browse Mentors</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">How It Works</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Become a Mentor</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Careers</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">© 2026 Global Mentorship Program. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;