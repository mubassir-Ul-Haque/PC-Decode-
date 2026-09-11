import { useState } from 'react';
import { Sparkles, RefreshCw, ArrowRight, CheckCircle2, AlertTriangle, ShieldCheck, Flame, Wind, Cpu, Gauge, Share2, Copy, Check } from 'lucide-react';

interface QuestionOption {
  text: string;
  subtext?: string;
  personaScore: {
    dragon?: number;
    overlord?: number;
    slowpoke?: number;
    jetsetter?: number;
    phoenix?: number;
    zen?: number;
  };
}

interface Question {
  id: number;
  title: string;
  description: string;
  options: QuestionOption[];
}

interface PersonaResult {
  id: string;
  name: string;
  badge: string;
  tagline: string;
  description: string;
  symptoms: string[];
  realityCheck: string;
  recommendedService: string;
  urgency: 'Low' | 'Moderate' | 'High' | 'Immediate Action Needed';
  color: string;
  accentBg: string;
  borderColor: string;
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    title: 'When you boot up a heavy game or 4K video, what sound does your PC make?',
    description: 'Acoustics reveal more about your bearings and thermal dissipation than any sensor.',
    options: [
      {
        text: 'A calm, polite hum like an autumn breeze.',
        subtext: 'You barely notice it exists.',
        personaScore: { zen: 3 }
      },
      {
        text: 'A Boeing 777 taking off from Hazrat Shahjalal Airport.',
        subtext: 'Fans immediately spin at 100% RPM to stay alive.',
        personaScore: { jetsetter: 3, overlord: 1 }
      },
      {
        text: 'A deep, heavy rattle like a CNG three-wheeler on Mirpur Road.',
        subtext: 'Dust carpets caught in sleeve bearings.',
        personaScore: { dragon: 3, slowpoke: 1 }
      },
      {
        text: 'A quick wheeze, erratic coil whine, then sudden ominous silence.',
        subtext: 'Power protection or VRM thermal trip.',
        personaScore: { phoenix: 3, overlord: 1 }
      }
    ]
  },
  {
    id: 2,
    title: 'When was the last time the side panel was opened and dusted?',
    description: 'Dhaka air has road dust, construction particles, and high humidity.',
    options: [
      {
        text: 'Within the last 3-4 months.',
        subtext: 'Filters are regularly washed and clean.',
        personaScore: { zen: 3 }
      },
      {
        text: 'About 1-2 years ago... maybe.',
        subtext: 'The mesh has a grey fuzzy sweater layer.',
        personaScore: { overlord: 2, jetsetter: 2 }
      },
      {
        text: 'Opening it now would qualify as an archaeological excavation.',
        subtext: 'Thick felted carpets inside the GPU fins and PSU shroud.',
        personaScore: { dragon: 3, slowpoke: 1 }
      },
      {
        text: 'Never opened since the day it was assembled at the computer market.',
        subtext: 'It is a sealed tomb of mysterious silicon secrets.',
        personaScore: { dragon: 2, phoenix: 2, overlord: 2 }
      }
    ]
  },
  {
    id: 3,
    title: 'How does the tempered glass or exhaust air feel during a gaming session?',
    description: 'Heat build-up indicates thermal dissipation efficiency vs heat trapping.',
    options: [
      {
        text: 'Cool to gently lukewarm — good airflow circulation.',
        subtext: 'Case exhaust feels like room temperature.',
        personaScore: { zen: 3 }
      },
      {
        text: 'Hot enough to warm up cold winter hands or Tong-er cha.',
        subtext: 'The top exhaust grille is genuinely toasty.',
        personaScore: { overlord: 2, jetsetter: 1 }
      },
      {
        text: 'Radiating heat like a Dhaka street food tandoor oven.',
        subtext: 'Glass is too hot to comfortably hold your palm against.',
        personaScore: { overlord: 3, dragon: 1 }
      },
      {
        text: 'Randomly cycles between cold and blistering hot right before shutting down.',
        subtext: 'Thermal pump-out effect; dry paste losing contact.',
        personaScore: { phoenix: 3, overlord: 1 }
      }
    ]
  },
  {
    id: 4,
    title: 'What happens when you have 25 Chrome tabs, Discord, and a game running?',
    description: 'Real-world multitasking tests memory stability and thermal throttling.',
    options: [
      {
        text: 'Smooth 144 FPS without dropping a frame.',
        subtext: 'Rock-solid system stability.',
        personaScore: { zen: 3 }
      },
      {
        text: 'Noticeable FPS stuttering whenever action intensifies.',
        subtext: 'Thermal throttling drops CPU/GPU core clock multiplier.',
        personaScore: { slowpoke: 3, overlord: 1 }
      },
      {
        text: 'Slide-show presentation mode: 15 FPS of pure suspense.',
        subtext: 'Severe CPU clock down-throttling to 800MHz base.',
        personaScore: { slowpoke: 3, dragon: 2 }
      },
      {
        text: 'Random Blue Screen (BSOD), black screen, or hard restart.',
        subtext: 'Memory timing instability, overheating VRMs, or power delivery drop.',
        personaScore: { phoenix: 3, slowpoke: 1 }
      }
    ]
  }
];

const PERSONA_RESULTS: Record<string, PersonaResult> = {
  dragon: {
    id: 'dragon',
    name: 'The Dusty Dragon',
    badge: '🐉',
    tagline: 'Hoarding ancient dust bunnies while breathing 88°C exhaust',
    description: 'Your PC was born to conquer high framerates, but right now its radiator fins and intake grilles are choked with a dense layer of Dhaka dust. Like a sleeping dragon under blankets of volcanic ash, it runs hot, grunts loudly, and complains under load.',
    symptoms: [
      'Intake mesh looks like a fuzzy grey carpet',
      'Fans spin loudly trying to suck air through blocked grilles',
      'GPU fans coated in sticky grime, reducing aerodynamic efficiency',
      'Idle temperatures consistently above 55°C'
    ],
    realityCheck: 'Airflow restriction suffocates your components. When fans fight dust, static pressure collapses, causing VRMs and storage drives to bake in dead air pockets.',
    recommendedService: 'Deep Cleaning',
    urgency: 'High',
    color: '#d97706',
    accentBg: 'bg-amber-500/10',
    borderColor: 'border-amber-500/30'
  },
  overlord: {
    id: 'overlord',
    name: 'The Overheating Overlord',
    badge: '🌋',
    tagline: 'Raw horsepower trapped in a thermal prison',
    description: 'Commanding high-end silicon that desperately wants to boost, but the original thermal paste has turned into dried-out chalk. Your PC spikes to 90°C+ the moment a game loads and immediately pulls back boost clocks to avoid self-destruction.',
    symptoms: [
      'CPU or GPU hits 85°C - 95°C within 60 seconds of load',
      'Case glass feels like a radiator panel',
      'Sudden FPS micro-stutters during heavy combat or rendering',
      'Fans run at maximum RPM even in light gameplay'
    ],
    realityCheck: 'Thermal throttling cuts your hardware performance by up to 25-35%. You paid for a high-performance machine, but dried paste is making it perform like an entry-level rig.',
    recommendedService: 'Thermal Maintenance',
    urgency: 'Immediate Action Needed',
    color: '#ef4444',
    accentBg: 'bg-rose-500/10',
    borderColor: 'border-rose-500/30'
  },
  slowpoke: {
    id: 'slowpoke',
    name: 'The Slowpoke Sorcerer',
    badge: '🧙‍♂️',
    tagline: 'Casting mysterious freeze spells on simple tasks',
    description: 'Takes 10 minutes to boot into Windows, hesitates before opening File Explorer, and turns modern titles into slideshows. It is not actually cursed — it is suffering from a combination of thermal clock throttling, choked storage, and unmaintained VRM power stages.',
    symptoms: [
      'Boot time feels like brewing a fresh kettle of tea',
      'Random 3-second system pauses when switching apps',
      'Games start smooth for 5 minutes then drop off a cliff',
      'Heavy disk or memory caching delays'
    ],
    realityCheck: 'When processors overheat, they down-clock to emergency safe frequencies (as low as 800MHz). Your CPU is trying to survive rather than compute.',
    recommendedService: 'Hardware Diagnostics',
    urgency: 'Moderate',
    color: '#8b5cf6',
    accentBg: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  },
  jetsetter: {
    id: 'jetsetter',
    name: 'The Jet Engine Jetsetter',
    badge: '✈️',
    tagline: 'Your bedroom is now the international airport runway',
    description: 'Opening YouTube or Discord causes fans to spin up like a turbine spooling for takeoff. Your headset noise cancellation is doing overtime. The cooling curve is in permanent panic mode because heat cannot escape quickly enough.',
    symptoms: [
      'Acoustic whine audible from the other room',
      'Fans ramping up and down aggressively on idle desktop',
      'Air coming out is warm, but temperatures stay high',
      'Vibrations felt through your desk'
    ],
    realityCheck: 'Worn sleeve bearings, uncalibrated BIOS fan curves, and uneven thermal contact force fans to work 3x harder than necessary, shortening fan motor lifespan.',
    recommendedService: 'Deep Cleaning',
    urgency: 'Moderate',
    color: '#0284c7',
    accentBg: 'bg-sky-500/10',
    borderColor: 'border-sky-500/30'
  },
  phoenix: {
    id: 'phoenix',
    name: 'The Fragile Phoenix',
    badge: '🔥',
    tagline: 'Heroic bursts of glory followed by sudden rebirth (reboots)',
    description: 'It can run your favorite software, but live on the knife-edge of survival. At unpredictable moments, you get a black screen, an abrupt power reset, or a dreaded Blue Screen (BSOD). It rises from the ashes after each reboot, but each crash is a warning shot.',
    symptoms: [
      'Sudden hard resets without error warnings during gaming',
      'Display driver crash or frozen screen requiring plug pull',
      'Strange buzzing or coil whine under graphics load',
      'Fails to power on unless power cable is toggled'
    ],
    realityCheck: 'Sudden reboots are rarely "just software". Overheating GPU VRAM, dry thermal pads on VRMs, or power supply rail sag degrade delicate electronics. Don\'t wait for magic smoke.',
    recommendedService: 'GPU Repair',
    urgency: 'Immediate Action Needed',
    color: '#f97316',
    accentBg: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30'
  },
  zen: {
    id: 'zen',
    name: 'The Chill Zen Master',
    badge: '🧘',
    tagline: 'Cool, whisper-quiet, and running in peak harmony',
    description: 'A model citizen of the PC Master Race! Your temperatures are restrained, airflow is balanced, and fan acoustics are peaceful. Either you built this rig recently or you understand the golden rule of preventative PC care.',
    symptoms: [
      'Temperatures stay well below 75°C during intense workloads',
      'Fans whisper quietly with smooth RPM ramps',
      'Filters are inspected and dusted regularly',
      'No unexpected crashes or thermal drop-offs'
    ],
    realityCheck: 'Even the most pristine setup in Bangladesh collects fine road dust over 6-9 months. Keep up periodic maintenance to maintain maximum component resale value and lifespan.',
    recommendedService: 'Deep Cleaning',
    urgency: 'Low',
    color: '#10b981',
    accentBg: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  }
};

interface PCPersonaQuizProps {
  onSelectService: (serviceName: string) => void;
}

export function PCPersonaQuiz({ onSelectService }: PCPersonaQuizProps) {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [resultPersona, setResultPersona] = useState<PersonaResult | null>(null);
  const [copied, setCopied] = useState<boolean>(false);

  const handleSelectOption = (optionIndex: number) => {
    const updatedAnswers = [...selectedAnswers];
    updatedAnswers[currentStep] = optionIndex;
    setSelectedAnswers(updatedAnswers);

    if (currentStep < QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResult(updatedAnswers);
    }
  };

  const calculateResult = (answers: number[]) => {
    const scoreSheet: Record<string, number> = {
      dragon: 0,
      overlord: 0,
      slowpoke: 0,
      jetsetter: 0,
      phoenix: 0,
      zen: 0
    };

    answers.forEach((optionIdx, questionIdx) => {
      const q = QUESTIONS[questionIdx];
      const selected = q.options[optionIdx];
      if (selected && selected.personaScore) {
        Object.entries(selected.personaScore).forEach(([key, val]) => {
          scoreSheet[key] = (scoreSheet[key] || 0) + (val || 0);
        });
      }
    });

    // Find persona with highest score
    let highestKey = 'overlord';
    let maxVal = -1;
    Object.entries(scoreSheet).forEach(([key, val]) => {
      if (val > maxVal) {
        maxVal = val;
        highestKey = key;
      }
    });

    setResultPersona(PERSONA_RESULTS[highestKey] || PERSONA_RESULTS['overlord']);
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setSelectedAnswers([]);
    setResultPersona(null);
    setCopied(false);
  };

  const handleCopy = () => {
    if (!resultPersona) return;
    const text = `My PC's Persona on PCDecode is "${resultPersona.name}" ${resultPersona.badge}\nTagline: ${resultPersona.tagline}\nDiagnostic Advice: ${resultPersona.recommendedService} recommended!`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="quiz" className="w-full bg-[#faf9f6] py-16 sm:py-24 border-b border-[#e8e6e1] relative">
      <div className="max-w-[980px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[680px] mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#0d0f12] uppercase bg-[#d9ff3d] px-3.5 py-1 rounded-full border border-black/10 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            FUN INTERACTIVE DIAGNOSTIC
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-4">
            What's Your PC's Persona?
          </h2>
          <p className="text-sm sm:text-base text-[#52555c] mt-3 leading-relaxed">
            Answer 4 honest questions about how your PC behaves when you push it. We'll decode its true personality, diagnose its hidden thermal bottlenecks, and tell you how to save it.
          </p>
        </div>

        {/* Quiz Card Container */}
        <div className="mt-10 bg-white rounded-3xl border border-[#dedad0] shadow-xl overflow-hidden">
          
          {!resultPersona ? (
            /* ACTIVE QUIZ WIZARD */
            <div className="p-6 sm:p-10">
              
              {/* Progress & Header */}
              <div className="flex items-center justify-between gap-4 pb-6 border-b border-[#e8e6e1]">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#6a6d75] uppercase">
                  <span>Question {currentStep + 1} of {QUESTIONS.length}</span>
                </div>
                <div className="w-36 sm:w-48 h-2 bg-[#f0eee6] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#0d0f12] transition-all duration-300 rounded-full"
                    style={{ width: `${((currentStep + 1) / QUESTIONS.length) * 100}%` }}
                  ></div>
                </div>
              </div>

              {/* Question Text */}
              <div className="mt-8">
                <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                  Scenario {currentStep + 1}
                </span>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-[#0d0f12] mt-3 leading-snug">
                  {QUESTIONS[currentStep].title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5f626a] mt-1.5">
                  {QUESTIONS[currentStep].description}
                </p>
              </div>

              {/* Options Grid */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {QUESTIONS[currentStep].options.map((opt, idx) => {
                  const isSelected = selectedAnswers[currentStep] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(idx)}
                      className={`text-left p-4 sm:p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between group ${
                        isSelected
                          ? 'border-[#0d0f12] bg-[#f9f8f4] shadow-md ring-2 ring-[#0d0f12]'
                          : 'border-[#e8e6e1] bg-white hover:border-[#b0ad9f] hover:bg-[#faf9f6]'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="font-heading font-bold text-sm sm:text-base text-[#0d0f12] group-hover:text-black">
                          {opt.text}
                        </span>
                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#0d0f12] border-[#0d0f12] text-[#d9ff3d]'
                            : 'border-[#c8c5ba]'
                        }`}>
                          {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                        </div>
                      </div>
                      {opt.subtext && (
                        <span className="text-xs text-[#6e717a] mt-2 block font-sans">
                          {opt.subtext}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Navigation Back / Next Controls */}
              <div className="mt-8 pt-6 border-t border-[#e8e6e1] flex items-center justify-between">
                <button
                  onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
                  disabled={currentStep === 0}
                  className="text-xs font-semibold text-[#666970] hover:text-black disabled:opacity-30 disabled:pointer-events-none px-3 py-2 cursor-pointer"
                >
                  ← Previous Question
                </button>

                <div className="text-xs text-[#878a93]">
                  Click any option to advance
                </div>
              </div>

            </div>
          ) : (
            /* RESULT CARD */
            <div className="p-6 sm:p-10 animate-fadeIn">
              
              {/* Persona Header Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-[#e8e6e1]">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center text-3xl sm:text-4xl shadow-inner shrink-0">
                    {resultPersona.badge}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#686b72]">
                        YOUR PC'S PERSONA
                      </span>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border ${resultPersona.borderColor} ${resultPersona.accentBg} text-[#0d0f12]`}>
                        Risk: {resultPersona.urgency}
                      </span>
                    </div>
                    <h3 className="font-heading text-2xl sm:text-4xl font-bold text-[#0d0f12] mt-0.5">
                      {resultPersona.name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#4f5259] mt-1 italic">
                      "{resultPersona.tagline}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-start sm:self-auto">
                  <button
                    onClick={handleCopy}
                    className="bg-[#f0eee6] hover:bg-[#e4e1d7] text-[#0d0f12] text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-[#dedad0] flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Copy Persona Result"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied to Clipboard!' : 'Share Persona'}</span>
                  </button>
                  <button
                    onClick={resetQuiz}
                    className="bg-[#faf9f6] hover:bg-[#ebe8de] text-[#0d0f12] text-xs font-semibold px-3.5 py-2.5 rounded-xl border border-[#dedad0] flex items-center gap-1.5 transition-all cursor-pointer"
                    title="Retake Quiz"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Retake</span>
                  </button>
                </div>
              </div>

              {/* Personality Narrative & Analysis */}
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Left: Description & Symptoms */}
                <div className="lg:col-span-7 space-y-5">
                  <div>
                    <h4 className="font-heading text-xs font-bold tracking-wider text-[#797c84] uppercase">
                      The Behavioral Profile
                    </h4>
                    <p className="text-sm sm:text-base text-[#24262b] mt-2 leading-relaxed">
                      {resultPersona.description}
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-[#faf9f6] border border-[#dedad0]">
                    <h4 className="font-heading text-xs font-bold tracking-wider text-[#52555c] uppercase mb-2.5 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                      Recognizable Symptoms You Are Experiencing:
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-[#3e4147]">
                      {resultPersona.symptoms.map((symptom, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0d0f12] shrink-0 mt-2"></span>
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80 text-xs text-amber-950">
                    <span className="font-bold block mb-1">PCDecode Technical Reality Check:</span>
                    {resultPersona.realityCheck}
                  </div>
                </div>

                {/* Right: Remedy & Booking Prescription */}
                <div className="lg:col-span-5 flex flex-col justify-between p-5 rounded-2xl bg-[#0d0f12] text-white">
                  <div>
                    <span className="text-[11px] font-mono font-bold text-[#d9ff3d] uppercase tracking-widest">
                      RECOMMENDED TREATMENT
                    </span>
                    <h4 className="font-heading text-2xl font-bold text-white mt-1">
                      {resultPersona.recommendedService}
                    </h4>
                    <p className="text-xs text-[#a9adb8] mt-2 leading-relaxed">
                      Targeted service designed to cure {resultPersona.name}'s specific bottlenecks with genuine thermal compounds, ultrasonic/ESD cleaning, and complete multi-point stress verification.
                    </p>

                    <div className="mt-5 space-y-2 text-xs text-[#cbd0dc]">
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#d9ff3d] shrink-0" />
                        <span>Done at your doorstep in Dhaka OR via courier</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#d9ff3d] shrink-0" />
                        <span>Pre- and Post-Thermal benchmark verification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#d9ff3d] shrink-0" />
                        <span>Backed by PCDecode 30-Day Service Warranty</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-5 border-t border-white/10 flex flex-col gap-2.5">
                    <button
                      onClick={() => onSelectService(resultPersona.recommendedService)}
                      className="w-full bg-[#d9ff3d] hover:bg-[#cbf72b] text-[#0d0f12] font-heading font-bold text-sm rounded-xl py-3 px-4 flex items-center justify-center gap-2 transition-all cursor-pointer shadow active:scale-95"
                    >
                      <span>Book {resultPersona.recommendedService} Now</span>
                      <ArrowRight className="w-4 h-4 text-[#0d0f12]" />
                    </button>
                    <button
                      onClick={resetQuiz}
                      className="text-xs text-center text-[#8e93a0] hover:text-white py-1 cursor-pointer"
                    >
                      Want to try with a different PC? Retake Quiz
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
