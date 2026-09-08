"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SPRING_SNAPPY = { type: "spring" as const, stiffness: 400, damping: 30 };

function Nav({ stage }: { stage: number }) {
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
          transition={{ ...SPRING_SNAPPY, delay: 0.2 }}
          className="fixed top-5 left-0 right-0 z-[100] flex justify-center pointer-events-none px-4"
        >
          <div className={`pointer-events-auto flex items-center justify-between w-fit mx-auto gap-4 sm:gap-8 px-2 py-2 rounded-full transition-all duration-300 ${
            scrolled 
              ? "bg-white/95 border border-black/[0.08] backdrop-blur-xl shadow-[0_12px_36px_-4px_rgba(17,21,34,0.08)]" 
              : "bg-white/90 border border-black/[0.06] backdrop-blur-lg shadow-[0_8px_24px_-4px_rgba(17,21,34,0.05)]"
          }`}>
            <div className="flex items-center gap-2 pl-4">
              <div className=" text-white text-xs font-bold px-1.5 py-0.5 rounded-sm">
                  <img src="../../assets/logo.png" alt="" className="w-10 h-10" />
              </div>
              <span className="font-bold text-[var(--neutral-ink-950)] text-lg tracking-tight">BizEasy</span>
            </div>
            
            <nav className="hidden md:flex items-center gap-6 px-4 text-[15px] font-medium text-[var(--neutral-ink-900)]">
              <a href="#how-it-works" className="hover:text-black transition-colors">How it works</a>
              <a href="#features" className="hover:text-black transition-colors">Features</a>
              <a href="#customers" className="hover:text-black transition-colors">Customers</a>
              <a href="#pricing" className="hover:text-black transition-colors">Pricing</a>
            </nav>

            <button className="bg-black text-white px-5 py-2.5 rounded-full text-[15px] font-medium tracking-tight hover:scale-105 active:scale-95 transition-all">
              Start today
            </button>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}

function Hero({ setStage, stage }: { setStage: (v: number) => void, stage: number }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const phoneWrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Stage 0 -> 1: Show notification after 1.5s
    const t1 = setTimeout(() => setStage(1), 1500);
    // Stage 1 -> 2: Snap background and show content after 2.8s
    const t2 = setTimeout(() => setStage(2), 2800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [setStage]);

  useGSAP(() => {
    if (stage === 2) {
      // 1. Background Scale and Curve
      gsap.to(bgRef.current, {
        scrollTrigger: {
          trigger: stageRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
        scale: 0.94,
        borderRadius: "48px",
        ease: "none"
      });

      // 2. Parallax Phone/Hand
      // Phone moves up relative to the background when scrolling down
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
      {/* 
        Container is 140vh to provide enough scrolling room for the GSAP animation 
        before the next section scrolls into view.
      */}
      
      {/* BACKGROUND LAYER (Sticky) */}
      <div className="sticky top-0 w-full h-[100vh] overflow-hidden flex flex-col items-center justify-start z-0">
        <div 
          ref={bgRef}
          className={`w-full h-full origin-top transition-colors duration-200 flex flex-col items-center overflow-hidden relative ${
            stage >= 2 ? "bg-[var(--color-brand-primary)]" : "bg-[#f4f5f6]"
          }`}
        >
          {/* subtle radial gradient for depth */}
          {stage >= 2 && (
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-[600px] z-0"
              style={{
                background: "radial-gradient(ellipse 70% 50% at 50% -10%, rgba(255,255,255,0.1) 0%, transparent 80%)",
              }}
            />
          )}

          {/* STAGE 0: Loading Spinner */}
          <AnimatePresence>
            {stage === 0 && (
              <motion.div 
                key="loader"
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="w-10 h-10 border-4 border-gray-200 border-t-gray-800 rounded-full animate-spin" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* STAGE 2: Hero Content */}
          <div className="absolute top-[20%] inset-x-0 flex flex-col items-center z-10 px-4 pointer-events-none">
            <div className="overflow-hidden mb-2">
              <motion.h1 
                initial={{ y: 150 }}
                animate={stage >= 2 ? { y: 0 } : { y: 150 }}
                transition={{ ...SPRING_SNAPPY, delay: 0.1 }}
                className="font-fraunces text-[56px] sm:text-[80px] lg:text-[100px] font-black tracking-tighter leading-[0.95] text-white"
              >
                Never lose a
              </motion.h1>
            </div>
            <div className="overflow-hidden mb-6">
              <motion.h1 
                initial={{ y: 150 }}
                animate={stage >= 2 ? { y: 0 } : { y: 150 }}
                transition={{ ...SPRING_SNAPPY, delay: 0.15 }}
                className="font-fraunces text-[56px] sm:text-[80px] lg:text-[100px] font-black tracking-tighter leading-[0.95] text-white"
              >
                WhatsApp order.
              </motion.h1>
            </div>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-white/90 text-lg sm:text-xl max-w-[600px] mx-auto font-medium text-center"
            >
              We automate your WhatsApp ordering, UPI payments, and GST invoicing without limits, for a fixed price.
            </motion.p>
          </div>

          {/* STAGE 1 & 2: Phone & Notification */}
          <div className="absolute bottom-0 inset-x-0 h-[60vh] flex justify-center items-end pointer-events-none">
            <div ref={phoneWrapperRef} className="relative w-full max-w-[1280px] h-[853px] -mb-[400px]">
              
              {/* Notification Bubble */}
              <AnimatePresence>
                {stage >= 1 && (
                  <motion.div
                    key="notification"
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={
                      stage >= 2 
                        ? { opacity: 1, y: [0, -8, 0], scale: 1, transition: { duration: 0.4, ease: "easeOut" } } 
                        : { opacity: 1, y: 0, scale: 1, transition: SPRING_SNAPPY }
                    }
                    className="absolute top-[340px] left-1/2 -translate-x-1/2 z-50 bg-white p-4 pr-10 rounded-[28px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] flex gap-4 items-center w-[300px]"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shrink-0">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium mb-0.5">WhatsApp Commerce</p>
                      <p className="text-[15px] font-bold text-gray-900 leading-tight">New order received</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Hand Holding Phone Asset */}
              <AnimatePresence>
                {stage >= 2 && (
                  <motion.div
                    key="phone-image"
                    initial={{ y: 500 }}
                    animate={{ y: 0 }}
                    transition={{ type: "spring", stiffness: 350, damping: 35, mass: 1 }}
                    className="absolute inset-0 z-40"
                  >
                    <Image 
                      src="/assets/phone-1.png"
                      alt="Hand holding phone"
                      fill
                      className="object-cover object-top"
                      priority
                    />
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function LandingPage() {
  const [stage, setStage] = useState(0);

  return (
    <main className="relative min-h-screen bg-white">
      <Nav stage={stage} />
      <Hero stage={stage} setStage={setStage} />
      
      {/* Dummy Section to allow scrolling and parallax reveal */}
      <div className="relative bg-white z-10 w-full min-h-screen border-t border-[var(--color-border-default)]">
        <div className="max-w-[1280px] mx-auto px-5 py-32 flex flex-col gap-12">
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 opacity-50 pb-16 border-b">
            {/* Fake logos representing SocialProofStrip */}
            <div className="h-10 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 bg-slate-200 rounded animate-pulse" />
            <div className="h-10 bg-slate-200 rounded animate-pulse" />
          </div>

          <div className="max-w-2xl">
            <h2 className="text-4xl font-bold tracking-tight mb-4 text-black">
              Everything you need, <br />in one WhatsApp tab.
            </h2>
            <p className="text-lg text-gray-500">
              The dummy sections have been placed here to verify the GSAP scroll 
              overlapping logic. When you scroll past the hero, the hand should smoothly
              parallax upwards while the blue container shrinks and curves underneath.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
