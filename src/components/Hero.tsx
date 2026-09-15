"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import SilkBlendGradient from "./ui/SilkBlendGradient";
import HeroNotification from "./HeroNotification";
import HeroContent from "./HeroContent";
import { PhoneMockup } from "./PhoneMockup";
import WhatsAppChat from "./WhatsAppChat";

gsap.registerPlugin(ScrollTrigger);

export default function Hero({ setStage, stage }: { setStage: (v: number) => void, stage: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);


  useEffect(() => {
    setStage(0);
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2600);
    return () => { 
      clearTimeout(t1); 
      clearTimeout(t2); 
    };
  }, [setStage]);



  useGSAP(() => {
    if (stage === 2) {
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.95,
        ease: "none"
      });

      // 2. Parallax Phone/Hand with direct scrub
      gsap.to(phoneWrapperRef.current, {
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -140,
        ease: "none"
      });
    }
  }, { scope: stageRef, dependencies: [stage] });

  return (
    <div ref={stageRef} className="relative w-full z-20">
      {/* BACKGROUND LAYER */}
      <div className="relative w-full flex flex-col items-center justify-start z-0">
        <div 
          ref={bgRef}
          className="w-full origin-top flex flex-col items-center overflow-hidden relative bg-[#f4f5f6] min-h-[100vh] rounded-b-[48px] sm:rounded-b-[64px] will-change-transform"
        >
          <SilkBlendGradient visible={stage >= 2} />

          {/* STAGE 0: Preloader Logo */}
          <AnimatePresence>
            {stage === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, filter: "blur(6px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.96, filter: "blur(6px)" }}
                transition={{ type: "spring", bounce: 0.15, duration: 0.7 }}
                className="absolute top-[45vh] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-50 pointer-events-none transform-gpu will-change-[filter,transform,opacity]"
                style={{ transform: 'translateZ(0)' }}
              >
                <div className="relative flex items-center justify-center">
                  {/* Glowing background blur */}
                  <div className="absolute inset-0 bg-blue-500/20 blur-[40px] rounded-full scale-150" />
                  
                  {/* Sleek SVG Ring Spinner */}
                  <svg className="absolute w-[180px] h-[180px] -rotate-90 pointer-events-none">
                    <defs>
                      <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#2563EB" />
                        <stop offset="50%" stopColor="#3B82F6" stopOpacity="0.5" />
                        <stop offset="100%" stopColor="#93C5FD" stopOpacity="0" />
                      </linearGradient>
                      <filter id="glow">
                        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                        <feMerge>
                          <feMergeNode in="coloredBlur"/>
                          <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                      </filter>
                    </defs>
                    <motion.circle
                      cx="90"
                      cy="90"
                      r="60"
                      fill="none"
                      stroke="url(#ring-gradient)"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      filter="url(#glow)"
                      initial={{ strokeDasharray: "0 400" }}
                      animate={{ strokeDasharray: ["0 400", "200 400"], rotate: 360 }}
                      transition={{ duration: 1.4, repeat: Infinity, ease: "linear" }}
                      className="origin-center"
                    />
                  </svg>

                  {/* Brand Logo Breathing */}
                  <motion.div 
                    animate={{ scale: [0.98, 1.02, 0.98] }}
                    transition={{ repeat: Infinity, duration: 2.2, ease: "easeInOut" }}
                    className="w-[84px] h-[84px] relative drop-shadow-[0_10px_20px_rgba(65,85,229,0.4)] z-10 rounded-[22px] flex items-center justify-center overflow-hidden"
                  >
                    {/* The "B" Letter */}
                    <Image src="/assets/logo.png" alt="BizEasy Logo" width={250} height={250} className="w-13 h-13 sm:w-14 sm:h-14 drop-shadow-sm" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 1: Big Floating Order Notification Bubble in Hero Center */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.div
                key="stage1-bubble"
                layoutId="hero-chat-message-bubble"
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                animate={{ opacity: 1, scale: 1.25, y: 0 }}
                transition={{ type: "spring", stiffness: 120, damping: 18, mass: 0.8 }}
                style={{ willChange: "transform" }}
                className="absolute top-[48vh] left-1/2 -translate-x-1/2 bg-white p-4 pr-6 rounded-2xl shadow-[0_30px_70px_rgba(0,0,0,0.15)] flex gap-4 items-center w-[260px] sm:w-[280px] h-fit z-50 pointer-events-none select-none border border-black/5"
              >
                <HeroNotification />
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 2: Hero Content */}
          <HeroContent stage={stage} />

          {/* STAGE 2: Phone Mockup */}
          <div className="relative w-full flex justify-center items-start pointer-events-none overflow-visible -mt-8 sm:-mt-10 lg:-mt-14 mb-[-60px] sm:mb-[-100px] lg:mb-[-160px]">
            <div ref={phoneWrapperRef} className="relative shrink-0 w-[760px] sm:w-[860px] lg:w-[960px] aspect-[1280/853] will-change-transform">
              {/* Hand Holding Phone Asset */}
              <AnimatePresence>
                {stage >= 2 && (
                  <div className="absolute inset-0 z-10 pointer-events-none">
                    {/* Background Phone Image & Status Bar (Fades in) */}
                    <motion.div
                      key="phone-bg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 pointer-events-none z-10"
                    >
                      <PhoneMockup hideUI={false}>
                        <div className="relative w-full h-full">
                          <WhatsAppChat />
                        </div>
                      </PhoneMockup>
                      <Image 
                        src="/assets/phone-frame-v2.png"
                        alt="Hand holding phone"
                        fill
                        className="object-cover object-top filter brightness-110 contrast-125 saturate-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                        priority
                      />
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
