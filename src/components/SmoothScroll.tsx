import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.04, // This creates an extremely smooth, heavy, "buttery" friction
      wheelMultiplier: 0.5, // Slows down desktop mouse wheel
      touchMultiplier: 0.25, // Extremely reduced so one swipe barely moves the page down
      syncTouch: true, // Forces touch to use Lenis smoothing
      syncTouchLerp: 0.04, // Matches the heavy friction for touch
    });

    // Synchronize Lenis scrolling with GSAP's ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
    // This ensures that Lenis and GSAP are using the same heartbeat
    const raf = (time: number) => {
      lenis.raf(time * 1000);
    };
    
    gsap.ticker.add(raf);

    // Prevent GSAP from putting the ticker to sleep, 
    // to ensure smooth scrolling even when there are no active tweens
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(raf);
    };
  }, []);

  return <>{children}</>;
}
