import { useState, useEffect, useRef } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Star, MessageSquare } from 'lucide-react';
import { AutoBeforeAfter } from './AutoBeforeAfter';
import gsap from 'gsap';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

const HERO_CASES = [
  {
    problem: 'Dropping Frames?',
    reviewText: 'Clear diagnosis, proper explanation, and the PC came back working exactly as expected.',
    reviewAuthor: 'Verified Customer'
  },
  {
    problem: 'Running Hot?',
    reviewText: 'Temperatures dropped by 20 degrees. It feels like a brand new machine again.',
    reviewAuthor: 'Verified Customer'
  },
  {
    problem: 'Making Weird Noise?',
    reviewText: 'They found the faulty fan bearing instantly and replaced it without trying to upsell me.',
    reviewAuthor: 'Verified Customer'
  },
  {
    problem: 'No Display?',
    reviewText: 'Thought my GPU was dead. PCDecode cleaned the PCIe slot and saved me thousands.',
    reviewAuthor: 'Verified Customer'
  }
];

export function Hero({ onBookClick }: HeroProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Initial GSAP animation sequence
    if (!heroRef.current) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Background appears
      tl.fromTo('.hero-bg-svg', { opacity: 0 }, { opacity: 0.2, duration: 1.5 }, 0.2);

      // 2. Headline reveals through mask
      tl.fromTo('.hero-headline-line', 
        { y: '100%', opacity: 0 }, 
        { y: '0%', opacity: 1, duration: 1, stagger: 0.15 }, 
        0.4
      );

      // 3. Supporting label
      tl.fromTo('.hero-case-label',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.75
      );

      // 4. Hero description copy
      tl.fromTo('.hero-copy',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        0.9
      );

      // 5. CTAs appear
      tl.fromTo('.hero-cta',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 },
        1.05
      );

      // 5. Main visual settles
      tl.fromTo('.hero-visual',
        { clipPath: 'inset(15% 15% 15% 15% round 16px)', scale: 1.05, opacity: 0, x: 20 },
        { clipPath: 'inset(0% 0% 0% 0% round 16px)', scale: 1, opacity: 1, x: 0, duration: 1.2, ease: 'power3.inOut' },
        0.6
      );
      
      // 6. Trust strip
      tl.fromTo('.hero-trust-strip',
        { opacity: 0 },
        { opacity: 1, duration: 1 },
        1.2
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CASES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentCase = HERO_CASES[activeIndex];

  return (
    <section ref={heroRef} className="relative w-full overflow-hidden bg-[#faf9f6] pt-12 pb-0 md:pt-16 md:pb-0 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-12 md:pb-16">
          
          {/* LEFT SIDE: STORY + CTA */}
          <div className="lg:col-span-6 flex flex-col items-start z-10 py-4 relative">
            {/* SVG Background Decoration */}
            <div className="hero-bg-svg absolute -z-10 top-[-20%] left-[-10%] opacity-0 pointer-events-none w-[300px] h-[300px]">
              <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#0d0f12" strokeWidth="0.5"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#grid)" />
              </svg>
            </div>

            <div className="relative pb-2 w-full">
              <h1 className="font-heading text-[12.5vw] sm:text-[9vw] md:text-[8vw] lg:text-[4.5vw] xl:text-[76px] 2xl:text-[84px] font-semibold tracking-tighter text-[#0d0f12] leading-[1.05] uppercase whitespace-nowrap">
                <div className="overflow-hidden"><span className="hero-headline-line block pr-2">PC PROBLEMS?</span></div>
                <div className="overflow-hidden"><span className="hero-headline-line block text-[#0d0f12]/70 pr-2">WE FIND THE</span></div>
                <div className="overflow-hidden"><span className="hero-headline-line block pr-2">REAL CAUSE.</span></div>
              </h1>
            </div>

            <div className="hero-case-label mt-6 sm:mt-8 h-[36px] sm:h-[44px] overflow-hidden flex items-center opacity-0">
              <span
                key={activeIndex}
                className="inline-block text-[#0d0f12] font-mono text-xl sm:text-2xl font-bold bg-[#d9ff3d] px-3.5 py-1.5 rounded-md animate-fadeIn"
              >
                {currentCase.problem}
              </span>
            </div>

            <div className="hero-copy mt-5 max-w-[560px] opacity-0">
              <p className="text-sm sm:text-base text-[#0d0f12]/75 leading-relaxed font-medium">
                From cleaning and thermal maintenance to hardware diagnosis and repair — we find the problem first, explain it clearly, then fix it properly.
              </p>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onBookClick}
                data-cursor="start"
                className="hero-cta opacity-0 bg-[#0d0f12] text-white font-semibold text-base rounded-full px-8 py-3.5 flex items-center gap-2.5 shadow-md transition-all cursor-pointer active:scale-95 btn-directional"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 text-[#d9ff3d]" />
              </button>

              <a
                href="https://wa.me/8801700000000?text=Hello%20PCDecode!%20I%20need%20a%20consultation%20about%20my%20PC."
                target="_blank"
                rel="noreferrer"
                data-cursor="click"
                className="hero-cta opacity-0 border border-[#cfccc3] bg-white text-[#0d0f12] font-semibold text-base rounded-full px-7 py-3.5 flex items-center gap-2 transition-all cursor-pointer shadow-xs active:scale-95 btn-directional overflow-hidden"
              >
                <MessageSquare className="w-4 h-4 text-[#0d0f12] z-10 relative" />
                <span className="z-10 relative">WhatsApp Us</span>
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: PROOF & REVIEW */}
          <div className="hero-visual lg:col-span-6 flex flex-col gap-5 lg:pl-6 opacity-0">
            {/* Visual Work Proof */}
            <div className="w-full h-[280px] sm:h-[340px] lg:h-[360px] rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#e8e6e1] relative overflow-hidden">
              <AutoBeforeAfter 
                disableDrag={true}
                beforeImg="https://storage.googleapis.com/banani-generated-images/generated-images/fb644b81-c286-4178-9da3-609d86aae549.jpg"
                afterImg="https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg"
              />
              {/* Subtle Floating Label */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-[#e8e6e1] px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 z-30 pointer-events-none">
                <span className="w-2 h-2 rounded-full bg-[#d9ff3d] inline-block animate-pulse"></span>
                <span className="font-mono text-[10px] font-bold text-[#0d0f12] tracking-wider uppercase">Real Service Work</span>
              </div>
            </div>

            {/* Editorial Review Block */}
            <div className="bg-white border border-[#e8e6e1] rounded-2xl p-5 sm:p-6 shadow-sm relative overflow-hidden">
               <div className="flex text-[#0d0f12] mb-3 gap-0.5">
                 {[...Array(5)].map((_, i) => (
                   <Star key={i} className="w-4 h-4 fill-[#0d0f12]" />
                 ))}
               </div>
               <p
                 key={`review-${activeIndex}`}
                 className="text-sm sm:text-base font-medium text-[#0d0f12] italic leading-relaxed animate-fadeIn"
               >
                 "{currentCase.reviewText}"
               </p>
               <div className="mt-3 font-mono text-[11px] text-[#64676d] uppercase tracking-wide font-semibold">
                 — {currentCase.reviewAuthor}
               </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* HORIZONTAL TRUST STRIP */}
      <div className="hero-trust-strip border-t border-[#e8e6e1] bg-white py-4 sm:py-5 opacity-0">
        <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
           <div className="flex flex-wrap items-center justify-between gap-4 text-xs sm:text-sm font-semibold text-[#0d0f12]">
             <div className="flex items-center gap-2">
               <Star className="w-4 h-4 text-[#d9ff3d] fill-[#0d0f12] stroke-[#0d0f12]" />
               <span>4.9/5 Customer Rating</span>
             </div>
             <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-[#e8e6e1]"></div>
             <div className="flex items-center gap-2">
               <ShieldCheck className="w-4 h-4 text-[#0d0f12]" />
               <span>30-Day Service Warranty</span>
             </div>
             <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-[#e8e6e1]"></div>
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4 text-[#0d0f12]" />
               <span>Dhaka Home Service</span>
             </div>
             <div className="hidden lg:block w-1.5 h-1.5 rounded-full bg-[#e8e6e1]"></div>
             <div className="flex items-center gap-2">
               <CheckCircle2 className="w-4 h-4 text-[#0d0f12]" />
               <span>Nationwide Courier</span>
             </div>
           </div>
        </div>
      </div>
    </section>
  );
}
