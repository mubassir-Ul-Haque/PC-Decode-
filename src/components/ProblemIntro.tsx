import { useState, useEffect, useRef } from 'react';
import { ThermometerSun, Volume2, Gamepad2, AlertCircle, PowerOff, Gauge, RefreshCcw, VolumeX, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import diagnosticImg1 from '../assets/images/pc_diagnostic_bench_1789496807097.jpg';
import diagnosticImg2 from '../assets/images/pc_thermal_repair_1789496825583.jpg';

gsap.registerPlugin(ScrollTrigger);

interface ProblemIntroProps {
  onBookClick: () => void;
}

// ... keeping HEADLINES and SYMPTOMS as is ...
const HEADLINES = [
  'Making Weird Sounds?',
  'Running Unusually Hot?',
  'Dropping FPS in Games?',
  'Showing No Display?',
  'Shutting Down Randomly?',
  'Feeling Extremely Slow?',
];

const SYMPTOMS = [
  {
    icon: ThermometerSun,
    label: 'Overheating',
    tag: 'Thermal',
    shortDesc: 'System runs hot, fans spin loud',
    causes: 'Possible causes include dried thermal paste, dust-clogged heatsinks, failing AIO pump, or poor chassis airflow.',
    diagnosisText: 'We use thermal imaging and software logging to check core temperatures under synthetic loads.',
    banglaNote: 'পিসি গরম হয়ে রিস্টার্ট নিচ্ছে? থার্মাল পেস্ট আর কুলিং সিস্টেম চেক করা জরুরি।',
    image: diagnosticImg2,
  },
  {
    icon: Volume2,
    label: 'Loud Fans',
    tag: 'Acoustic',
    shortDesc: 'Fans sounding like a jet engine',
    causes: 'Possible causes include dry fan bearings, aggressive default fan curves, or fans compensating for overheating components.',
    diagnosisText: 'We isolate the exact fan causing the noise and check acoustic profiles.',
    banglaNote: 'ফ্যানের আওয়াজে টেকা দায়? বিয়ারিং বা ডাস্ট ইস্যু হতে পারে।',
    image: diagnosticImg1,
  },
  {
    icon: Gamepad2,
    label: 'FPS Drops',
    tag: 'Gaming',
    shortDesc: 'Games stuttering or losing frames',
    causes: 'Possible causes include CPU/GPU thermal throttling, VRM overheating causing clock throttling, or RAM channel bottlenecks.',
    diagnosisText: 'We log 1% low frametimes and hardware clock frequencies under real load.',
    banglaNote: 'গেম খেলতে গিয়ে ল্যাগ করছে? পিসি স্লো হলে আগে থার্মাল আর ক্লক স্পিড দেখা উচিত।',
    image: diagnosticImg2,
  },
  {
    icon: AlertCircle,
    label: 'No Display',
    tag: 'Hardware',
    shortDesc: 'PC powers on, but screen stays black',
    causes: 'Possible causes include RAM slot oxidation, monitor cable fault, GPU PCIe power rail interruption, or corrupted BIOS.',
    diagnosisText: 'We inspect debug POST codes, RAM channel voltages, and display outputs instead of immediately assuming component failure.',
    banglaNote: '"ভাই motherboard শেষ" শোনার আগে প্রোপার ডায়াগনসিস করান। বেশিরভাগ সময় ছোট কোনো সংযোগের ত্রুটি থাকে।',
    image: diagnosticImg1,
  },
  {
    icon: PowerOff,
    label: 'Shutdowns',
    tag: 'Power/Load',
    shortDesc: 'System suddenly turns off or restarts',
    causes: 'Possible causes include PSU 12V voltage rail drops under load, CPU thermal safety trip threshold, or failing capacitors.',
    diagnosisText: 'We load-test the power supply with digital multimeters and monitor motherboard VRM temperatures.',
    banglaNote: 'হুট করে পিসি বন্ধ হয়ে যায়? পাওয়ার সাপ্লাই আর থার্মাল সেফটি চেক না করে নতুন পার্টস কেনা বোকামি।',
    image: diagnosticImg2,
  },
  {
    icon: Gauge,
    label: 'Slow PC',
    tag: 'Performance',
    shortDesc: 'Windows taking forever to load or respond',
    causes: 'Possible causes include storage drive degradation (bad sectors / worn NVMe NAND), thermal clock throttling, or system file corruption.',
    diagnosisText: 'We analyze drive SMART health status, read/write IOPS performance, and operating temperatures.',
    banglaNote: 'ফোল্ডার খুলতেও সময় নিচ্ছে? সমস্যা হার্ডডিস্ক বা থার্মাল থ্রোটলিংয়ে হতে পারে।',
    image: diagnosticImg1,
  },
  {
    icon: RefreshCcw,
    label: 'BSOD / Freeze',
    tag: 'Stability',
    shortDesc: 'Blue screen of death or total freeze',
    causes: 'Possible causes include faulty memory sectors, driver conflicts, memory timing instability, or unstable CPU Vcore voltage.',
    diagnosisText: 'We execute bootable MemTest86 passes and read minidump crash logs to pinpoint the exact offending driver or module.',
    banglaNote: 'ক্র্যাশ লগ অ্যানালাইসিস করলেই স্পষ্ট সমাধান মেলে।',
    image: diagnosticImg2,
  },
];

export function ProblemIntro({ onBookClick }: ProblemIntroProps) {
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [activeSymptom, setActiveSymptom] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setHeadlineIndex((prev) => (prev + 1) % HEADLINES.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || !sectionRef.current || !headerRef.current) return;

    const ctx = gsap.context(() => {
      // Create continuity: as this section enters, the header slides up and fades in
      gsap.fromTo(headerRef.current,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            end: 'top 30%',
            scrub: 1,
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const symptom = SYMPTOMS[activeSymptom];

  return (
    <section ref={sectionRef} className="bg-[#faf9f6] py-16 md:py-24 border-b border-[#e8e6e1] overflow-hidden">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        {/* Top Header Area */}
        <div ref={headerRef} className="mb-12">
          <div className="flex flex-col mb-8 relative">
            <h2 className="font-heading text-[2.5rem] sm:text-[3.5rem] lg:text-[4rem] font-semibold tracking-tighter text-[#0d0f12] leading-[1.1] uppercase relative z-10">
              IS YOUR PC<br />
              <div className="flex flex-col sm:flex-row sm:items-center mt-2">
                <div className="relative h-[44px] sm:h-[60px] lg:h-[70px] overflow-hidden bg-[#0d0f12] text-[#d9ff3d] px-4 sm:px-6 flex items-center min-w-[280px] sm:min-w-[450px] inline-flex -rotate-1 rounded-sm shadow-xl">
                  <div className="flex items-center gap-3 w-full animate-fadeIn" key={headlineIndex}>
                    <VolumeX className="hidden sm:block w-6 h-6 shrink-0 text-[#d9ff3d]/50" />
                    <span className="font-heading text-xl sm:text-2xl lg:text-[2.5rem] font-bold truncate tracking-tight">
                      {HEADLINES[headlineIndex]}
                    </span>
                  </div>
                </div>
              </div>
            </h2>
          </div>

          <div className="max-w-3xl grid grid-cols-1 sm:grid-cols-2 gap-6 items-end">
            <p className="text-sm sm:text-base text-[#0d0f12]/70 leading-relaxed font-medium">
              Many PC problems look terminal when they happen, but the underlying root cause is often manageable: dust accumulation, dried thermal compound, contact oxidation, or loose cables.
            </p>
            <div className="inline-block bg-[#d9ff3d] text-[#0d0f12] px-4 py-3 font-mono text-[11px] uppercase tracking-widest font-bold shadow-sm self-start sm:self-end">
              Diagnose first. Replace only when necessary.
            </div>
          </div>
        </div>

        {/* Symptom Explorer */}
        <div className="bg-white rounded-2xl border border-[#e8e6e1] shadow-sm p-4 sm:p-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
            <div>
              <h4 className="font-mono text-xs font-bold uppercase tracking-widest text-[#64676d] mb-1">
                Symptom Explorer
              </h4>
              <h3 className="font-heading text-2xl sm:text-3xl font-bold text-[#0d0f12]">
                What is your PC currently doing?
              </h3>
            </div>
            <div className="text-xs font-mono text-[#8b91a0]">
              Select a symptom to see how we diagnose it
            </div>
          </div>

          {/* Horizontal Scroller for Symptoms */}
          <div 
            ref={scrollContainerRef}
            className="flex overflow-x-auto gap-3 pb-6 no-scrollbar snap-x"
          >
            {SYMPTOMS.map((s, idx) => {
              const isActive = activeSymptom === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setActiveSymptom(idx)}
                  className={`shrink-0 snap-start w-[160px] h-[120px] rounded-xl p-4 flex flex-col justify-between transition-all border text-left group ${
                    isActive 
                      ? 'bg-[#0d0f12] border-[#0d0f12] shadow-md -translate-y-1' 
                      : 'bg-white border-[#e8e6e1] hover:border-[#d8d5cb] hover:bg-[#faf9f6]'
                  }`}
                >
                  <div className="flex justify-between items-start w-full">
                    <s.icon className={`w-6 h-6 ${isActive ? 'text-[#d9ff3d]' : 'text-[#64676d]'}`} />
                    <span className={`font-mono text-[10px] font-bold ${isActive ? 'text-[#d9ff3d]' : 'text-[#a0a5b4]'}`}>
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <div className={`font-bold text-sm mb-0.5 ${isActive ? 'text-white' : 'text-[#0d0f12]'}`}>
                      {s.label}
                    </div>
                    <div className={`text-[10px] font-mono ${isActive ? 'text-[#a0a5b4]' : 'text-[#64676d]'}`}>
                      {s.tag}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details Box */}
          <div className="bg-[#faf9f6] border border-[#e8e6e1] rounded-xl p-5 sm:p-8 flex flex-col lg:flex-row gap-8 lg:items-center">
            
            {/* Left Content */}
            <div className="flex-1 space-y-6">
              <div>
                <h5 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#64676d] mb-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4" />
                  Multiple Potential Causes ({symptom.label}):
                </h5>
                <p className="text-base sm:text-lg text-[#0d0f12] font-medium leading-relaxed">
                  {symptom.causes}
                </p>
              </div>

              <div className="bg-white border border-[#e8e6e1] rounded-lg p-4">
                <span className="font-bold text-[#0d0f12]">Proper Diagnosis: </span>
                <span className="text-[#4a4d53]">{symptom.diagnosisText}</span>
              </div>

              <div className="inline-flex items-start gap-2 border border-[#b2e59e] bg-[#eefae8] text-[#246b15] px-3 py-2 rounded-lg text-sm font-medium">
                <span className="mt-0.5">💬</span>
                <span>{symptom.banglaNote}</span>
              </div>
            </div>

            {/* Right Side - Image and CTA */}
            <div className="w-full lg:w-[320px] shrink-0 flex flex-col gap-4">
              <div className="w-full h-[200px] rounded-xl overflow-hidden border border-[#e8e6e1] bg-white">
                <img 
                  src={symptom.image} 
                  alt="PC Diagnostic Work" 
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  key={symptom.image}
                />
              </div>
              <button 
                onClick={onBookClick}
                className="w-full bg-[#0d0f12] hover:bg-[#202227] text-white font-bold rounded-xl px-5 py-3.5 flex items-center justify-between transition-all group"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 text-[#d9ff3d] transition-transform group-hover:translate-x-1" />
              </button>
              <div className="text-center font-mono text-[10px] text-[#64676d]">
                In-home Dhaka visit • Courier intake nationwide
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
