"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

const EXPO_OUT = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export default function HeroContent({ stage }: { stage: number }) {
  
  return (
    <div className="relative pt-[110px] sm:pt-[125px] lg:pt-[130px] w-full flex flex-col items-center z-10 px-4 pointer-events-none">
      
      <motion.div 
        initial="hidden"
        animate={stage >= 2 ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.03, delayChildren: 0.1 } }
        }}
        className="max-w-4xl w-full flex flex-col items-center mb-3.5 sm:mb-4.5 relative z-10"
      >
        {/* Desktop Line 1: "Never lose a WhatsApp" -> Wraps to 2 lines on mobile ("Never lose a" / "WhatsApp") */}
        <div className="flex flex-wrap justify-center items-center gap-x-2.5 sm:gap-x-3.5 gap-y-1 sm:gap-y-0">
          {/* Mobile Line 1: "Never lose a" */}
          <div className="flex flex-nowrap justify-center items-center gap-x-2 sm:gap-x-3">
            {["Never", "lose", "a"].map((word) => (
              <div key={word} className="flex">
                {word.split("").map((char, j) => (
                  <div key={j} className="overflow-hidden pb-2 -mb-2 px-[1px]">
                    <motion.span
                      variants={{
                        hidden: { y: "120%", rotate: 8, opacity: 0 },
                        visible: { y: "0%", rotate: 0, opacity: 1, transition: EXPO_OUT }
                      }}
                      className="text-[44px] xs:text-[48px] sm:text-[60px] lg:text-[72px] font-bold tracking-tighter leading-[1.0] text-white inline-block origin-bottom-left"
                      style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                    >
                      {char}
                    </motion.span>
                  </div>
                ))}
              </div>
            ))}
          </div>
          
          {/* Mobile Line 2, Desktop Line 1 end: "WhatsApp" */}
          <div className="relative flex">
            {/* Glowing Arched Underline */}
            <div className="absolute -bottom-3 sm:-bottom-4 left-0 w-full h-6 sm:h-8 pointer-events-none z-0">
              <svg 
                viewBox="0 0 400 100"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient id="cleanGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#25D366" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#25D366" stopOpacity="1" />
                    <stop offset="100%" stopColor="#128C7E" stopOpacity="0.8" />
                  </linearGradient>
                  <filter id="underGlow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#25D366" floodOpacity="0.8" />
                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#25D366" floodOpacity="0.5" />
                  </filter>
                </defs>
                <motion.path
                  d="M 15 80 Q 200 35 385 80"
                  stroke="url(#cleanGlow)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  fill="none"
                  filter="url(#underGlow)"
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={stage >= 2 ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
                  transition={{ duration: 0.7, delay: 0.9, ease: "easeOut" }}
                  style={{ mixBlendMode: "screen" }}
                />
              </svg>
            </div>

            {"WhatsApp".split("").map((char, j) => (
              <div key={j} className="overflow-hidden pb-2 -mb-2 px-[1px] relative z-10">
                <motion.span
                  variants={{
                    hidden: { y: "120%", rotate: 8, opacity: 0 },
                    visible: { y: "0%", rotate: 0, opacity: 1, transition: EXPO_OUT }
                  }}
                  className="text-[44px] xs:text-[48px] sm:text-[60px] lg:text-[72px] font-bold tracking-tighter leading-[1.0] text-white inline-block origin-bottom-left"
                  style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                >
                  {char}
                </motion.span>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Line 3, Desktop Line 2: "order again." */}
        <div className="flex flex-nowrap justify-center items-center gap-x-2 sm:gap-x-3 mt-1 sm:mt-2 lg:mt-2.5">
          {["order", "again."].map((word) => (
            <div key={word} className="flex">
              {word.split("").map((char, j) => (
                <div key={j} className="overflow-hidden pb-2 -mb-2 px-[1px]">
                  <motion.span
                    variants={{
                      hidden: { y: "120%", rotate: 8, opacity: 0 },
                      visible: { y: "0%", rotate: 0, opacity: 1, transition: EXPO_OUT }
                    }}
                    className="text-[44px] xs:text-[48px] sm:text-[60px] lg:text-[72px] font-bold tracking-tighter leading-[1.0] text-white inline-block origin-bottom-left"
                    style={{ fontFamily: 'var(--font-outfit), sans-serif' }}
                  >
                    {char}
                  </motion.span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-white/80 text-sm sm:text-base lg:text-[17px] max-w-[540px] mx-auto font-medium text-center mt-1 mb-4 sm:mb-5 leading-relaxed relative z-10"
      >
        We automate your WhatsApp ordering, UPI payments, and GST invoicing without limits, for a fixed price.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="pointer-events-auto flex flex-col items-center gap-2.5 relative z-10"
      >
        {/* Primary CTA */}
        <button className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-white text-[#0f172a] font-bold rounded-full text-sm sm:text-base shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_50px_rgba(255,255,255,0.35)] transition-all duration-300 hover:-translate-y-0.5 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
          </svg>
          Start free on WhatsApp
        </button>

        {/* Trust Strip */}
        <div className="flex items-center gap-2.5 opacity-90">
          <div className="flex -space-x-2.5">
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                className="w-7 h-7 sm:w-7.5 sm:h-7.5 rounded-full border-[2px] border-[#02006F] flex items-center justify-center bg-gray-200 overflow-hidden shadow-sm"
                style={{ zIndex: 5 - i }}
              >
                 <img src={`https://i.pravatar.cc/100?img=${i+42}`} alt="Seller" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div className="flex flex-col text-white/90 text-xs sm:text-sm font-medium">
            <span className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                ))}
              </div>
              <span className="font-bold">4.9/5</span>
            </span>
            <span className="text-white/70 text-[11px] sm:text-xs">Trusted by 10,000+ Indian Sellers</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}