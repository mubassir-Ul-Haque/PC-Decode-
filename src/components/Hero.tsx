import { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Thermometer, Fan, Cpu, Activity, AlertTriangle, Sparkles, RefreshCw } from 'lucide-react';

interface HeroProps {
  onBookClick: () => void;
  onExploreClick: () => void;
}

export function Hero({ onBookClick, onExploreClick }: HeroProps) {
  const [isServiced, setIsServiced] = useState(true);

  return (
    <section className="relative w-full overflow-hidden bg-[#faf9f6] pt-10 pb-16 md:pt-14 md:pb-20 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Authentic Copy */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 border border-[#d8d5cb] bg-[#f0eee6] rounded-full px-3.5 py-1.5 text-xs font-semibold text-[#3b3a36] tracking-wide uppercase">
              <span className="w-2 h-2 rounded-full bg-emerald-600 inline-block"></span>
              <span>YOUR PC ISN'T "OLD" — MAYBE IT JUST NEEDS SOME CARE.</span>
            </div>

            {/* Main Heading */}
            <h1
              className="font-heading text-4xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-[#0d0f12] leading-[1.08] mt-5"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              PC Slow? <br />
              Hot? <br />
              Making Weird Sounds? <br />
              <span className="inline-block bg-[#0d0f12] text-[#d9ff3d] px-3 py-1 rounded-lg mt-1 shadow-sm">
                We Decode It.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#4a4d53] mt-5 leading-relaxed max-w-[580px]">
              From dusty fans and dried-out thermal paste to GPU and motherboard problems, we find out what's actually wrong with your PC — then fix it properly.
            </p>

            {/* The Bangladeshi PC Expert Truth Box */}
            <div className="mt-5 p-4 rounded-xl bg-[#f2efe6] border border-[#e4e1d7] max-w-[540px] w-full">
              <div className="flex flex-col gap-2 font-medium text-sm text-[#27292e]">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span>No random part changing.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span>No <span className="font-bold text-[#0d0f12]">"ভাই, motherboard শেষ"</span> without checking.</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center text-xs font-bold shrink-0">✓</span>
                  <span>No unnecessary drama.</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <button
                onClick={onBookClick}
                className="bg-[#0d0f12] hover:bg-[#202227] text-white font-semibold text-base rounded-full px-8 py-3.5 flex items-center gap-2.5 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                id="hero-cta-book-service"
              >
                <span>Book a Service</span>
                <ArrowRight className="w-4 h-4 text-[#d9ff3d]" />
              </button>

              <button
                onClick={onExploreClick}
                className="border border-[#cfccc3] hover:border-[#0d0f12] bg-white hover:bg-[#faf9f6] text-[#0d0f12] font-semibold text-base rounded-full px-7 py-3.5 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                id="hero-cta-see-what-we-do"
              >
                <span>See What We Do</span>
              </button>
            </div>

            {/* Small Trust Text */}
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-[#64676d]">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Home Service in Dhaka • Nationwide Courier • 30-Day Repair Warranty</span>
            </div>
          </div>

          {/* Right Column: Interactive Diagnostic Lab Unit Visual */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[440px] relative">
              
              {/* Floating Decorative Rings */}
              <div className="absolute -inset-4 rounded-3xl bg-[#f0ede4] -z-10 border border-[#e4e1d7]/60 transform rotate-1"></div>
              
              {/* Lab Unit Card */}
              <div className="bg-[#0f1115] text-white rounded-2xl p-5 sm:p-6 border border-white/10 shadow-2xl relative overflow-hidden">
                
                {/* Header of Unit */}
                <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#d9ff3d] animate-pulse"></span>
                    <span className="font-mono text-xs font-semibold text-neutral-300 tracking-wider">
                      PC DECODE • BENCH TEST 01
                    </span>
                  </div>
                  <span className="font-mono text-[10px] bg-[#d9ff3d] text-black font-bold px-2 py-0.5 rounded uppercase">
                    LIVE TELEMETRY
                  </span>
                </div>

                {/* State Switcher (Before vs After Decode) */}
                <div className="mt-4 bg-white/5 p-1 rounded-xl flex items-center gap-1 border border-white/10 text-xs font-medium">
                  <button
                    onClick={() => setIsServiced(false)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                      !isServiced ? 'bg-red-500/20 text-red-300 font-bold border border-red-500/40' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    Dusty & Throttling
                  </button>
                  <button
                    onClick={() => setIsServiced(true)}
                    className={`flex-1 py-1.5 px-2 rounded-lg text-center transition-all cursor-pointer ${
                      isServiced ? 'bg-[#d9ff3d] text-black font-bold shadow' : 'text-neutral-400 hover:text-white'
                    }`}
                  >
                    After PCDecode
                  </button>
                </div>

                {/* Metrics Grid */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {/* GPU/CPU Temp */}
                  <div className={`rounded-xl p-3.5 border transition-all ${
                    isServiced ? 'bg-white/5 border-white/10' : 'bg-red-950/20 border-red-500/30'
                  }`}>
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span>PEAK TEMP</span>
                      <Thermometer className={`w-3.5 h-3.5 ${isServiced ? 'text-[#d9ff3d]' : 'text-red-400'}`} />
                    </div>
                    <div className="font-heading text-3xl font-bold mt-1">
                      {isServiced ? (
                        <span className="text-white">62°C</span>
                      ) : (
                        <span className="text-red-400">89°C 🔥</span>
                      )}
                    </div>
                    <div className="mt-2 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isServiced ? 'w-[48%] bg-[#d9ff3d]' : 'w-[96%] bg-red-500'
                        }`}
                      ></div>
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      {isServiced ? '−27°C after thermal repaste' : 'Thermal throttling detected'}
                    </span>
                  </div>

                  {/* Fan Acoustic & Flow */}
                  <div className={`rounded-xl p-3.5 border transition-all ${
                    isServiced ? 'bg-white/5 border-white/10' : 'bg-amber-950/20 border-amber-500/30'
                  }`}>
                    <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                      <span>FAN RPM & NOISE</span>
                      <Fan className={`w-3.5 h-3.5 ${isServiced ? 'text-[#d9ff3d]' : 'text-amber-400'}`} />
                    </div>
                    <div className="font-heading text-2xl font-bold mt-1">
                      {isServiced ? (
                        <span className="text-white">1,250 <span className="text-xs font-normal text-neutral-400">RPM</span></span>
                      ) : (
                        <span className="text-amber-300">3,600 <span className="text-xs font-normal text-amber-400">RPM</span></span>
                      )}
                    </div>
                    <div className="mt-2 flex gap-1">
                      <div className={`h-1.5 flex-1 rounded-full ${isServiced ? 'bg-[#d9ff3d]' : 'bg-amber-400'}`}></div>
                      <div className={`h-1.5 flex-1 rounded-full ${isServiced ? 'bg-[#d9ff3d]' : 'bg-amber-400'}`}></div>
                      <div className={`h-1.5 flex-1 rounded-full ${isServiced ? 'bg-white/15' : 'bg-red-500'}`}></div>
                    </div>
                    <span className="text-[10px] text-neutral-400 mt-1 block">
                      {isServiced ? 'Whisper-quiet acoustic curve' : 'Screaming like an airplane'}
                    </span>
                  </div>
                </div>

                {/* Component Status Row */}
                <div className="mt-3 rounded-xl bg-white/5 border border-white/10 p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${
                      isServiced ? 'bg-[#d9ff3d] text-black' : 'bg-red-500/20 text-red-400'
                    }`}>
                      <Cpu className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">
                        {isServiced ? 'Full Turbo Boost Sustained' : 'Clocks dropping to 2.1 GHz'}
                      </div>
                      <div className="text-[11px] text-neutral-400 font-mono">
                        {isServiced ? 'No FPS stutter • Max stability' : 'FPS dropping to PowerPoint'}
                      </div>
                    </div>
                  </div>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded font-bold ${
                    isServiced ? 'bg-emerald-500/20 text-emerald-300' : 'bg-red-500/20 text-red-300'
                  }`}>
                    {isServiced ? 'PASSED' : 'STRESSED'}
                  </span>
                </div>

                {/* Footer of Lab Unit */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-neutral-400">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d9ff3d]" />
                    30-Day Service Guarantee
                  </span>
                  <button
                    onClick={() => setIsServiced(!isServiced)}
                    className="text-[#d9ff3d] hover:underline font-mono text-[11px] flex items-center gap-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3 h-3" /> Toggle state
                  </button>
                </div>

              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-3.5 -right-3 bg-white text-[#0d0f12] border border-[#e4e1d7] rounded-xl px-3.5 py-2 shadow-lg flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-semibold">Dhaka Technicians on Standby</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
