import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Linkedin, Instagram, Mail } from 'lucide-react';
import logo from "../../assets/logo.png";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 border-t border-border bg-background pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
           <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              {/* Removed the empty green div, kept only the logo */}
              <img
                src={logo}
                alt="Global Mentorship Logo"
                className="h-8 w-auto md:h-10 object-contain"
              />
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">Connecting ambitious professionals with world-class mentors.</p>
          </div>
          
          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Platform</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/mentors" className="hover:text-primary transition-colors">Browse Mentors</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">How It Works</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-foreground mb-4">Legal</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground text-sm">© 2026 Global Mentorship Program. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram size={20} /></a>
            <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Mail size={20} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;