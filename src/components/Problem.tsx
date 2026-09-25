"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { Zap, Receipt, ArrowRight, ShieldCheck, AlertCircle } from "lucide-react";
import { PhoneMockup } from "./PhoneMockup";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SplitType from "split-type";

// Register ScrollTrigger
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Problem() {
  const containerRef = useRef<HTMLElement>(null);
  
  useGSAP(() => {
    // Wait for a tick to ensure DOM is fully rendered for SplitType
    const timer = setTimeout(() => {
      // Split Texts
      const splits = document.querySelectorAll('.split-text');
      splits.forEach(el => {
        new SplitType(el as HTMLElement, { types: 'lines, words' });
      });
      
      // Setup initial states
      gsap.set('.text-block-2, .text-block-3', { autoAlpha: 0, display: 'none' });
      gsap.set('.text-block-1 .word', { yPercent: 0 }); 
      gsap.set('.text-block-2 .word, .text-block-3 .word', { yPercent: 100 });
      gsap.set('.line', { overflow: 'hidden' }); // Critical for masking reveal
      
      // Chat items
      gsap.set('.msg-2, .lost-sale, .activation, .msg-3, .msg-4, .msg-5, .msg-6', { opacity: 0, y: 15 });
      gsap.set('.lost-sale, .activation', { scale: 0.8, y: 0 });
      gsap.set('.header-online', { opacity: 0 });
      gsap.set('.header-offline', { opacity: 1 });
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=400%", // 400vh scroll duration
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
      
      // PHASE 1: Chaos -> Transition to Dark
      tl.to('.bg-container', { backgroundColor: '#020617', duration: 1 }, 0)
        .to('.msg-2', { opacity: 1, y: 0, duration: 0.2 }, 0.1)
        .to('.lost-sale', { opacity: 1, scale: 1, duration: 0.2 }, 0.2)
        // Transition Text 1 -> Text 2
        .to('.text-block-1 .word', { yPercent: -100, stagger: 0.015, duration: 0.4, ease: 'power2.in' }, 0.2)
        .set('.text-block-1', { display: 'none' }, 0.6)
        .set('.text-block-2', { display: 'flex', autoAlpha: 1 }, 0.6)
        .to('.text-block-2 .word', { yPercent: 0, stagger: 0.015, duration: 0.5, ease: 'power3.out' }, 0.6);
        
      // PHASE 2: AI Takes Over -> Transition to Emerald
      tl.to('.bg-container', { backgroundColor: '#022c22', duration: 1 }, 1)
        .to('.header-offline', { opacity: 0, duration: 0.1 }, 1.1)
        .to('.header-online', { opacity: 1, duration: 0.1 }, 1.1)
        .to('.activation', { opacity: 1, scale: 1, duration: 0.2 }, 1.1)
        .to('.chat-scroll', { y: -180, duration: 0.4, ease: 'power2.inOut' }, 1.2)
        .to('.msg-3', { opacity: 1, y: 0, duration: 0.2 }, 1.4)
        .to('.msg-4', { opacity: 1, y: 0, duration: 0.2 }, 1.6)
        // Transition Text 2 -> Text 3
        .to('.text-block-2 .word', { yPercent: -100, stagger: 0.015, duration: 0.4, ease: 'power2.in' }, 1.6)
        .set('.text-block-2', { display: 'none' }, 2.0)
        .set('.text-block-3', { display: 'flex', autoAlpha: 1 }, 2.0)
        .to('.text-block-3 .word', { yPercent: 0, stagger: 0.015, duration: 0.5, ease: 'power3.out' }, 2.0);
        
      // PHASE 3: Success -> Transition to Dark Blue
      tl.to('.bg-container', { backgroundColor: '#020617', duration: 1 }, 2)
        .to('.chat-scroll', { y: -380, duration: 0.4, ease: 'power2.inOut' }, 2.2)
        .to('.msg-5', { opacity: 1, y: 0, duration: 0.2 }, 2.4)
        .to('.msg-6', { opacity: 1, y: 0, duration: 0.2 }, 2.6);

      // Subtle phone floating animation
      gsap.to('.phone-3d', {
        y: -15,
        rotateX: 2,
        rotateY: -2,
        duration: 2,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1
      });
    }, 100);
    return () => clearTimeout(timer);
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="relative h-screen w-full" id="problem">
      <div className="bg-container absolute inset-0 w-full h-full bg-white transition-colors duration-0" />
      
      <div className="relative h-full w-full flex flex-col lg:flex-row items-center justify-center px-6 lg:p-12 overflow-hidden z-10 pt-24 pb-8 lg:pt-12 lg:pb-12">
        
        {/* Left Typography Section */}
        <div className="w-full lg:w-1/2 flex items-start lg:items-center justify-center relative h-[220px] sm:h-[260px] lg:h-full z-20 shrink-0">
          
          {/* Block 1 */}
          <div className="text-block-1 absolute inset-0 flex flex-col items-center lg:items-start justify-start lg:justify-center text-center lg:text-left px-2">
            <h2 className="split-text text-4xl lg:text-6xl font-bold text-slate-900 tracking-tight leading-tight">
              Customers <br className="hidden lg:block"/> <span className="text-rose-500">don't wait.</span>
            </h2>
            <p className="split-text text-slate-600 mt-4 text-base sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
              Every missed message at 2 AM is a lost sale. Manual replies can't keep up with modern buyers.
            </p>
          </div>

          {/* Block 2 */}
          <div className="text-block-2 absolute inset-0 flex flex-col items-center lg:items-start justify-start lg:justify-center text-center lg:text-left px-2">
            <h2 className="split-text text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              BizEasy AI <br className="hidden lg:block"/> <span className="text-emerald-400">takes over.</span>
            </h2>
            <p className="split-text text-slate-400 mt-4 text-base sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
              Your intelligent agent wakes up when you sleep. It understands intent and acts instantly.
            </p>
          </div>

          {/* Block 3 */}
          <div className="text-block-3 absolute inset-0 flex flex-col items-center lg:items-start justify-start lg:justify-center text-center lg:text-left px-2">
            <h2 className="split-text text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
              Instant Checkouts. <br className="hidden lg:block"/> <span className="dynamic-color-span text-white">Zero Effort.</span>
            </h2>
            <p className="split-text text-slate-400 mt-4 text-base sm:text-lg lg:text-xl max-w-md mx-auto lg:mx-0">
              From inquiry to payment in seconds. Automatically generate invoices and close deals 24/7.
            </p>
          </div>

        </div>

        {/* Right Phone Mockup Section */}
        <div className="w-full lg:w-1/2 flex items-center lg:items-center justify-center z-10 flex-1 lg:flex-none overflow-hidden lg:overflow-visible" style={{ perspective: "1000px" }}>
          <div className="phone-3d relative shrink-0 w-[850px] sm:w-[950px] lg:w-[1000px] xl:w-[1200px] aspect-[1280/853] will-change-transform pointer-events-none mt-4 lg:mt-0">
            <div className="absolute inset-0 z-10 pointer-events-none">
              <PhoneMockup hideUI={false} statusBarStyle="black">
                <div className="relative w-full h-full bg-[#EFEAE2] flex flex-col pointer-events-auto">
                  {/* Header */}
                  <div className="bg-[#005c4b] pt-10 pb-3 px-4 flex items-center gap-3 shrink-0 z-20 shadow-md relative">
                    <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold shrink-0">
                      BE
                    </div>
                    <div className="flex-1 relative h-full flex flex-col justify-center">
                      <h3 className="text-white font-semibold text-[16px] leading-tight flex items-center gap-1">
                        BizEasy Store
                      </h3>
                      
                      <p className="header-offline text-white/60 text-[11px] absolute top-5 left-0">
                        last seen today at 10:15 PM
                      </p>
                      
                      <p className="header-online text-[#25D366] text-[11px] absolute top-5 left-0 font-medium flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" /> online
                      </p>
                    </div>
                  </div>

                  {/* Chat Background Pattern */}
                  <div 
                    className="absolute inset-0 opacity-[0.04] z-0 pointer-events-none" 
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px' }} 
                  />

                  {/* Chat Area */}
                  <div className="flex-1 overflow-hidden p-4 z-10 relative" style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 95%, transparent 100%)' }}>
                    <div className="chat-scroll flex flex-col gap-3 pb-20 will-change-transform">
                      
                      <div className="flex justify-center mb-2 mt-4">
                        <span className="bg-white/80 backdrop-blur border border-black/5 text-slate-500 text-[10px] px-3 py-1 rounded-lg font-medium shadow-sm">TODAY</span>
                      </div>

                      {/* PHASE 1: CHAOS */}
                      <div className="msg-1 chat-bubble received">
                        Bhai size L hai? Urgent hai.
                        <span className="time">11:46 PM</span>
                      </div>
                      
                      <div className="msg-2 chat-bubble received">
                        Hello?? Koi hai?
                        <span className="time">11:55 PM</span>
                      </div>

                      <div className="lost-sale my-2 flex justify-center w-full">
                        <div className="bg-rose-50 border border-rose-100 text-rose-600 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-sm flex items-center gap-1.5">
                          <AlertCircle className="w-3.5 h-3.5" />
                          Sale Lost (You were asleep)
                        </div>
                      </div>

                      {/* PHASE 2: ACTIVATION */}
                      <div className="activation my-3 flex justify-center w-full">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-2 rounded-2xl text-xs font-bold shadow-lg shadow-emerald-500/25 flex items-center gap-2">
                          <Zap className="w-4 h-4 fill-white" />
                          BizEasy AI Active
                        </div>
                      </div>

                      {/* PHASE 3: SOLUTION */}
                      <div className="msg-3 chat-bubble received">
                        I want to buy the linen shirt in Size L. Is it available?
                        <span className="time">2:14 AM</span>
                      </div>

                      <div className="msg-4 chat-bubble sent">
                        <p className="mb-2">Hi! Size L is in stock. Here is your checkout link:</p>
                        
                        <div className="bg-white rounded-xl shadow-sm border border-black/5 overflow-hidden w-full min-w-[200px]">
                            <div className="h-24 bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center relative border-b border-black/5">
                              <span className="text-4xl drop-shadow-sm">👕</span>
                              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-slate-900 text-[10px] px-1.5 py-0.5 rounded font-bold shadow-sm">₹1,890</div>
                            </div>
                            <div className="p-2.5">
                              <p className="text-[13px] font-bold text-slate-800">Classic Linen Shirt (L)</p>
                              <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">Secure UPI Checkout</p>
                            </div>
                            <div className="border-t border-black/5 px-3 py-2.5 bg-emerald-50/50">
                              <p className="text-emerald-600 text-[12px] font-bold text-center w-full flex items-center justify-center gap-1.5">
                                Pay via UPI <ArrowRight className="w-3.5 h-3.5" />
                              </p>
                            </div>
                        </div>
                        <span className="time self-end mt-1 text-emerald-600/70">2:14 AM ✓✓</span>
                      </div>

                      <div className="msg-5 chat-bubble received">
                        Paid ✅
                        <span className="time">2:16 AM</span>
                      </div>

                      <div className="msg-6 chat-bubble sent">
                        <p className="mb-2 text-emerald-800 font-medium flex items-center gap-1 text-[12px]">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" /> Payment Verified
                        </p>
                        <div className="bg-white p-2 rounded-xl border border-black/5 flex items-center gap-3 shadow-sm">
                            <div className="w-8 h-8 rounded-lg bg-rose-50 text-rose-500 flex items-center justify-center shrink-0">
                              <Receipt className="w-4 h-4" />
                            </div>
                            <div className="pr-2">
                              <p className="text-[12px] font-bold text-slate-800">GST_Invoice.pdf</p>
                              <p className="text-[10px] text-slate-500 font-medium">Ready to ship</p>
                            </div>
                        </div>
                        <span className="time self-end mt-1 text-emerald-600/70">2:16 AM ✓✓</span>
                      </div>

                    </div>
                  </div>

                  {/* Input Area */}
                  <div className="bg-[#f0f2f5] p-3 flex items-center gap-2 shrink-0 z-20 border-t border-black/5 relative pb-6 lg:pb-8">
                    <div className="flex-1 bg-white h-9 rounded-full border border-black/5 flex items-center px-4 shadow-sm">
                      <span className="text-slate-400 text-[13px]">Message...</span>
                    </div>
                    <div className="w-9 h-9 bg-[#00a884] rounded-full flex items-center justify-center shrink-0 shadow-sm text-white">
                      <svg className="w-4 h-4 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
                    </div>
                  </div>
                </div>
              </PhoneMockup>
              <Image 
                src="/assets/phone-frame-v2.png"
                alt="Hand holding phone"
                fill
                className="object-contain object-center filter brightness-110 contrast-125 saturate-110 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                priority
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Styles for chat bubbles to keep the JSX clean */}
      <style dangerouslySetInnerHTML={{__html: `
        .chat-bubble {
          position: relative;
          padding: 8px 12px;
          border-radius: 12px;
          font-size: 13px;
          line-height: 1.4;
          color: #111B21;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
          width: max-content;
          max-width: 85%;
          display: flex;
          flex-direction: column;
          transform-origin: bottom left;
        }
        .chat-bubble.received {
          align-self: flex-start;
          background: #ffffff;
          border-top-left-radius: 4px;
          border: 1px solid rgba(0,0,0,0.02);
        }
        .chat-bubble.sent {
          align-self: flex-end;
          background: #d9fdd3;
          border-top-right-radius: 4px;
          border: 1px solid rgba(217,253,211,0.5);
          transform-origin: bottom right;
        }
        .chat-bubble .time {
          font-size: 10px;
          color: #667781;
          align-self: flex-end;
          margin-top: 2px;
          margin-left: 12px;
        }
      `}} />
    </section>
  );
}
