import { MessageSquare, Search, CheckSquare, Wrench } from 'lucide-react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ProcessSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const stepsContainerRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const steps = [
    {
      num: '01',
      icon: MessageSquare,
      title: "Tell Us What's Wrong",
      desc: "Describe what your PC is doing through our booking form or WhatsApp. Tell us the symptoms in your own words.",
      subtext: 'Home visit across Dhaka or nationwide courier intake.',
      banglaQuotes: [
        '"PC চালু হয় কিন্তু ডিসপ্লে আসে না"',
        '"গেম শুরু করলেই ফ্যান চিৎকার করে"',
      ],
    },
    {
      num: '02',
      icon: Search,
      title: 'We Inspect It',
      desc: 'Our technician conducts on-site diagnostic checks in Dhaka or admits your PC onto our lab test bench.',
      subtext: 'Voltage rail testing, memory scans, and thermal logging.',
    },
    {
      num: '03',
      icon: CheckSquare,
      title: 'You Approve the Work',
      desc: 'We explain what we found in plain words before any paid repair or part replacement. No surprise bills. No guessing.',
      subtext: 'You decide whether to proceed with the recommended repair.',
      highlight: true,
    },
    {
      num: '04',
      icon: Wrench,
      title: 'We Repair + Test',
      desc: 'We carry out the service and stress-test the system under heavy load before return. "PC চালু হচ্ছে" আর "properly working" — দুইটা আলাদা জিনিস।',
      subtext: 'Returned safely with documented service summary and 30-day warranty.',
    },
  ];

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !stepsContainerRef.current) return;

    const ctx = gsap.context(() => {
      // Reveal header
      gsap.fromTo('.process-header', 
        { y: 50, opacity: 0 },
        { 
          y: 0, 
          opacity: 1, 
          duration: 1, 
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          }
        }
      );

      // Scroll timeline for steps
      stepRefs.current.forEach((step, index) => {
        if (!step) return;

        // Set initial state
        gsap.set(step, { opacity: 0.4, scale: 0.95, y: 30 });

        gsap.to(step, {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: step,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
            onEnter: () => {
              // Dim previous steps slightly
              if (index > 0 && stepRefs.current[index - 1]) {
                gsap.to(stepRefs.current[index - 1], { opacity: 0.6, duration: 0.3 });
              }
            },
            onLeaveBack: () => {
              // Restore previous step
              if (index > 0 && stepRefs.current[index - 1]) {
                gsap.to(stepRefs.current[index - 1], { opacity: 1, duration: 0.3 });
              }
            }
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="process" ref={sectionRef} className="w-full bg-[#f6f5f0] py-16 md:py-32 border-b border-[#e8e6e1] relative overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8 relative z-10">
        
        {/* Header Block */}
        <div className="process-header max-w-[760px] mb-16 md:mb-24">
          <h2 className="font-heading text-4xl sm:text-5xl lg:text-7xl font-semibold tracking-tighter text-[#0d0f12] leading-[0.95] uppercase mb-6">
            No complicated process. <br className="hidden sm:inline" />
            <span className="text-[#0d0f12]/40">Just four simple steps.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#0d0f12]/70 leading-relaxed font-medium">
            Transparent from the initial diagnosis to final benchmark testing. No repairs begin without your clear confirmation.
          </p>
        </div>

        {/* Vertical Scroll Timeline */}
        <div ref={stepsContainerRef} className="relative">
          {/* Progress Line Background */}
          <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-[2px] bg-[#e8e6e1]" />

          <div className="flex flex-col gap-8 md:gap-16">
            {steps.map((step, index) => {
              const IconComp = step.icon;
              return (
                <div
                  key={step.num}
                  ref={(el) => (stepRefs.current[index] = el)}
                  className="relative flex flex-col lg:flex-row gap-6 lg:gap-16 items-start lg:items-center"
                >
                  {/* Step Number / Icon / Node */}
                  <div className="relative z-10 flex shrink-0 items-center justify-center w-16 h-16 lg:w-16 lg:h-16 rounded-full bg-white border border-[#e8e6e1] shadow-sm">
                     <span className="font-mono text-xl font-bold text-[#0d0f12]">{step.num}</span>
                  </div>

                  {/* Content Card */}
                  <div className={`w-full max-w-[600px] bg-white rounded-3xl border p-8 flex flex-col justify-between shadow-xs relative overflow-hidden transition-all ${
                    step.highlight
                      ? 'border-[#0d0f12] ring-1 ring-[#0d0f12]/10 bg-white'
                      : 'border-[#e8e6e1]'
                  }`}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold ${
                        step.highlight ? 'bg-[#d9ff3d] text-[#0d0f12]' : 'bg-[#0d0f12] text-[#d9ff3d]'
                      }`}>
                        <IconComp className="w-6 h-6 stroke-[2]" />
                      </div>
                      <h3 className="font-heading text-2xl font-bold text-[#0d0f12] leading-snug">
                        {step.title}
                      </h3>
                    </div>

                    {/* Bangla quotes if step 1 */}
                    {step.banglaQuotes && (
                      <div className="my-4 space-y-1.5 bg-[#f6f5f0] p-4 rounded-xl border border-[#e8e6e1] text-xs font-medium text-[#2d3036]">
                        {step.banglaQuotes.map((q) => (
                          <p key={q} className="italic text-[#0d0f12]">
                            {q}
                          </p>
                        ))}
                      </div>
                    )}

                    <p className="text-base text-[#3b3e44] leading-relaxed">
                      {step.desc}
                    </p>

                    {step.subtext && (
                      <p className="text-sm text-[#6f6e6a] mt-4 pt-4 border-t border-[#f0eee6]">
                        {step.subtext}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
