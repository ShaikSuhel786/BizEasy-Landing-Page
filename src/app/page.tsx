"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
import TextRevealScroll from "@/components/TextRevealScroll";

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────
export default function LandingPage() {
  const [stage, setStage] = useState(0);

  return (
    <main className="relative min-h-screen bg-white">
      <Nav stage={stage} />
      <Hero stage={stage} setStage={setStage} />
      <SocialProof />
      <TextRevealScroll text="Managing WhatsApp orders manually takes hours. Automating with BizEasy takes minutes. Instant UPI payments. Automated GST invoicing. No human intervention needed." />
      <Features />
    </main>
  );
}
