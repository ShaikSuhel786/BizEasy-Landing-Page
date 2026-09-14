"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import "lenis/dist/lenis.css";

interface SmoothScrollProps {
  children: React.ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // Respect accessibility settings for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    // Initialize Lenis smooth scroll engine (autoRaf: false ensures single-source ticker with GSAP)
    const lenis = new Lenis({
      autoRaf: false,
      duration: 0.95,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.2,
      infinite: false,
    });

    lenisRef.current = lenis;

    // Register ScrollTrigger plugin if on browser
    if (typeof window !== "undefined") {
      gsap.registerPlugin(ScrollTrigger);
    }

    // Connect Lenis scroll updates to GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Sync GSAP's high-performance ticker with Lenis requestAnimationFrame
    const updateTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateTicker);
    gsap.ticker.lagSmoothing(0);

    // Trigger an initial refresh of ScrollTrigger once Lenis is active
    ScrollTrigger.refresh();

    // Smooth anchor navigation for all in-page jump links (e.g. href="#features")
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        const targetElement = document.querySelector(href);
        if (targetElement) {
          e.preventDefault();
          lenis.scrollTo(targetElement as HTMLElement, {
            offset: -80,
            duration: 1.2,
            easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      }
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      gsap.ticker.remove(updateTicker);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
