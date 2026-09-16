import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.8, // Increased slightly for even more smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      wheelMultiplier: 0.6, 
      touchMultiplier: 0.7, // Drastically reduced to prevent scrolling half the page in one push
      syncTouch: true, // Enables smooth scrolling for touch devices
      syncTouchLerp: 0.05, // Adds a smoother, heavier feel to touch momentum
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
