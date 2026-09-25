"use client";

import { MessageCircle, Receipt, IndianRupee, ArrowRight, CheckCircle2, FileText, Zap } from "lucide-react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { cn } from "./Problem";

const EXPO_OUT = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function Features() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  // Parallax background glows
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [-150, 150]);
  const y2 = useTransform(scrollYProgress, [0, 1], [150, -150]);
  const y3 = useTransform(scrollYProgress, [0, 1], [-80, 80]);

  // Fluid Section Entrance (Webflow style)
  const { scrollYProgress: entryProgress } = useScroll({
    target: wrapperRef,
    offset: ["start end", "start top"]
  });

  const borderRadius = useTransform(entryProgress, [0, 1], ["48px", "0px"]);
  const scale = useTransform(entryProgress, [0, 1], [0.92, 1]);

  return (
    <div ref={wrapperRef} className="bg-[#020617]">
      <motion.section 
        id="features" 
        style={{ borderRadius, scale }}
        className="relative py-32 overflow-hidden bg-white scroll-mt-20 transform-gpu origin-top"
      >
        {/* High-Performance Ambient Radial Glows */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div style={{ y: y1 }} className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(96,165,250,0.08)_0%,transparent_70%)] transform-gpu will-change-transform" />
        <motion.div style={{ y: y2 }} className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(16,185,129,0.06)_0%,transparent_70%)] transform-gpu will-change-transform" />
        <motion.div style={{ y: y3 }} className="absolute bottom-1/4 left-1/3 w-[550px] h-[550px] bg-[radial-gradient(circle,rgba(56,189,248,0.08)_0%,transparent_70%)] transform-gpu will-change-transform" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: EXPO_OUT }}
          className="text-center max-w-2xl mx-auto mb-24"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-sm font-semibold mb-6">
            <Zap className="w-4 h-4 fill-emerald-600" /> Complete Automation
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Everything you need to <span className="text-slate-400">scale.</span>
          </h2>
          <p className="text-lg text-slate-500">
            A complete suite of tools to automate your commerce, all happening natively inside WhatsApp.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
          
          {/* Card 1: WhatsApp Ordering (Span 2) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease: EXPO_OUT }}
            className="md:col-span-2 relative group rounded-[32px] bg-slate-50 border border-slate-200/60 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-slate-50 z-0" />
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col justify-between">
              <div className="max-w-md">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300">
                  <MessageCircle className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">Conversational Catalog</h3>
                <p className="text-slate-500 leading-relaxed">
                  Turn conversations into conversions. Your entire product catalog is available natively within WhatsApp, enabling seamless browsing and checkout without leaving the app.
                </p>
              </div>

              {/* Visual Element */}
              <div className="absolute right-0 bottom-0 w-[60%] h-[70%] translate-x-12 translate-y-12 group-hover:translate-x-8 group-hover:translate-y-8 transition-transform duration-500 ease-out">
                <div className="w-full h-full bg-white rounded-tl-3xl border-t border-l border-slate-200 shadow-2xl p-6 flex flex-col gap-4">
                  {/* Fake UI */}
                  <div className="flex gap-4 items-center">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-2/3 h-4 bg-slate-100 rounded-full" />
                      <div className="w-1/3 h-3 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                  <div className="flex gap-4 items-center opacity-60">
                    <div className="w-16 h-16 bg-slate-100 rounded-2xl shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="w-3/4 h-4 bg-slate-100 rounded-full" />
                      <div className="w-1/2 h-3 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                  <div className="absolute top-1/2 -left-6 bg-emerald-500 text-white px-4 py-2 rounded-2xl shadow-lg shadow-emerald-500/30 text-sm font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4" /> Added to cart
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 2: UPI Payments (Span 1) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: EXPO_OUT }}
            className="md:col-span-1 relative group rounded-[32px] bg-slate-900 border border-slate-800 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950 z-0" />
            <div className="relative z-10 p-8 h-full flex flex-col">
              <div className="w-12 h-12 bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center mb-6 text-emerald-400 group-hover:scale-110 transition-transform duration-300">
                <IndianRupee className="w-5 h-5" strokeWidth={2.5} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Instant UPI</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                Generate dynamic payment links natively. Frictionless 1-click checkout.
              </p>

              {/* Visual Element */}
              <div className="mt-auto pt-8 relative flex justify-center items-center h-32">
                <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full" />
                <div className="relative w-24 h-24 bg-slate-800 rounded-3xl border border-slate-700 shadow-xl flex items-center justify-center group-hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-12 h-12 bg-gradient-to-tr from-emerald-400 to-emerald-300 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/50">
                    <IndianRupee className="w-6 h-6 text-slate-900" strokeWidth={3} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: GST Invoicing (Span 3) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: EXPO_OUT }}
            className="md:col-span-3 relative group rounded-[32px] bg-emerald-50 border border-emerald-100/60 overflow-hidden h-[400px]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-50 via-white to-emerald-50/30 z-0" />
            <div className="relative z-10 p-8 md:p-12 h-full flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="max-w-xl">
                <div className="w-12 h-12 bg-white rounded-2xl shadow-sm border border-emerald-100 flex items-center justify-center mb-6 text-emerald-600 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                  <Receipt className="w-5 h-5" strokeWidth={2.5} />
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Automated Compliance</h3>
                <p className="text-slate-600 leading-relaxed text-lg mb-8">
                  Never worry about manual receipts. Compliant GST invoices are generated and delivered instantly as PDFs the moment a payment succeeds.
                </p>
                <button className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all">
                  See how it works <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Visual Element */}
              <div className="relative w-full max-w-sm h-full hidden md:block">
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[280px] h-[360px] translate-x-10 group-hover:translate-x-0 transition-transform duration-700 ease-out">
                  <div className="w-full h-full relative">
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-2xl border border-slate-200 transform rotate-6 origin-bottom-right transition-transform duration-500 group-hover:rotate-12" />
                    <div className="absolute inset-0 bg-slate-900 rounded-2xl shadow-2xl border border-slate-800 p-6 text-white flex flex-col">
                      <div className="flex items-center gap-3 mb-8">
                        <FileText className="w-8 h-8 text-emerald-400" />
                        <div>
                          <div className="text-sm font-bold">TAX INVOICE</div>
                          <div className="text-[10px] text-slate-400">#INV-2026-001</div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
                          <span className="text-slate-400">Classic Linen Shirt</span>
                          <span>₹1,601.70</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
                          <span className="text-slate-400">CGST (9%)</span>
                          <span>₹144.15</span>
                        </div>
                        <div className="flex justify-between text-xs border-b border-slate-800 pb-2">
                          <span className="text-slate-400">SGST (9%)</span>
                          <span>₹144.15</span>
                        </div>
                      </div>
                      <div className="mt-auto pt-4 flex justify-between items-end border-t border-slate-800">
                        <span className="text-sm text-slate-400">Total</span>
                        <span className="text-2xl font-bold text-emerald-400">₹1,890.00</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </motion.section>
    </div>
  );
}
