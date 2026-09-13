import React from "react";

interface PhoneMockupProps {
  children: React.ReactNode;
  hideUI?: boolean;
}

export function PhoneMockup({ children, hideUI = false }: PhoneMockupProps) {
  return (
    // Exact bounding box of the iPhone screen measured directly from phone-1.png (296x652 in 1280x853)
    <div 
      className="absolute z-50 pointer-events-none select-none"
      style={{
        top: '12.19%',
        left: '38.44%',
        width: '23.12%',
        height: '76.44%',
        containerType: 'inline-size'
      }}
    >
      <div 
        className="relative w-full h-full overflow-hidden"
        style={{
          borderRadius: '13cqw',
          clipPath: 'inset(0 0 0 0 round 13cqw)'
        }}
      >
        {/* Screen Children (Edge-to-Edge) */}
        <div className="absolute inset-0 w-full h-full flex flex-col">
          {children}
        </div>

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
