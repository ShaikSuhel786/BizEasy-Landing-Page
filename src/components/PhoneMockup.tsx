import React from "react";
import Image from "next/image";

interface PhoneMockupProps {
  children: React.ReactNode;
  hideUI?: boolean;
  statusBarStyle?: "white" | "black";
}

export function PhoneMockup({ 
  children, 
  hideUI = false,
  statusBarStyle = "white" 
}: PhoneMockupProps) {
  return (
    // Exact calibrated bounding box of the iPhone screen inside phone-1.png (1280x853)
    // Starts safely inside the black bezel to guarantee 0px white edge leakage
    <div 
      className="absolute z-10 pointer-events-none select-none"
      style={{
        top: '11.72%',
        left: '38.2%',
        width: '23.59%',
        height: '77.14%',
        containerType: 'inline-size'
      }}
    >
      <div 
        className="relative w-full h-full overflow-hidden"
        style={{
          borderRadius: '12.5cqw',
          clipPath: 'inset(0 0 0 0 round 12.5cqw)'
        }}
      >
        {/* Screen Children (Edge-to-Edge) */}
        <div className="absolute inset-0 w-full h-full flex flex-col">
          {children}
        </div>

        {/* ── REAL IPHONE 16 PRO STATUS BAR OVERLAY ────────────────────────── */}
        {!hideUI && (
          <div className="absolute top-0 left-0 right-0 z-30 pointer-events-none w-full aspect-[1608/248] select-none">
            <Image
              src={
                statusBarStyle === "white"
                  ? "/mockify/status-bar/iPhone 16 Pro and 16 Max Status Bar White.png"
                  : "/mockify/status-bar/iPhone 16 Pro and 16 Max Status Bar Black.png"
              }
              alt="iPhone 16 Pro Status Bar"
              fill
              className="object-contain object-top pointer-events-none"
              priority
              draggable={false}
            />
          </div>
        )}

        {/* iOS Home Indicator Bar */}
        {!hideUI && (
          <div className="absolute bottom-1.5 inset-x-0 flex justify-center pointer-events-none z-30">
            <div className="w-[36%] h-[3px] bg-[#0f172a]/70 rounded-full" />
          </div>
        )}
      </div>
    </div>
  );
}
