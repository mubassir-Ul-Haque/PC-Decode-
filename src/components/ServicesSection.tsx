import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SERVICES_DATA } from '../data';
import { Check, ArrowRight, Clock, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';
import { AutoBeforeAfter } from './AutoBeforeAfter';

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

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const track = horizontalTrackRef.current;
    const trigger = triggerRef.current;
    if (!track || !trigger) return;

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
      return () => { tween.kill(); };
    }, sectionRef);

    return () => { ctx.revert(); };
  }, [isMobile]);

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
    <section id="services" ref={sectionRef} className="w-full bg-[#faf9f6] text-[#0d0f12] relative overflow-hidden border-b border-[#e8e6e1]">
      <div className="hidden lg:block">
        <div ref={triggerRef} className="h-screen w-full flex flex-col justify-between py-8 px-8 overflow-hidden relative">
          
          <div className="w-full max-w-[1400px] mx-auto flex items-end justify-between border-b border-[#e8e6e1] pb-5 z-20">
            <div>
              <div className="inline-flex items-center gap-2 border border-[#d8d5cb] bg-white rounded-full px-3 py-1 text-xs font-mono font-bold text-[#0d0f12] uppercase tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#d9ff3d] inline-block animate-pulse"></span>
                <span>PINPOINT PRECISION SERVICES</span>
              </div>
              <h2 className="font-heading text-3xl xl:text-4xl font-bold tracking-tight text-[#0d0f12] mt-2">
                Focused on diagnosis, restoration & component-level repair.
              </h2>
            </div>
          </div>

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
                    className={`w-[780px] xl:w-[860px] shrink-0 h-[480px] xl:h-[520px] rounded-[28px] p-7 xl:p-8 bg-white border transition-all duration-500 ease-out flex flex-col justify-between relative overflow-hidden group ${
                      isActive
                        ? 'border-[#d8d5cb] shadow-[0_15px_40px_rgba(0,0,0,0.06)] scale-100 opacity-100'
                        : 'border-[#e8e6e1] scale-[0.95] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex items-center justify-between z-10">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs font-bold text-[#0d0f12] bg-[#f0eee6] px-2.5 py-1 rounded-md border border-[#e8e6e1]">
                          0{service.number}
                        </span>
                        <span className="text-xs font-mono font-bold tracking-wider text-[#64676d] uppercase">
                          {service.eyebrow || service.tagline}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        {service.turnaround && (
                          <div className="flex items-center gap-1.5 text-xs font-mono text-[#4a4d53] bg-[#f0eee6] border border-[#e8e6e1] px-3 py-1 rounded-full">
                            <Clock className="w-3.5 h-3.5 text-[#0d0f12]" />
                            <span>{service.turnaround}</span>
                          </div>
                        )}
                        <span className="text-xs font-mono font-bold text-[#0d0f12] bg-white px-3 py-1 rounded-full border border-[#d8d5cb] shadow-sm">
                          {service.startingPrice}
                        </span>
                      </div>
                    </div>

                    <div className="grid grid-cols-12 gap-7 items-center my-auto z-10">
                      <div className="col-span-7 flex flex-col justify-between">
                        <div>
                          <h3 className="font-heading text-2xl xl:text-3xl font-bold text-[#0d0f12] tracking-tight leading-snug">
                            {service.title}
                          </h3>
                          <p className="mt-2.5 text-sm xl:text-base text-[#4a4d53] leading-relaxed line-clamp-3">
                            {service.copy}
                          </p>
                        </div>
                        <div className="mt-5 space-y-2 pt-4 border-t border-[#e8e6e1]">
                          <div className="text-[11px] font-mono font-bold uppercase text-[#8b91a0] tracking-wider mb-2">
                            Verified Protocol
                          </div>
                          {service.features.slice(0, 3).map((feat, fIdx) => (
                            <div key={fIdx} className="flex items-start gap-2.5 text-xs xl:text-sm text-[#27292e] font-medium">
                              <Check className="w-4 h-4 text-[#0d0f12] shrink-0 mt-0.5" />
                              <span className="line-clamp-1">{feat}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="col-span-5 h-[280px] xl:h-[310px] rounded-2xl overflow-hidden relative border border-[#e8e6e1] group-hover:border-[#d8d5cb] transition-all bg-[#faf9f6]">
                        {service.beforeAfter ? (
                           <AutoBeforeAfter beforeImg={service.beforeAfter.beforeImg} afterImg={service.beforeAfter.afterImg} />
                        ) : service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover select-none transition-transform duration-700 ease-out group-hover:scale-105"
                            loading="lazy"
                          />
                        ) : null}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-[#e8e6e1] z-10">
                      <div className="flex items-center gap-2 text-xs font-mono text-[#64676d] font-medium">
                        <ShieldCheck className="w-4 h-4 text-emerald-600" />
                        <span>Diagnose first • 30-day service warranty</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => onSelectService(service.title)}
                        className="bg-[#0d0f12] hover:bg-[#202227] text-white font-semibold text-xs xl:text-sm rounded-full px-6 py-2.5 flex items-center gap-2 transition-all cursor-pointer shadow-md active:scale-95 group/btn hover:-translate-y-0.5"
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

          <div className="w-full max-w-[1400px] mx-auto flex items-center justify-between pt-3 border-t border-[#e8e6e1] z-20 text-xs">
            <div className="flex items-center gap-2">
              {SERVICES_DATA.map((s, idx) => (
                <span
                  key={s.id}
                  className={`font-mono text-xs px-3 py-1 rounded-full transition-all border ${
                    activeCardIndex === idx
                      ? 'bg-white border-[#d8d5cb] text-[#0d0f12] font-bold shadow-sm'
                      : 'bg-transparent border-transparent text-[#8b91a0]'
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

      <div className="block lg:hidden py-14 px-4 sm:px-6">
        <div className="mb-8">
          <div className="inline-flex items-center gap-2 border border-[#d8d5cb] bg-white rounded-full px-3 py-1 text-xs font-mono font-bold text-[#0d0f12] uppercase tracking-wider shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#d9ff3d] inline-block animate-pulse"></span>
            <span>OUR SERVICES</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            Focused on diagnosis, maintenance & precision repair.
          </h2>
        </div>

        <div className="flex items-end justify-end mb-4">
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.max(0, mobileActiveIndex - 1))}
              disabled={mobileActiveIndex === 0}
              className="w-8 h-8 rounded-lg bg-white border border-[#e8e6e1] shadow-sm text-[#0d0f12] flex items-center justify-center disabled:opacity-40 active:bg-[#f0eee6]"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => scrollMobileTo(Math.min(SERVICES_DATA.length - 1, mobileActiveIndex + 1))}
              disabled={mobileActiveIndex === SERVICES_DATA.length - 1}
              className="w-8 h-8 rounded-lg bg-white border border-[#e8e6e1] shadow-sm text-[#0d0f12] flex items-center justify-center disabled:opacity-40 active:bg-[#f0eee6]"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

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
                className={`w-[88vw] max-w-[420px] shrink-0 snap-center rounded-2xl p-5 bg-white border flex flex-col justify-between transition-all duration-300 shadow-sm ${
                  isCurrent ? 'border-[#d8d5cb]' : 'border-[#e8e6e1]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-xs font-bold text-[#0d0f12] bg-[#f0eee6] px-2 py-0.5 rounded border border-[#e8e6e1]">
                      0{service.number}
                    </span>
                    <span className="text-xs font-mono font-bold text-[#0d0f12] bg-white border border-[#d8d5cb] px-2.5 py-0.5 rounded-full shadow-sm">
                      {service.startingPrice}
                    </span>
                  </div>

                  <div className="w-full h-44 rounded-xl overflow-hidden relative mb-3.5 bg-[#faf9f6] border border-[#e8e6e1]">
                    {service.beforeAfter ? (
                      <AutoBeforeAfter beforeImg={service.beforeAfter.beforeImg} afterImg={service.beforeAfter.afterImg} />
                    ) : service.image ? (
                      <img
                        src={service.image}
                        alt={service.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    ) : null}
                  </div>

                  <h3 className="font-heading text-xl font-bold text-[#0d0f12]">
                    {service.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#4a4d53] leading-relaxed">
                    {service.copy}
                  </p>
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-[#e8e6e1]">
                    {service.features.slice(0, 3).map((f, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-[#27292e] font-medium">
                        <Check className="w-3.5 h-3.5 text-[#0d0f12] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-[#e8e6e1] flex items-center justify-between">
                  <span className="text-[11px] font-mono text-[#64676d] font-medium">
                    30-Day Warranty
                  </span>
                  <button
                    type="button"
                    onClick={() => onSelectService(service.title)}
                    className="bg-[#0d0f12] hover:bg-[#202227] text-white font-bold text-xs rounded-full px-5 py-2.5 flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm group hover:-translate-y-0.5 transition-all"
                  >
                    <span>Book Service</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
