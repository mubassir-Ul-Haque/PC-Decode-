import React from 'react';

interface AutoBeforeAfterProps {
  beforeImg: string;
  afterImg: string;
}

export function AutoBeforeAfter({ beforeImg, afterImg }: AutoBeforeAfterProps) {
  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl bg-[#f2efe6] select-none border border-[#e8e6e1]">
      {/* Base Image (After) */}
      <img
        src={afterImg}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Sweeping Image (Before) */}
      <img
        src={beforeImg}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover z-10 animate-clip-sweep"
        draggable={false}
      />
      
      {/* Sweeping Divider Line */}
      <div className="absolute top-0 bottom-0 w-[2px] bg-white z-20 shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none animate-line-sweep"></div>
    </div>
  );
}
