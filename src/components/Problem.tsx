"use client";
// ─── BizEasy Section: Problem & Pain ─────────────────────────────────────────
// Checklist items covered: B1 (named pain), B2 (before/after), B3 (audience),
//                          B4 (local relevance)
// Design: Editorial text-left + right before/after toggle card
// Motion reason: Hierarchy (pain points stagger on scroll), State Transition (toggle)

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import {
  ChatCircleDots,
  CurrencyInr,
  ListDashes,
  CheckCircle,
  WarningCircle,
} from "@phosphor-icons/react";

const PAINS = [
  {
    icon: ChatCircleDots,
    label: "Orders buried in threads",
    detail: "Customers message at midnight. You wake up to 40 unread chats and no idea what was ordered.",
  },
  {
    icon: CurrencyInr,
    label: "No way to collect payment",
    detail: "UPI links get lost. Customers forget. You chase payments instead of running your shop.",
  },
  {
    icon: ListDashes,
    label: "No real catalogue",
    detail: "You re-send the same photos and prices in every conversation, every single day.",
  },
];

const BEFORE_MESSAGES = [
  { time: "11:48 pm", text: "bhai 2 shirts size L dena", sender: "Ravi" },
  { time: "11:51 pm", text: "price kya hai for the blue one", sender: "Priya" },
  { time: "11:52 pm", text: "available hai? kal chahiye urgent", sender: "Sunita" },
  { time: "11:59 pm", text: "mera order confirm hua?", sender: "Ravi" },
  { time: "12:03 am", text: "hello?? order hua ya nahi", sender: "Priya" },
];

const AFTER_ORDERS = [
  { id: "#1048", name: "Ravi Kumar", item: "Blue Kurta x2, Size L", status: "Paid", amount: "Rs.1,490" },
  { id: "#1049", name: "Priya Sharma", item: "Floral Suit x1", status: "Pending", amount: "Rs.750" },
  { id: "#1050", name: "Sunita Devi", item: "Cotton Saree x1", status: "Paid", amount: "Rs.1,200" },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};

const slideVariants = {
  enter: (dir: number) => ({ x: dir * 40, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] as [number, number, number, number] } },
  exit: (dir: number) => ({ x: dir * -40, opacity: 0, transition: { duration: 0.25, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] as [number, number, number, number] } }),
};

export default function Problem() {
  const [showAfter, setShowAfter] = useState(false);
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="problem"
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: "var(--biz-canvas)" }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: "radial-gradient(circle, #02006F 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 items-start">

          <motion.div
            variants={shouldReduce ? {} : containerVariants}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex flex-col gap-8 lg:pt-4"
          >
            <motion.div variants={shouldReduce ? {} : itemVariants}>
              <span
                className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase"
                style={{ color: "var(--biz-navy)" }}
              >
                The Problem
              </span>
            </motion.div>

            <motion.div variants={shouldReduce ? {} : itemVariants} className="space-y-3">
              <h2
                className="font-bold leading-[0.95] tracking-tight"
                style={{
                  fontSize: "clamp(2.5rem, 5vw, 4.25rem)",
                  color: "var(--biz-ink)",
                  fontFamily: "var(--font-outfit, sans-serif)",
                }}
              >
                Running your shop on WhatsApp was{" "}
                <em style={{ fontFamily: "Georgia, serif" }}>supposed</em>{" "}
                to be simple.
              </h2>
              <p className="text-[1.125rem] leading-relaxed" style={{ color: "var(--biz-steel)" }}>
                It is not.
              </p>
            </motion.div>

            <motion.ul
              variants={shouldReduce ? {} : containerVariants}
              className="flex flex-col gap-5"
            >
              {PAINS.map(({ icon: Icon, label, detail }) => (
                <motion.li
                  key={label}
                  variants={shouldReduce ? {} : itemVariants}
                  className="flex gap-4 items-start"
                >
                  <div
                    className="mt-0.5 flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: "rgba(2, 0, 111, 0.07)" }}
                  >
                    <Icon size={18} weight="duotone" style={{ color: "var(--biz-navy)" }} />
                  </div>
                  <div>
                    <p className="font-semibold text-[0.9375rem]" style={{ color: "var(--biz-ink)" }}>
                      {label}
                    </p>
                    <p className="text-sm leading-relaxed mt-0.5" style={{ color: "var(--biz-steel)" }}>
                      {detail}
                    </p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.p
              variants={shouldReduce ? {} : itemVariants}
              className="text-sm font-semibold"
              style={{ color: "var(--biz-navy)" }}
            >
              Built for WhatsApp &amp; Instagram sellers in India
            </motion.p>
          </motion.div>

          <motion.div
            initial={shouldReduce ? {} : { opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative"
          >
            <div className="flex rounded-full p-1 mb-6 w-fit" style={{ background: "var(--biz-mist)" }}>
              <button
                onClick={() => setShowAfter(false)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: !showAfter ? "#fff" : "transparent",
                  color: !showAfter ? "var(--biz-ink)" : "var(--biz-steel)",
                  boxShadow: !showAfter ? "var(--biz-shadow-sm)" : "none",
                }}
              >
                <WarningCircle size={14} weight="fill" style={{ color: !showAfter ? "#ef4444" : "var(--biz-steel)" }} />
                Without BizEasy
              </button>
              <button
                onClick={() => setShowAfter(true)}
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
                style={{
                  background: showAfter ? "var(--biz-navy)" : "transparent",
                  color: showAfter ? "#fff" : "var(--biz-steel)",
                }}
              >
                <CheckCircle size={14} weight="fill" style={{ color: showAfter ? "#86efac" : "var(--biz-steel)" }} />
                With BizEasy
              </button>
            </div>

            <div
              className="rounded-[28px] overflow-hidden relative"
              style={{ background: "#fff", boxShadow: "var(--biz-shadow-lg)", minHeight: 340 }}
            >
              <div
                className="px-5 py-3 flex items-center gap-2 border-b"
                style={{
                  background: showAfter ? "var(--biz-navy)" : "#1e1e1e",
                  borderColor: "rgba(255,255,255,0.08)",
                  transition: "background 0.35s ease",
                }}
              >
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="w-3 h-3 rounded-full bg-yellow-400" />
                  <span className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <span className="ml-2 text-xs text-white/60 font-mono">
                  {showAfter ? "BizEasy — Orders" : "WhatsApp"}
                </span>
              </div>

              <div className="relative overflow-hidden" style={{ minHeight: 296 }}>
                <AnimatePresence mode="wait" custom={showAfter ? 1 : -1}>
                  {!showAfter ? (
                    <motion.div
                      key="before"
                      custom={-1}
                      variants={shouldReduce ? {} : slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 p-5 flex flex-col gap-3"
                    >
                      <p className="text-xs" style={{ color: "var(--biz-steel)" }}>Business Inbox</p>
                      {BEFORE_MESSAGES.map((msg, i) => (
                        <div key={i} className="flex gap-2 items-start">
                          <div className="w-7 h-7 rounded-full bg-gray-200 flex-shrink-0 flex items-center justify-center">
                            <span className="text-[9px] font-bold text-gray-500">{msg.sender[0]}</span>
                          </div>
                          <div>
                            <div className="flex gap-2 items-baseline">
                              <span className="text-xs font-semibold text-gray-700">{msg.sender}</span>
                              <span className="text-[10px] text-gray-400">{msg.time}</span>
                            </div>
                            <p className="text-xs text-gray-600 mt-0.5">{msg.text}</p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-2 px-3 py-2 rounded-xl bg-red-50 border border-red-100 flex items-center gap-2">
                        <WarningCircle size={14} weight="fill" className="text-red-400 flex-shrink-0" />
                        <p className="text-[11px] text-red-600">3 orders unanswered — No payment received</p>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="after"
                      custom={1}
                      variants={shouldReduce ? {} : slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      className="absolute inset-0 p-5 flex flex-col gap-3"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-xs" style={{ color: "var(--biz-steel)" }}>Today orders</p>
                        <span className="text-xs font-semibold" style={{ color: "var(--biz-navy)" }}>Rs.3,440 collected</span>
                      </div>
                      {AFTER_ORDERS.map((order) => (
                        <div
                          key={order.id}
                          className="flex items-center gap-3 rounded-xl px-3 py-2.5"
                          style={{ background: "var(--biz-canvas)" }}
                        >
                          <div
                            className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-white"
                            style={{ background: "var(--biz-navy)" }}
                          >
                            {order.id.replace("#", "")}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-gray-800 truncate">{order.name}</p>
                            <p className="text-[10px] text-gray-500 truncate">{order.item}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <p className="text-xs font-bold" style={{ color: "var(--biz-ink)" }}>{order.amount}</p>
                            <p className="text-[10px]" style={{ color: order.status === "Paid" ? "#16a34a" : "var(--biz-steel)" }}>
                              {order.status === "Paid" ? "Paid" : "Pending"}
                            </p>
                          </div>
                        </div>
                      ))}
                      <div className="mt-1 px-3 py-2 rounded-xl bg-green-50 border border-green-100 flex items-center gap-2">
                        <CheckCircle size={14} weight="fill" className="text-green-500 flex-shrink-0" />
                        <p className="text-[11px] text-green-700">All orders captured — UPI auto-collected</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              initial={shouldReduce ? {} : { opacity: 0, scale: 0.9, y: 8 }}
              animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="absolute -bottom-4 -left-4 flex items-center gap-2 bg-white rounded-2xl px-4 py-2.5"
              style={{ boxShadow: "var(--biz-shadow-md)" }}
            >
              <span className="text-base">🇮🇳</span>
              <span className="text-xs font-semibold" style={{ color: "var(--biz-ink)" }}>2,400+ sellers across India</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

