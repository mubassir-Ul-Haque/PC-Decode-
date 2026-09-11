import { useState, useMemo } from 'react';
import { Activity, Thermometer, Wind, Zap, AlertTriangle, CheckCircle2, ShieldAlert, ArrowRight, RefreshCw, Info, Cpu, Wrench } from 'lucide-react';

interface PCHealthScoreCalculatorProps {
  onSelectService: (serviceName: string) => void;
}

export function PCHealthScoreCalculator({ onSelectService }: PCHealthScoreCalculatorProps) {
  // Input parameters
  const [loadTemp, setLoadTemp] = useState<number>(84); // 40 - 105 °C
  const [dustAge, setDustAge] = useState<string>('1-2y'); // '3m', '6-12m', '1-2y', 'never'
  const [environment, setEnvironment] = useState<string>('dhaka-room'); // 'ac-room', 'dhaka-room'
  const [pasteAge, setPasteAge] = useState<string>('2y'); // 'fresh', '1y', '2y', '3y+'
  const [hasFpsDrop, setHasFpsDrop] = useState<boolean>(true);
  const [hasLoudFans, setHasLoudFans] = useState<boolean>(true);
  const [hasCrashes, setHasCrashes] = useState<boolean>(false);

  // Score Calculation logic
  const { score, tier, recommendation, penalties } = useMemo(() => {
    let currentScore = 100;
    const penaltyBreakdown = {
      thermal: 0,
      dust: 0,
      paste: 0,
      stability: 0
    };

    // 1. Temperature Calculation (Max 35 pts penalty)
    if (loadTemp <= 65) {
      penaltyBreakdown.thermal = 0;
    } else if (loadTemp <= 75) {
      penaltyBreakdown.thermal = 8;
    } else if (loadTemp <= 85) {
      penaltyBreakdown.thermal = 18;
    } else if (loadTemp <= 92) {
      penaltyBreakdown.thermal = 28;
    } else {
      penaltyBreakdown.thermal = 35; // Severe throttling
    }

    // 2. Dust & Environment (Max 25 pts penalty)
    let dustPenalty = 0;
    if (dustAge === '3m') dustPenalty += 0;
    else if (dustAge === '6-12m') dustPenalty += 8;
    else if (dustAge === '1-2y') dustPenalty += 16;
    else if (dustAge === 'never') dustPenalty += 22;

    if (environment === 'dhaka-room') {
      dustPenalty += 3; // ambient dust & higher humidity factor
    }
    penaltyBreakdown.dust = Math.min(25, dustPenalty);

    // 3. Thermal Paste & Interface Integrity (Max 15 pts penalty)
    if (pasteAge === 'fresh') penaltyBreakdown.paste = 0;
    else if (pasteAge === '1y') penaltyBreakdown.paste = 5;
    else if (pasteAge === '2y') penaltyBreakdown.paste = 10;
    else if (pasteAge === '3y+') penaltyBreakdown.paste = 15;

    // 4. Performance & Stability Benchmarks (Max 25 pts penalty)
    let stabilityPenalty = 0;
    if (hasFpsDrop) stabilityPenalty += 9;
    if (hasLoudFans) stabilityPenalty += 7;
    if (hasCrashes) stabilityPenalty += 14;
    penaltyBreakdown.stability = Math.min(25, stabilityPenalty);

    currentScore = Math.max(12, 100 - (penaltyBreakdown.thermal + penaltyBreakdown.dust + penaltyBreakdown.paste + penaltyBreakdown.stability));

    // Determine Tier
    let tierData = {
      label: 'Excellent',
      sublabel: 'Peak Hardware Health',
      color: '#10b981',
      badgeBg: 'bg-emerald-50 text-emerald-800 border-emerald-300',
      description: 'Your PC operates within ideal factory thermal and acoustic envelopes. Sustained boost clocks remain constant with negligible silicon degradation.',
      service: 'Deep Cleaning',
      urgency: 'Low / Preventative'
    };

    if (currentScore < 50) {
      tierData = {
        label: 'Needs Attention',
        sublabel: 'Critical Hardware Risk & Throttling',
        color: '#ef4444',
        badgeBg: 'bg-rose-50 text-rose-800 border-rose-300',
        description: 'Dangerous heat trapping and dry thermal compound are causing frequent thermal throttling, severe FPS stuttering, or risking permanent silicon and VRM power stage degradation.',
        service: 'Hardware Diagnostics',
        urgency: 'Immediate Action Advised'
      };
    } else if (currentScore < 70) {
      tierData = {
        label: 'Fair',
        sublabel: 'Active Thermal Throttling & Dust Choke',
        color: '#f59e0b',
        badgeBg: 'bg-amber-50 text-amber-800 border-amber-300',
        description: 'Noticeable performance loss. Fans run constantly loud to compensate for dried thermal grease and clogged heatsink fins. You are losing 15–25% real-world speed.',
        service: 'Thermal Maintenance',
        urgency: 'Recommended Soon'
      };
    } else if (currentScore < 85) {
      tierData = {
        label: 'Good',
        sublabel: 'Minor Maintenance Recommended',
        color: '#3b82f6',
        badgeBg: 'bg-blue-50 text-blue-800 border-blue-300',
        description: 'System is stable, but dust accumulation and aging thermal paste have begun slowly elevating idle and peak load temperatures.',
        service: 'Deep Cleaning',
        urgency: 'Routine Maintenance'
      };
    }

    return {
      score: currentScore,
      tier: tierData,
      recommendation: tierData.service,
      penalties: penaltyBreakdown
    };
  }, [loadTemp, dustAge, environment, pasteAge, hasFpsDrop, hasLoudFans, hasCrashes]);

  return (
    <section id="health-score" className="w-full bg-[#faf9f6] py-16 sm:py-24 border-b border-[#e8e6e1] relative">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-[720px] mx-auto">
          <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#0d0f12] uppercase bg-[#d9ff3d] px-3.5 py-1 rounded-full border border-black/10 shadow-sm">
            <Activity className="w-3.5 h-3.5" />
            DIAGNOSTIC TELEMETRY LAB
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-4">
            Calculate Your PC Health Score
          </h2>
          <p className="text-sm sm:text-base text-[#52555c] mt-3 leading-relaxed">
            Adjust the diagnostic parameters below to match your PC's real-world conditions. Our diagnostic algorithm computes an aggregate 0–100 score based on thermal margins, airflow restriction, and silicon stability.
          </p>
        </div>

        {/* Main Grid: Parameters on Left, Live Score Card on Right */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT 7 COLS: Interactive Parameter Controls */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-[#dedad0] shadow-sm space-y-7">
            
            <div className="flex items-center justify-between border-b border-[#e8e6e1] pb-4">
              <h3 className="font-heading font-bold text-lg text-[#0d0f12] flex items-center gap-2">
                <Wrench className="w-4 h-4 text-[#0d0f12]" />
                Operating Parameters
              </h3>
              <button
                onClick={() => {
                  setLoadTemp(68);
                  setDustAge('3m');
                  setEnvironment('ac-room');
                  setPasteAge('fresh');
                  setHasFpsDrop(false);
                  setHasLoudFans(false);
                  setHasCrashes(false);
                }}
                className="text-xs font-mono text-[#5b5e66] hover:text-black flex items-center gap-1 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Reset to Ideal Spec
              </button>
            </div>

            {/* 1. CPU/GPU Temperature Slider */}
            <div>
              <div className="flex items-center justify-between">
                <label className="text-sm font-bold text-[#0d0f12] flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4 text-[#ef4444]" />
                  Peak CPU / GPU Load Temperature
                </label>
                <div className="flex items-center gap-2">
                  <span className={`text-base font-mono font-bold px-2.5 py-0.5 rounded-lg border ${
                    loadTemp >= 90 ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    loadTemp >= 80 ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-emerald-50 text-emerald-700 border-emerald-200'
                  }`}>
                    {loadTemp}°C
                  </span>
                  <span className="text-xs text-[#70737d]">
                    {loadTemp >= 90 ? '(Thermal Throttling)' : loadTemp >= 80 ? '(Elevated Heat)' : '(Safe Margin)'}
                  </span>
                </div>
              </div>

              <input
                type="range"
                min="45"
                max="102"
                step="1"
                value={loadTemp}
                onChange={(e) => setLoadTemp(Number(e.target.value))}
                className="w-full h-2 bg-[#e8e6e1] rounded-lg appearance-none cursor-pointer accent-[#0d0f12] mt-3"
              />

              <div className="flex justify-between text-[11px] font-mono text-[#7e828d] mt-1.5">
                <span>45°C (Ice Cool)</span>
                <span>75°C (Acceptable)</span>
                <span>85°C (Hot)</span>
                <span>100°C+ (Dangerous)</span>
              </div>
            </div>

            {/* 2. Dust Accumulation / Cleaning Recency */}
            <div>
              <label className="text-sm font-bold text-[#0d0f12] flex items-center gap-1.5 mb-2.5">
                <Wind className="w-4 h-4 text-[#3b82f6]" />
                Time Since Last Deep Cleaning & Filter Wash
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { key: '3m', label: '< 3 Months', desc: 'Minimal dust' },
                  { key: '6-12m', label: '6 - 12 Months', desc: 'Light lint layer' },
                  { key: '1-2y', label: '1 - 2 Years', desc: 'Dense felt carpet' },
                  { key: 'never', label: 'Never / 2y+', desc: 'Severe blockage' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setDustAge(item.key)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      dustAge === item.key
                        ? 'border-[#0d0f12] bg-[#f5f4ee] ring-2 ring-[#0d0f12]'
                        : 'border-[#e8e6e1] bg-white hover:border-[#b8b5a8]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#0d0f12]">{item.label}</div>
                    <div className="text-[10px] text-[#696d76] mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Thermal Paste Age */}
            <div>
              <label className="text-sm font-bold text-[#0d0f12] flex items-center gap-1.5 mb-2.5">
                <Zap className="w-4 h-4 text-[#d97706]" />
                Thermal Paste Condition & Age
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {[
                  { key: 'fresh', label: 'Fresh (<6m)', desc: 'Optimal contact' },
                  { key: '1y', label: '1 Year Old', desc: 'Normal drying' },
                  { key: '2y', label: '2 Years Old', desc: 'Pump-out loss' },
                  { key: '3y+', label: '3+ Years / Stock', desc: 'Fossilized cement' }
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => setPasteAge(item.key)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      pasteAge === item.key
                        ? 'border-[#0d0f12] bg-[#f5f4ee] ring-2 ring-[#0d0f12]'
                        : 'border-[#e8e6e1] bg-white hover:border-[#b8b5a8]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#0d0f12]">{item.label}</div>
                    <div className="text-[10px] text-[#696d76] mt-0.5">{item.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Room Environment */}
            <div>
              <label className="text-sm font-bold text-[#0d0f12] mb-2.5 block">
                Operating Room Environment
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEnvironment('ac-room')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    environment === 'ac-room'
                      ? 'border-[#0d0f12] bg-[#f5f4ee] ring-2 ring-[#0d0f12]'
                      : 'border-[#e8e6e1] bg-white hover:border-[#b8b5a8]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#0d0f12]">Air-Conditioned Room (22–24°C)</div>
                  <div className="text-[11px] text-[#696d76] mt-0.5">Low humidity, clean filtered ambient air</div>
                </button>

                <button
                  type="button"
                  onClick={() => setEnvironment('dhaka-room')}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    environment === 'dhaka-room'
                      ? 'border-[#0d0f12] bg-[#f5f4ee] ring-2 ring-[#0d0f12]'
                      : 'border-[#e8e6e1] bg-white hover:border-[#b8b5a8]'
                  }`}
                >
                  <div className="text-xs font-bold text-[#0d0f12]">Standard Dhaka Room (28–34°C)</div>
                  <div className="text-[11px] text-[#696d76] mt-0.5">Street dust exposure, ceiling fan, higher humidity</div>
                </button>
              </div>
            </div>

            {/* 5. Real-World Symptom Checks */}
            <div>
              <label className="text-sm font-bold text-[#0d0f12] mb-2.5 block">
                Benchmark Symptoms Observed
              </label>
              <div className="space-y-2">
                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e8e6e1] hover:bg-[#faf9f6] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasFpsDrop}
                    onChange={(e) => setHasFpsDrop(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0d0f12] focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#0d0f12]">FPS Drops & Micro-Stutters Under Load</div>
                    <div className="text-[11px] text-[#6b6e77]">Sudden framerate drops when rendering or in heavy combat</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e8e6e1] hover:bg-[#faf9f6] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasLoudFans}
                    onChange={(e) => setHasLoudFans(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0d0f12] focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#0d0f12]">Loud Fans Ramping Up at Idle or Light Tasks</div>
                    <div className="text-[11px] text-[#6b6e77]">Aggressive turbine noise opening basic browser tabs</div>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl border border-[#e8e6e1] hover:bg-[#faf9f6] cursor-pointer">
                  <input
                    type="checkbox"
                    checked={hasCrashes}
                    onChange={(e) => setHasCrashes(e.target.checked)}
                    className="w-4 h-4 rounded text-[#0d0f12] focus:ring-0 cursor-pointer"
                  />
                  <div>
                    <div className="text-xs font-bold text-[#0d0f12]">Unexpected Reboots, Black Screens, or BSODs</div>
                    <div className="text-[11px] text-[#6b6e77]">Hardware safety trips under sustained stress</div>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* RIGHT 5 COLS: Live Score Card & Diagnostics */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* The Big Score Card */}
            <div className="bg-[#0d0f12] text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden">
              
              {/* Subtle accent glow */}
              <div
                className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: tier.color }}
              ></div>

              <div className="flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-[#d9ff3d] uppercase tracking-wider">
                  HEALTH SCORE RESULT
                </span>
                <span className={`text-xs font-bold font-mono px-2.5 py-1 rounded-full border ${tier.badgeBg}`}>
                  {tier.label}
                </span>
              </div>

              {/* Numerical Score Dial */}
              <div className="mt-6 flex items-baseline gap-3">
                <div
                  className="font-heading text-6xl sm:text-7xl font-extrabold tracking-tight"
                  style={{ color: tier.color }}
                >
                  {score}
                </div>
                <div className="text-xl font-bold text-[#717682]">
                  / 100
                </div>
              </div>

              <div className="text-sm font-semibold text-[#e1e4ed] mt-1">
                {tier.sublabel}
              </div>

              <p className="text-xs text-[#a4a9b7] mt-3 leading-relaxed">
                {tier.description}
              </p>

              {/* Deductions Breakdown */}
              <div className="mt-6 pt-5 border-t border-[#252830] space-y-2 text-xs">
                <div className="flex justify-between text-[#8f94a2]">
                  <span>Thermal Margin Penalty:</span>
                  <span className={penalties.thermal > 0 ? 'text-rose-400 font-mono font-bold' : 'text-emerald-400 font-mono'}>
                    -{penalties.thermal} pts
                  </span>
                </div>
                <div className="flex justify-between text-[#8f94a2]">
                  <span>Dust & Airflow Penalty:</span>
                  <span className={penalties.dust > 0 ? 'text-rose-400 font-mono font-bold' : 'text-emerald-400 font-mono'}>
                    -{penalties.dust} pts
                  </span>
                </div>
                <div className="flex justify-between text-[#8f94a2]">
                  <span>Thermal Paste Degradation:</span>
                  <span className={penalties.paste > 0 ? 'text-rose-400 font-mono font-bold' : 'text-emerald-400 font-mono'}>
                    -{penalties.paste} pts
                  </span>
                </div>
                <div className="flex justify-between text-[#8f94a2]">
                  <span>Stability & Throttling Penalty:</span>
                  <span className={penalties.stability > 0 ? 'text-rose-400 font-mono font-bold' : 'text-emerald-400 font-mono'}>
                    -{penalties.stability} pts
                  </span>
                </div>
              </div>

              {/* Recommendation Callout */}
              <div className="mt-6 p-4 rounded-2xl bg-[#17191f] border border-[#2b2e37]">
                <div className="text-[11px] font-mono text-[#d9ff3d] uppercase font-bold">
                  RECOMMENDED REMEDY
                </div>
                <div className="font-heading text-lg font-bold text-white mt-0.5">
                  {tier.service}
                </div>
                <div className="text-xs text-[#8f94a2] mt-1">
                  Estimated improvement: <strong className="text-white">-14°C to -22°C</strong> under load, restoring 100% boost clock consistency.
                </div>

                <button
                  onClick={() => onSelectService(tier.service)}
                  className="w-full mt-4 bg-[#d9ff3d] hover:bg-[#cbf72b] text-[#0d0f12] font-heading font-bold text-xs sm:text-sm py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow active:scale-95"
                >
                  <span>Book {tier.service}</span>
                  <ArrowRight className="w-4 h-4 text-[#0d0f12]" />
                </button>
              </div>

            </div>

            {/* Score Ranges Guide Explanation Box */}
            <div className="bg-white p-5 sm:p-6 rounded-3xl border border-[#dedad0] shadow-sm">
              <h4 className="font-heading font-bold text-sm text-[#0d0f12] uppercase tracking-wider mb-3 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-[#0d0f12]" />
                What Score Ranges Mean
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#f0eee6]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0 mt-1"></span>
                  <div>
                    <div className="font-bold text-[#0d0f12]">85 – 100: Excellent (Peak Condition)</div>
                    <div className="text-[#646771]">Fans whisper, sustained peak boost clocks, negligible silicon wear.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#f0eee6]">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0 mt-1"></span>
                  <div>
                    <div className="font-bold text-[#0d0f12]">70 – 84: Good (Minor Maintenance Recommended)</div>
                    <div className="text-[#646771]">Stable performance, but dust is beginning to accumulate on intake filters.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pb-2.5 border-b border-[#f0eee6]">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0 mt-1"></span>
                  <div>
                    <div className="font-bold text-[#0d0f12]">50 – 69: Fair (Thermal Throttling Active)</div>
                    <div className="text-[#646771]">Dried paste and blocked heatsinks causing 15–25% framerate drops and loud fan noise.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0 mt-1"></span>
                  <div>
                    <div className="font-bold text-[#0d0f12]">0 – 49: Needs Attention (Critical Risk)</div>
                    <div className="text-[#646771]">Extreme heat, sudden BSODs or shutdowns. Risk of GPU/VRM solder joint damage.</div>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* Calculation Methodology Transparent Footer */}
        <div className="mt-12 p-6 rounded-3xl bg-[#f2efe6] border border-[#e4e1d7] text-xs text-[#4b4e56]">
          <div className="font-heading font-bold text-sm text-[#0d0f12] mb-2 flex items-center gap-2">
            <Cpu className="w-4 h-4 text-[#0d0f12]" />
            How PCDecode Calculates Your Score
          </div>
          <p className="leading-relaxed">
            Our score is an aggregate of 4 weighted engineering disciplines: 
            <strong> Thermal Headroom (35%)</strong> measures the delta between your operating temperatures and silicon throttling thresholds; 
            <strong> Dust & Airflow Restriction (25%)</strong> estimates static pressure loss through radiator fins in typical high-dust urban environments; 
            <strong> Silicon Stability & Benchmarks (25%)</strong> accounts for frametime pacing, clock stability, and safety cut-offs; and 
            <strong> Thermal Interface Integrity (15%)</strong> tracks compound phase dry-out over time.
          </p>
        </div>

      </div>
    </section>
  );
}
