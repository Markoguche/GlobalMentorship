import React from "react";
import { motion } from "framer-motion";
import logo from "../../assets/logo.png";

const SplashScreen: React.FC = () => {
  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Logo Container */}
      <div className="relative w-32 h-32 mb-8 flex items-center justify-center">
        
        {/* Rotating Ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-transparent border-t-primary border-r-primary"
          animate={{ rotate: 360 }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
        />

        {/* Secondary Ring */}
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-transparent border-b-primary border-l-primary opacity-50"
          animate={{ rotate: -360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        />

        {/* Glow */}
        <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full" />

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
      <div className="w-56 h-1 bg-muted rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-primary rounded-full"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Loading Text */}
      <motion.p
        className="mt-6 text-muted-foreground text-sm font-medium tracking-widest uppercase"
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