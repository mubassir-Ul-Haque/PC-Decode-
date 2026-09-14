import { useState, useEffect, useRef, MouseEvent, TouchEvent, useCallback } from 'react';
import { ArrowRight, ShieldCheck, ChevronsRight, ChevronRight, Check } from 'lucide-react';

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

  // Mini Interactive Before/After Showcase for Hero
  const [sliderPct, setSliderPct] = useState<number>(45);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const miniContainerRef = useRef<HTMLDivElement>(null);

  const updateSlider = useCallback((clientX: number) => {
    if (!miniContainerRef.current) return;
    const rect = miniContainerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clamped = Math.max(0, Math.min(x, rect.width));
    setSliderPct(Math.round((clamped / rect.width) * 100));
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateSlider(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) updateSlider(e.clientX);
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (e.touches.length > 0) updateSlider(e.touches[0].clientX);
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) updateSlider(e.touches[0].clientX);
  };

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

              {/* Horizontal progression breadcrumb: pc slow >>> hot >>> making weird sounds */}
              <div className="mt-3.5 flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs sm:text-sm font-mono text-[#666a75]">
                <span className={headlineIndex === 0 ? 'text-[#0d0f12] font-bold underline decoration-[#d9ff3d] decoration-2' : ''}>
                  PC Slow
                </span>
                <ChevronsRight className="w-3.5 h-3.5 text-[#b2b0a7]" />
                <span className={headlineIndex === 1 ? 'text-[#0d0f12] font-bold underline decoration-[#d9ff3d] decoration-2' : ''}>
                  Hot
                </span>
                <ChevronsRight className="w-3.5 h-3.5 text-[#b2b0a7]" />
                <span className={headlineIndex === 2 ? 'text-[#0d0f12] font-bold underline decoration-[#d9ff3d] decoration-2' : ''}>
                  Making Weird Sounds
                </span>
                <ChevronsRight className="w-3.5 h-3.5 text-[#b2b0a7]" />
                <span className="text-[#0d0f12] font-bold bg-[#eae7dc] px-2 py-0.5 rounded">
                  PCDecode Solves It
                </span>
              </div>
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

          {/* RIGHT 5 COLS: AUTHENTIC BEFORE / AFTER WORKMANSHIP CARD */}
          <div
            className={`lg:col-span-5 flex flex-col items-center transition-all duration-1000 delay-300 ease-out ${
              isMounted ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-6'
            }`}
          >
            
            <div className="w-full max-w-[460px] bg-[#101217] text-white rounded-[28px] p-5 sm:p-6 border border-[#262a36] shadow-2xl relative transition-transform duration-500 hover:shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              
              {/* Card Header: Pure Reality, No Artificial Numbers */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#d9ff3d] inline-block"></span>
                  <span className="font-mono text-xs font-bold tracking-wider text-white">
                    REAL SERVICE WORK
                  </span>
                </div>

                <span className="bg-white/10 text-[#d9ff3d] border border-white/10 font-mono font-bold text-[10px] px-2.5 py-1 rounded-md tracking-wider uppercase">
                  Dhaka Test Bench
                </span>
              </div>

              {/* Sub-label */}
              <div className="mb-3 flex items-center justify-between text-xs">
                <span className="text-[#a0a5b4]">Case 01 • Deep Cleaning & Airflow</span>
                <span className="text-[11px] font-mono text-[#8b91a0]">Drag to compare</span>
              </div>

              {/* Mini Interactive Before/After Draggable Slider */}
              <div
                ref={miniContainerRef}
                className="relative w-full h-[240px] sm:h-[260px] rounded-2xl overflow-hidden bg-[#060709] border border-white/10 select-none cursor-ew-resize touch-none"
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleMouseUp}
              >
                {/* AFTER IMAGE (Base Layer) */}
                <div className="absolute inset-0 w-full h-full">
                  <img
                    src="https://storage.googleapis.com/banani-generated-images/generated-images/b6b9b53a-5fff-49d0-a30a-12e1da5683d3.jpg"
                    alt="After PCDecode Service"
                    className="w-full h-full object-cover select-none"
                    draggable={false}
                  />
                  <div className="absolute top-3 right-3 bg-[#d9ff3d] text-black font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                    AFTER
                  </div>
                </div>

                {/* BEFORE IMAGE (Clipped Layer on Left) */}
                <div
                  className="absolute inset-y-0 left-0 overflow-hidden z-10 will-change-[width]"
                  style={{ width: `${sliderPct}%` }}
                >
                  <div
                    className="relative h-full"
                    style={{
                      width: miniContainerRef.current ? `${miniContainerRef.current.offsetWidth}px` : '100%',
                      minWidth: '100%',
                    }}
                  >
                    <img
                      src="https://storage.googleapis.com/banani-generated-images/generated-images/fb644b81-c286-4178-9da3-609d86aae549.jpg"
                      alt="Before PCDecode Service"
                      className="absolute inset-0 w-full h-full object-cover select-none"
                      draggable={false}
                    />
                    <div className="absolute top-3 left-3 bg-black/85 text-white border border-white/20 font-mono text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-md">
                      BEFORE
                    </div>
                  </div>
                </div>

                {/* Divider Line & Subtle Minimal Handle */}
                <div
                  className="absolute top-0 bottom-0 w-[2px] bg-white z-20 shadow-[0_0_10px_rgba(255,255,255,0.8)] pointer-events-none"
                  style={{ left: `${sliderPct}%` }}
                >
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-[#0d0f12] text-white border-2 border-white flex items-center justify-center shadow-lg">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#d9ff3d]"></div>
                  </div>
                </div>
              </div>

              {/* Factual Transformation Description (No Fake Metrics) */}
              <div className="mt-3.5 grid grid-cols-2 gap-2 text-[11px]">
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="block font-mono text-[10px] text-red-400 font-bold uppercase">Before</span>
                  <span className="text-[#a0a5b4] leading-snug">Choked fins & dried thermal layer</span>
                </div>
                <div className="p-2 rounded-lg bg-white/5 border border-white/10">
                  <span className="block font-mono text-[10px] text-[#d9ff3d] font-bold uppercase">After</span>
                  <span className="text-white font-medium leading-snug">Clean fin stack & restored airflow</span>
                </div>
              </div>

              {/* Workmanship Quality Checklist */}
              <div className="mt-3 pt-3 border-t border-white/10 flex flex-col gap-1.5 text-xs text-[#b8bcc8]">
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d9ff3d] shrink-0" />
                  <span>ESD-safe anti-static teardown & cleaning</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d9ff3d] shrink-0" />
                  <span>Premium enthusiast thermal compound applied</span>
                </div>
              </div>

              {/* Action Link to Full Showcase Carousel */}
              <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                <span className="text-[#8e93a2] text-[11px]">4 Case Studies documented</span>
                <button
                  type="button"
                  onClick={scrollToResults}
                  className="inline-flex items-center gap-1 text-[#d9ff3d] hover:underline font-mono text-xs font-semibold cursor-pointer"
                >
                  <span>See full Before/After carousel</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Sub-badge below the card */}
            <div className="mt-3 inline-flex items-center gap-2 bg-white border border-[#dedad0] rounded-full px-3.5 py-1.5 shadow-xs text-xs font-semibold text-[#0d0f12]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block"></span>
              <span>Home Service in Dhaka • Nationwide Courier Support</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
