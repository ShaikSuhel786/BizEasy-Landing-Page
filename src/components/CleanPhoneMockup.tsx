import React from "react";
import { cn } from "@/lib/utils";

interface CleanPhoneMockupProps {
  children: React.ReactNode;
  className?: string;
  theme?: "light" | "dark";
}

export function CleanPhoneMockup({ children, className, theme = "dark" }: CleanPhoneMockupProps) {
  return (
    <div className={cn(
      "relative w-full aspect-[9/19.5] rounded-[48px] overflow-hidden border-[12px] shadow-2xl shrink-0 mx-auto",
      theme === "dark" 
        ? "bg-slate-950 border-slate-900 shadow-slate-900/50" 
        : "bg-white border-slate-200 shadow-slate-200/50",
      
    )}>
      {/* Dynamic Island */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 w-1/3 h-[30px] bg-black rounded-full z-50 flex items-center justify-between px-3">
        <div className="w-2 h-2 rounded-full bg-slate-800/80" />
        <div className="w-2 h-2 rounded-full bg-slate-800/80" />
      </div>
      
      {/* Power Button */}
      <div className={cn(
        "absolute right-[-14px] top-[120px] w-[3px] h-[60px] rounded-r-md",
        theme === "dark" ? "bg-slate-800" : "bg-slate-300"
      )} />
      
      {/* Volume Buttons */}
      <div className={cn(
        "absolute left-[-14px] top-[100px] w-[3px] h-[40px] rounded-l-md",
        theme === "dark" ? "bg-slate-800" : "bg-slate-300"
      )} />
      <div className={cn(
        "absolute left-[-14px] top-[150px] w-[3px] h-[40px] rounded-l-md",
        theme === "dark" ? "bg-slate-800" : "bg-slate-300"
      )} />

      {/* Screen Content */}
      <div className="relative w-full h-full bg-[#EFEAE2] overflow-hidden flex flex-col rounded-[36px]">
        {children}
      </div>
    </div>
  );
}