"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Package, FileText, BarChart3, Bot, CheckCircle2, AlertCircle } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const features = [
  {
    id: "inventory",
    title: "Products & Inventory",
    description: "Organize your catalogue, manage variations, and track low-stock items instantly with built-in barcode scanning.",
    icon: Package,
    color: "from-blue-500 to-cyan-500",
    bg: "bg-blue-50",
  },
  {
    id: "ledger",
    title: "Ledger & Invoicing",
    description: "Keep track of customer dues, record UPI payments, and automatically generate compliant GST invoices.",
    icon: FileText,
    color: "from-emerald-500 to-teal-500",
    bg: "bg-emerald-50",
  },
  {
    id: "analytics",
    title: "Business Analytics",
    description: "Get visual summaries of your daily revenue, recent orders, and overall business performance at a glance.",
    icon: BarChart3,
    color: "from-purple-500 to-indigo-500",
    bg: "bg-purple-50",
  },
  {
    id: "automation",
    title: "WhatsApp AI Bot",
    description: "Capture orders 24/7, answer FAQs automatically, and turn casual inquiries into paid customers while you sleep.",
    icon: Bot,
    color: "from-amber-500 to-orange-500",
    bg: "bg-amber-50",
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftColRef = useRef<HTMLDivElement>(null);
  const rightColRef = useRef<HTMLDivElement>(null);
  const [activeFeature, setActiveFeature] = useState(0);

  // We will use GSAP to pin the container and scrub through the features
  useGSAP(() => {
    // Pin the main container for 400vh
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=4000",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        onUpdate: (self) => {
          // Calculate which feature should be active based on scroll progress
          // Progress is 0 to 1. We have 4 features, so 0-0.25, 0.25-0.5, 0.5-0.75, 0.75-1
          // Use a slight offset so it switches right as the text scrolls into the middle
          const progress = self.progress;
          let newActive = Math.floor(progress * features.length);
          if (newActive >= features.length) newActive = features.length - 1;
          
          if (newActive !== activeFeature) {
            setActiveFeature(newActive);
          }
        }
      }
    });

    // Create a smooth scrubbed animation for the text items
    // This is optional if we rely purely on activeFeature, but adding scrubbed Y movement makes it feel physical
    features.forEach((_, index) => {
       if (index > 0) {
         // Fake scrub time by dividing the timeline into equal chunks
         const chunk = 1 / features.length;
         const start = index * chunk;
         
         tl.fromTo(`.feature-text-block-${index}`, {
           y: 100,
         }, {
           y: -100,
           duration: chunk,
           ease: "none"
         }, start - (chunk / 2));
       }
    });

  }, { scope: containerRef, dependencies: [activeFeature] });

  // Add micro-interactions for the cards using useGSAP when activeFeature changes
  useGSAP(() => {
    // When activeFeature changes, we can animate the right side cards
    // Kill existing animations on the target first to prevent conflicts
    gsap.killTweensOf(`.ui-card-${activeFeature}`);
    gsap.killTweensOf(`.ui-card-${activeFeature} .stagger-el`);

    gsap.fromTo(`.ui-card-${activeFeature}`, 
      { y: 60, opacity: 0, scale: 0.95 }, 
      { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: "back.out(1.1)", overwrite: true }
    );
    
    // Animate children inside the card for that premium 21st.dev staggered feel
    gsap.fromTo(`.ui-card-${activeFeature} .stagger-el`,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out", delay: 0.1, overwrite: true }
    );

  }, { scope: rightColRef, dependencies: [activeFeature] });


  return (
    <section ref={containerRef} className="relative w-full h-[100vh] bg-[#f8fafc] overflow-hidden flex items-center z-10">
      <div className="absolute inset-0 bg-white/50" />
      <div className="max-w-7xl mx-auto w-full px-4 md:px-8 flex flex-col md:flex-row items-center gap-12 h-full py-20 z-10 relative">
        
        {/* LEFT COLUMN: Text Narrative */}
        <div ref={leftColRef} className="w-full md:w-1/2 relative h-[300px] md:h-[400px] flex items-center justify-start overflow-hidden perspective-[1200px]">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            const isActive = idx === activeFeature;
            
            return (
              <div 
                key={feature.id}
                className={`feature-text-block-${idx} absolute w-full max-w-xl transition-all duration-700 ease-[0.16,1,0.3,1] ${isActive ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto' : idx < activeFeature ? 'opacity-0 -translate-y-20 scale-95 pointer-events-none' : 'opacity-0 translate-y-20 scale-95 pointer-events-none'}`}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-2xl mb-6 md:mb-8 ${feature.bg} text-slate-900 border border-black/5 shadow-sm`}>
                  <Icon className="w-7 h-7 md:w-8 md:h-8" strokeWidth={2} />
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] mb-6 leading-[1.05]">
                  {feature.title}
                </h2>
                <p className="text-lg md:text-xl lg:text-2xl text-[#334155] font-medium leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* RIGHT COLUMN: Interactive UI Previews */}
        <div ref={rightColRef} className="w-full md:w-1/2 relative h-[450px] md:h-[600px] flex items-center justify-center perspective-[1200px]">
          
          {/* Card 1: Inventory */}
          <div className={`ui-card-0 absolute w-full max-w-[420px] bg-white rounded-[2rem] shadow-[0_30px_70px_rgba(15,23,42,0.1)] border border-slate-100 overflow-hidden ${activeFeature === 0 ? 'block' : 'hidden'}`}>
             <div className="p-6 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center stagger-el">
               <h3 className="font-semibold text-slate-800">Inventory</h3>
               <button className="bg-[#0f172a] text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors">Scan Barcode</button>
             </div>
             <div className="p-6 space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 shadow-sm stagger-el transition-transform hover:-translate-y-1 hover:shadow-md cursor-pointer duration-300">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-100 rounded-xl"></div>
                      <div>
                        <div className="font-medium text-slate-900">Product {i}</div>
                        <div className="text-sm text-slate-500">₹{1200 * i}</div>
                      </div>
                    </div>
                    {i === 2 ? (
                      <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 px-2.5 py-1 rounded-full"><AlertCircle className="w-3.5 h-3.5" /> Low Stock (2)</span>
                    ) : (
                      <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">In Stock (45)</span>
                    )}
                  </div>
                ))}
             </div>
          </div>

          {/* Card 2: Ledger */}
          <div className={`ui-card-1 absolute w-full max-w-[420px] bg-white rounded-[2rem] shadow-[0_30px_70px_rgba(15,23,42,0.1)] border border-slate-100 overflow-hidden ${activeFeature === 1 ? 'block' : 'hidden'}`}>
             <div className="p-8 bg-[#0f172a] text-white stagger-el relative overflow-hidden">
               <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none"></div>
               <div className="text-slate-400 text-sm font-medium mb-1 relative z-10">Pending Dues</div>
               <div className="text-5xl font-bold tracking-tight text-white mb-6 relative z-10">₹14,500</div>
               <div className="flex gap-3 relative z-10">
                 <button className="flex-1 bg-emerald-500 text-white px-4 py-3 rounded-xl text-sm font-bold shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition-colors">Record Payment</button>
                 <button className="flex-1 bg-white/10 text-white px-4 py-3 rounded-xl text-sm font-bold backdrop-blur-md hover:bg-white/20 transition-colors">Send Reminder</button>
               </div>
             </div>
             <div className="p-6">
               <div className="text-sm font-semibold text-slate-800 mb-4 stagger-el">Recent Invoices</div>
               <div className="space-y-3">
                 {[1, 2].map((i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-100 stagger-el group">
                     <div className="flex items-center gap-3">
                       <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><FileText className="w-5 h-5" /></div>
                       <div>
                         <div className="font-medium text-slate-900">INV-00{i}</div>
                         <div className="text-xs text-slate-500">Today, 10:42 AM</div>
                       </div>
                     </div>
                     <div className="text-right">
                       <div className="font-semibold text-slate-900">₹{4500 * i}</div>
                       <div className="text-xs text-emerald-600 font-medium bg-emerald-50 px-2 py-0.5 rounded-full inline-block mt-1">Paid via UPI</div>
                     </div>
                   </div>
                 ))}
               </div>
             </div>
          </div>

          {/* Card 3: Analytics */}
          <div className={`ui-card-2 absolute w-full max-w-[420px] bg-white rounded-[2rem] shadow-[0_30px_70px_rgba(15,23,42,0.1)] border border-slate-100 overflow-hidden ${activeFeature === 2 ? 'block' : 'hidden'}`}>
             <div className="p-8 stagger-el border-b border-slate-100">
               <div className="flex justify-between items-end mb-6">
                 <div>
                   <div className="text-[#334155] text-sm font-medium mb-2">Total Revenue</div>
                   <div className="text-4xl font-bold text-[#0f172a] tracking-tight">₹1,24,500</div>
                 </div>
                 <div className="flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full text-xs font-bold">
                   +24%
                 </div>
               </div>
               {/* Minimal SVG Chart */}
               <div className="h-32 w-full relative group">
                 <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                 <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d relative z-10">
                   <path d="M0,35 Q10,35 20,25 T40,15 T60,20 T80,5 T100,0" fill="none" stroke="#0369A1" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                   <path d="M0,35 Q10,35 20,25 T40,15 T60,20 T80,5 T100,0 L100,40 L0,40 Z" fill="url(#gradient2)" opacity="0.1" />
                   <circle cx="100" cy="0" r="3" fill="#0369A1" />
                   <defs>
                     <linearGradient id="gradient2" x1="0" x2="0" y1="0" y2="1">
                       <stop offset="0%" stopColor="#0369A1" />
                       <stop offset="100%" stopColor="transparent" />
                     </linearGradient>
                   </defs>
                 </svg>
               </div>
             </div>
             <div className="p-6 grid grid-cols-2 gap-4">
               <div className="bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-5 rounded-2xl stagger-el border border-slate-100">
                 <div className="text-[#334155] text-xs font-medium mb-1">Total Orders</div>
                 <div className="text-2xl font-bold text-[#0f172a]">342</div>
               </div>
               <div className="bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer p-5 rounded-2xl stagger-el border border-slate-100">
                 <div className="text-[#334155] text-xs font-medium mb-1">Avg Order Value</div>
                 <div className="text-2xl font-bold text-[#0f172a]">₹840</div>
               </div>
             </div>
          </div>

          {/* Card 4: Automation */}
          <div className={`ui-card-3 absolute w-full max-w-[360px] bg-[#efeae2] border-[6px] border-[#f0f2f5] rounded-[2.5rem] shadow-[0_30px_70px_rgba(15,23,42,0.15)] overflow-hidden flex flex-col aspect-[9/15] ${activeFeature === 3 ? 'flex' : 'hidden'}`}>
            <div className="flex items-center gap-3 px-4 py-3 bg-[#008069] text-white shadow-md z-10 stagger-el">
              <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                <Bot className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="font-semibold text-[15px] leading-tight">BizEasy Bot</div>
                <div className="text-white/80 text-[13px] leading-tight">Online 24/7</div>
              </div>
            </div>
            
            <div className="flex-1 p-4 flex flex-col gap-3 justify-end pb-6 z-10 relative">
              <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: "300px" }}></div>
              
              <div className="wa-bubble self-start max-w-[85%] bg-white text-[#111b21] px-3 py-2 rounded-lg rounded-tl-none shadow-sm text-[14px] stagger-el relative z-10">
                Are you open right now? Do you deliver to Sector 45?
                <span className="text-[11px] text-[#667781] float-right mt-2 ml-3">2:14 AM</span>
              </div>
              
              <div className="wa-bubble self-end max-w-[85%] bg-[#d9fdd3] text-[#111b21] px-3 py-2 rounded-lg rounded-tr-none shadow-sm text-[14px] stagger-el relative z-10">
                Hi! 👋 Yes, we deliver to Sector 45! Our store is closed right now, but you can place an order here 24/7 and we'll deliver it by 9 AM. 
                <div className="mt-2 bg-white rounded-lg p-2.5 border border-black/5 shadow-sm flex gap-3 items-center hover:bg-slate-50 transition-colors cursor-pointer">
                   <div className="w-10 h-10 bg-slate-100 rounded-md"></div>
                   <div>
                     <div className="font-bold text-sm text-slate-800">View Catalogue</div>
                     <div className="text-xs text-slate-500">45 items available</div>
                   </div>
                </div>
                <span className="inline-flex items-center gap-1 float-right mt-2 ml-3 text-[11px] text-[#667781]">
                  2:14 AM
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#53bdeb]" />
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}