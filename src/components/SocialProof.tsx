"use client";

import { Command, Hexagon, Sparkles, Triangle, Box, Layers, Activity, Cpu } from "lucide-react";

export default function SocialProof() {
  const logos = [
    { name: "Acme Corp", icon: Triangle },
    { name: "Globex", icon: Hexagon },
    { name: "Soylent", icon: Sparkles },
    { name: "Initech", icon: Command },
    { name: "Umbrella", icon: Box },
    { name: "Hooli", icon: Layers },
    { name: "Stark Ind", icon: Activity },
    { name: "Cyberdyne", icon: Cpu },
  ];

  // We duplicate the array to create a seamless infinite loop
  const duplicatedLogos = [...logos, ...logos];

  return (
    <section className="py-24 bg-white relative overflow-hidden z-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 mb-12">
        <p className="text-center text-sm font-semibold tracking-widest text-gray-400 uppercase">
          Trusted by forward-thinking brands
        </p>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex">
        {/* Left and Right gradients for smooth fade out */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />

        <div className="flex animate-marquee whitespace-nowrap min-w-full hover:[animation-play-state:paused]">
          {duplicatedLogos.map((logo, index) => {
            const Icon = logo.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-center gap-2 mx-12 md:mx-16 text-gray-300 hover:text-gray-600 transition-colors duration-300 cursor-default"
              >
                <Icon className="w-8 h-8" strokeWidth={1.5} />
                <span className="text-xl font-bold tracking-tight">{logo.name}</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
