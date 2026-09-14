import { Search, MessageSquareCode, CheckSquare, ShieldCheck } from 'lucide-react';

export function WhyUsSection() {
  const reasons = [
    {
      num: '01',
      icon: Search,
      title: 'Diagnose First, Quote Accurately',
      desc: 'We isolate the actual fault before quoting any repair.',
      detail: 'We probe power delivery rails, test memory integrity, and measure heat dissipation with digital multimeters and load tools instead of guessing.',
      standard: 'Diagnostic Log Provided',
    },
    {
      num: '02',
      icon: MessageSquareCode,
      title: 'Explain Clearly in Plain Language',
      desc: 'No confusing tech jargon or fear-mongering.',
      detail: 'We tell you clearly in Bangla or English what broke, why it failed, and what options exist. If a component is working fine, we tell you it is fine.',
      standard: 'Customer Approval Required',
    },
    {
      num: '03',
      icon: CheckSquare,
      title: 'Stress-Tested Under Real Load',
      desc: 'A repair is not finished just because Windows boots up.',
      detail: 'Turning on the monitor is not proof of stability. We run sustained gaming and synthetic stress cycles to verify zero throttling, artifacts, or crashes.',
      standard: 'Thermal & Stability Verified',
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: '30-Day Service Warranty',
      desc: 'We stand behind our diagnostic and repair work.',
      detail: 'If the exact same issue reoccurs within 30 days of service, our technicians re-inspect and handle it with zero additional labor fee.',
      standard: 'Documented Service Card',
    },
  ];

  return (
    <section id="why-us" className="w-full bg-[#f6f5f0] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="max-w-[800px]">
          <span className="inline-block text-xs font-mono font-bold tracking-wider text-[#6f6e6a] uppercase">
            HOW WE WORK
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            Because <span className="bg-[#d9ff3d] px-2 py-0.5 rounded text-[#0d0f12]">"just replace it, ভাই"</span> <br className="hidden sm:inline" />
            is usually bad advice.
          </h2>

          <p className="text-base sm:text-lg text-[#44464c] mt-5 leading-relaxed">
            Your PC is a significant investment. You shouldn't have to pay for replacement parts you don't actually need. That's why we diagnose first, explain what's happening, and only recommend the work your PC actually needs.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => {
            const IconComp = reason.icon;
            return (
              <div
                key={reason.num}
                className="bg-white rounded-2xl border border-[#e8e6e1] p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-4 font-mono text-3xl font-bold text-[#e8e6e1] group-hover:text-[#0d0f12]/15 transition-colors">
                  {reason.num}
                </span>

                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center mb-5 shadow-xs">
                    <IconComp className="w-5 h-5 stroke-[2.2]" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#0d0f12] tracking-tight leading-snug">
                    {reason.title}
                  </h3>

                  <p className="text-sm font-semibold text-[#27292e] mt-2.5">
                    {reason.desc}
                  </p>

                  <p className="text-xs text-[#6f6e6a] mt-3 leading-relaxed">
                    {reason.detail}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#e8e6e1]/80 flex items-center justify-between text-xs text-[#0d0f12] font-mono">
                  <span className="text-[#6f6e6a]">Standard:</span>
                  <span className="font-bold text-[#0d0f12]">{reason.standard}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-10 bg-[#0d0f12] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-xl font-bold text-white">
              Told your motherboard or GPU is dead?
            </h4>
            <p className="text-sm text-[#a4a8b1]">
              Local shops in Elephant Road or Multiplan often declare boards dead when it's merely a blown 5V rail capacitor, dried solder joint, or corrupt BIOS. Let our technicians inspect it first.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-[#d9ff3d]">
              Component-Level Inspection
            </div>
            <div className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-white">
              No Fix = No Labor Fee
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
