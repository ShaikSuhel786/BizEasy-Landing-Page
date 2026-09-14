"use client";

import { useEffect, useRef, useState } from "react";
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

const EXPO_OUT = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export default function Hero({ setStage, stage }: { setStage: (v: number) => void, stage: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);
  const [notifDismissed, setNotifDismissed] = useState(false);

  useEffect(() => {
    setStage(0);
    const t1 = setTimeout(() => setStage(1), 1200);
    const t2 = setTimeout(() => setStage(2), 2600);
    return () => { 
      clearTimeout(t1); 
      clearTimeout(t2); 
    };
  }, [setStage]);

  useEffect(() => {
    if (stage === 2) {
      setNotifDismissed(false);
      const t = setTimeout(() => setNotifDismissed(true), 3500);
      return () => clearTimeout(t);
    }
  }, [stage]);

  const notifVisible = stage === 2 && !notifDismissed;

  useGSAP(() => {
    if (stage === 2) {
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.94,
        borderBottomLeftRadius: "64px",
        borderBottomRightRadius: "64px",
        ease: "none"
      });

      // 2. Parallax Phone/Hand
      gsap.to(phoneWrapperRef.current, {
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        y: -150,
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
          className="w-full origin-top flex flex-col items-center overflow-hidden relative bg-[#f4f5f6] min-h-[100vh]"
        >
          <SilkBlendGradient visible={stage >= 2} />

          {/* STAGE 0: Preloader Logo */}
          <AnimatePresence>
            {stage === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
                className="absolute top-[45vh] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center z-50 pointer-events-none"
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
                      transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                      className="origin-center"
                    />
                  </svg>

                  {/* Brand Logo Breathing - Pure CSS for 100% Instant Availability */}
                  <motion.div 
                    animate={{ scale: [0.97, 1.03, 0.97] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                    className="w-[84px] h-[84px] relative drop-shadow-[0_10px_20px_rgba(65,85,229,0.4)] z-10  rounded-[22px] flex items-center justify-center overflow-hidden"
                  >
                    {/* The "B" Letter */}
                    <Image src="/assets/logo.png" alt="BizEasy Logo" width={250} height={250} className="w-13 h-13 sm:w-14 sm:h-14 drop-shadow-sm" />
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 1: Big Notification Bubble */}
          <AnimatePresence>
            {stage === 1 && (
              <motion.div
                key="stage1-bubble"
                layoutId="notification-bubble"
                initial={{ opacity: 0, scale: 0.95, y: 50 }}
                animate={{ opacity: 1, scale: 1.3, y: 0 }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.9 }}
                style={{ willChange: "transform" }}
                className="absolute top-[50vh] left-1/2 -translate-x-1/2 bg-white p-4 pr-6 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] flex gap-4 items-center w-[250px] h-fit z-50 pointer-events-none"
              >
                <HeroNotification />
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 2: Hero Content */}
          <HeroContent stage={stage} />

          {/* STAGE 2: Phone & Notification */}
          <div className="relative w-full flex justify-center items-start pointer-events-none overflow-visible mt-4 sm:mt-5 lg:-mt-6 mb-[-60px] sm:mb-[-100px] lg:mb-[-160px]">
            <div ref={phoneWrapperRef} className="relative shrink-0 w-[760px] sm:w-[860px] lg:w-[960px] aspect-[1280/853]">
              {/* Hand Holding Phone Asset */}
              <AnimatePresence>
                {stage >= 2 && (
                  <div className="absolute inset-0 z-40 pointer-events-none">
                    {/* Background Phone Image & Status Bar (Fades in) */}
                    <motion.div
                      key="phone-bg"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.5, ease: "easeOut" }}
                      className="absolute inset-0 pointer-events-none z-10"
                    >
                      <PhoneMockup hideUI={false}>
                        <WhatsAppChat />
                      </PhoneMockup>
                      <Image 
                        src="/assets/phone-frame-v2.png"
                        alt="Hand holding phone"
                        fill
                        className="object-cover object-top filter brightness-110 contrast-125 saturate-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                        priority
                      />
                    </motion.div>

                    {/* Notification — morphs from Stage 1 banner, stays for 3.5s, then fades out */}
                    <AnimatePresence>
                      {notifVisible && (
                        <motion.div
                          key="phone-notif"
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
                          className="absolute inset-0 pointer-events-none z-20"
                        >
                          <PhoneMockup hideUI={true}>
                            <motion.div
                              layoutId="notification-bubble"
                              transition={{ type: "spring", bounce: 0.25, duration: 0.8 }}
                              style={{ willChange: 'transform' }}
                              className="w-full pt-[12.5cqw] px-1.5"
                            >
                              {/* iOS notification banner — WA green icon + order summary */}
                              <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.22)] border border-black/5 overflow-hidden">
                                <div className="flex items-center gap-2 px-2.5 py-2">
                                  <div className="w-7 h-7 bg-[#25D366] rounded-[8px] flex items-center justify-center shrink-0 shadow-xs">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                                    </svg>
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between mb-0.5">
                                      <span className="text-[9px] font-bold text-gray-500 uppercase tracking-wide">WhatsApp</span>
                                      <span className="text-[8.5px] text-gray-400">now</span>
                                    </div>
                                    <p className="text-[11px] font-bold text-gray-900 leading-tight">New order received 🛍️</p>
                                    <p className="text-[9.5px] text-gray-600 truncate">Rahul M. · Blue Kurti × 1 · ₹900</p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </PhoneMockup>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
