import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Menu, X, Sun, Moon } from 'lucide-react';
import logo from "../../assets/logo.png";
import { useTheme } from '../../context/ThemeContext'; 

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Mentors', path: '/mentors' },
  { name: 'Contact', path: '/contact' },
];

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          {/* Removed the green background box wrapper */}
          <img 
            src={logo} 
            alt="Global Mentorship Logo" 
            className="h-8 w-auto md:h-10 object-contain" 
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              to={link.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === link.path ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-4">
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>

          <Link to="/mentors">
            <Button>Find a Mentor</Button>
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
           <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-muted transition-colors text-foreground"
          >
            {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground">
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="md:hidden glass mt-2 mx-4 rounded-xl overflow-hidden"
        >
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path}
                onClick={() => setMobileOpen(false)}
                className="text-foreground hover:text-primary py-2"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/mentors" onClick={() => setMobileOpen(false)} className="w-full">
              <Button className="w-full">Find a Mentor</Button>
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;