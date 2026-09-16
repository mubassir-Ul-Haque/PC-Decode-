import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.07, // Faster, less "sludgy" overall friction for desktop
      wheelMultiplier: 0.7, // Slightly faster desktop scroll
      smoothTouch: false, // Disables Lenis on touch devices, returning to native mobile scroll
      syncTouch: false, // Ensures native mobile scroll isn't hijacked
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
