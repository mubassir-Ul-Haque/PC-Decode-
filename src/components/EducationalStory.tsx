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
          className="inline-block bg-[#0d0f12] text-[#d9ff3d] px-4 py-1 sm:px-6 sm:py-2 mx-1.5 sm:mx-3 -translate-y-2 sm:-translate-y-3"
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
  const stageRefs = useRef<(HTMLDivElement | null)[]>([]);
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
      // Main horizontal track scroll
      const trackTween = gsap.to(track, {
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

      // Individual stage progressive reveals inside the track
      stageRefs.current.forEach((stageEl, idx) => {
        if (!stageEl || idx === 0) return; // Skip first stage as it's already visible
        const icon = stageEl.querySelector('.story-icon');
        const title = stageEl.querySelector('.story-title');
        const desc = stageEl.querySelector('.story-desc');
        
        gsap.fromTo([icon, title, desc], 
          { opacity: 0, x: 100 },
          {
            opacity: 1,
            x: 0,
            duration: 1,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: stageEl,
              containerAnimation: trackTween,
              start: 'left 75%',
              toggleActions: 'play none none reverse',
            }
          }
        );
      });
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
        <div className="absolute top-6 sm:top-10 left-6 sm:left-12 right-6 sm:right-12 flex justify-end items-center z-20 pointer-events-none">
          <div className="flex items-center gap-3">
            <div className="font-mono text-[10px] sm:text-xs font-bold tracking-widest text-[#0d0f12]">
              0{activeIndex + 1} <span className="text-[#0d0f12]/30 mx-1">—</span> 0{STORY_STAGES.length}
            </div>
          </div>
        </div>

        {/* Horizontal Moving Track */}
        <div
          ref={trackRef}
          className="h-full flex items-center will-change-transform"
          style={{ width: `${STORY_STAGES.length * 100}vw` }}
        >
          {STORY_STAGES.map((stage, index) => (
            <div
              key={stage.id}
              ref={(el) => (stageRefs.current[index] = el)}
              className="w-screen h-full flex flex-col items-center justify-center px-4 sm:px-12"
            >
              <div className="max-w-[1200px] w-full flex flex-col justify-center h-full">
                {/* Visual Icon */}
                <div className="story-icon mb-4 sm:mb-8 transition-tactile">
                  <stage.icon className="w-8 h-8 sm:w-12 sm:h-12 text-[#0d0f12]" strokeWidth={1.5} />
                </div>

                {/* Headline */}
                <h2 className="story-title font-heading text-[3rem] sm:text-[3.5rem] lg:text-[4.5rem] font-semibold uppercase leading-[1.1] sm:leading-[1] tracking-tighter mb-8 sm:mb-12">
                  {formatTitle(stage.title)}
                </h2>

                {/* Description */}
                <p className="story-desc text-lg sm:text-2xl lg:text-3xl text-[#0d0f12]/70 leading-[1.4] max-w-[800px] font-medium">
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
