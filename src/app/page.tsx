"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Problem from "@/components/Problem";
import TextRevealScroll from "@/components/TextRevealScroll";
import Features from "@/components/Features";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function LandingPage() {
  const [stage, setStage] = useState(0);

  return (
    <main className="relative min-h-screen bg-white">
      <Nav stage={stage} />
      <Hero stage={stage} setStage={setStage} />
      <SocialProof />
      <Problem />
      {/* <TextRevealScroll text="Managing WhatsApp orders manually takes hours. Automating with BizEasy takes minutes. Instant UPI payments. Automated GST invoicing. No human intervention needed." /> */}
      <Features />
      <Pricing />
      <FAQ />
    </main>
  );
}
