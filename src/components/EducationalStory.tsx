import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ThermometerSun, Wind, Cpu, Fan, Activity, Search } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const STORY_STAGES = [
  {
    id: 'stage-1',
    title: 'THE PC {GETS HOT}.',
    desc: 'Components naturally generate heat under load. Normal cooling systems dissipate this efficiently—until conditions change over time.',
    icon: ThermometerSun,
  },
  {
    id: 'stage-2',
    title: 'DUST RESTRICTS {AIRFLOW}.',
    desc: 'Micro-dust particles accumulate on heatsink fins, forming an insulating blanket that traps radiant heat inside the chassis.',
    icon: Wind,
  },
  {
    id: 'stage-3',
    title: 'COMPOUND {DRIES OUT}.',
    desc: 'Factory thermal paste hardens over 18-24 months, creating microscopic air gaps that ruin heat transfer from the processor.',
    icon: Cpu,
  },
  {
    id: 'stage-4',
    title: 'FANS WORK {HARDER}.',
    desc: 'The cooling system spins at maximum RPM to compensate for trapped heat, wearing out bearings and causing loud noise.',
    icon: Fan,
  },
  {
    id: 'stage-5',
    title: 'PERFORMANCE {DROPS}.',
    desc: 'To prevent permanent hardware failure, your processor intentionally throttles its speed. The system begins to stutter and lag.',
    icon: Activity,
  },
  {
    id: 'stage-6',
    title: '{DIAGNOSE}. THEN FIX IT.',
    desc: 'Random part swapping is expensive. We find exactly what\'s failing, clean the system, and restore factory performance.',
    icon: Search,
  },
];

const formatTitle = (title: string) => {
  const parts = title.split(/({[^}]+})/g);
  return parts.map((part, i) => {
    if (part.startsWith('{') && part.endsWith('}')) {
      return (
        <span
          key={i}
          className="inline-block bg-[#0d0f12] text-[#d9ff3d] px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-[14px] mx-1.5 sm:mx-2 -translate-y-1 sm:-translate-y-1.5 shadow-md"
        >
          {part.slice(1, -1)}
        </span>
      );
    }
    return <span key={i}>{part}</span>;
  });
};

export function EducationalStory() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const getScrollAmount = () => {
      const trackWidth = track.scrollWidth;
      const viewportWidth = window.innerWidth;
      return -(trackWidth - viewportWidth);
    };

    const ctx = gsap.context(() => {
      const tween = gsap.to(track, {
        x: getScrollAmount,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1, // Smooth scrub
          start: 'top top',
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const index = Math.min(
              STORY_STAGES.length - 1,
              Math.floor(self.progress * STORY_STAGES.length)
            );
            setActiveIndex(index);
          },
        },
      });
      return () => tween.kill();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full bg-[#faf9f6] text-[#0d0f12] relative overflow-hidden border-b border-[#e8e6e1]"
    >
      <div className="h-screen w-full relative">
        {/* Fixed Header Indicators */}
        <div className="absolute top-6 sm:top-10 left-6 sm:left-12 right-6 sm:right-12 flex justify-between items-center z-20 pointer-events-none">
          <div className="font-mono text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#64676d]">
            What's happening to your PC?
          </div>
          <div className="flex items-center gap-3">
            <div className="font-mono text-[10px] sm:text-sm font-bold">
              0{activeIndex + 1} <span className="text-[#a0a5b4] mx-1">/</span> 0{STORY_STAGES.length}
            </div>
          </div>
        </div>

        {/* Horizontal Moving Track */}
        <div
          ref={trackRef}
          className="h-full flex items-center will-change-transform"
          style={{ width: `${STORY_STAGES.length * 100}vw` }}
        >
          {STORY_STAGES.map((stage) => (
            <div
              key={stage.id}
              className="w-screen h-full flex flex-col items-center justify-center px-4 sm:px-12"
            >
              <div className="max-w-[900px] text-center flex flex-col items-center">
                {/* Visual Icon */}
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border border-[#e8e6e1] bg-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] mb-6 sm:mb-10 transition-tactile">
                  <stage.icon className="w-6 h-6 sm:w-8 sm:h-8 text-[#0d0f12] opacity-80" />
                </div>

                {/* Headline */}
                <h2 className="font-heading text-3xl sm:text-5xl xl:text-[4rem] font-bold uppercase leading-[1.1] sm:leading-[1.1] tracking-tight mb-4 sm:mb-8 px-2">
                  {formatTitle(stage.title)}
                </h2>

                {/* Description */}
                <p className="text-base sm:text-xl xl:text-2xl text-[#4a4d53] leading-relaxed max-w-[700px] font-medium px-4">
                  {stage.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
