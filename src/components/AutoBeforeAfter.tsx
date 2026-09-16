import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface AutoBeforeAfterProps {
  beforeImg: string;
  afterImg: string;
}

export function AutoBeforeAfter({ beforeImg, afterImg }: AutoBeforeAfterProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeImgRef = useRef<HTMLImageElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    if (!beforeImgRef.current || !lineRef.current) return;

    // Set initial state
    gsap.set(beforeImgRef.current, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(lineRef.current, { left: '0%' });

    timelineRef.current = gsap.timeline({ repeat: -1, yoyo: true })
      .to([beforeImgRef.current], {
        clipPath: 'inset(0 0% 0 0)',
        duration: 2.5,
        ease: 'power2.inOut',
      }, 0)
      .to([lineRef.current], {
        left: '100%',
        duration: 2.5,
        ease: 'power2.inOut',
      }, 0)
      .to({}, { duration: 1 }); // Pause at 100%

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  const handleInteractionStart = () => {
    setIsInteracting(true);
    timelineRef.current?.pause();
  };

  const handleInteractionEnd = () => {
    setIsInteracting(false);
    // Optionally resume after a delay, or keep paused
  };

  const handleMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isInteracting || !containerRef.current || !beforeImgRef.current || !lineRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    
    gsap.set(beforeImgRef.current, { clipPath: `inset(0 ${100 - percentage}% 0 0)` });
    gsap.set(lineRef.current, { left: `${percentage}%` });
  };

  return (
    <div 
      ref={containerRef}
      data-cursor="drag"
      className="relative w-full h-full overflow-hidden rounded-2xl bg-[#f2efe6] select-none border border-[#e8e6e1]"
      onMouseDown={handleInteractionStart}
      onMouseUp={handleInteractionEnd}
      onMouseLeave={handleInteractionEnd}
      onMouseMove={handleMove}
      onTouchStart={handleInteractionStart}
      onTouchEnd={handleInteractionEnd}
      onTouchMove={handleMove}
    >
      {/* Base Image (After) */}
      <img
        src={afterImg}
        alt="After"
        className="absolute inset-0 w-full h-full object-cover"
        draggable={false}
      />
      
      {/* Sweeping Image (Before) */}
      <img
        ref={beforeImgRef}
        src={beforeImg}
        alt="Before"
        className="absolute inset-0 w-full h-full object-cover z-10"
        draggable={false}
      />
      
      {/* Sweeping Divider Line */}
      <div 
        ref={lineRef}
        className="absolute top-0 bottom-0 w-[2px] bg-white z-20 shadow-[0_0_15px_rgba(255,255,255,0.7)] pointer-events-none" 
      />
    </div>
  );
}

