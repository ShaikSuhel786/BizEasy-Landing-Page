import React from "react";
import { Battery, Wifi, Signal } from "lucide-react";

export function PhoneMockup({ children, hideUI = false }: { children: React.ReactNode, hideUI?: boolean }) {
  return (
    // We make this a container so we can use cqw for border-radius
    <div 
      className="absolute z-50 flex flex-col justify-end pointer-events-none"
      style={{
        top: '13.5%',
        left: '37.25%',
        width: '25.5%',
        height: '74%',
        containerType: 'inline-size'
      }}
    >
      <div 
        className="absolute inset-0 border-x-4 border-t-4 border-transparent"
        style={{
          borderTopLeftRadius: '13cqw',
          borderTopRightRadius: '13cqw',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
        }}
      />
      <div 
        className="absolute inset-0 flex flex-col items-center px-2 sm:px-4"
        style={{
          borderTopLeftRadius: '13cqw',
          borderTopRightRadius: '13cqw',
          borderBottomLeftRadius: '0',
          borderBottomRightRadius: '0',
        }}
      >
        {/* --- STATUS BAR --- */}

        {/* --- CHILDREN (Scrollable/Masked Content) --- */}
        <div 
          className="absolute inset-0 flex flex-col items-center px-2 sm:px-4"
          style={{
            paddingTop: '12%',
            paddingBottom: '20%',
            clipPath: 'inset(0 0 0 0 round 15cqw)' // Masks children strictly to the phone screen
          }}
        >
          {children}
        </div>

        {/* --- HOME INDICATOR --- */}
        {!hideUI && (
          <div className="absolute bottom-2 inset-x-0 flex justify-center pointer-events-none z-20">
            <div className="w-[35%] h-1 sm:h-1.5 bg-[#0f172a] rounded-full opacity-80" />
          </div>
        )}
      </div>
    </div>
  );
}
