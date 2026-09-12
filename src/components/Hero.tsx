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

gsap.registerPlugin(ScrollTrigger);

const EXPO_OUT = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export default function Hero({ setStage, stage }: { setStage: (v: number) => void, stage: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStage(0);
    const t1 = setTimeout(() => setStage(1), 1200); // 1.2s of spinning preloader
    const t2 = setTimeout(() => setStage(2), 2600); // Bubble shows for 1.4s then phone/hero expands
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
        scale: 0.94,
        borderBottomLeftRadius: "48px",
        borderBottomRightRadius: "48px",
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
    <div ref={stageRef} className="relative w-full h-[140vh] z-20">
      {/* BACKGROUND LAYER (Sticky) */}
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden flex flex-col items-center justify-start z-0">
        <div 
          ref={bgRef}
          className="w-full h-full origin-top flex flex-col items-center overflow-hidden relative bg-[#f4f5f6]"
        >
          <SilkBlendGradient visible={stage >= 2} />

          {/* STAGE 0: Preloader Logo */}
          <AnimatePresence>
            {stage === 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9, rotate: -90, filter: "blur(10px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.7 }}
                className="absolute inset-0 flex items-center justify-center z-50 pointer-events-none"
              >
                {/* BizEasy Logo Icon - Scaled Up */}
                <div className="w-16 h-16 bg-[#0f172a] rounded-full flex items-center justify-center shadow-2xl">
                  <motion.div 
                    animate={{ rotate: [0, 90, 180, 270, 360] }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-6 h-6 bg-white rounded-sm"
                  />
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
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1.3, y: 0 }}
                transition={{ type: "spring", bounce: 0.2, duration: 0.75 }}
                style={{ willChange: "transform" }}
                className="absolute top-[35%] left-1/2 -translate-x-1/2 bg-white p-4 pr-10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] flex gap-4 items-center w-[300px] z-50 pointer-events-none"
              >
                <HeroNotification />
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 2: Hero Content */}
          <HeroContent stage={stage} />

          {/* STAGE 2: Phone & Notification */}
          <div className="absolute -bottom-10 sm:bottom-0 inset-x-0 h-[55vh] flex justify-center items-end pointer-events-none overflow-hidden sm:overflow-visible">
            <div ref={phoneWrapperRef} className="relative shrink-0 w-[1280px] aspect-[1280/853] -mb-[200px] sm:-mb-[450px]">
              
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
                      <Image 
                        src="/assets/phone-1.png"
                        alt="Hand holding phone"
                        fill
                        className="object-cover object-top filter brightness-110 contrast-125 saturate-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-10 pointer-events-none"
                        priority
                      />
                      <PhoneMockup hideUI={false}>
                        <div />
                      </PhoneMockup>
                    </motion.div>

                    {/* Notification Bubble (Morphs seamlessly) */}
                    <motion.div
                      key="phone-ui"
                      className="absolute inset-0 pointer-events-auto z-20"
                    >
                      <PhoneMockup hideUI={true}>
                        <motion.div
                          layoutId="notification-bubble"
                          transition={{ type: "spring", bounce: 0.2, duration: 0.75 }}
                          style={{ willChange: "transform" }}
                          className="bg-white p-4 pr-10 rounded-2xl shadow-[0_40px_80px_rgba(0,0,0,0.15)] flex gap-4 items-center w-[300px]"
                        >
                          <HeroNotification />
                        </motion.div>
                      </PhoneMockup>
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
