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
      { opacity: 0.15 },
      {
        opacity: 1,
        stagger: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
          end: "bottom 70%",
          scrub: true,
        }
      }
    );
  }, { scope: containerRef });

  const splitWords = text.split(" ").map((word, i) => (
    <span key={i} className="word inline-block mr-[0.25em] font-fraunces font-black text-slate-950 will-change-[opacity]">
      {word}
    </span>
  ));

  return (
    <section ref={containerRef} id="how-it-works" className="py-24 md:py-40 bg-white flex items-center justify-center relative z-20 scroll-mt-20">
      <div className="max-w-[1100px] mx-auto px-6 md:px-12 text-center md:text-left">
        <h2 ref={textRef} className="text-[32px] sm:text-[48px] md:text-[64px] lg:text-[76px] font-black tracking-tighter leading-[1.05]">
          {splitWords}
        </h2>
      </div>
    </section>
  );
}
