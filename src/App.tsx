import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { Toaster } from 'sonner'; 

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import ScrollToTop from './components/utils/ScrollToTop';
import SplashScreen from './components/common/SplashScreen';

// Context
import { AuthProvider } from './context/AuthContext';

// Pages
import HomePage from './pages/HomePage';
import MentorsPage from './pages/MentorsPage';
import MentorProfilePage from './pages/MentorProfilePage';
import BookingPage from './pages/BookingPage';
import PaymentPage from './pages/PaymentPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import MentorLoginPage from './pages/MentorLoginPage';
import MentorDashboard from './pages/MentorDashboard';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => setLoading(false), 1500);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    return () => window.removeEventListener("load", handleLoad);
  }, []);

  return (
    <AuthProvider>
      <div className="min-h-screen bg-surface-950 text-white font-body">
         <Toaster position="top-right" richColors /> 
        <AnimatePresence mode="wait">
          {loading ? (
            <SplashScreen key="splash" />
          ) : (
            <div key="app">
              <Navbar />
              <ScrollToTop />
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/mentors" element={<MentorsPage />} />
                <Route path="/mentor/:id" element={<MentorProfilePage />} />
                <Route path="/booking/:id?" element={<BookingPage />} />
                <Route path="/payment/:id" element={<PaymentPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/mentor-login" element={<MentorLoginPage />} />
                <Route path="/dashboard" element={<MentorDashboard />} />
              </Routes>
              <Footer />
            </div>
          )}
        </AnimatePresence>
      </div>
    </AuthProvider>
  );
};

export default App;


 