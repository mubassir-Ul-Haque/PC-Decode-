import { useState, useEffect, useRef } from 'react';
import { AlertCircle, Flame, Gamepad2, Volume2, ArrowRight, Wrench, PowerOff, Gauge, RefreshCcw, ChevronLeft, ChevronRight, ChevronsRight } from 'lucide-react';

interface ProblemIntroProps {
  onBookClick: () => void;
}

export function ProblemIntro({ onBookClick }: ProblemIntroProps) {
  const [activeSymptom, setActiveSymptom] = useState<number>(0);
  const [autoTextIndex, setAutoTextIndex] = useState<number>(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Horizontal auto-text change sequence: "pc slow >>> hot >>> making weird sounds >>> ..."
  const headerTicker = [
    { text: 'PC Running Slow', icon: '🐢' },
    { text: 'Getting Too Hot', icon: '🔥' },
    { text: 'Making Weird Sounds', icon: '🔊' },
    { text: 'Dropping Frames in Games', icon: '🎮' },
    { text: 'Randomly Crashing', icon: '⚠️' },
    { text: 'No Display on Monitor', icon: '🖥️' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setAutoTextIndex((prev) => (prev + 1) % headerTicker.length);
    }, 2400);
    return () => clearInterval(timer);
  }, [headerTicker.length]);

  const symptoms = [
    {
      icon: Flame,
      label: 'Overheating',
      tag: 'Thermal',
      shortDesc: 'PC getting excessively hot',
      causes: 'Possible causes include dust buildup in heatsink fins, dried or cracked thermal paste, cooler mounting pressure loss, AIO pump failure, or restricted chassis intake airflow.',
      diagnosisText: 'A proper diagnosis tells us which one is actually responsible so you only address what is needed.',
      banglaNote: 'গরম হাওয়া বের হচ্ছে আর কেসিং গরম? ভেতরে তাপ আটকে আছে—ডায়াগনসিস ছাড়া পার্টস বদলানোর দরকার নেই।',
    },
    {
      icon: Volume2,
      label: 'Loud Fans',
      tag: 'Acoustic',
      shortDesc: 'Fans spinning at 100% like jet takeoff',
      causes: 'Possible causes include dust accumulation, fan bearing wear, restricted exhaust airflow, high background processor load, or an aggressive/uncalibrated fan curve.',
      diagnosisText: 'We inspect bearing friction, fan RPM telemetry, and thermal triggers before deciding if a fan needs cleaning or replacement.',
      banglaNote: 'ফ্যানের আওয়াজে রুমে থাকা দায়? ফ্যান নষ্ট না-ও হতে পারে—হয়তো শুধু বাতাস চলাচলের পথ বন্ধ।',
    },
    {
      icon: Gamepad2,
      label: 'FPS Drops',
      tag: 'Gaming',
      shortDesc: 'Games stuttering or losing frames',
      causes: 'Possible causes include CPU/GPU thermal throttling, VRM overheating causing clock throttling, RAM channel bandwidth bottlenecks, or outdated chipset drivers.',
      diagnosisText: 'We log 1% low frametimes and hardware clock frequencies under real load to isolate the exact bottleneck.',
      banglaNote: 'গেম খেলতে গিয়ে PowerPoint presentation মনে হচ্ছে? পিসি স্লো হলে আগে থার্মাল আর ক্লক স্পিড দেখা উচিত।',
    },
    {
      icon: AlertCircle,
      label: 'No Display',
      tag: 'Hardware',
      shortDesc: 'PC powers on, but screen stays black',
      causes: 'Possible causes include RAM slot oxidation, monitor cable fault, GPU PCIe power rail interruption, corrupted BIOS state, or motherboard POST failure.',
      diagnosisText: 'We inspect debug POST codes, RAM channel voltages, and display outputs instead of immediately assuming component failure.',
      banglaNote: '"ভাই motherboard শেষ" শোনার আগে প্রোপার ডায়াগনসিস করান। বেশিরভাগ সময় ছোট কোনো সংযোগের ত্রুটি থাকে।',
    },
    {
      icon: PowerOff,
      label: 'Shutdowns',
      tag: 'Power/Load',
      shortDesc: 'System suddenly turns off or restarts',
      causes: 'Possible causes include PSU 12V voltage rail drops under load, CPU thermal safety trip threshold, failing capacitors, or domestic power surges.',
      diagnosisText: 'We load-test the power supply with digital multimeters and monitor motherboard VRM temperatures under full stress.',
      banglaNote: 'হুট করে পিসি বন্ধ হয়ে যায়? পাওয়ার সাপ্লাই আর থার্মাল সেফটি চেক না করে নতুন পার্টস কেনা বোকামি।',
    },
    {
      icon: Gauge,
      label: 'Slow PC',
      tag: 'Performance',
      shortDesc: 'Windows taking forever to load or respond',
      causes: 'Possible causes include storage drive degradation (bad sectors / worn NVMe NAND), thermal clock throttling, severe software background bloat, or corrupted system files.',
      diagnosisText: 'We analyze drive SMART health status, read/write IOPS performance, and operating temperatures to find what is lagging.',
      banglaNote: 'ফোল্ডার খুলতেও সময় নিচ্ছে? সমস্যা হার্ডডিস্ক বা থার্মাল থ্রোটলিংয়ে হতে পারে, পিসি ফেলে দেওয়ার মতো পুরোনো না।',
    },
    {
      icon: RefreshCcw,
      label: 'BSOD / Freeze',
      tag: 'Stability',
      shortDesc: 'Blue screen of death or total freeze',
      causes: 'Possible causes include faulty memory sectors, driver conflicts, memory timing instability, failing storage controller, or unstable CPU Vcore voltage.',
      diagnosisText: 'We execute bootable MemTest86 passes and read minidump crash logs to pinpoint the exact offending driver or module.',
      banglaNote: 'PC অন হচ্ছে আর properly working — দুইটা আলাদা জিনিস। ক্র্যাশ লগ অ্যানালাইসিস করলেই স্পষ্ট সমাধান মেলে।',
    },
  ];

  // Mobile scroll helper
  const scrollSymptom = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -200 : 200;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="problems" className="w-full bg-[#f6f5f0] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block with Horizontal Auto-Text Change Effect */}
        <div className="max-w-[840px]">
          <span className="inline-block text-xs font-mono font-bold tracking-wider text-[#6f6e6a] uppercase">
            COMMON PC PROBLEMS
          </span>

          {/* DYNAMIC HORIZONTAL AUTO-TEXT HEADER */}
          <div className="mt-3 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-3 flex-wrap">
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] leading-tight">
              Is your PC
            </h2>
            
            {/* Auto-cycling horizontal symptom text */}
            <div className="inline-flex items-center gap-2 bg-[#0d0f12] text-[#d9ff3d] px-3.5 py-1.5 rounded-xl font-heading text-2xl sm:text-3xl lg:text-4xl font-bold shadow-sm transition-all duration-300">
              <span>{headerTicker[autoTextIndex].icon}</span>
              <span className="animate-fade-in whitespace-nowrap">{headerTicker[autoTextIndex].text}?</span>
            </div>
          </div>

          {/* Horizontal progression chain: pc slow >>> hot >>> making weird sounds */}
          <div className="mt-3.5 flex items-center gap-1.5 sm:gap-2 flex-wrap text-xs sm:text-sm font-mono text-[#62656d]">
            <span className={autoTextIndex === 0 ? 'text-[#0d0f12] font-bold underline decoration-[#d9ff3d] decoration-2' : ''}>
              PC Slow
            </span>
            <ChevronsRight className="w-3.5 h-3.5 text-[#a8a59b]" />
            <span className={autoTextIndex === 1 ? 'text-[#0d0f12] font-bold underline decoration-[#d9ff3d] decoration-2' : ''}>
              Hot
            </span>
            <ChevronsRight className="w-3.5 h-3.5 text-[#a8a59b]" />
            <span className={autoTextIndex === 2 ? 'text-[#0d0f12] font-bold underline decoration-[#d9ff3d] decoration-2' : ''}>
              Making Weird Sounds
            </span>
            <ChevronsRight className="w-3.5 h-3.5 text-[#a8a59b]" />
            <span className="text-[#0d0f12] font-bold bg-[#eae7dc] px-2 py-0.5 rounded">
              We Decode It
            </span>
          </div>

          <p className="mt-4 text-base sm:text-lg text-[#3f4147] leading-relaxed">
            Many PC problems look terminal when they happen, but the underlying root cause is often manageable: dust accumulation, dried thermal compound, contact oxidation, or loose cables.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-bold text-[#0d0f12] bg-[#d9ff3d] px-3.5 py-1.5 rounded-lg border border-[#c4eb28]">
            <span>Diagnose first. Replace only when necessary.</span>
          </div>
        </div>

        {/* Interactive Symptom Checker - OPTIMIZED FOR MOBILE */}
        <div className="mt-10 sm:mt-12 bg-white rounded-2xl border border-[#e8e6e1] shadow-sm p-4 sm:p-7">
          
          {/* Header Row & Mobile Scroll Controls */}
          <div className="flex items-center justify-between border-b border-[#e8e6e1] pb-3 mb-4 sm:mb-6">
            <div>
              <span className="text-[11px] font-mono font-bold text-[#6f6e6a] uppercase">
                Symptom Explorer
              </span>
              <h3 className="font-heading text-base sm:text-xl font-bold text-[#0d0f12]">
                What is your PC currently doing?
              </h3>
            </div>
            
            {/* Mobile Scroll Indicators & Arrows */}
            <div className="flex sm:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollSymptom('left')}
                className="w-7 h-7 rounded-full bg-[#f4f2eb] flex items-center justify-center text-[#0d0f12] active:bg-[#e4e1d7]"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="text-[11px] font-mono text-[#6f6e6a]">
                {activeSymptom + 1}/7
              </span>
              <button
                type="button"
                onClick={() => scrollSymptom('right')}
                className="w-7 h-7 rounded-full bg-[#f4f2eb] flex items-center justify-center text-[#0d0f12] active:bg-[#e4e1d7]"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            <span className="hidden sm:inline-block text-xs text-[#6f6e6a]">
              Select a symptom to see how we diagnose it
            </span>
          </div>

          {/* Symptom Selection Pills - MOBILE OPTIMIZED (HORIZONTAL SCROLL ON MOBILE, GRID ON DESKTOP) */}
          <div
            ref={scrollContainerRef}
            className="flex sm:grid sm:grid-cols-3 lg:grid-cols-7 overflow-x-auto sm:overflow-x-visible no-scrollbar gap-2.5 pb-2 sm:pb-0 scroll-smooth snap-x snap-mandatory"
          >
            {symptoms.map((symptom, idx) => {
              const IconComp = symptom.icon;
              const isActive = activeSymptom === idx;
              return (
                <button
                  key={symptom.label}
                  type="button"
                  onClick={() => setActiveSymptom(idx)}
                  className={`shrink-0 w-[145px] sm:w-auto p-3 sm:p-3.5 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-2.5 snap-start ${
                    isActive
                      ? 'bg-[#0d0f12] text-white border-[#0d0f12] shadow-sm ring-2 ring-[#d9ff3d]/60 sm:scale-[1.02]'
                      : 'bg-[#faf9f6] text-[#2d3036] border-[#e8e6e1] hover:border-[#cfccc3]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-[#d9ff3d] text-black' : 'bg-white border border-[#e8e6e1] text-[#0d0f12]'
                    }`}>
                      <IconComp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </div>
                    <span className={`font-mono text-[10px] ${isActive ? 'text-[#d9ff3d]' : 'opacity-60'}`}>
                      0{idx + 1}
                    </span>
                  </div>
                  <div>
                    <span className="block font-heading font-bold text-xs sm:text-sm leading-snug">
                      {symptom.label}
                    </span>
                    <span className={`block text-[10px] truncate mt-0.5 ${isActive ? 'text-[#a0a5b4]' : 'text-[#7e828d]'}`}>
                      {symptom.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Subtle mobile hint */}
          <div className="flex sm:hidden items-center justify-between text-[10px] text-[#83868f] font-mono mt-1.5 px-0.5">
            <span>← Swipe horizontally to explore all 7 symptoms →</span>
          </div>

          {/* Active Symptom Diagnosis Box */}
          <div className="mt-4 sm:mt-6 p-4 sm:p-6 rounded-xl bg-[#faf9f6] border border-[#e8e6e1] grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#6f6e6a] uppercase">
                <Wrench className="w-3.5 h-3.5 text-[#0d0f12]" />
                <span>Multiple Potential Causes ({symptoms[activeSymptom].label}):</span>
              </div>
              <p className="text-sm sm:text-base text-[#1b1c20] font-medium leading-relaxed">
                {symptoms[activeSymptom].causes}
              </p>
              <div className="text-xs sm:text-sm text-[#46484e] bg-white p-3 rounded-lg border border-[#e8e6e1]">
                <strong className="text-[#0d0f12]">Proper Diagnosis:</strong> {symptoms[activeSymptom].diagnosisText}
              </div>
              <div className="pt-1 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg inline-block">
                💬 {symptoms[activeSymptom].banglaNote}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center pt-2 lg:pt-0 border-t lg:border-t-0 border-[#e8e6e1]">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto bg-[#0d0f12] hover:bg-[#202227] text-white text-sm font-semibold rounded-full px-7 py-3 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all active:scale-95"
                id="symptom-book-service-btn"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 text-[#d9ff3d]" />
              </button>
              <span className="text-[11px] text-[#6f6e6a] mt-2 text-center lg:text-right w-full sm:w-auto">
                In-home Dhaka visit • Courier intake nationwide
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
