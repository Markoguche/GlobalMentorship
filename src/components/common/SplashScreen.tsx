import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const SplashScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-surface-950 flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Logo Container */}
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        
        {/* Rotating Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-brand-500 border-r-brand-500"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Secondary Ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-accent-violet border-l-accent-violet opacity-50"
          animate={{ rotate: -360 }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Glow */}
        <div className="absolute inset-0 bg-brand-500/20 blur-xl rounded-full" />

        {/* Logo */}
        <motion.img
          src={logo}
          alt="Global Mentorship Logo"
          className="h-16 w-auto object-contain relative z-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
        />
      </div>

      {/* Loader Bar */}
      <div className="w-56 h-1 bg-slate-800 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-brand-500 via-blue-400 to-accent-violet rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-slate-400 text-sm font-medium tracking-widest uppercase"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Preparing your experience...
      </motion.p>
    </motion.div>
  );
};

export default SplashScreen;