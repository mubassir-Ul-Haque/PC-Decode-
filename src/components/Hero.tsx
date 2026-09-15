import { useState, useEffect } from 'react';
import { ArrowRight, ShieldCheck, ChevronsRight, ChevronRight, Check } from 'lucide-react';
import { AutoBeforeAfter } from './AutoBeforeAfter';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export function Hero({ onBookClick, onExploreClick }: HeroProps) {
  // Horizontal auto-text rotating symptoms
  const [headlineIndex, setHeadlineIndex] = useState<number>(0);
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const headlineCycle = [
    { text: 'PC Slow?', suffix: 'Dust & Throttling' },
    { text: 'Running Hot?', suffix: 'Dried Thermal Compound' },
    { text: 'Making Weird Sounds?', suffix: 'Fan Bearing Friction' },
    { text: 'Dropping Frames?', suffix: 'Clock Speed Drop' }
  ];

  useEffect(() => {
    setIsMounted(true);
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % headlineCycle.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [headlineCycle.length]);

  const scrollToResults = () => {
    const el = document.getElementById('results');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else onExploreClick();
  };

  return (
    <section className="relative w-full overflow-hidden bg-[#faf9f6] pt-10 pb-16 md:pt-14 md:pb-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* LEFT 7 COLS: Copy & Value Proposition */}
          <div className="lg:col-span-7 flex flex-col items-start">
            
            {/* Eyebrow */}
            <div
              className={`inline-flex items-center gap-2 border border-[#d8d5cb] bg-[#f0eee6] rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#3b3a36] tracking-wide uppercase transition-all duration-700 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block animate-pulse"></span>
              <span>YOUR PC ISN'T "OLD" — MAYBE IT JUST NEEDS THE RIGHT DIAGNOSIS.</span>
            </div>

            {/* Main Heading with Horizontal Auto-Text Change Effect */}
            <div
              className={`mt-5 transition-all duration-700 delay-150 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <h1 
                className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#0d0f12] leading-[1.12]"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                <div className="h-[52px] sm:h-[62px] lg:h-[70px] overflow-hidden flex items-center">
                  <span
                    key={headlineIndex}
                    className="inline-block text-[#0d0f12] animate-fadeIn transition-all duration-500 will-change-transform"
                  >
                    {headlineCycle[headlineIndex].text}
                  </span>
                </div>
                <div className="mt-1">
                  <span className="inline-block bg-[#0d0f12] text-[#d9ff3d] px-3.5 py-1 rounded-xl shadow-sm hover:scale-[1.02] transition-transform">
                    We Decode It.
                  </span>
                </div>
              </h1>
            </div>

            {/* Supporting Copy */}
            <p
              className={`text-base sm:text-lg text-[#4a4d53] mt-5 leading-relaxed max-w-[580px] transition-all duration-700 delay-300 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              From dusty fans and dried-out thermal paste to GPU and motherboard faults, we find out what's actually wrong with your PC — then fix it properly.
            </p>

            {/* The Bangladeshi PC Expert Truth Box */}
            <div
              className={`mt-5 p-4 rounded-2xl bg-[#f2efe6] border border-[#e4e1d7] max-w-[560px] w-full transition-all duration-700 delay-400 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex flex-col gap-2 font-medium text-sm text-[#27292e]">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span>Diagnose first. Replace only when necessary.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span><span className="font-bold text-[#0d0f12]">"ভাই, motherboard শেষ"</span> — diagnosis ছাড়া এই কথা বলা উচিত না.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span>No random part swapping. No surprise charges.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div
              className={`mt-8 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-500 ease-out ${
                isMounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <button
                onClick={onBookClick}
                className="bg-[#0d0f12] hover:bg-[#202227] text-white font-semibold text-base rounded-full px-8 py-3.5 flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95 group hover:-translate-y-0.5"
                id="hero-cta-book-service"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 text-[#d9ff3d] transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>

              <a
                href="https://wa.me/8801700000000?text=Hello%20PCDecode!%20I%20need%20a%20consultation%20about%20my%20PC."
                target="_blank"
                rel="noreferrer"
                className="border border-[#cfccc3] hover:border-[#0d0f12] bg-white hover:bg-[#faf9f6] text-[#0d0f12] font-semibold text-base rounded-full px-7 py-3.5 flex items-center gap-2 transition-all cursor-pointer shadow-xs hover:-translate-y-0.5 active:scale-95"
                id="hero-cta-whatsapp-us"
              >
                <span>WhatsApp Us</span>
              </a>
            </div>

            {/* Small Trust Text */}
            <div
              className={`mt-6 flex items-center gap-2 text-xs font-medium text-[#64676d] transition-all duration-700 delay-600 ease-out ${
                isMounted ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Doorstep diagnostics in Dhaka • Nationwide courier intake • 30-Day service warranty</span>
            </div>
          </div>

          {/* RIGHT 5 COLS: CLEAN AUTO BEFORE/AFTER */}
          <div
            className={`lg:col-span-5 flex flex-col items-center justify-center transition-all duration-1000 delay-300 ease-out ${
              isMounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}
          >
            <div className="w-full max-w-[480px] h-[340px] sm:h-[400px] lg:h-[440px] rounded-2xl bg-white shadow-[0_10px_40px_rgba(0,0,0,0.06)] border border-[#e8e6e1] relative overflow-hidden">
              <AutoBeforeAfter 
                beforeImg="https://storage.googleapis.com/banani-generated-images/generated-images/fb644b81-c286-4178-9da3-609d86aae549.jpg"
                afterImg="https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg"
              />
            </div>
            
            {/* Sub-badge below the card */}
            <div className="mt-5 inline-flex items-center gap-2 bg-white border border-[#dedad0] rounded-full px-3.5 py-1.5 shadow-xs text-xs font-semibold text-[#0d0f12]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Home Service in Dhaka • Nationwide Courier Support</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
