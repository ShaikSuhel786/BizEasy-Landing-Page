"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function EcosystemNarrative() {
  const containerRef = useRef<HTMLDivElement>(null);
  const bgBaseRef = useRef<HTMLDivElement>(null);
  const bgWaRef = useRef<HTMLDivElement>(null);
  const bgDarkRef = useRef<HTMLDivElement>(null);
  const patternRef = useRef<HTMLDivElement>(null);

  // Scene Refs
  const scene1Ref = useRef<HTMLDivElement>(null);
  const zoomTargetRef = useRef<HTMLDivElement>(null);
  
  const scene2Ref = useRef<HTMLDivElement>(null);
  const scene3Ref = useRef<HTMLDivElement>(null);

  // New refs for micro-interactions
  const chartPathRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const numberRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // === ENTRANCE TIMELINE (Scrubbed, plays proportionally as you scroll down to it) ===
    const entranceTl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%", // Start animating when the section is 85% down the viewport
        end: "top 25%",   // Finish animating before it pins
        scrub: 1,
      }
    });

    entranceTl.fromTo('.reveal-text-1',
      { y: '120%', opacity: 0, rotationZ: 3 },
      { y: '0%', opacity: 1, rotationZ: 0, duration: 1, stagger: 0.2, ease: "power2.out" }
    );
    
    entranceTl.fromTo(zoomTargetRef.current,
      { opacity: 0, scale: 0.8, y: 40 },
      { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.2)" },
      "<0.2"
    );

    // === MAIN SCRUB TIMELINE (Pins and orchestrates the rest) ===
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=3500",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Extremely short hold to absorb the pin safely without feeling frozen
    tl.to({}, { duration: 0.1 });

    // === SCENE 1 to 2: The WhatsApp Zoom ===
    tl.to(zoomTargetRef.current, {
      scale: 25, 
      opacity: 0, 
      duration: 2,
      ease: "power2.inOut",
      force3D: true,
    });
    
    tl.to(scene1Ref.current, { opacity: 0, duration: 1 }, "<0.2");

    // Fade to Native WhatsApp Chat Background (#efeae2) + Pattern
    tl.to(bgWaRef.current, { opacity: 1, duration: 0.8 }, "-=1");
    tl.to(patternRef.current, { opacity: 0.08, duration: 0.8 }, "<");

    // Fade in Scene 2 (Native WhatsApp UI)
    tl.fromTo(scene2Ref.current, 
      { opacity: 0, y: 50 }, 
      { opacity: 1, y: 0, duration: 1 }, 
      "-=0.2"
    );

    // Text Reveal for Scene 2
    tl.fromTo('.reveal-text-2',
      { y: '120%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=0.8"
    );

    // 21st.dev Style Premium Chat Bubble Stagger
    tl.fromTo('.wa-bubble', 
      { opacity: 0, y: 30, scale: 0.9 }, 
      { opacity: 1, y: 0, scale: 1, duration: 0.8, stagger: 0.2, ease: "back.out(1.2)" },
      "-=0.4"
    );

    // Hold Scene 2 for reading
    tl.to({}, { duration: 1.5 });

    // === SCENE 2 to 3: Chat to Dashboard ===
    // Zoom/fade out the WhatsApp UI and pattern
    tl.to(scene2Ref.current, { opacity: 0, scale: 1.1, duration: 1.2 });
    tl.to(patternRef.current, { opacity: 0, duration: 1 }, "<");

    // Fade background to rich dark mode for the Dashboard
    tl.to(bgDarkRef.current, { opacity: 1, duration: 1.2 }, "<");

    // Slide in the Seller Dashboard (Clean Bento Grid)
    tl.fromTo(scene3Ref.current, 
      { opacity: 0, y: 40 }, 
      { opacity: 1, y: 0, duration: 1.2 }, 
      "-=0.8"
    );

    // Text Reveal for Scene 3
    tl.fromTo('.reveal-text-3',
      { y: '120%', opacity: 0 },
      { y: '0%', opacity: 1, duration: 1, stagger: 0.1, ease: "power3.out" },
      "-=0.8"
    );

    // 21st.dev Style 3D Bento Flip Reveal
    tl.fromTo('.bento-item', 
      { opacity: 0, y: 50, rotationX: -15, scale: 0.95 }, 
      { opacity: 1, y: 0, rotationX: 0, scale: 1, duration: 1.2, stagger: 0.15, ease: "power3.out" }, 
      "-=0.6"
    );

    // Elegant chart reveal (scrubbed, revealing whole SVG left-to-right)
    tl.fromTo(chartPathRef.current, 
      { clipPath: "inset(0 100% 0 0)" },
      { clipPath: "inset(0 0% 0 0)", duration: 2, ease: "power2.inOut" }, 
      "-=0.6"
    );

  }, { scope: containerRef });

  return (
    // Background starts light to contrast the Hero card scaling down, revealing this underneath
    <section ref={containerRef} className="relative w-full h-[100dvh] overflow-hidden">
      <div ref={bgBaseRef} className="absolute inset-0 bg-[#f4f5f6]"></div>
      <div ref={bgWaRef} className="absolute inset-0 bg-[#efeae2] opacity-0 will-change-opacity"></div>
      <div ref={bgDarkRef} className="absolute inset-0 bg-[#050505] opacity-0 will-change-opacity"></div>
      
      {/* WhatsApp Native Doodle Pattern (Hidden initially, revealed in Scene 2) */}
      <div 
        ref={patternRef} 
        className="absolute inset-0 opacity-0 pointer-events-none" 
        style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: "400px" }}
      ></div>

      {/* ================= SCENE 1: The Hook & WhatsApp Zoom ================= */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none px-4">
        <div ref={scene1Ref} className="text-center flex flex-col items-center">
          <h2 className="text-[clamp(2.5rem,6vw,5.5rem)] font-bold tracking-tight text-[#111b21] leading-[1.05]">
            <div className="overflow-hidden py-1">
              <div className="reveal-text-1">
                Stop being a full-time
              </div>
            </div>
            <div className="overflow-hidden py-1">
              <div className="reveal-text-1 text-black/40">
                chat operator.
              </div>
            </div>
          </h2>
        </div>
        
        {/* The Exact WhatsApp Logo Provided */}
        <div className="mt-12 md:mt-20 relative flex items-center justify-center">
          <div 
            ref={zoomTargetRef} 
            className="w-24 h-24 md:w-32 md:h-32 flex items-center justify-center relative z-10 origin-center will-change-transform"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 360 362" className="w-full h-full drop-shadow-xl">
              <path fill="#25D366" fillRule="evenodd" d="M307.546 52.566C273.709 18.684 228.706.017 180.756 0 81.951 0 1.538 80.404 1.504 179.235c-.017 31.594 8.242 62.432 23.928 89.609L0 361.736l95.024-24.925c26.179 14.285 55.659 21.805 85.655 21.814h.077c98.788 0 179.21-80.413 179.244-179.244.017-47.898-18.608-92.926-52.454-126.807v-.008Zm-126.79 275.788h-.06c-26.73-.008-52.952-7.194-75.831-20.765l-5.44-3.231-56.391 14.791 15.05-54.981-3.542-5.638c-14.912-23.721-22.793-51.139-22.776-79.286.035-82.14 66.867-148.973 149.051-148.973 39.793.017 77.198 15.53 105.328 43.695 28.131 28.157 43.61 65.596 43.593 105.398-.035 82.149-66.867 148.982-148.982 148.982v.008Zm81.719-111.577c-4.478-2.243-26.497-13.073-30.606-14.568-4.108-1.496-7.09-2.243-10.073 2.243-2.982 4.487-11.568 14.577-14.181 17.559-2.613 2.991-5.226 3.361-9.704 1.117-4.477-2.243-18.908-6.97-36.02-22.226-13.313-11.878-22.304-26.54-24.916-31.027-2.613-4.486-.275-6.91 1.959-9.136 2.011-2.011 4.478-5.234 6.721-7.847 2.244-2.613 2.983-4.486 4.478-7.469 1.496-2.991.748-5.603-.369-7.847-1.118-2.243-10.073-24.289-13.812-33.253-3.636-8.732-7.331-7.546-10.073-7.692-2.613-.13-5.595-.155-8.586-.155-2.991 0-7.839 1.118-11.947 5.604-4.108 4.486-15.677 15.324-15.677 37.361s16.047 43.344 18.29 46.335c2.243 2.991 31.585 48.225 76.51 67.632 10.684 4.615 19.029 7.374 25.535 9.437 10.727 3.412 20.49 2.931 28.208 1.779 8.604-1.289 26.498-10.838 30.228-21.298 3.73-10.46 3.73-19.433 2.613-21.298-1.117-1.865-4.108-2.991-8.586-5.234l.008-.017Z" clipRule="evenodd"/>
            </svg>
          </div>
        </div>
      </div>

      {/* ================= SCENE 2: Native WhatsApp Chat ================= */}
      <div ref={scene2Ref} className="absolute inset-0 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-24 px-6 lg:px-16 pt-24 pb-12 z-20 opacity-0 pointer-events-none">
        <div className="max-w-md text-center lg:text-left drop-shadow-lg">
          <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-[#111b21] leading-[1.05]">
            <div className="overflow-hidden py-1"><div className="reveal-text-2">Your WhatsApp.</div></div>
            <div className="overflow-hidden py-1"><div className="reveal-text-2 text-[#25D366]">Automated.</div></div>
          </h3>
        </div>
        
        {/* Authentic Native WhatsApp UI */}
        <div className="relative w-full max-w-[360px] bg-[#efeae2] border-[6px] border-[#f0f2f5] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col aspect-[9/16] max-h-[60vh] md:max-h-[70vh]">
          {/* Native Header */}
          <div className="flex items-center gap-3 px-4 py-3 bg-[#008069] text-white shadow-md z-10">
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
              <span className="font-medium text-sm">BE</span>
            </div>
            <div className="flex-1">
              <div className="font-semibold text-[15px] leading-tight">Your Business</div>
              <div className="text-white/80 text-[13px] leading-tight">bot active</div>
            </div>
          </div>
          
          {/* Native Chat Body */}
          <div className="flex-1 p-4 flex flex-col gap-3 justify-end pb-8 relative z-10">
            {/* Incoming Bubble */}
            <div className="wa-bubble self-start max-w-[85%] bg-white text-[#111b21] px-3 py-2 rounded-lg rounded-tl-none shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] text-[14.2px] leading-[19px]">
              Hi, can I order a custom cake for tomorrow?
              <span className="text-[11px] text-[#667781] float-right mt-2 ml-3">10:41</span>
            </div>
            
            {/* Outgoing Bubble */}
            <div className="wa-bubble self-end max-w-[85%] bg-[#d9fdd3] text-[#111b21] px-3 py-2 rounded-lg rounded-tr-none shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] text-[14.2px] leading-[19px]">
              Absolutely! A 1kg custom cake is ₹1,200. Please confirm to proceed to payment.
              <span className="inline-flex items-center gap-1 float-right mt-2 ml-3 text-[11px] text-[#667781]">
                10:41
                <svg viewBox="0 0 16 11" width="16" height="15" className="text-[#53bdeb]"><path fill="currentColor" d="M11.8 1.6L10.4.2 4.1 6.6l-2.7-2.7L0 5.3l4.1 4.1 7.7-7.8zM16 1.6L14.6.2l-4.3 4.4 1.4 1.4L16 1.6z"/></svg>
              </span>
            </div>
            
            {/* System/Incoming Bubble */}
            <div className="wa-bubble self-start max-w-[85%] bg-white text-[#111b21] px-3 py-2 rounded-lg rounded-tl-none shadow-[0_1px_0.5px_rgba(11,20,26,0.13)] text-[14.2px] leading-[19px]">
              <div className="font-medium text-[#008069] mb-1 flex items-center gap-1">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
                Payment Successful
              </div>
              Paid ₹1,200 via UPI. Order Confirmed.
              <span className="text-[11px] text-[#667781] float-right mt-2 ml-3">10:42</span>
            </div>
          </div>
        </div>
      </div>

      {/* ================= SCENE 3: Premium Business Dashboard ================= */}
      <div ref={scene3Ref} className="absolute inset-0 flex flex-col lg:flex-row-reverse items-center justify-center gap-12 lg:gap-20 px-6 lg:px-16 pt-24 pb-12 z-30 opacity-0 pointer-events-none" style={{ perspective: "1000px" }}>
        
        {/* Text Section */}
        <div className="max-w-md text-center lg:text-left z-10">
          <h3 className="text-[clamp(2.5rem,5vw,4.5rem)] font-bold tracking-tight text-white leading-[1.05]">
            <div className="overflow-hidden py-1"><div className="reveal-text-3">Your business,</div></div>
            <div className="overflow-hidden py-1">
              <div className="reveal-text-3 text-transparent bg-clip-text bg-gradient-to-r from-[#25D366] to-[#128C7E]">
                on autopilot.
              </div>
            </div>
          </h3>
          <p className="mt-5 text-white/60 text-lg reveal-text-3 max-w-sm mx-auto lg:mx-0 font-medium">
            Manage your catalog, track live orders, and let the WhatsApp bot handle the customers.
          </p>
        </div>

        {/* Premium Bento Grid Dashboard UI */}
        <div className="relative w-full max-w-[640px] grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-5">
          
          {/* Subtle Glow Behind the Dashboard */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-[#25D366]/10 blur-[120px] pointer-events-none rounded-full"></div>

          {/* Revenue Chart Card (Spans full width) */}
          <div className="bento-item col-span-1 md:col-span-2 rounded-[24px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 lg:p-8 shadow-2xl relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500">
            {/* Inner Glow */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#25D366]/50 to-transparent opacity-50"></div>
            
            <div className="flex justify-between items-end mb-8 relative z-10">
              <div>
                <div className="text-white/50 text-sm font-medium mb-2 uppercase tracking-wider">Total Revenue</div>
                <div className="text-4xl lg:text-5xl font-semibold text-white tracking-tight">₹1,24,500</div>
              </div>
              <div className="flex items-center gap-1.5 bg-[#25D366]/15 text-[#25D366] px-3 py-1.5 rounded-full text-sm font-bold border border-[#25D366]/20 shadow-[0_0_15px_rgba(37,211,102,0.2)]">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 11V1M6 1L1.5 5.5M6 1L10.5 5.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                24%
              </div>
            </div>
            
            {/* SVG Line Chart (Minimalist & Premium) */}
            <div ref={chartPathRef} className="w-full h-[120px] relative z-10">
              <svg viewBox="0 0 400 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="rgba(37, 211, 102, 0.4)" />
                    <stop offset="100%" stopColor="rgba(37, 211, 102, 0)" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Gradient Fill */}
                <path d="M0,100 L0,70 Q50,80 100,50 T200,30 T300,40 T400,10 L400,100 Z" fill="url(#chartGradient)" />
                
                {/* Line */}
                <path d="M0,70 Q50,80 100,50 T200,30 T300,40 T400,10" fill="none" stroke="#25D366" strokeWidth="3" filter="url(#glow)" />
                
                {/* Data Points */}
                <circle cx="100" cy="50" r="4" fill="#050505" stroke="#25D366" strokeWidth="2" />
                <circle cx="200" cy="30" r="4" fill="#050505" stroke="#25D366" strokeWidth="2" />
                <circle cx="300" cy="40" r="4" fill="#050505" stroke="#25D366" strokeWidth="2" />
                
                {/* Highlighted End Point */}
                <circle cx="400" cy="10" r="6" fill="#25D366" filter="url(#glow)" />
                {/* Pulse ring for end point */}
                <circle cx="400" cy="10" r="14" fill="none" stroke="#25D366" strokeWidth="1" className="opacity-50" />
              </svg>
            </div>
          </div>

          {/* Active Orders Card */}
          <div className="bento-item col-span-1 rounded-[24px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 flex flex-col justify-between relative overflow-hidden group hover:bg-white/[0.05] transition-colors duration-500">
             {/* Radial highlight */}
             <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
             
             <div className="text-white/50 text-sm font-medium mb-4 flex items-center gap-2 uppercase tracking-wider relative z-10">
               <span className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
               Live Orders
             </div>
             
             <div className="relative z-10">
               <div className="text-5xl font-light text-white mb-2">42</div>
               <div className="text-white/40 text-sm font-medium">Waiting for dispatch</div>
               
               {/* Mini overlapping avatars (Simulating customers) */}
               <div className="flex -space-x-2 mt-5">
                 <div className="w-8 h-8 rounded-full border border-[#050505] bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">JD</div>
                 <div className="w-8 h-8 rounded-full border border-[#050505] bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">AK</div>
                 <div className="w-8 h-8 rounded-full border border-[#050505] bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-xs font-bold text-white shadow-lg">RS</div>
                 <div className="w-8 h-8 rounded-full border border-[#050505] bg-white/10 flex items-center justify-center text-[10px] text-white/70 backdrop-blur-md shadow-lg">
                   +39
                 </div>
               </div>
             </div>
          </div>

          {/* Bot Automation Stats Card */}
          <div className="bento-item col-span-1 rounded-[24px] bg-white/[0.03] border border-white/[0.08] backdrop-blur-xl p-6 flex flex-col justify-between group cursor-pointer hover:bg-white/[0.05] transition-colors duration-500 relative overflow-hidden">
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none transition-transform duration-700 group-hover:scale-150"></div>
            
            <div className="text-white/50 text-sm font-medium mb-4 uppercase tracking-wider relative z-10">Automation</div>
            
            <div className="space-y-4 relative z-10">
              <div>
                <div className="flex justify-between text-xs text-white/50 mb-2 font-medium">
                  <span>Queries Handled</span>
                  <span className="text-emerald-400 font-bold">92%</span>
                </div>
                <div className="w-full bg-white/5 rounded-full h-2.5 overflow-hidden border border-white/5">
                  <div className="h-full bg-gradient-to-r from-emerald-600 to-[#25D366] rounded-full relative w-[92%]">
                    <div className="absolute top-0 right-0 w-4 h-full bg-white/30 blur-[2px]"></div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/40 font-medium">
                Bot saved you <span className="text-white/70">14 hours</span> this week.
              </p>
            </div>
          </div>
          
        </div>
      </div>
      
    </section>
  );
}
