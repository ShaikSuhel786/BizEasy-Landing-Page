"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import NumberFlow from "@number-flow/react";
import { Check, X, Star } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  tagline: string;
  price: { monthly: number; yearly: number };
  features: { text: string; included: boolean }[];
  cta: string;
  highlighted?: boolean;
  noCard?: boolean;
};

const PLANS: Plan[] = [
  {
    id: "free",
    name: "Free Forever",
    tagline: "Perfect to start your shop",
    price: { monthly: 0, yearly: 0 },
    features: [
      { text: "Up to 50 orders / month", included: true },
      { text: "WhatsApp chatbot", included: true },
      { text: "Product catalogue (10 items)", included: true },
      { text: "GST invoicing", included: false },
      { text: "Instagram orders", included: false },
      { text: "Analytics dashboard", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start Free",
    noCard: true,
  },
  {
    id: "pro",
    name: "Pro",
    tagline: "For growing shops",
    price: { monthly: 499, yearly: 399 },
    features: [
      { text: "Unlimited orders", included: true },
      { text: "WhatsApp chatbot", included: true },
      { text: "Unlimited catalogue", included: true },
      { text: "GST invoicing & PDF export", included: true },
      { text: "Instagram DM orders", included: true },
      { text: "Analytics dashboard", included: true },
      { text: "Priority support (< 4 hr)", included: true },
    ],
    cta: "Upgrade to Pro",
    highlighted: true,
  },
];

const itemVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

export default function Pricing() {
  const [freq, setFreq] = useState<"monthly" | "yearly">("monthly");
  const shouldReduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      id="pricing"
      ref={sectionRef}
      className="relative py-24 md:py-32"
      style={{ background: "#fff" }}
    >
      <div className="mx-auto max-w-5xl px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="text-center mb-12"
        >
          <span
            className="inline-block text-[11px] font-semibold tracking-[0.15em] uppercase mb-4"
            style={{ color: "var(--biz-navy)" }}
          >
            Pricing
          </span>
          <h2
            className="font-bold tracking-tight mb-4"
            style={{ fontSize: "clamp(2rem, 4vw, 3rem)", color: "var(--biz-ink)", fontFamily: "var(--font-outfit, sans-serif)" }}
          >
            Simple. No surprises.
          </h2>
          <p className="text-[1.0625rem] leading-relaxed max-w-xl mx-auto" style={{ color: "var(--biz-steel)" }}>
            Start free and upgrade only when you need more. No hidden transaction fees. Cancel anytime.
          </p>

          {/* Frequency toggle */}
          <div className="flex items-center justify-center gap-3 mt-8">
            <div className="flex rounded-full p-1" style={{ background: "var(--biz-canvas)" }}>
              {(["monthly", "yearly"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setFreq(f)}
                  className="relative px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200"
                  style={{
                    background: freq === f ? "#fff" : "transparent",
                    color: freq === f ? "var(--biz-ink)" : "var(--biz-steel)",
                    boxShadow: freq === f ? "var(--biz-shadow-sm)" : "none",
                    textTransform: "capitalize",
                  }}
                >
                  {f}
                </button>
              ))}
            </div>
            <AnimatePresence>
              {freq === "yearly" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0.85, x: -8 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.85, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(2, 0, 111, 0.08)", color: "var(--biz-navy)" }}
                >
                  Save 20%
                </motion.span>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start max-w-3xl mx-auto">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              custom={i}
              variants={shouldReduce ? {} : itemVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
              className="relative flex flex-col rounded-[28px] overflow-hidden"
              style={{
                background: plan.highlighted ? "var(--biz-navy)" : "#fff",
                border: plan.highlighted ? "none" : "1.5px solid var(--biz-mist)",
                boxShadow: plan.highlighted ? "var(--biz-shadow-lg)" : "var(--biz-shadow-sm)",
                transform: plan.highlighted ? "scale(1.03)" : "scale(1)",
              }}
            >
              {/* Recommended badge */}
              {plan.highlighted && (
                <div className="absolute top-4 right-4 flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/10 text-white text-[11px] font-semibold">
                  <Star size={10} className="fill-current" />
                  Recommended
                </div>
              )}

              {/* Card header */}
              <div className="px-7 pt-8 pb-6">
                <p
                  className="text-[11px] font-semibold tracking-[0.12em] uppercase mb-2"
                  style={{ color: plan.highlighted ? "rgba(255,255,255,0.6)" : "var(--biz-steel)" }}
                >
                  {plan.tagline}
                </p>
                <h3
                  className="text-xl font-bold mb-4"
                  style={{ color: plan.highlighted ? "#fff" : "var(--biz-ink)" }}
                >
                  {plan.name}
                </h3>

                {/* Price */}
                <div className="flex items-end gap-1 mb-1">
                  {plan.price.monthly === 0 ? (
                    <span
                      className="text-4xl font-bold"
                      style={{ color: plan.highlighted ? "#fff" : "var(--biz-ink)" }}
                    >
                      Free
                    </span>
                  ) : (
                    <>
                      <span style={{ color: plan.highlighted ? "rgba(255,255,255,0.7)" : "var(--biz-steel)", fontSize: 20, fontWeight: 500 }}>
                        Rs.
                      </span>
                      <NumberFlow
                        value={freq === "yearly" ? plan.price.yearly : plan.price.monthly}
                        className="text-4xl font-bold"
                        style={{ color: plan.highlighted ? "#fff" : "var(--biz-ink)" } as React.CSSProperties}
                      />
                      <span
                        className="text-sm mb-1.5"
                        style={{ color: plan.highlighted ? "rgba(255,255,255,0.55)" : "var(--biz-steel)" }}
                      >
                        /month
                      </span>
                    </>
                  )}
                </div>
                <p
                  className="text-[11px]"
                  style={{ color: plan.highlighted ? "rgba(255,255,255,0.45)" : "var(--biz-steel)" }}
                >
                  {plan.price.monthly === 0
                    ? "Forever free — no card required"
                    : `Billed ${freq} · No transaction fees`}
                </p>
              </div>

              {/* Divider */}
              <div
                className="mx-7"
                style={{ height: 1, background: plan.highlighted ? "rgba(255,255,255,0.1)" : "var(--biz-mist)" }}
              />

              {/* Features */}
              <div className="px-7 py-6 flex-1 flex flex-col gap-3">
                {plan.features.map((feat) => (
                  <div key={feat.text} className="flex items-center gap-2.5">
                    {feat.included ? (
                      <Check
                        size={15}
                        strokeWidth={2.5}
                        className="flex-shrink-0"
                        style={{ color: plan.highlighted ? "#86efac" : "var(--biz-navy)" }}
                      />
                    ) : (
                      <X size={15} strokeWidth={2} className="flex-shrink-0 text-gray-300" />
                    )}
                    <span
                      className="text-[0.875rem]"
                      style={{
                        color: feat.included
                          ? plan.highlighted ? "#fff" : "var(--biz-ink)"
                          : plan.highlighted ? "rgba(255,255,255,0.3)" : "#d1d5db",
                      }}
                    >
                      {feat.text}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <div className="px-7 pb-8">
                <button
                  className="w-full py-3.5 rounded-full text-sm font-semibold transition-all duration-200 hover:opacity-90 active:scale-[0.98]"
                  style={{
                    background: plan.highlighted ? "#fff" : "var(--biz-navy)",
                    color: plan.highlighted ? "var(--biz-navy)" : "#fff",
                  }}
                >
                  {plan.cta}
                </button>
                {plan.noCard && (
                  <p className="text-center text-[11px] mt-2" style={{ color: "var(--biz-steel)" }}>
                    No credit card required
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Upgrade trigger — Checklist F5 */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6, duration: 0.4 }}
          className="text-center text-sm mt-10"
          style={{ color: "var(--biz-steel)" }}
        >
          Hit the 50-order limit? Upgrade to Pro in one tap - your catalogue and orders move with you.
        </motion.p>
      </div>
    </section>
  );
}

