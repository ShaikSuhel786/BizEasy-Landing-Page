"use client";

import { motion } from "motion/react";

const EXPO_OUT = { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] };

export default function HeroContent({ stage }: { stage: number }) {
  return (
    <div className="absolute top-[12%] sm:top-[15%] inset-x-0 flex flex-col items-center z-10 px-4 pointer-events-none">
      <div className="overflow-hidden mb-2">
        <motion.h1 
          initial={{ y: 150 }}
          animate={stage >= 2 ? { y: 0 } : { y: 150 }}
          transition={{ ...EXPO_OUT, delay: 0.1 }}
          className="font-fraunces text-[56px] sm:text-[80px] lg:text-[100px] font-black tracking-tight leading-[0.95] text-white"
        >
          Never lose a
        </motion.h1>
      </div>
      <div className="overflow-hidden mb-6">
        <motion.h1 
          initial={{ y: 150 }}
          animate={stage >= 2 ? { y: 0 } : { y: 150 }}
          transition={{ ...EXPO_OUT, delay: 0.15 }}
          className="font-fraunces text-[56px] sm:text-[80px] lg:text-[100px] font-black tracking-tight leading-[0.95] text-white"
        >
          WhatsApp order.
        </motion.h1>
      </div>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={stage >= 2 ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-white text-lg sm:text-xl max-w-[600px] mx-auto font-medium text-center mt-2"
      >
        We automate your WhatsApp ordering, UPI payments, and GST invoicing without limits, for a fixed price.
      </motion.p>
    </div>
  );
}
