import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, CheckCircle2, Star } from 'lucide-react';
import { AutoBeforeAfter } from './AutoBeforeAfter';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void; // Kept for interface compatibility with App.tsx
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
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % HERO_CASES.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const currentCase = HERO_CASES[activeIndex];

  return (
    <section className="relative w-full overflow-hidden bg-[#faf9f6] pt-12 pb-0 md:pt-16 md:pb-0 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center pb-12 md:pb-16">
          
          {/* LEFT SIDE: STORY + CTA */}
          <div className="lg:col-span-6 flex flex-col items-start z-10">
            <div
              className={`transition-all duration-700 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <h1 className="font-heading text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-bold tracking-tight text-[#0d0f12] leading-[1.05] uppercase">
                PC PROBLEMS?<br />
                WE FIND THE REAL CAUSE.
              </h1>
            </div>

            <div
              className={`mt-4 sm:mt-5 h-[36px] sm:h-[44px] overflow-hidden flex items-center transition-all duration-700 delay-150 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span
                key={activeIndex}
                className="inline-block text-[#0d0f12] font-mono text-xl sm:text-2xl font-bold bg-[#d9ff3d] px-3.5 py-1.5 rounded-md animate-fadeIn"
              >
                {currentCase.problem}
              </span>
            </div>

            <p
              className={`text-base sm:text-lg text-[#4a4d53] mt-6 leading-relaxed max-w-[540px] transition-all duration-700 delay-300 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              From cleaning and thermal maintenance to hardware diagnosis and repair — we find the problem first, explain it clearly, then fix it properly.
            </p>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-400 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={onBookClick}
                className="bg-[#0d0f12] hover:bg-[#202227] text-white font-semibold text-base rounded-full px-8 py-3.5 flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 group hover:-translate-y-0.5"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 text-[#d9ff3d] transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <a
                href="https://wa.me/8801700000000?text=Hello%20PCDecode!%20I%20need%20a%20consultation%20about%20my%20PC."
                target="_blank"
                rel="noreferrer"
                className="border border-[#cfccc3] hover:border-[#0d0f12] bg-white hover:bg-[#faf9f6] text-[#0d0f12] font-semibold text-base rounded-full px-7 py-3.5 flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:-translate-y-0.5 active:scale-95"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Compact Trust Statement */}
            <div
              className={`mt-6 flex items-center gap-2 text-[13px] font-medium text-[#64676d] transition-all duration-700 delay-500 ease-out ${
                isMounted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-[#0d0f12] opacity-80 shrink-0" />
              <span>Diagnose first • Customer approval • Test before return</span>
            </div>
          </div>

          {/* RIGHT SIDE: PROOF & REVIEW */}
          <div
            className={`lg:col-span-6 flex flex-col gap-5 lg:pl-6 transition-all duration-1000 delay-300 ease-out ${
              isMounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}
          >
            {/* Visual Work Proof */}
            <div className="w-full h-[280px] sm:h-[340px] lg:h-[360px] rounded-2xl bg-white shadow-[0_15px_40px_rgba(0,0,0,0.06)] border border-[#e8e6e1] relative overflow-hidden">
              <AutoBeforeAfter 
                beforeImg="https://storage.googleapis.com/banani-generated-images/generated-images/fb644b81-c286-4178-9da3-609d86aae549.jpg"
                afterImg="https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg"
              />
              {/* Subtle Floating Label */}
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur border border-[#e8e6e1] px-3 py-1.5 rounded-full shadow-sm flex items-center gap-2 z-30">
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
      <div className={`border-t border-[#e8e6e1] bg-white py-4 sm:py-5 transition-all duration-1000 delay-500 ease-out ${isMounted ? 'opacity-100' : 'opacity-0'}`}>
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
