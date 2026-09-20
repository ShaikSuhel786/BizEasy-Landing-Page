"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Sparkles,
  ArrowRight,
  Clock,
  Receipt,
  CheckCircle2,
  Zap,
  TrendingUp,
} from "lucide-react";

// Utility for Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ─── DATA & STEPS ───

const NARRATIVE_STEPS = [
  {
    id: 0,
    icon: Clock,
    iconColor: "text-rose-500",
    iconBg: "bg-rose-50 border-rose-100",
    title: "The Midnight Flood",
    subtitle: "The clock strikes 11:46 PM.",
    description:
      "Human seller is offline. A customer queries an urgent order. The latency clock ticks up, risking a ₹1,890 lost sale to a competitor who replies faster.",
  },
  {
    id: 1,
    icon: Sparkles,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50 border-emerald-100",
    title: "Meet Your Bot",
    subtitle: "Enter your 24/7 AI Agent.",
    description:
      "The BizEasy Bot activates instantly. It checks stock, confirms availability, and sends an interactive product preview with a 1-tap UPI checkout button.",
  },
  {
    id: 2,
    icon: Zap,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50 border-blue-100",
    title: "Auto Execution",
    subtitle: "Payments on Autopilot.",
    description:
      "Customer pays. The bot automatically verifies the bank settlement in 1.4s (blocking fake slips), generates a GST PDF, and sends the dispatch link.",
  },
  {
    id: 3,
    icon: TrendingUp,
    iconColor: "text-indigo-500",
    iconBg: "bg-indigo-50 border-indigo-100",
    title: "The Aftermath",
    subtitle: "Wake up to Sales.",
    description:
      "While you slept, your AI agent captured the impulsive midnight buyers. Wake up to a dashboard of settled payments and ready-to-ship orders.",
  },
];

export default function Problem() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <section id="problem" className="relative bg-[#FAFAFA] text-slate-900 overflow-clip font-sans">
      
      {/* ─── AURA BACKGROUND (Performant CSS Gradients) ─── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-blue-100/40 blur-[120px] opacity-70 mix-blend-multiply" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-emerald-100/40 blur-[120px] opacity-70 mix-blend-multiply" />
        <div className="absolute top-[40%] left-[60%] w-[40vw] h-[40vw] rounded-full bg-rose-100/30 blur-[120px] opacity-70 mix-blend-multiply" />
        {/* Grid pattern removed per user request */}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Mobile Header (Only visible on small screens, establishes context) */}
        <div className="lg:hidden pt-24 pb-8 text-center">
          <h2 className="text-4xl font-bold tracking-tight mb-4 font-outfit text-slate-900">
            Never lose a sale to <span className="text-rose-500">sleep.</span>
          </h2>
          <p className="text-slate-500 max-w-md mx-auto">
            Scroll to see how BizEasy handles your midnight traffic effortlessly.
          </p>
        </div>

        <div className="flex flex-col lg:grid lg:grid-cols-2 gap-8 lg:gap-24 relative">
          
          {/* ─── MOBILE: STICKY PHONE MOCKUP ─── */}
          <div className="flex lg:hidden justify-center sticky top-[80px] z-10 pt-4 pointer-events-none h-[500px]">
             <div className="scale-[0.7] transform origin-top shadow-2xl rounded-[40px]">
               <PhoneMockup activeStep={activeStep} />
             </div>
          </div>

          {/* ─── LEFT COLUMN: SCROLLING TEXT NARRATIVE ─── */}
          <div className="relative pb-[20vh] lg:pb-[50vh] z-20 flex flex-col gap-[60vh] lg:gap-0 mt-[-200px] lg:mt-0 lg:pt-[30vh]">
            {NARRATIVE_STEPS.map((step, index) => (
              <NarrativeStep 
                key={step.id} 
                step={step} 
                isActive={activeStep === index} 
                onInView={() => setActiveStep(index)}
                isLast={index === NARRATIVE_STEPS.length - 1}
              />
            ))}
          </div>

          {/* ─── DESKTOP RIGHT COLUMN: STICKY PHONE MOCKUP ─── */}
          <div className="hidden lg:flex items-center justify-center sticky top-0 h-[100dvh] w-full z-10 pointer-events-none">
            <PhoneMockup activeStep={activeStep} />
          </div>

        </div>
      </div>
    </section>
  );
}

// ─── NARRATIVE STEP COMPONENT ───
function NarrativeStep({ step, isActive, onInView, isLast }: { step: any, isActive: boolean, onInView: () => void, isLast: boolean }) {
  return (
    <motion.div 
      className={cn(
        "flex flex-col justify-center min-h-[40vh] lg:min-h-[80vh] transition-opacity duration-700 max-w-lg mx-auto lg:mx-0",
        "bg-white/95 backdrop-blur-md lg:bg-transparent p-6 lg:p-0 rounded-2xl lg:rounded-none shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] lg:shadow-none border border-slate-200/60 lg:border-transparent",
        isActive ? "opacity-100" : "opacity-30 blur-[2px]"
      )}
      onViewportEnter={() => {
        // Use a slightly wider margin so it triggers nicely
        onInView();
      }}
      viewport={{ margin: "-40% 0px -40% 0px" }}
    >
      <div className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-bold uppercase tracking-wider mb-6 w-max shadow-sm",
        step.iconBg, step.iconColor
      )}>
        <step.icon className="w-3.5 h-3.5" />
        <span>{step.title}</span>
      </div>
      <h2 className="text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] mb-6 font-outfit text-slate-900">
        {step.subtitle.split(" ").map((word: string, i: number, arr: string[]) => 
          i === arr.length - 1 || i === arr.length - 2 ? (
            <span key={i} className={cn("font-fraunces italic font-normal", step.iconColor)}> {word}</span>
          ) : (
            <span key={i}> {word}</span>
          )
        )}
      </h2>
      <p className="text-slate-600 text-lg leading-relaxed mb-8">
        {step.description}
      </p>

      {isLast && (
        <motion.a 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 10 }}
          href="#pricing" 
          className="inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-xl font-bold text-sm shadow-xl shadow-slate-900/20 hover:scale-105 hover:shadow-slate-900/30 transition-all w-max pointer-events-auto"
        >
          Deploy Your Bot <ArrowRight className="w-4 h-4" />
        </motion.a>
      )}
    </motion.div>
  );
}

// ─── REALISTIC PHONE MOCKUP ───
function PhoneMockup({ activeStep }: { activeStep: number }) {
  return (
    <div className="relative w-[320px] h-[650px] shrink-0 pointer-events-auto">
      {/* Outer Hardware Frame */}
      <div className="absolute inset-0 bg-slate-900 rounded-[54px] shadow-[0_0_0_4px_#e2e8f0,0_20px_40px_-15px_rgba(0,0,0,0.3)] box-border">
        {/* Buttons */}
        <div className="absolute top-[120px] -left-[6px] w-[3px] h-[30px] bg-slate-300 rounded-l-md" />
        <div className="absolute top-[170px] -left-[6px] w-[3px] h-[60px] bg-slate-300 rounded-l-md" />
        <div className="absolute top-[240px] -left-[6px] w-[3px] h-[60px] bg-slate-300 rounded-l-md" />
        <div className="absolute top-[180px] -right-[6px] w-[3px] h-[80px] bg-slate-300 rounded-r-md" />

        {/* Inner Screen */}
        <div className="absolute inset-[8px] bg-[#EFEAE2] rounded-[46px] overflow-hidden flex flex-col">
          
          {/* Dynamic Island */}
          <div className="absolute top-3 left-1/2 -translate-x-1/2 w-[90px] h-[26px] bg-black rounded-full z-50 flex items-center justify-between px-2">
            <div className="w-2 h-2 rounded-full bg-slate-800" />
            <div className="w-2 h-2 rounded-full bg-emerald-900/50 flex items-center justify-center">
              <div className="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_4px_#10b981]" />
            </div>
          </div>

          {/* iOS Status Bar */}
          <div className="h-12 bg-[#075E54] w-full flex justify-between items-end px-6 pb-2 text-[10px] text-white font-medium z-40 pt-2">
            <span>11:46</span>
            <div className="flex gap-1.5 items-center">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21L24 3h-24z"/></svg>
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M2 22h20v-20z"/></svg>
              <div className="w-5 h-2.5 border border-white rounded-[3px] p-[1px] relative">
                 <div className="bg-white h-full w-[80%] rounded-[1px]" />
              </div>
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="bg-[#075E54] px-4 py-2 flex items-center gap-3 shadow-sm z-30 shrink-0">
            <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-white font-bold text-xs relative overflow-hidden border border-white/20">
              <span className="relative z-10">BE</span>
            </div>
            <div className="flex-1">
              <h3 className="text-white font-semibold text-[13px] leading-tight flex items-center gap-1">
                BizEasy Store 
                <CheckCircle2 className="w-3.5 h-3.5 text-[#25D366] fill-white" />
              </h3>
              <p className="text-white/70 text-[10px]">online</p>
            </div>
            <div className="flex gap-4 text-white">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
            </div>
          </div>

          {/* Chat Background Pattern */}
          <div 
            className="absolute inset-0 opacity-[0.04] z-10 pointer-events-none" 
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`, backgroundSize: '60px' }} 
          />

          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5 z-20 pb-20 no-scrollbar">
            <div className="flex justify-center mb-1">
              <span className="bg-white/60 backdrop-blur-sm border border-black/5 text-[#54656F] text-[10px] px-2.5 py-1 rounded-lg font-medium shadow-sm">TODAY</span>
            </div>

            <AnimatePresence mode="popLayout">
              {/* STEP 0: Customer queries */}
              {activeStep >= 0 && (
                <ChatBubble key="q1" delay={0.1} isSelf>
                  Bhai linen shirt size L available hai? 
                </ChatBubble>
              )}
              {activeStep >= 0 && (
                <ChatBubble key="q2" delay={0.3} isSelf>
                  Urgent order place karna hai 
                </ChatBubble>
              )}
              {activeStep >= 0 && (
                <ChatBubble key="q3" delay={0.5} isSelf time="11:48 PM">
                  Total kitna hua?
                </ChatBubble>
              )}

              {/* STEP 1: Bot Replies */}
              {activeStep >= 1 && (
                <ChatBubble key="a1" delay={0.1} isSelf={false}>
                  Hi! 👋 Size L is in stock. Here is your instant checkout link:
                </ChatBubble>
              )}
              {activeStep >= 1 && (
                <motion.div
                  key="product-card"
                  initial={{ opacity: 0, scale: 0.9, y: 10, originX: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                  className="self-start bg-white rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-black/5 overflow-hidden w-[220px]"
                >
                  <div className="h-[100px] bg-slate-100 flex items-center justify-center relative border-b border-black/5">
                     <span className="text-4xl">👕</span>
                     <div className="absolute top-2 right-2 bg-white/90 backdrop-blur text-slate-900 text-[9px] px-2 py-0.5 rounded-full font-bold shadow-sm">₹1,890</div>
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-bold text-slate-800">Classic Linen Shirt (L)</p>
                    <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">Secure UPI Checkout via Razorpay</p>
                  </div>
                  <div className="border-t border-black/5 px-3 py-2.5 bg-emerald-50 hover:bg-emerald-100 transition-colors cursor-pointer">
                    <p className="text-emerald-700 text-[11px] font-bold text-center w-full">Pay via UPI</p>
                  </div>
                </motion.div>
              )}

              {/* STEP 2: Payment & Auto Execution */}
              {activeStep >= 2 && (
                <ChatBubble key="q4" delay={0.1} isSelf time="11:51 PM">
                  Paid ✅
                </ChatBubble>
              )}
              {activeStep >= 2 && (
                <motion.div
                  key="invoice-card"
                  initial={{ opacity: 0, scale: 0.9, y: 10, originX: 0 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 20, delay: 0.3 }}
                  className="self-start bg-white p-2 rounded-xl rounded-tl-sm shadow-[0_1px_2px_rgba(0,0,0,0.1)] border border-black/5 flex items-center gap-3 w-max max-w-[85%]"
                >
                  <div className="w-10 h-10 rounded-lg bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center shrink-0">
                    <Receipt className="w-5 h-5" />
                  </div>
                  <div className="pr-2">
                    <p className="text-[11px] font-bold text-slate-800">GST_Invoice_#1048.pdf</p>
                    <p className="text-[9px] text-slate-500 font-medium">1.4s Verified • Ready to ship</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Area */}
          <div className="bg-[#F0F2F5] p-2 flex items-center gap-2 shrink-0 z-30 pb-6 border-t border-black/5 relative">
            <div className="flex-1 bg-white h-9 rounded-full border border-black/5 flex items-center px-4 shadow-sm">
              <span className="text-slate-400 text-[11px]">Message...</span>
            </div>
            <div className="w-9 h-9 bg-[#00A884] rounded-full flex items-center justify-center shrink-0 shadow-sm">
              <svg className="w-4 h-4 text-white ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>
            </div>

            {/* STEP 3 Overlay: The Morning After */}
            <AnimatePresence>
              {activeStep >= 3 && (
                <motion.div 
                  key="morning-report-overlay"
                  initial={{ opacity: 0, y: "100%", filter: "blur(10px)" }}
                  animate={{ opacity: 1, y: "0%", filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={{ type: "spring", stiffness: 150, damping: 25 }}
                  className="absolute bottom-0 left-0 w-full bg-white/80 backdrop-blur-xl border-t border-white/40 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] p-5 pb-8 rounded-t-3xl z-40"
                >
                  <div className="w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4" />
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
                      <TrendingUp className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900">Morning Report</h4>
                      <p className="text-[10px] text-slate-500">11:00 PM - 7:00 AM</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center bg-slate-50/50 p-2.5 rounded-xl border border-slate-100">
                       <span className="text-xs text-slate-600 font-medium">Orders Auto-Processed</span>
                       <span className="text-sm font-black text-slate-900">14</span>
                    </div>
                    <div className="flex justify-between items-center bg-emerald-50/30 p-2.5 rounded-xl border border-emerald-100/50">
                       <span className="text-xs text-slate-600 font-medium">Revenue Secured</span>
                       <span className="text-sm font-black text-emerald-600">₹18,450</span>
                    </div>
                  </div>
                  
                  <button className="w-full py-3 mt-4 bg-slate-900 text-white text-xs font-bold rounded-xl shadow-lg shadow-slate-900/20">
                    Open Dashboard
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

// ─── CHAT BUBBLE COMPONENT ───
function ChatBubble({ children, isSelf = false, delay = 0, time = "11:46 PM" }: { children: React.ReactNode, isSelf?: boolean, delay?: number, time?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 10, originX: isSelf ? 1 : 0 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 20, delay }}
      className={cn(
        "relative px-3 py-2 rounded-2xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] max-w-[80%] text-[13px] leading-[1.3] text-[#111B21]",
        isSelf 
          ? "self-end bg-[#D9FDD3] rounded-tr-sm border border-[#D9FDD3]/50" 
          : "self-start bg-white rounded-tl-sm border border-black/5"
      )}
    >
      <div className="mr-6">{children}</div>
      <div className="absolute bottom-1.5 right-2 flex items-center gap-1">
        <span className="text-[9px] text-[#667781] leading-none">{time}</span>
        {isSelf && <span className="text-[10px] text-[#53BDEB] leading-none tracking-tighter">✓✓</span>}
      </div>
    </motion.div>
  );
}
