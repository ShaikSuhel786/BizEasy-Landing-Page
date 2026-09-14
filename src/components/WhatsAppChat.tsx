"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion, type Variants } from "framer-motion";

// ─── WhatsApp Exact Color Tokens ────────────────────────────────────────────
const WA = {
  headerBg: "#075E54",
  headerBgDark: "#054C44",
  chatBg: "#ECE5DD",
  chatBgPattern: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.035'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
  incomingBg: "#FFFFFF",
  outgoingBg: "#D9FDD3",
  incomingText: "#111B21",
  outgoingText: "#111B21",
  timestamp: "#667781",
  ticks: "#53BDEB",
  inputBg: "#FFFFFF",
  inputBarBg: "#F0F2F5",
  onlineGreen: "#00A884",
  linkBlue: "#027EB5",
  dividerText: "#667781",
  dividerLine: "#DADADA",
  listButtonBg: "#FFFFFF",
  listButtonBorder: "#E9EDEF",
};

// ─── Framer Variants (GPU-safe: only transform + opacity + subtle blur bridge) ──
const EASE_EXPO = [0.16, 1, 0.3, 1] as [number, number, number, number];
const EASE_OUT_SUBTLE = [0.32, 0.72, 0, 1] as [number, number, number, number];

const msgIn: Variants = {
  hidden: { opacity: 0, y: 8, scale: 0.96 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.28, ease: EASE_EXPO } },
  exit: { opacity: 0, y: -4, transition: { duration: 0.18, ease: EASE_OUT_SUBTLE } },
};

const sceneVariants: Variants = {
  enter: { opacity: 0, filter: "blur(2px)" },
  center: { opacity: 1, filter: "blur(0px)", transition: { duration: 0.32, ease: EASE_EXPO } },
  exit: { opacity: 0, filter: "blur(2px)", transition: { duration: 0.18, ease: EASE_OUT_SUBTLE } },
};

// ─── Double tick (blue) ──────────────────────────────────────────────────────
function DoubleTick({ color = WA.ticks }: { color?: string }) {
  return (
    <svg width="12" height="9" viewBox="0 0 15 11" fill="none" style={{ display: "inline-block", verticalAlign: "middle", marginLeft: 2 }}>
      <path d="M1 5.5L4.5 9L10 1" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 5.5L8.5 9L14 1" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// ─── Message Timestamp ───────────────────────────────────────────────────────
function Ts({ time, isOut }: { time: string; isOut?: boolean }) {
  return (
    <span className="inline-flex items-center gap-0.5 ml-1.5 translate-y-[1px]" style={{ color: WA.timestamp, fontSize: 8.5, lineHeight: 1, whiteSpace: "nowrap" }}>
      {time}
      {isOut && <DoubleTick />}
    </span>
  );
}

// ─── Incoming bubble ─────────────────────────────────────────────────────────
function InMsg({ children, time, delay = 0, showTail = true }: { children: React.ReactNode; time: string; delay?: number; showTail?: boolean }) {
  return (
    <motion.div variants={msgIn} initial="hidden" animate="show" transition={{ delay }} className="flex items-end gap-1 self-start max-w-[88%]">
      <div className="relative">
        {showTail && (
          <svg className="absolute -left-[6px] top-0" width="7" height="11" viewBox="0 0 8 13" fill="none">
            <path d="M7 0C7 0 0 4 0 13L8 13L8 0L7 0Z" fill={WA.incomingBg} />
          </svg>
        )}
        <div
          className="rounded-lg rounded-tl-xs px-2.5 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
          style={{ background: WA.incomingBg, color: WA.incomingText, fontSize: 11, lineHeight: "15px" }}
        >
          <div className="flex flex-col">
            <div>{children}</div>
            <div className="flex justify-end items-center mt-[1px]">
              <Ts time={time} />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Outgoing bubble ─────────────────────────────────────────────────────────
function OutMsg({ children, time, delay = 0, showTail = true }: { children: React.ReactNode; time: string; delay?: number; showTail?: boolean }) {
  return (
    <motion.div variants={msgIn} initial="hidden" animate="show" transition={{ delay }} className="flex items-end gap-1 self-end max-w-[88%]">
      <div className="relative">
        {showTail && (
          <svg className="absolute -right-[6px] top-0" width="7" height="11" viewBox="0 0 8 13" fill="none">
            <path d="M1 0C1 0 8 4 8 13L0 13L0 0L1 0Z" fill={WA.outgoingBg} />
          </svg>
        )}
        <div
          className="rounded-lg rounded-tr-xs px-2.5 py-1.5 shadow-[0_1px_1px_rgba(0,0,0,0.1)]"
          style={{ background: WA.outgoingBg, color: WA.outgoingText, fontSize: 11, lineHeight: "15px" }}
        >
          <div className="flex flex-col">
            <div>{children}</div>
            <div className="flex justify-end items-center mt-[1px]">
              <Ts time={time} isOut />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Date Divider ────────────────────────────────────────────────────────────
function DateDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-center my-0.5">
      <span className="text-[9px] px-2 py-0.5 rounded-full shadow-xs font-medium" style={{ color: WA.dividerText, background: "#D1D7DB" }}>
        {label}
      </span>
    </div>
  );
}

// ─── Product Card (WhatsApp catalogue style) ─────────────────────────────────
function ProductCard({ name, price, desc, time, delay = 0 }: { name: string; price: string; desc: string; time: string; delay?: number }) {
  return (
    <motion.div variants={msgIn} initial="hidden" animate="show" transition={{ delay }} className="self-start max-w-[88%]">
      <div className="relative">
        <svg className="absolute -left-[6px] top-0" width="7" height="11" viewBox="0 0 8 13" fill="none">
          <path d="M7 0C7 0 0 4 0 13L8 13L8 0L7 0Z" fill={WA.incomingBg} />
        </svg>
        <div className="rounded-lg rounded-tl-xs overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/5" style={{ background: WA.incomingBg }}>
          {/* Image banner */}
          <div className="w-full h-[54px] flex items-center justify-center relative overflow-hidden bg-gradient-to-tr from-slate-900 via-indigo-950 to-slate-800">
            <span style={{ fontSize: 24 }}>👗</span>
            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-1 right-2 text-white font-bold text-[10px] bg-black/40 px-1 rounded">
              {price}
            </span>
          </div>
          <div className="px-2 pt-1.5 pb-1">
            <p className="font-semibold text-slate-900" style={{ fontSize: 11, lineHeight: "14px" }}>{name}</p>
            <p style={{ fontSize: 9.5, color: WA.timestamp, lineHeight: "12px", marginTop: 1 }}>{desc}</p>
            <div className="flex justify-end mt-1"><Ts time={time} /></div>
          </div>
          {/* Add to cart button with Emil's tactile active feedback */}
          <motion.div 
            whileHover={{ backgroundColor: "rgba(0, 168, 132, 0.08)" }}
            whileTap={{ scale: 0.96 }}
            className="border-t flex items-center justify-center py-1 gap-1 bg-slate-50/50 cursor-pointer select-none transition-colors duration-150" 
            style={{ borderColor: "#E9EDEF" }}
          >
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={WA.onlineGreen} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
            </svg>
            <span style={{ color: WA.onlineGreen, fontSize: 10, fontWeight: 600 }}>Add to cart</span>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── UPI Payment Card ────────────────────────────────────────────────────────
function UPICard({ amount, upiId, orderId, time, delay = 0 }: { amount: string; upiId: string; orderId: string; time: string; delay?: number }) {
  return (
    <motion.div variants={msgIn} initial="hidden" animate="show" transition={{ delay }} className="self-start max-w-[90%]">
      <div className="relative">
        <svg className="absolute -left-[6px] top-0" width="7" height="11" viewBox="0 0 8 13" fill="none">
          <path d="M7 0C7 0 0 4 0 13L8 13L8 0L7 0Z" fill={WA.incomingBg} />
        </svg>
        <div className="rounded-lg rounded-tl-xs overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/5" style={{ background: WA.incomingBg }}>
          <div className="px-2 pt-1.5 pb-1">
            <p style={{ fontSize: 10.5, color: WA.incomingText, fontWeight: 500 }}>✅ Payment link ready</p>
          </div>
          <div className="mx-1.5 mb-1.5 rounded overflow-hidden border" style={{ borderColor: "#E9EDEF" }}>
            <div className="px-2 py-1.5 bg-gradient-to-r from-[#00A884] to-[#128C7E] flex items-center justify-between">
              <div>
                <p className="text-white font-bold text-[12px] leading-none">₹{amount}</p>
                <p className="text-white/80 text-[8.5px] mt-0.5">Order #{orderId}</p>
              </div>
              <span className="text-[8px] bg-white/20 text-white font-bold px-1 py-0.5 rounded font-mono">UPI</span>
            </div>
            <motion.div 
              whileHover={{ backgroundColor: "#F0F2F5" }}
              whileTap={{ scale: 0.97 }}
              className="px-2 py-1 bg-[#F8F9FA] flex items-center justify-center gap-1 cursor-pointer select-none transition-colors duration-150"
            >
              <svg width="9" height="9" viewBox="0 0 24 24" fill={WA.onlineGreen}>
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <span style={{ color: WA.onlineGreen, fontSize: 9.5, fontWeight: 600 }}>Pay via GPay / PhonePe</span>
            </motion.div>
          </div>
          <div className="px-2 pb-1 flex justify-end"><Ts time={time} /></div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Order Status Card ───────────────────────────────────────────────────────
function OrderStatusCard({ step, time, delay = 0 }: { step: 0 | 1 | 2 | 3; time: string; delay?: number }) {
  const steps = ["Confirmed", "Processing", "Shipped", "Delivered"];
  const icons = ["✅", "📦", "🚚", "🎉"];
  return (
    <motion.div variants={msgIn} initial="hidden" animate="show" transition={{ delay }} className="self-start max-w-[90%]">
      <div className="relative">
        <svg className="absolute -left-[6px] top-0" width="7" height="11" viewBox="0 0 8 13" fill="none">
          <path d="M7 0C7 0 0 4 0 13L8 13L8 0L7 0Z" fill={WA.incomingBg} />
        </svg>
        <div className="rounded-lg rounded-tl-xs overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/5" style={{ background: WA.incomingBg }}>
          <div className="px-2 pt-1.5">
            <p className="font-semibold text-slate-900 text-[10.5px]">🛍️ Order Status — #BZ2847</p>
          </div>
          <div className="px-2.5 py-1.5">
            {steps.map((s, i) => (
              <div key={s} className="flex items-center gap-1.5 mb-1">
                <div className="flex flex-col items-center" style={{ width: 14 }}>
                  <div className="w-[14px] h-[14px] rounded-full flex items-center justify-center shrink-0 transition-colors duration-200" style={{ background: i <= step ? WA.onlineGreen : "#E9EDEF" }}>
                    {i <= step ? (
                      <svg width="8" height="8" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : (
                      <div className="w-[4px] h-[4px] rounded-full bg-gray-300" />
                    )}
                  </div>
                  {i < steps.length - 1 && (
                    <div className="w-[1.5px] h-2.5 transition-colors duration-200" style={{ background: i < step ? WA.onlineGreen : "#E9EDEF" }} />
                  )}
                </div>
                <span style={{ fontSize: 9.5, color: i <= step ? WA.incomingText : "#94A3B8", fontWeight: i === step ? 600 : 400 }}>
                  {icons[i]} {s}
                </span>
              </div>
            ))}
          </div>
          <div className="px-2 pb-1 flex justify-end"><Ts time={time} /></div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Scene 1: New Order → UPI Payment Flow ───────────────────────────────────
function Scene1({ reduced }: { reduced: boolean }) {
  const d = reduced ? 0 : 1;
  return (
    <div className="flex flex-col gap-1.5 px-2 py-1">
      <DateDivider label="Today" />
      <InMsg time="10:38 AM" delay={0 * d} showTail>
        <span>Hi! I want to order the <span className="font-semibold">Blue Kurti (M size)</span> 🛍️</span>
      </InMsg>
      <InMsg time="10:38 AM" delay={0.35 * d} showTail={false}>
        How do I pay?
      </InMsg>
      <OutMsg time="10:39 AM" delay={0.8 * d} showTail>
        <span>Noted! Here's your order summary 📋<br />
        <span className="font-semibold">Blue Kurti × 1 — ₹850</span><br />
        Delivery: ₹50<br />
        <span className="font-bold text-slate-950">Total: ₹900</span>
        </span>
      </OutMsg>
      <UPICard amount="900" upiId="priya.boutique@upi" orderId="BZ2831" time="10:39 AM" delay={1.4 * d} />
      <InMsg time="10:41 AM" delay={2.2 * d} showTail>
        ✅ Paid! Screenshot attached
      </InMsg>
      <OutMsg time="10:41 AM" delay={2.8 * d} showTail>
        <span>🎉 Payment confirmed! Your order is being packed.<br />
        <span style={{ color: WA.linkBlue, fontSize: 10 }}>Track: bizeasy.in/track/BZ2831</span></span>
      </OutMsg>
    </div>
  );
}

// ─── Scene 2: Bilingual Catalogue Browse ─────────────────────────────────────
function Scene2({ reduced }: { reduced: boolean }) {
  const d = reduced ? 0 : 1;
  return (
    <div className="flex flex-col gap-1.5 px-2 py-1">
      <DateDivider label="Today" />
      <InMsg time="2:15 PM" delay={0 * d} showTail>
        <span>
          నమస్కారం! 👋 Welcome to <span className="font-bold">BizEasy Store</span><br />
          <span style={{ color: "#64748B", fontSize: 9.5 }}>What would you like to browse?</span>
        </span>
      </InMsg>
      {/* Quick-reply compact buttons with tactile click */}
      <motion.div variants={msgIn} initial="hidden" animate="show" transition={{ delay: 0.6 * d }} className="flex flex-wrap gap-1 justify-center my-0.5">
        <motion.span 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.96 }}
          className="bg-white border border-[#E9EDEF] text-[#00A884] font-semibold text-[9.5px] px-2.5 py-1 rounded-full shadow-xs cursor-pointer select-none"
        >
          👗 దుస్తులు · Dresses
        </motion.span>
        <motion.span 
          whileHover={{ scale: 1.03 }} 
          whileTap={{ scale: 0.96 }}
          className="bg-white border border-[#E9EDEF] text-[#00A884] font-semibold text-[9.5px] px-2.5 py-1 rounded-full shadow-xs cursor-pointer select-none"
        >
          👟 చెప్పులు · Footwear
        </motion.span>
      </motion.div>
      <OutMsg time="2:15 PM" delay={1.2 * d} showTail>👗 దుస్తులు · Dresses</OutMsg>
      <ProductCard
        name="Blue Silk Kurti"
        price="₹850"
        desc="నీలం పట్టు కుర్తీ · Sizes: S, M, L, XL"
        time="2:16 PM"
        delay={1.8 * d}
      />
      <InMsg time="2:16 PM" delay={2.5 * d} showTail>
        M size కావాలి, ఒకటి order చేయండి 🙏
      </InMsg>
      <OutMsg time="2:16 PM" delay={3.1 * d} showTail>
        Done! Added to cart ✅<br />
        <span style={{ color: WA.linkBlue, fontSize: 10 }}>Proceed to checkout →</span>
      </OutMsg>
    </div>
  );
}

// ─── Scene 3: Order Tracking & Invoice ───────────────────────────────────────
function Scene3({ reduced }: { reduced: boolean }) {
  const d = reduced ? 0 : 1;
  return (
    <div className="flex flex-col gap-1.5 px-2 py-1">
      <DateDivider label="Yesterday" />
      <InMsg time="3:00 PM" delay={0 * d} showTail>
        Hi, what's the status of order #BZ2847?
      </InMsg>
      <OrderStatusCard step={2} time="3:00 PM" delay={0.6 * d} />
      <InMsg time="3:01 PM" delay={1.4 * d} showTail>
        Can I get an invoice for accounts? 📄
      </InMsg>
      <OutMsg time="3:01 PM" delay={2.0 * d} showTail>
        <span>Sure! GST invoice attached 🧾</span>
      </OutMsg>
      <motion.div variants={msgIn} initial="hidden" animate="show" transition={{ delay: 2.6 * d }}
        className="self-start max-w-[88%]"
      >
        <div className="relative">
          <svg className="absolute -left-[6px] top-0" width="7" height="11" viewBox="0 0 8 13" fill="none">
            <path d="M7 0C7 0 0 4 0 13L8 13L8 0L7 0Z" fill={WA.incomingBg} />
          </svg>
          <motion.div 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="rounded-lg rounded-tl-xs overflow-hidden shadow-[0_1px_2px_rgba(0,0,0,0.12)] border border-black/5 cursor-pointer select-none" 
            style={{ background: WA.incomingBg }}
          >
            <div className="flex items-center gap-1.5 px-2 py-1.5 border-l-3" style={{ borderColor: "#00A884" }}>
              <div className="w-7 h-7 rounded flex items-center justify-center shrink-0 bg-amber-50">
                <span style={{ fontSize: 14 }}>🧾</span>
              </div>
              <div>
                <p className="font-semibold text-[10px] text-slate-900 leading-tight">GST Invoice — BZ2847</p>
                <p style={{ fontSize: 8.5, color: WA.timestamp }}>PDF · 42 KB · BizEasy Store</p>
              </div>
            </div>
            <div className="px-2 pb-1 flex justify-end"><Ts time="3:01 PM" /></div>
          </motion.div>
        </div>
      </motion.div>
      <InMsg time="3:02 PM" delay={3.3 * d} showTail>
        Thank you so much! 🙏 Great service
      </InMsg>
    </div>
  );
}

// ─── Scene configuration ─────────────────────────────────────────────────────
const SCENES = [
  {
    id: 1,
    label: "Order & Pay",
    contact: "BizEasy Store",
    sub: "online",
    duration: 5200,
    component: Scene1,
  },
  {
    id: 2,
    label: "Browse Catalogue",
    contact: "BizEasy Store",
    sub: "online",
    duration: 5500,
    component: Scene2,
  },
  {
    id: 3,
    label: "Track & Invoice",
    contact: "BizEasy Store",
    sub: "online",
    duration: 5000,
    component: Scene3,
  },
];



// ─── WhatsApp Navigation Header Row ──────────────────────────────────────────
function WAHeader({ contact, sub }: { contact: string; sub: string }) {
  return (
    <div className="flex items-center justify-between px-2 pb-1.5 pt-0.5 select-none shrink-0">
      {/* Left: back chevron + avatar + name/status */}
      <div className="flex items-center gap-1.5 min-w-0">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 opacity-90">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
        <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 font-bold text-[10px] text-white relative shadow-xs" style={{ background: "linear-gradient(135deg, #25D366, #128C7E)" }}>
          P
          <div className="absolute bottom-0 right-0 w-1.5 h-1.5 rounded-full border border-[#075E54]" style={{ background: WA.onlineGreen }} />
        </div>
        <div className="flex flex-col min-w-0">
          <p className="text-white font-semibold truncate leading-tight" style={{ fontSize: 11.5 }}>{contact}</p>
          <p style={{ fontSize: 8.5, color: "rgba(255,255,255,0.8)", lineHeight: "10px" }}>{sub}</p>
        </div>
      </div>
      {/* Right: call icons */}
      <div className="flex items-center gap-2.5 shrink-0 opacity-90 pr-1">
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="23 7 16 12 23 17 23 7"/><rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
        </svg>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81 19.79 19.79 0 01.5 1.18 2 2 0 012.45 0h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 7.91a16 16 0 006.06 6.06l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 14.92z"/>
        </svg>
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/>
        </svg>
      </div>
    </div>
  );
}

// ─── WhatsApp Input Bar ──────────────────────────────────────────────────────
function WAInputBar() {
  return (
    <div className="h-[36px] px-2 bg-[#F0F2F5] flex items-center gap-1.5 shrink-0 select-none border-t border-[#E9EDEF]">
      <div className="flex-1 bg-white h-[26px] rounded-full px-2 flex items-center gap-1 shadow-xs">
        <span className="text-[11px] opacity-60">😊</span>
        <span className="text-[#90999F] text-[10px] flex-1">Message</span>
        <span className="text-[10px] opacity-50">📎</span>
        <span className="text-[10px] opacity-50">📷</span>
      </div>
      <div className="w-6.5 h-6.5 rounded-full bg-[#00A884] flex items-center justify-center text-white shrink-0 shadow-xs">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z"/><path d="M19 10v2a7 7 0 01-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/>
        </svg>
      </div>
    </div>
  );
}

// ─── Scene Progress Dots ─────────────────────────────────────────────────────
function SceneDots({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex justify-center gap-1 py-1 shrink-0 bg-[#F0F2F5]">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className="rounded-full transition-all duration-300"
          style={{
            width: i === current ? 14 : 4,
            height: 4,
            background: i === current ? WA.onlineGreen : "rgba(0,0,0,0.2)",
          }}
        />
      ))}
    </div>
  );
}

// ─── Main Export ─────────────────────────────────────────────────────────────
export default function WhatsAppChat() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [key, setKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const shouldReduce = useReducedMotion();

  const advance = useCallback(() => {
    setSceneIdx((prev) => (prev + 1) % SCENES.length);
    setKey((k) => k + 1);
  }, []);

  // Scene timer
  useEffect(() => {
    const duration = SCENES[sceneIdx].duration;
    timerRef.current = setTimeout(advance, duration);
    return () => { if (timerRef.current) clearTimeout(timerRef.current); };
  }, [sceneIdx, advance]);

  const scene = SCENES[sceneIdx];
  const SceneComponent = scene.component;

  return (
    <div
      className="flex flex-col w-full h-full relative select-none"
      style={{ background: WA.chatBg, contain: "layout style" }}
    >
      {/* ── Top Bar: WhatsApp Header in Solid Dark Green ── */}
      <div 
        className="shrink-0 flex flex-col shadow-xs z-10" 
        style={{ 
          background: WA.headerBg,
          paddingTop: '12.5cqw'
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`hdr-${sceneIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <WAHeader contact={scene.contact} sub={scene.sub} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Chat Body ── */}
      <div
        className="flex-1 relative overflow-hidden"
        style={{
          backgroundImage: WA.chatBgPattern,
          backgroundSize: "60px 60px",
        }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={`scene-${key}`}
            variants={sceneVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 overflow-y-auto"
            style={{ scrollbarWidth: "none", paddingBottom: 6 }}
          >
            <SceneComponent reduced={!!shouldReduce} />
          </motion.div>
        </AnimatePresence>

        {/* Bottom subtle fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-6 pointer-events-none"
          style={{ background: `linear-gradient(to top, ${WA.chatBg}EE, transparent)` }}
        />
      </div>

      {/* ── Scene Dots & Input Bar ── */}
      <SceneDots current={sceneIdx} total={SCENES.length} />
      <WAInputBar />
    </div>
  );
}
