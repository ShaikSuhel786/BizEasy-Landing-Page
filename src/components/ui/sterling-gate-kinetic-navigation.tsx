import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";
import { createPortal } from "react-dom";
import { MorphIcon } from "morphicons/react";
import { Menu, X } from "lucide";




// Register GSAP Plugins safely
if (typeof window !== "undefined") {
  gsap.registerPlugin(CustomEase);
}

export function Component({ onToggle }: { onToggle?: (isOpen: boolean) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const isOpen = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Menu Timeline Setup
  useEffect(() => {
    if (!mounted || !overlayRef.current || !containerRef.current) return;

    try {
      if (!gsap.parseEase("main")) {
        CustomEase.create("main", "0.65, 0.01, 0.05, 0.99");
        gsap.defaults({ ease: "main", duration: 0.7 });
      }
    } catch (e) {
      console.warn("CustomEase failed to load, falling back to default.", e);
      gsap.defaults({ ease: "power2.out", duration: 0.7 });
    }

    const ctx = gsap.context(() => {
      const navWrap = overlayRef.current!.querySelector(".nav-overlay-wrapper");
      const menu = overlayRef.current!.querySelector(".menu-content");
      const overlay = overlayRef.current!.querySelector(".overlay");
      const bgPanels = overlayRef.current!.querySelectorAll(".backdrop-layer");
      const menuLinksText = overlayRef.current!.querySelectorAll(".nav-link-text");
      const fadeTargets = overlayRef.current!.querySelectorAll("[data-menu-fade]");
      
      // Initial Setup
      gsap.set(navWrap, { display: "none" });
      gsap.set(overlay, { autoAlpha: 0 });
      gsap.set(menu, { xPercent: 120 });
      gsap.set(bgPanels, { xPercent: 101 });
      gsap.set(menuLinksText, { yPercent: 140, rotate: 10 });
      gsap.set(fadeTargets, { autoAlpha: 0, yPercent: 30 });

      // Create a single paused timeline
      tl.current = gsap.timeline({ paused: true })
        .set(navWrap, { display: "block" })
        .to(overlay, { autoAlpha: 1, duration: 0.4 })
        .to(menu, { xPercent: 0, duration: 0.7, ease: "main" }, "<")
        .to(bgPanels, { xPercent: 0, stagger: 0.1, duration: 0.6, ease: "main" }, "<")
        // Stagger in the menu link text
        .to(menuLinksText, { yPercent: 0, rotate: 0, stagger: 0.08, duration: 0.6, ease: "back.out(1.2)" }, "<+=0.3")
        .to(fadeTargets, { autoAlpha: 1, yPercent: 0, stagger: 0.05, duration: 0.5, ease: "power2.out" }, "<+=0.2");

    });

    return () => ctx.revert();
  }, [mounted]);

  // Handle open/close toggles directly avoiding React re-renders for fluid GSAP animation
  const toggleMenu = () => {
    if (!tl.current) return;
    if (isOpen.current) {
      tl.current.timeScale(1.3).reverse();
      isOpen.current = false;
      setIsMenuOpen(false);
      onToggle?.(false);
    } else {
      tl.current.timeScale(1).play();
      isOpen.current = true;
      setIsMenuOpen(true);
      onToggle?.(true);
    }
  };

  const closeMenu = () => {
    if (!tl.current || !isOpen.current) return;
    tl.current.timeScale(1.3).reverse();
    isOpen.current = false;
    setIsMenuOpen(false);
    onToggle?.(false);
  };

  // Handle Escape Key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen.current) {
        closeMenu();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Ambient Shape Hover Effects
  useEffect(() => {
    if (!mounted || !overlayRef.current) return;

    const ctx = gsap.context(() => {
      const menuItems = overlayRef.current!.querySelectorAll(".menu-list-item[data-shape]");
      const shapesContainer = overlayRef.current!.querySelector(".ambient-background-shapes");
      
      menuItems.forEach((item) => {
        const shapeIndex = item.getAttribute("data-shape");
        const shape = shapesContainer ? shapesContainer.querySelector(`.bg-shape-${shapeIndex}`) : null;
        if (!shape) return;

        const shapeEls = shape.querySelectorAll(".shape-element");

        const onEnter = () => {
          if (shapesContainer) {
            shapesContainer.querySelectorAll(".bg-shape").forEach((s) => s.classList.remove("active"));
          }
          shape.classList.add("active");
          gsap.fromTo(shapeEls, 
            { scale: 0.5, opacity: 0, rotation: -10 },
            { scale: 1, opacity: 1, rotation: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.7)", overwrite: "auto" }
          );
        };
        
        const onLeave = () => {
          gsap.to(shapeEls, {
            scale: 0.8, opacity: 0, duration: 0.3, ease: "power2.in",
            onComplete: () => shape.classList.remove("active"),
            overwrite: "auto"
          });
        };

        item.addEventListener("mouseenter", onEnter);
        item.addEventListener("mouseleave", onLeave);
        
        (item as any)._cleanup = () => {
          item.removeEventListener("mouseenter", onEnter);
          item.removeEventListener("mouseleave", onLeave);
        };
      });
    }, overlayRef);

    return () => {
      ctx.revert();
      if (overlayRef.current) {
        const items = overlayRef.current.querySelectorAll(".menu-list-item[data-shape]");
        items.forEach((item: any) => item._cleanup && item._cleanup());
      }
    };
  }, [mounted]);

  return (
    <div ref={containerRef} className="md:hidden">
      {/* Restored exact header structure for the toggle button, replacing Webflow layout with Tailwind flex */}
      <div className="site-header-wrapper">
        <header className="header">
          <div className="container is--full">
            <nav className="nav-row flex items-center justify-end">
              <div className="nav-row__right flex items-center gap-4">
               
                
                {/* Premium Toggle Button with tactile feedback */}
                <button 
                  role="button" 
                  aria-label="Toggle navigation menu"
                  className="nav-close-btn flex items-center justify-center w-12 h-12 rounded-full bg-black text-white hover:bg-gray-800 active:scale-95 transition-[transform,background-color] duration-150 ease-out pointer-events-auto cursor-pointer select-none" 
                  onClick={toggleMenu}
                >
                  <MorphIcon icon={isMenuOpen ? X : Menu} />
                </button>
              </div>
            </nav>
          </div>
        </header>
      </div>

      {/* Fullscreen Overlay using Portal to bypass z-index and overflow constraints */}
      {mounted && createPortal(
        <section ref={overlayRef} className="fullscreen-menu-container dark">
          <div data-lenis-prevent className="nav-overlay-wrapper fixed inset-0 z-[110] w-full h-full pointer-events-auto" style={{ display: 'none' }}>
            <div className="overlay absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={closeMenu}></div>
            
            <nav className="menu-content absolute top-0 right-0 h-full w-full sm:w-[85vw] sm:max-w-md overflow-hidden shadow-2xl border-l border-border rounded-l-2xl sm:rounded-none">
              
              {/* Background Layers matching premium dark aesthetic */}
              <div className="menu-bg absolute inset-0">
                <div className="backdrop-layer first absolute inset-0 bg-background"></div>
                <div className="backdrop-layer second absolute inset-0 bg-card"></div>
                <div className="backdrop-layer absolute inset-0 bg-background/80 backdrop-blur-3xl shadow-inner"></div>

                {/* Abstract shapes container using brand tokens */}
                <div className="ambient-background-shapes absolute inset-0 opacity-40 pointer-events-none mix-blend-screen">
                  {/* Shape 1: Floating circles */}
                  <svg className="bg-shape bg-shape-1 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                    <circle className="shape-element fill-primary/20" cx="80" cy="120" r="40" />
                    <circle className="shape-element fill-secondary/30" cx="300" cy="80" r="60" />
                    <circle className="shape-element fill-accent/20" cx="200" cy="300" r="80" />
                    <circle className="shape-element fill-primary/20" cx="350" cy="280" r="30" />
                  </svg>

                  {/* Shape 2: Wave pattern */}
                  <svg className="bg-shape bg-shape-2 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                    <path className="shape-element stroke-primary/30" d="M0 200 Q100 100, 200 200 T 400 200" strokeWidth="60" fill="none" />
                    <path className="shape-element stroke-secondary/30" d="M0 280 Q100 180, 200 280 T 400 280" strokeWidth="40" fill="none" />
                  </svg>

                  {/* Shape 3: Grid dots */}
                  <svg className="bg-shape bg-shape-3 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                    <circle className="shape-element fill-primary/30" cx="50" cy="50" r="8" />
                    <circle className="shape-element fill-secondary/30" cx="150" cy="50" r="8" />
                    <circle className="shape-element fill-accent/30" cx="250" cy="50" r="8" />
                    <circle className="shape-element fill-primary/30" cx="350" cy="50" r="8" />
                    <circle className="shape-element fill-secondary/30" cx="100" cy="150" r="12" />
                    <circle className="shape-element fill-accent/30" cx="200" cy="150" r="12" />
                    <circle className="shape-element fill-primary/30" cx="300" cy="150" r="12" />
                    <circle className="shape-element fill-accent/30" cx="50" cy="250" r="10" />
                    <circle className="shape-element fill-primary/30" cx="150" cy="250" r="10" />
                    <circle className="shape-element fill-secondary/30" cx="250" cy="250" r="10" />
                    <circle className="shape-element fill-accent/30" cx="350" cy="250" r="10" />
                  </svg>

                  {/* Shape 4: Organic blobs */}
                  <svg className="bg-shape bg-shape-4 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                    <path className="shape-element fill-primary/20" d="M100 100 Q150 50, 200 100 Q250 150, 200 200 Q150 250, 100 200 Q50 150, 100 100" />
                    <path className="shape-element fill-accent/20" d="M250 200 Q300 150, 350 200 Q400 250, 350 300 Q400 250, 350 300 Q300 350, 250 300 Q200 250, 250 200" />
                  </svg>

                  {/* Shape 5: Diagonal lines */}
                  <svg className="bg-shape bg-shape-5 absolute inset-0 w-full h-full" viewBox="0 0 400 400" fill="none">
                    <line className="shape-element stroke-primary/30" x1="0" y1="100" x2="300" y2="400" strokeWidth="30" />
                    <line className="shape-element stroke-secondary/30" x1="100" y1="0" x2="400" y2="300" strokeWidth="25" />
                    <line className="shape-element stroke-accent/30" x1="200" y1="0" x2="400" y2="200" strokeWidth="20" />
                  </svg>
                </div>
              </div>

              <div className="menu-content-wrapper relative z-10 flex flex-col justify-center h-full px-8 py-16" style={{ perspective: "1000px" }}>
                <ul className="menu-list flex flex-col gap-5">
                  {/* Note: overflow-hidden on li masks the nav-link-text while it animates from yPercent 140! */}
                  <li className="menu-list-item relative group overflow-hidden" data-shape="1">
                    <a href="#how-it-works" onClick={closeMenu} className="nav-link block w-full text-5xl sm:text-6xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors duration-300 drop-shadow-sm">
                      <div className="nav-link-text inline-block origin-bottom-left m-0">How it works</div>
                      <div className="nav-link-hover-bg"></div>
                    </a>
                  </li>
                  <li className="menu-list-item relative group overflow-hidden" data-shape="2">
                    <a href="#features" onClick={closeMenu} className="nav-link block w-full text-5xl sm:text-6xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors duration-300 drop-shadow-sm">
                      <div className="nav-link-text inline-block origin-bottom-left m-0">Features</div>
                      <div className="nav-link-hover-bg"></div>
                    </a>
                  </li>
                  <li className="menu-list-item relative group overflow-hidden" data-shape="3">
                    <a href="#customers" onClick={closeMenu} className="nav-link block w-full text-5xl sm:text-6xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors duration-300 drop-shadow-sm">
                      <div className="nav-link-text inline-block origin-bottom-left m-0">Customers</div>
                      <div className="nav-link-hover-bg"></div>
                    </a>
                  </li>
                  <li className="menu-list-item relative group overflow-hidden" data-shape="4">
                    <a href="#features" onClick={closeMenu} className="nav-link block w-full text-5xl sm:text-6xl font-black uppercase tracking-tighter text-foreground hover:text-primary transition-colors duration-300 drop-shadow-sm">
                      <div className="nav-link-text inline-block origin-bottom-left m-0" data-menu-fade>Pricing</div>
                      <div className="nav-link-hover-bg"></div>
                    </a>
                  </li>
                </ul>
                <div className="mt-12 flex items-center gap-4 text-foreground/70" data-menu-fade>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <span className="font-bold text-lg text-primary">EN</span>
                  </div>
                  <span className="text-border">|</span>
                  <div className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors">
                    <span className="font-medium text-lg">తెలుగు</span>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </section>,
        document.body
      )}
    </div>
  );
}
