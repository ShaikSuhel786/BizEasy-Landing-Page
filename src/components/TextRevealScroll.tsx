"use client";

import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function TextRevealScroll({ text }: { text: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);

  useGSAP(() => {
    if (!textRef.current) return;
    const words = textRef.current.querySelectorAll('.word');
    
    gsap.fromTo(words, 
      { color: "#e5e7eb" }, // Very light grey (matches the hidden state)
      {
        color: "#0f172a", // Solid slate-950 (BizEasy brand dark text)
        stagger: 0.5,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
          end: "bottom 75%",
          scrub: 0.8,
        }
      }
    );
  }, { scope: containerRef });

  const splitWords = text.split(" ").map((word, i) => (
    <span key={i} className="word inline-block mr-[0.25em] font-fraunces font-black will-change-[color]">
      {word}
    </span>
  ));

  return (
    <section ref={containerRef} className="py-24 md:py-40 bg-white flex items-center justify-center relative z-20">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center md:text-left">
        <h2 ref={textRef} className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[76px] font-black tracking-tighter leading-[1.05]">
          {splitWords}
        </h2>
      </div>
    </section>
  );
}
