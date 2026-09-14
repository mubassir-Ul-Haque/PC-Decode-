import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_DATA } from '../data';
import { Check, ArrowRight, Clock, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [mobileActiveIndex, setMobileActiveIndex] = useState<number>(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);

  // Detect mobile / screen resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // GSAP Horizontal Scroll Pin on Desktop
  useEffect(() => {
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const track = horizontalTrackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

    // Calculate total horizontal scroll distance
    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(trackWidth - viewportWidth + 120);
    };

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1.1,
          start: 'top top',
          end: () => `+=${Math.max(track.scrollWidth - window.innerWidth + 400, 1600)}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            setScrollProgress(self.progress);
            const total = SERVICES_DATA.length;
            const newIndex = Math.min(total - 1, Math.floor(self.progress * total));
            setActiveCardIndex(newIndex);
          },
        },
      });

      return () => {
        tween.kill();
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile]);

  // Mobile scroll tracking
  const handleMobileScroll = () => {
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const cardWidth = container.offsetWidth * 0.88;
    const newIdx = Math.round(container.scrollLeft / cardWidth);
    setMobileActiveIndex(Math.min(SERVICES_DATA.length - 1, Math.max(0, newIdx)));
  };

  const scrollMobileTo = (index: number) => {
    if (!mobileTrackRef.current) return;
    const container = mobileTrackRef.current;
    const cardWidth = container.offsetWidth * 0.88;
    container.scrollTo({
      left: index * cardWidth,
      behavior: 'smooth',
    });
    setMobileActiveIndex(index);
  };

  return (
    <section id="services" ref={sectionRef} className="w-full bg-[#0d0f12] text-white relative overflow-hidden border-b border-[#232732]">
      
      {/* ========================================================================= */}
      {/* DESKTOP PINNED HORIZONTAL SCROLL CONTAINER (lg and above) */}
      {/* ========================================================================= */}
      <div className="hidden lg:block">
        <div ref={triggerRef} className="h-screen w-full flex flex-col justify-between py-8 px-8 overflow-hidden relative">
          
          {/* Top Header Bar inside pinned viewport */}
          <div className="w-full max-w-[1400px] mx-auto flex items-end justify-between border-b border-white/10 pb-5 z-20">
            <div>
              <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 rounded-full px-3 py-1 text-xs font-mono font-bold text-[#d9ff3d] uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-[#d9ff3d] inline-block animate-pulse"></span>
                <span>PINPOINT PRECISION SERVICES</span>
              </div>
              <h2 className="font-heading text-3xl xl:text-4xl font-bold tracking-tight text-white mt-2">
                Focused on diagnosis, restoration & component-level repair.
              </h2>
            </div>

            {/* Scroll Indicator & Counter */}
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end">
                <div className="font-mono text-sm font-bold text-white flex items-center gap-1">
                  <span className="text-[#d9ff3d]">0{activeCardIndex + 1}</span>
                  <span className="text-white/30">/</span>
                  <span className="text-white/60">0{SERVICES_DATA.length}</span>
                </div>
                <span className="text-[11px] font-mono text-[#8b91a0]">
                  Scroll down to explore
                </span>
              </div>

              {/* Progress Line */}
              <div className="w-32 h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#d9ff3d] transition-all duration-150 ease-out"
                  style={{ width: `${Math.max(8, scrollProgress * 100)}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Horizontal Scrub Track (Moves Right -> Left as user scrolls down) */}
          <div className="flex-1 flex items-center overflow-visible my-auto">
            <div
              ref={horizontalTrackRef}
              className="flex items-center gap-8 pl-4 pr-32 will-change-transform"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              {SERVICES_DATA.map((service, index) => {
                const isActive = activeCardIndex === index;
                return (
                  <div
                    key={service.id}
                    className={`w-[780px] xl:w-[860px] shrink-0 h-[480px] xl:h-[520px] rounded-[28px] p-7 xl:p-8 bg-[#14161d] border transition-all duration-500 ease-out flex flex-col justify-between relative overflow-hidden group shadow-2xl ${
                      isActive
                        ? 'border-[#d9ff3d]/60 ring-1 ring-[#d9ff3d]/30 scale-100 opacity-100'
                        : 'border-white/10 scale-[0.95] opacity-80'
                    }`}
                  >
                    {/* Background subtle noise/glow */}
                    <div className="absolute top-0 right-0 -mr-20 -mt-20 w-80 h-80 bg-[#d9ff3d]/5 rounded-full blur-3xl pointer-events-none"></div>

                    {/* Top Row: Index, Category, Price */}
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#0d0f12] bg-[#d9ff3d] px-2.5 py-1 rounded-md">
                          0{service.number}
                        </span>
                        <span className="text-xs font-mono uppercase tracking-wider text-[#a0a5b4]">
                          {service.eyebrow || service.tagline}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {service.turnaround && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#a0a5b4] bg-white/5 border border-white/10 px-3 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5 text-[#d9ff3d]" />
                            <span>{service.turnaround}</span>
                          </div>
                        )}
                        <span className="text-xs font-mono font-bold text-white bg-white/10 px-3 py-1 rounded-full border border-white/15">
                          {service.startingPrice}
                        </span>
                      </div>
                    </div>

                    {/* Main Content Area: Split 2 columns (Left: Typography & Checklist, Right: Large Real Visual) */}
                    <div className="grid grid-cols-12 gap-7 items-center my-auto z-10">
                      
                      {/* Left 7 Columns: Case Description & Features */}
                      <div className="col-span-7 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading text-2xl xl:text-3xl font-bold text-white tracking-tight leading-snug">
                            {service.title}
                          </h3>
                          <p className="mt-2.5 text-sm xl:text-base text-[#a4a9b8] leading-relaxed line-clamp-3">
                            {service.copy}
                          </p>
                        </div>

                        {/* Checklist */}
                        <div className="mt-5 space-y-2 pt-4 border-t border-white/10">
                          <div className="text-[11px] font-mono font-bold uppercase text-[#8b91a0] tracking-wider">
                            Verified Protocol:
                          </div>
                          {service.features.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-xs xl:text-sm text-[#c8cddc]">
                              <Check className="w-4 h-4 text-[#d9ff3d] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right 5 Columns: Large Cinematic Case Study Imagery */}
                      <div className="col-span-5 h-[280px] xl:h-[310px] rounded-2xl overflow-hidden relative border border-white/15 group-hover:border-[#d9ff3d]/40 transition-all bg-[#08090c]">
                        {service.image && (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none"></div>
                        
                        {/* Overlay Badge */}
                        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                          <span className="bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/15">
                            Real Bench Work
                          </span>
                          <span className="text-[#d9ff3d] font-bold">
                            PCDecode Lab
                          </span>
                        </div>
                      </div>

                    </div>

                    {/* Bottom Action Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/10 z-10">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#8b91a0]">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span>Diagnose first • 30-day service warranty</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectService(service.title)}
                        className="bg-[#d9ff3d] hover:bg-[#cbf229] text-black font-semibold text-xs xl:text-sm rounded-full px-6 py-2.5 flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 group/btn"
                      >
                        <span>{service.ctaText || 'Book Service'}</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar: Quick Service Pill Navigation */}
          <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between pt-3 border-t border-white/10 z-20 text-xs">
            <div className="flex items-center gap-2">
              {SERVICES_DATA.map((s, idx) => (
                <span
                  key={s.id}
                  className={`font-mono text-xs px-3 py-1 rounded-full transition-all ${
                    activeCardIndex === idx
                      ? 'bg-[#d9ff3d] text-black font-bold'
                      : 'bg-white/5 text-[#8b91a0]'
                  }`}
                >
                  0{s.number} {s.title}
                </span>
              ))}
            </div>

            <span className="font-mono text-[#8b91a0] text-xs">
              Scroll down to transition to Why PCDecode
            </span>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET TOUCH-FRIENDLY CAROUSEL (< 1024px) */}
      {/* ========================================================================= */}
      <div className="block lg:hidden py-14 px-4 sm:px-6">
        
        {/* Mobile Header */}
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 border border-white/15 bg-white/5 rounded-full px-3 py-1 text-xs font-mono font-bold text-[#d9ff3d] uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#d9ff3d] inline-block animate-pulse"></span>
            <span>OUR SERVICES</span>
          </div>

          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-white mt-3 leading-tight">
            Focused on diagnosis, maintenance & precision repair.
          </h2>

          <p className="text-sm text-[#a0a5b4] mt-2">
            Swipe horizontally to explore all 5 specialized services.
          </p>
        </div>

        {/* Mobile Navigation Controls */}
        <div className="flex items-center justify-between mb-4">
          <div className="font-mono text-xs font-bold text-white flex items-center gap-1.5">
            <span className="text-[#d9ff3d]">0{mobileActiveIndex + 1}</span>
            <span className="text-white/40">/</span>
            <span>0{SERVICES_DATA.length}</span>
            <span className="text-xs text-[#a0a5b4] ml-2">({SERVICES_DATA[mobileActiveIndex].title})</span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.max(0, mobileActiveIndex - 1))}
              disabled={mobileActiveIndex === 0}
              className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center disabled:opacity-30 active:bg-white/20"
              aria-label="Previous service"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.min(SERVICES_DATA.length - 1, mobileActiveIndex + 1))}
              disabled={mobileActiveIndex === SERVICES_DATA.length - 1}
              className="w-8 h-8 rounded-lg bg-white/10 text-white flex items-center justify-center disabled:opacity-30 active:bg-white/20"
              aria-label="Next service"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Horizontal Snap Track */}
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="flex overflow-x-auto gap-4 no-scrollbar snap-x snap-mandatory pb-4"
        >
          {SERVICES_DATA.map((service, index) => {
            const isCurrent = mobileActiveIndex === index;
            return (
              <div
                key={service.id}
                className={`w-[88vw] max-w-[420px] shrink-0 snap-center rounded-2xl p-5 bg-[#14161d] border flex flex-col justify-between transition-all duration-300 ${
                  isCurrent ? 'border-[#d9ff3d]/60 ring-1 ring-[#d9ff3d]/30' : 'border-white/10'
                }`}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#0d0f12] bg-[#d9ff3d] px-2 py-0.5 rounded">
                      0{service.number}
                    </span>
                    <span className="text-xs font-mono font-bold text-white bg-white/10 px-2.5 py-0.5 rounded-full">
                      {service.startingPrice}
                    </span>
                  </div>

                  {/* Image */}
                  <div className="w-full h-44 rounded-xl overflow-hidden relative mb-3.5 bg-black/40 border border-white/10">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2 bg-black/75 backdrop-blur-sm text-[10px] font-mono text-[#d9ff3d] px-2 py-0.5 rounded">
                      {service.turnaround}
                    </div>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white">
                    {service.title}
                  </h3>

                  <p className="mt-1.5 text-xs text-[#a0a5b4] leading-relaxed">
                    {service.copy}
                  </p>

                  {/* Features */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-white/10">
                    {service.features.slice(0, 3).map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#c4c9d8]">
                        <Check className="w-3.5 h-3.5 text-[#d9ff3d] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#8b91a0]">
                    30-Day Warranty
                  </span>

                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="bg-[#d9ff3d] text-black font-bold text-xs rounded-full px-5 py-2.5 flex items-center gap-1.5 active:scale-95 cursor-pointer"
                  >
                    <span>{service.ctaText || 'Book Service'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Mobile Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4">
          {SERVICES_DATA.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => scrollMobileTo(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                mobileActiveIndex === idx ? 'w-6 bg-[#d9ff3d]' : 'w-1.5 bg-white/20'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

      </div>

    </section>
  );
}
