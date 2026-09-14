import { MessageSquare, Search, CheckSquare, Wrench } from 'lucide-react';

export function ProcessSection() {
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

  return (
    <section id="process" className="w-full bg-[#f6f5f0] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="max-w-[760px]">
          <span className="inline-block text-xs font-mono font-bold tracking-wider text-[#6f6e6a] uppercase">
            HOW IT WORKS
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            No complicated process. <br className="hidden sm:inline" />
            Just four simple steps.
          </h2>

          <p className="text-base sm:text-lg text-[#4a4d53] mt-3 leading-relaxed">
            Transparent from the initial diagnosis to final benchmark testing. No repairs begin without your clear confirmation.
          </p>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className={`bg-white rounded-2xl border p-6 flex flex-col justify-between shadow-xs relative overflow-hidden transition-all ${
                  step.highlight
                    ? 'border-[#0d0f12] ring-1 ring-[#0d0f12]/10 bg-white'
                    : 'border-[#e8e6e1] hover:border-[#cfccc3]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold ${
                      step.highlight ? 'bg-[#d9ff3d] text-[#0d0f12]' : 'bg-[#0d0f12] text-[#d9ff3d]'
                    }`}>
                      <IconComp className="w-5 h-5 stroke-[2.2]" />
                    </div>
                    <span className="font-mono text-2xl font-bold text-[#cfccc3]">
                      {step.num}
                    </span>
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#0d0f12] leading-snug">
                    {step.title}
                  </h3>

                  {/* Bangla quotes if step 1 */}
                  {step.banglaQuotes && (
                    <div className="my-3 space-y-1 bg-[#f6f5f0] p-2.5 rounded-lg border border-[#e8e6e1] text-[11px] font-medium text-[#2d3036]">
                      {step.banglaQuotes.map((q) => (
                        <p key={q} className="italic text-[#0d0f12]">
                          {q}
                        </p>
                      ))}
                    </div>
                  )}

                  <p className="text-sm text-[#3b3e44] mt-2.5 leading-relaxed">
                    {step.desc}
                  </p>

                  {step.subtext && (
                    <p className="text-xs text-[#6f6e6a] mt-2.5 pt-2 border-t border-[#f0eee6]">
                      {step.subtext}
                    </p>
                  )}
                </div>

                <div className="mt-6 pt-3 border-t border-[#e8e6e1]/70 font-mono text-[11px] text-[#6f6e6a]">
                  Step {step.num} of 04
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
