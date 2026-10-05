"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Package, FileText, ShieldCheck, Smartphone, Bot, ArrowRight, CheckCircle2, TrendingUp, Search, Bell } from "lucide-react";

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen bg-[#fafafa] py-24 md:py-32 overflow-hidden selection:bg-[#25D366]/20"
    >
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-100/50 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-emerald-100/40 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-16 md:mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-semibold mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Complete Business OS</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-[#0f172a] mb-6"
          >
            Everything you need to <br className="hidden md:block" /> run your business.
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-[#64748b] font-medium"
          >
            From inventory to invoicing, BizEasy provides a seamless, mobile-first experience designed for modern merchants.
          </motion.p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[420px] md:auto-rows-[450px]">
          
          {/* Card 1: The Process Carousel (Spans 2 columns on desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="md:col-span-2 row-span-1 bg-white rounded-3xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group"
          >
            <div className="p-8 pb-4 shrink-0 flex justify-between items-end">
              <div>
                <div className="flex items-center gap-2 text-[#0f172a] font-bold mb-2">
                  <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center"><Smartphone className="w-4 h-4" /></div>
                  The BizEasy Flow
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#0f172a]">Swipe through the process</h3>
              </div>
              <div className="hidden md:flex gap-1">
                <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
                <div className="w-2 h-2 rounded-full bg-slate-200"></div>
              </div>
            </div>
            
            {/* Native Scroll Snap Carousel */}
            <div className="flex-1 w-full overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 px-8 flex gap-6 mt-4">
              
              {/* Step 1 */}
              <div className="snap-center shrink-0 w-[85%] md:w-[320px] h-full bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="text-xs font-bold text-blue-600 bg-blue-50 inline-flex px-2.5 py-1 rounded-full w-max mb-4">Step 1</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Dashboard & Inventory</h4>
                <p className="text-sm text-slate-500 mb-6">Track your daily sales and manage your catalogue instantly.</p>
                <div className="mt-auto bg-white rounded-xl p-3 shadow-sm border border-slate-100 flex gap-3 items-center">
                  <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center"><Package className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <div className="text-sm font-bold text-slate-900">Add Product</div>
                    <div className="text-xs text-slate-500">Scan Barcode</div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="snap-center shrink-0 w-[85%] md:w-[320px] h-full bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="text-xs font-bold text-purple-600 bg-purple-50 inline-flex px-2.5 py-1 rounded-full w-max mb-4">Step 2</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Create Order</h4>
                <p className="text-sm text-slate-500 mb-6">Select products and link them to a customer profile.</p>
                <div className="mt-auto bg-white rounded-xl p-3 shadow-sm border border-slate-100 space-y-2">
                  <div className="h-2 w-full bg-slate-100 rounded-full"></div>
                  <div className="h-2 w-2/3 bg-slate-100 rounded-full"></div>
                  <div className="flex justify-between items-center pt-2">
                    <div className="text-xs font-bold text-slate-900">₹4,500</div>
                    <div className="text-[10px] font-bold text-white bg-slate-900 px-2 py-1 rounded-md">Checkout</div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="snap-center shrink-0 w-[85%] md:w-[320px] h-full bg-slate-50 rounded-2xl border border-slate-100 p-6 flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                <div className="text-xs font-bold text-emerald-600 bg-emerald-50 inline-flex px-2.5 py-1 rounded-full w-max mb-4">Step 3</div>
                <h4 className="text-lg font-bold text-slate-900 mb-2">Invoice & Payment</h4>
                <p className="text-sm text-slate-500 mb-6">Generate GST invoices and record UPI payments instantly.</p>
                <div className="mt-auto bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    <span className="text-sm font-bold text-slate-900">Paid fully</span>
                  </div>
                  <FileText className="w-5 h-5 text-slate-400" />
                </div>
              </div>

            </div>
          </motion.div>

          {/* Card 2: Analytics (Spans 1 column, tall) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="md:col-span-1 row-span-1 bg-[#0f172a] rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden flex flex-col relative group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="p-8 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-6 backdrop-blur-md border border-white/10 text-white">
                <TrendingUp className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-white mb-2">Business Insights</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Visual summaries of your daily revenue and recent orders.
              </p>
              
              <div className="space-y-4">
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors cursor-default">
                  <div className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">Revenue Today</div>
                  <div className="text-3xl font-bold text-white tracking-tight">₹14,500</div>
                  <div className="text-emerald-400 text-xs font-bold mt-2 flex items-center gap-1">
                    ↑ 12% vs yesterday
                  </div>
                </div>
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 backdrop-blur-md">
                   {/* Mini SVG Chart mimicking a sparkline */}
                   <svg viewBox="0 0 100 30" className="w-full h-12 overflow-visible">
                     <path d="M0,25 Q10,25 20,15 T40,20 T60,5 T80,10 T100,0" fill="none" stroke="#60A5FA" strokeWidth="2.5" strokeLinecap="round" />
                   </svg>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Inventory */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="md:col-span-1 row-span-1 bg-white rounded-3xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group relative"
          >
            <div className="p-8 pb-0">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center mb-4 text-indigo-600">
                <Package className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#0f172a] mb-2">Smart Inventory</h3>
              <p className="text-slate-500 text-sm">Track low-stock items and manage your catalogue seamlessly.</p>
            </div>
            
            <div className="mt-auto pt-8 px-6 pb-0 relative">
               <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
               <div className="bg-slate-50 rounded-t-2xl border border-slate-100 p-4 space-y-3 shadow-inner group-hover:-translate-y-2 transition-transform duration-500">
                 {[1, 2].map(i => (
                   <div key={i} className="flex gap-3 items-center bg-white p-3 rounded-xl shadow-sm border border-black/5">
                     <div className="w-10 h-10 bg-slate-100 rounded-lg shrink-0"></div>
                     <div className="flex-1">
                       <div className="h-2 w-16 bg-slate-200 rounded-full mb-2"></div>
                       <div className="h-2 w-10 bg-slate-100 rounded-full"></div>
                     </div>
                     <div className="text-[10px] font-bold text-red-600 bg-red-50 px-2 py-1 rounded-full whitespace-nowrap">Low Stock</div>
                   </div>
                 ))}
               </div>
            </div>
          </motion.div>

          {/* Card 4: Ledger & Invoicing */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="md:col-span-1 row-span-1 bg-white rounded-3xl border border-black/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden flex flex-col group relative"
          >
            <div className="p-8 pb-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center mb-4 text-emerald-600">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#0f172a] mb-2">Digital Ledger</h3>
              <p className="text-slate-500 text-sm">Keep track of customer dues and automatically generate GST invoices.</p>
            </div>
            
            <div className="mt-auto p-6 relative">
               <div className="bg-slate-900 rounded-2xl p-5 shadow-lg group-hover:scale-[1.02] transition-transform duration-500">
                 <div className="text-slate-400 text-xs font-medium mb-1">Total Outstanding</div>
                 <div className="text-2xl font-bold text-white mb-4">₹42,800</div>
                 <button className="w-full py-2.5 bg-emerald-500 hover:bg-emerald-400 text-white text-sm font-bold rounded-xl transition-colors">
                   Send Reminders
                 </button>
               </div>
            </div>
          </motion.div>

          {/* Card 5: AI & WhatsApp Automation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="md:col-span-1 row-span-1 bg-[#efeae2] rounded-3xl border border-[#d1c9bd] shadow-[0_8px_30px_rgb(0,0,0,0.08)] overflow-hidden flex flex-col relative group"
          >
            {/* WhatsApp Doodle Pattern Background */}
            <div className="absolute inset-0 opacity-[0.06] mix-blend-multiply pointer-events-none" style={{ backgroundImage: "url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png')", backgroundSize: "250px" }}></div>
            
            <div className="p-8 pb-0 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-[#25D366] flex items-center justify-center mb-4 text-white shadow-lg shadow-[#25D366]/20">
                <Bot className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-bold tracking-tight text-[#0f172a] mb-2">WhatsApp Bot</h3>
              <p className="text-[#54656f] text-sm">Capture orders 24/7 automatically while you sleep.</p>
            </div>
            
            <div className="mt-auto p-6 relative z-10">
               <div className="flex flex-col gap-2 group-hover:-translate-y-2 transition-transform duration-500">
                 <div className="self-start bg-white text-[#111b21] px-3 py-2 rounded-xl rounded-tl-none shadow-sm text-xs max-w-[85%] border border-black/5">
                   I want to order 5 units.
                 </div>
                 <div className="self-end bg-[#d9fdd3] text-[#111b21] px-3 py-2 rounded-xl rounded-tr-none shadow-sm text-xs max-w-[85%] border border-black/5">
                   Got it! I've created your order. You can pay here:
                   <div className="mt-1.5 bg-white/50 p-1.5 rounded-lg border border-black/5 text-[10px] font-bold flex items-center justify-between">
                     Pay ₹6,000 <ArrowRight className="w-3 h-3" />
                   </div>
                 </div>
               </div>
            </div>
          </motion.div>

        </div>
      </div>
      
      {/* Hide scrollbar utility for the carousel */}
      <style dangerouslySetInnerHTML={{__html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}