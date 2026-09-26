"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";
import { ArrowRight } from "lucide-react";
import { TwitterLogo, LinkedinLogo, InstagramLogo } from "@phosphor-icons/react";

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const containerRef = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !innerRef.current || !textRef.current || !labelRef.current || !buttonRef.current || !gridRef.current) return;

    // Split text into words for a staggered mask reveal
    const split = new SplitType(textRef.current, { types: 'words' });
    
    // Wrap words in overflow-hidden for the mask effect
    split.words?.forEach(word => {
      const wrapper = document.createElement('div');
      wrapper.style.overflow = 'hidden';
      wrapper.style.display = 'inline-block';
      wrapper.style.verticalAlign = 'bottom';
      word.parentNode?.insertBefore(wrapper, word);
      wrapper.appendChild(word);
    });

    const ctx = gsap.context(() => {
      // 1. Parallax scrub so the footer slides out from under the main content
      gsap.fromTo(
        innerRef.current,
        { y: "-40%" }, // Starts tucked under
        {
          y: "0%",
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom", // when the footer first enters the bottom of viewport
            end: "bottom bottom", // when the footer is fully visible
            scrub: true,
          }
        }
      );

      // 2. Storytelling Reveal Timeline (Triggers once when footer is mostly visible)
      const revealTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 60%", // Triggers when the sticky footer is mostly visible
          toggleActions: "play none none reverse",
        }
      });

      // Sequence: Label -> Massive Text -> Button -> Grid Links
      revealTl
        .fromTo(labelRef.current, 
          { opacity: 0, y: 30, scale: 0.9 }, 
          { opacity: 1, y: 0, scale: 1, duration: 0.8, ease: "back.out(1.5)" }
        )
        .fromTo(split.words, 
          { y: "120%", rotateX: -45, opacity: 0 }, 
          { y: "0%", rotateX: 0, opacity: 1, duration: 1, stagger: 0.1, ease: "expo.out" },
          "-=0.4"
        )
        .fromTo(buttonRef.current, 
          { opacity: 0, y: 40, scale: 0.8 }, 
          { opacity: 1, y: 0, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
          "-=0.6"
        )
        .fromTo(gridRef.current, 
          { opacity: 0, y: 40 }, 
          { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
          "-=0.8"
        );
        
    }, containerRef);

    return () => {
      ctx.revert();
      split.revert();
    };
  }, []);

  return (
    <footer ref={containerRef} className="relative bg-zinc-950 text-white overflow-hidden w-full origin-bottom">
      <div ref={innerRef} className="w-full h-full relative pt-24 md:pt-32 pb-12">
        {/* Absolute Noise overlay for premium feel */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
          style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
        ></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col items-center justify-center text-center w-full max-w-6xl mx-auto mb-32 md:mb-48">
            
            <div ref={labelRef} className="mb-8 px-4 py-2 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm">
              <span className="text-sm font-medium tracking-widest uppercase text-zinc-300">The Next Era of Commerce</span>
            </div>

            <h2 
              ref={textRef} 
              className="text-[clamp(3rem,8vw,9rem)] leading-[0.95] font-medium tracking-tight mb-16 overflow-hidden pb-4"
            >
              Turn chats into customers.
            </h2>
            
            <button ref={buttonRef} className="cursor-pointer group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-white text-zinc-950 rounded-full overflow-hidden hover:scale-[1.02] transition-transform duration-500 ease-out shadow-[0_0_40px_rgba(255,255,255,0.2)]">
              <span className="relative z-10 text-xl font-medium tracking-tight">Start Automating Free</span>
              <span className="relative z-10 bg-zinc-100 p-2.5 rounded-full group-hover:bg-zinc-200 transition-colors duration-200">
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1.5 transition-transform duration-300 ease-out" />
              </span>
            </button>
          </div>

          <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pt-16 border-t border-white/10">
            <div className="col-span-1 lg:col-span-2">
              <div className="text-3xl font-semibold tracking-tighter mb-6">BizEasy.</div>
              <p className="text-zinc-400 max-w-sm mb-8 text-lg">
                Automate your WhatsApp commerce and scale your business without the friction. Built for the modern seller.
              </p>
              <div className="flex gap-4">
                <a href="#" className="cursor-pointer w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:text-white text-zinc-400 hover:scale-110">
                  <TwitterLogo className="w-6 h-6" />
                </a>
                <a href="#" className="cursor-pointer w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:text-white text-zinc-400 hover:scale-110">
                  <InstagramLogo className="w-6 h-6" />
                </a>
                <a href="#" className="cursor-pointer w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-all duration-300 hover:text-white text-zinc-400 hover:scale-110">
                  <LinkedinLogo className="w-6 h-6" />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium mb-6 text-zinc-100 uppercase tracking-widest text-xs">Product</h4>
              <ul className="space-y-4">
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Features</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Pricing</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Integrations</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Changelog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-6 text-zinc-100 uppercase tracking-widest text-xs">Resources</h4>
              <ul className="space-y-4">
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Documentation</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Help Center</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Community</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Blog</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-medium mb-6 text-zinc-100 uppercase tracking-widest text-xs">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">About</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Privacy</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Terms</a></li>
                <li><a href="#" className="cursor-pointer text-zinc-400 hover:text-white transition-colors duration-200 inline-block hover:translate-x-1 transform">Contact</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-zinc-500">
            <p>© {new Date().getFullYear()} BizEasy. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="cursor-pointer hover:text-zinc-300 transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="cursor-pointer hover:text-zinc-300 transition-colors duration-200">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
