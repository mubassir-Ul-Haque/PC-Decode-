import { useState } from 'react';
import { AlertCircle, Flame, Gamepad2, Volume2, ArrowRight, Wrench } from 'lucide-react';

interface ProblemIntroProps {
  onBookClick: () => void;
}

export function ProblemIntro({ onBookClick }: ProblemIntroProps) {
  const [activeSymptom, setActiveSymptom] = useState<number>(0);

  const symptoms = [
    {
      icon: Volume2,
      label: 'Fans screaming like takeoff',
      diagnosis: 'Thick dust felt on heatsinks forces fans to 100% RPM to avoid safety thermal shutdown. Air cannot pass through.',
      solution: 'Ultrasonic/brush fin cleaning + fan bearing lubrication restores silent CFM airflow.',
      banglaNote: 'ফ্যানের আওয়াজে রুমে থাকা যায় না? শুধু ধুলো আটকে আছে, ফ্যান নষ্ট না।',
    },
    {
      icon: Gamepad2,
      label: 'Games turned into PowerPoint',
      diagnosis: 'GPU/CPU clock speed drops by 40-60% because dried paste cannot transfer heat to the copper heatpipes.',
      solution: 'Removal of baked-on factory paste and fresh high-W/mK compound restores full boost clocks.',
      banglaNote: 'খেলা শুরু করলেই ল্যাগ? থার্মাল থ্রোটলিং হচ্ছে, পার্টস বদলানোর দরকার নেই।',
    },
    {
      icon: Flame,
      label: 'PC getting unreasonably hot',
      diagnosis: 'Ambient Dhaka dust mixes with humidity to form an insulating blanket over VRMs, chipsets, and radiator fins.',
      solution: 'Full teardown, thermal pad renewal on VRM MOSFETs and airflow realignment drops temps by 15-25°C.',
      banglaNote: 'গরম হাওয়া বের হচ্ছে? ভেতরটা শ্বাস নিতে পারছে না।',
    },
    {
      icon: AlertCircle,
      label: 'Random freeze or black screen',
      diagnosis: 'Often caused by RAM oxide build-up on golden pins, dried GPU VRAM paste, or unstable 12V PSU rail ripple.',
      solution: 'Oscilloscope/multimeter voltage probe and memory sector test isolate the exact fault.',
      banglaNote: '"ভাই motherboard শেষ" শোনার আগে প্রোপার ডায়াগনসিস করান।',
    },
  ];

  return (
    <section className="w-full bg-[#f6f5f0] py-16 md:py-20 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="max-w-[780px]">
          <span className="inline-block text-xs font-bold tracking-wider text-[#6f6e6a] uppercase">
            BEFORE YOU BUY A NEW PC...
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            Maybe your PC doesn't need replacing. <br className="hidden sm:inline" />
            Maybe it needs fixing.
          </h2>

          <div className="mt-5 space-y-3 text-base sm:text-lg text-[#3f4147] leading-relaxed">
            <p className="font-medium text-[#1c1e22]">
              PC getting slow? <br />
              Fans screaming like they're preparing for takeoff? <br />
              Games suddenly turning into PowerPoint presentations?
            </p>
            <p className="font-bold text-[#0d0f12] text-xl">
              Don't panic.
            </p>
            <p className="text-[#52555c]">
              Many performance problems come from dust, overheating, thermal issues or failing components. We diagnose the actual problem before recommending what needs to be done.
            </p>
          </div>

          <div className="mt-4 inline-flex items-center gap-2 font-mono text-sm font-bold text-[#0d0f12] bg-[#d9ff3d] px-3.5 py-1.5 rounded-lg border border-[#c4eb28]">
            <span>Diagnose first. Replace only when necessary.</span>
          </div>
        </div>

        {/* Interactive Symptom Checker Card */}
        <div className="mt-12 bg-white rounded-2xl border border-[#e8e6e1] shadow-sm p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-[#e8e6e1] pb-4 mb-6">
            <div>
              <span className="text-xs font-mono font-bold text-[#6f6e6a] uppercase">Symptom Explorer</span>
              <h3 className="font-heading text-lg sm:text-xl font-bold text-[#0d0f12]">
                What is your PC currently doing?
              </h3>
            </div>
            <span className="hidden sm:inline-block text-xs text-[#6f6e6a]">
              Click to see what actually causes it
            </span>
          </div>

          {/* Symptom selection pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {symptoms.map((symptom, idx) => {
              const IconComp = symptom.icon;
              const isActive = activeSymptom === idx;
              return (
                <button
                  key={symptom.label}
                  onClick={() => setActiveSymptom(idx)}
                  className={`p-4 rounded-xl text-left border transition-all cursor-pointer flex flex-col justify-between gap-3 ${
                    isActive
                      ? 'bg-[#0d0f12] text-white border-[#0d0f12] shadow-md scale-[1.02]'
                      : 'bg-[#faf9f6] text-[#2d3036] border-[#e8e6e1] hover:border-[#cfccc3]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      isActive ? 'bg-[#d9ff3d] text-black' : 'bg-white border border-[#e8e6e1] text-[#0d0f12]'
                    }`}>
                      <IconComp className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-xs opacity-60">0{idx + 1}</span>
                  </div>
                  <span className="font-heading font-semibold text-sm leading-snug">
                    {symptom.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Symptom Diagnosis Box */}
          <div className="mt-6 p-5 sm:p-6 rounded-xl bg-[#faf9f6] border border-[#e8e6e1] grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-8 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold font-mono text-[#6f6e6a] uppercase">
                <Wrench className="w-3.5 h-3.5 text-[#0d0f12]" />
                <span>PCDecode Root Cause Analysis:</span>
              </div>
              <p className="text-base text-[#1b1c20] font-medium leading-relaxed">
                {symptoms[activeSymptom].diagnosis}
              </p>
              <div className="text-sm text-[#46484e]">
                <strong className="text-[#0d0f12]">Our Proper Fix:</strong> {symptoms[activeSymptom].solution}
              </div>
              <div className="pt-2 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg inline-block">
                💬 {symptoms[activeSymptom].banglaNote}
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-center">
              <button
                onClick={onBookClick}
                className="w-full sm:w-auto bg-[#0d0f12] hover:bg-[#202227] text-white text-sm font-semibold rounded-full px-6 py-3 flex items-center justify-center gap-2 cursor-pointer shadow-sm transition-all"
              >
                <span>Fix This Problem</span>
                <ArrowRight className="w-4 h-4 text-[#d9ff3d]" />
              </button>
              <span className="text-[11px] text-[#6f6e6a] mt-2">
                Home visit in Dhaka • Courier nationwide
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
