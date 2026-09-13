"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Globe } from "lucide-react";
import gsap from "gsap";
import { Component } from "./ui/sterling-gate-kinetic-navigation";

const EXPO_OUT = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };
const STAGGER = { animate: { transition: { staggerChildren: 0.1 } } };

const NAV_LINKS = [
  { href: "#how-it-works", label: "How it works" },
  { href: "#features", label: "Features" },
  { href: "#customers", label: "Customers" },
  { href: "#pricing", label: "Pricing" }
];

export default function Nav({ stage }: { stage: number }) {
  const [scrolled, setScrolled] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  
  const desktopCtaRef = useRef<HTMLDivElement>(null);
  const mobileCtaRef = useRef<HTMLDivElement>(null);
  
  // Scroll Listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          setPastHero(window.scrollY > (window.innerHeight * 0.7));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // GSAP Animations for CTA Reveal
  useEffect(() => {
    if (desktopCtaRef.current) {
      gsap.to(desktopCtaRef.current, { 
        width: pastHero ? "auto" : 0, 
        opacity: pastHero ? 1 : 0, 
        duration: pastHero ? 0.55 : 0.4, 
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
    
    if (mobileCtaRef.current) {
      const showMobile = pastHero && !isMenuOpen;
      gsap.to(mobileCtaRef.current, { 
        width: showMobile ? "auto" : 0, 
        opacity: showMobile ? 1 : 0, 
        duration: showMobile ? 0.55 : 0.4, 
        ease: "power2.inOut",
        overwrite: "auto"
      });
    }
  }, [pastHero, isMenuOpen]);

  return (
    <AnimatePresence>
      {stage >= 2 && (
        <motion.header 
          key="navbar"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ ...EXPO_OUT, delay: 0.1 }}
          className="fixed top-5 left-0 right-0 z-[120] flex justify-center pointer-events-none px-4"
        >
          <div 
            className={`pointer-events-auto flex items-center justify-between w-full max-w-[95vw] md:w-fit md:max-w-none mx-auto gap-3 sm:gap-6 lg:gap-10 px-2 py-2 rounded-full transition-colors duration-500 ease-out h-[60px] ${
              isMenuOpen 
                ? "bg-transparent"
                : scrolled 
                  ? "bg-white shadow-[0_8px_32px_rgba(0,0,0,0.06)] ring-1 ring-black/5" 
                  : "bg-white shadow-sm ring-1 ring-black/5"
            }`}
          >
            <div className="flex items-center gap-2 sm:gap-3 sm:pl-3 h-full">
              <motion.div 
                whileHover={{ scale: 1.05, rotate: -5 }} 
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center cursor-pointer"
              >
                <Image src="/assets/logo.png" alt="BizEasy Logo" width={150} height={150} className="w-10 h-10 sm:w-11 sm:h-11 drop-shadow-sm" />
              </motion.div>

            </div>
            
            <motion.nav variants={STAGGER} initial="initial" animate="animate" className="hidden md:flex items-center gap-1 px-2 text-[14px] font-semibold text-slate-600 h-full">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onMouseEnter={() => setHoveredLink(link.href)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-4 h-[40px] flex items-center justify-center rounded-full transition-colors hover:text-slate-950 outline-none focus-visible:ring-2 focus-visible:ring-black/20"
                >
                  <span className="relative z-10">{link.label}</span>
                  {hoveredLink === link.href && (
                    <motion.div
                      layoutId="nav-hover"
                      className="absolute inset-0 bg-black/5 rounded-full z-0"
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </a>
              ))}
            </motion.nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3 pr-1 h-full">
              <motion.div 
                whileHover={{ scale: 1.05, backgroundColor: "rgba(0,0,0,0.08)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-1.5 text-slate-600 hover:text-slate-950 cursor-pointer text-[13px] font-semibold transition-colors bg-black/5 px-3 h-[40px] rounded-full"
                aria-label="Change language"
                role="button"
                tabIndex={0}
              >
                <Globe size={16} strokeWidth={2.5} />
                <span>EN</span>
              </motion.div>
              
              <div 
                ref={desktopCtaRef}
                className="overflow-hidden flex items-center h-full origin-right"
                style={{ width: 0, opacity: 0 }}
              >
                <div className="pl-1 h-full flex items-center shrink-0 min-w-max">
                  <motion.button 
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="bg-slate-950 text-white px-5 h-[40px] flex items-center justify-center rounded-full text-[14px] font-semibold tracking-wide shadow-[0_4px_14px_rgba(0,0,0,0.15)] hover:bg-black hover:shadow-[0_6px_20px_rgba(0,0,0,0.2)] transition-all whitespace-nowrap"
                  >
                    Start free on WhatsApp
                  </motion.button>
                </div>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex md:hidden items-center gap-2 h-full">
              <div 
                ref={mobileCtaRef}
                className="overflow-hidden flex items-center h-full origin-right"
                style={{ width: 0, opacity: 0 }}
              >
                <div className="h-full flex items-center shrink-0 min-w-max pl-1">
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-slate-950 text-white px-4 h-[36px] flex items-center justify-center rounded-full text-[13px] font-bold tracking-wide shadow-md hover:bg-black transition-all whitespace-nowrap"
                  >
                    Start free
                  </motion.button>
                </div>
              </div>
              <Component onToggle={(open) => setIsMenuOpen(open)} />
            </div>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
