"use client";

import { useState } from "react";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import EcosystemNarrative from "@/components/EcosystemNarrative";
// import SocialProof from "@/components/SocialProof";
import Features from "@/components/Features";
// import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const [stage, setStage] = useState(0);

  return (
    <main className="relative min-h-screen bg-zinc-950">
      <Nav stage={stage} />
      
      <div className="relative z-10 bg-[#f4f5f6] rounded-b-[2rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <Hero stage={stage} setStage={setStage} />
        <EcosystemNarrative />
        {/* <SocialProof /> */}
        <Features />
        {/* <Pricing /> */}
        <FAQ />
      </div>
      
      <div className="relative z-0">
        <Footer />
      </div>
    </main>
  );
}