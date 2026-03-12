import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import SplashScreen from './components/common/SplashScreen';

// Pages
import HomePage from './pages/HomePage';
import MentorsPage from './pages/MentorsPage';
import MentorProfilePage from './pages/MentorProfilePage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial resource fetch or just a minimum display time for the splash
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500); // 2.5 seconds splash screen

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-surface-950 text-white font-body">
      <AnimatePresence mode="wait">
        {loading && <SplashScreen key="splash" />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/mentors" element={<MentorsPage />} />
            <Route path="/mentor/:id" element={<MentorProfilePage />} />
            <Route path="/booking/:id" element={<BookingPage />} />
            <Route path="/payment/:id" element={<PaymentPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
          <Footer />
        </>
      )}
    </div>
  );
};

export default App;