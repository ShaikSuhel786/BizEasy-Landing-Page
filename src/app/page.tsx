"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
// import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
// import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";

export default function LandingPage() {
  const [stage, setStage] = useState(0);

  return (
    <main className="relative min-h-screen bg-white">
      <Nav stage={stage} />
      <Hero stage={stage} setStage={setStage} />
      <Problem />
      {/* <SocialProof /> */}
      <Features />
      {/* <Pricing /> */}
      <FAQ />
    </main>
  );
}
