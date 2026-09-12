"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EXPO_OUT = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export default function Nav({ stage }: { stage: number }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {stage >= 2 && (
        <motion.header 
          key="navbar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...EXPO_OUT, delay: 0.2 }}
          className="fixed top-5 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4"
        >
          <div className={`pointer-events-auto flex items-center justify-between w-fit mx-auto gap-4 sm:gap-8 px-2 py-2 rounded-full transition-all duration-300 ${
            scrolled 
              ? "bg-white/95 shadow-sm ring-1 ring-black/5 backdrop-blur-xl" 
              : "bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur-lg"
          }`}>
            <div className="flex items-center gap-2 pl-4">
              <div className="flex items-center justify-center">
                  <img src="/assets/logo.png" alt="BizEasy Logo" className="w-8 h-8" />
              </div>
              <span className="font-bold text-slate-950 text-lg tracking-tight">BizEasy</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 px-4 text-[15px] font-medium text-slate-900">
              <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
              <a href="#features" className="hover:text-black transition-colors">Features</a>
              <a href="#customers" className="hover:text-black transition-colors">Customers</a>
              <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
            </nav>

            <button className="bg-black text-white px-5 py-2.5 rounded-full text-[15px] font-medium tracking-tight hover:-translate-y-0.5 hover:shadow-lg active:scale-[0.98] transition-all">
              Start today
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
