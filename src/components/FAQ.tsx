"use client";

import { useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { Plus, Minus } from "@phosphor-icons/react";
import { useState } from "react";

const FAQS: { q: string; a: string; category: "H1" | "H2" | "H3" | "H4" | "extra" }[] = [
  {
    q: "Is BizEasy really free forever?",
    a: "Yes. The Free plan is genuinely free with no expiry — no credit card needed, no surprise charges after a trial. You get up to 50 orders per month, a WhatsApp chatbot, and a basic catalogue. Upgrade to Pro only when your shop grows past that.",
    category: "H1",
  },
  {
    q: "What happens to my customer data?",
    a: "Your data is yours. We never sell, share, or use your customer information for any purpose other than running BizEasy for you. Data is stored in India on SOC2-compliant infrastructure. You can export or delete everything anytime.",
    category: "H2",
  },
  {
    q: "I already have a WhatsApp catalogue — do I start over?",
    a: "No. BizEasy sits alongside your existing WhatsApp account and catalogue. You can import your existing product list in minutes. There is no disruption to ongoing conversations or your current setup.",
    category: "H3",
  },
  {
    q: "How do I get help if I get stuck?",
    a: "Free plan users get community support via our WhatsApp group — typically answered within a business day. Pro users get priority support with a guaranteed response in under 4 hours, directly on WhatsApp.",
    category: "H4",
  },
  {
    q: "Does my customer need to download anything?",
    a: "No. Your customers order right from the WhatsApp chat they already use on their phone. Nothing to install, no new app to learn. It just works.",
    category: "extra",
  },
  {
    q: "Which payment methods are supported?",
    a: "BizEasy supports all major UPI apps — GPay, PhonePe, Paytm, BHIM, and bank UPI IDs. You can also accept COD (Cash on Delivery). Online card payments are coming on Pro in Q4 2026.",
    category: "extra",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="faq"
      ref={sectionRef}
      className="relative py-12 md:py-16"
      style={{ background: "var(--biz-canvas)" }}
    >
      <div className="mx-auto max-w-2xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="mb-12"
        >
          <span
            className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase mb-4"
            style={{ color: "var(--biz-navy)" }}
          >
            Questions
          </span>
          <h2
            className="font-bold tracking-tight"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
              color: "var(--biz-ink)",
              fontFamily: "var(--font-outfit, sans-serif)",
            }}
          >
            FAQs
          </h2>
        </motion.div>

        {/* Accordion */}
        <div className="flex flex-col">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                className="border-t"
                style={{ borderColor: "var(--biz-mist)" }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4 group"
                  aria-expanded={isOpen}
                >
                  <span
                    className="font-semibold text-[0.9375rem] leading-snug group-hover:opacity-80 transition-opacity"
                    style={{ color: "var(--biz-ink)" }}
                  >
                    {item.q}
                  </span>
                  <span
                    className="flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-200"
                    style={{
                      background: isOpen ? "var(--biz-navy)" : "var(--biz-mist)",
                    }}
                  >
                    {isOpen ? (
                      <Minus size={13} weight="bold" className="text-white" />
                    ) : (
                      <Plus size={13} weight="bold" style={{ color: "var(--biz-ink)" }} />
                    )}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={shouldReduce ? {} : { height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={shouldReduce ? {} : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        className="text-sm leading-relaxed pb-6 pr-10"
                        style={{ color: "var(--biz-steel)" }}
                      >
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
          {/* Last border */}
          <div className="border-t" style={{ borderColor: "var(--biz-mist)" }} />
        </div>

        {/* Still have questions? */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="mt-10 text-center"
        >
          <p className="text-sm" style={{ color: "var(--biz-steel)" }}>
            Still have a question?{" "}
            <a
              href="https://wa.me/919999999999?text=Hi%2C+I+have+a+question+about+BizEasy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2"
              style={{ color: "var(--biz-navy)" }}
            >
              Chat with us on WhatsApp
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

