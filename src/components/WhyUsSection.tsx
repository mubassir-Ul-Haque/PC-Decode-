import { Search, MessageSquareCode, CheckSquare, ShieldCheck } from 'lucide-react';

export function WhyUsSection() {
  const reasons = [
    {
      num: '01',
      icon: Search,
      title: 'We Diagnose Before We Repair',
      desc: 'No blind guessing. We find the problem first.',
      detail: 'We probe power delivery, memory integrity, and heat dissipation with multimeters and synthetic stress tests before unscrewing arbitrary components.',
    },
    {
      num: '02',
      icon: MessageSquareCode,
      title: 'We Explain What Happened',
      desc: 'You\'ll know what\'s wrong and what we\'re doing about it.',
      detail: 'No cryptic tech talk. We tell you plainly in Bangla or English what failed, why it failed, and what options you have before spending 1 Taka.',
    },
    {
      num: '03',
      icon: CheckSquare,
      title: 'We Test the Work',
      desc: 'A repair isn\'t finished just because the PC turns on.',
      detail: 'Just seeing a Windows desktop isn\'t proof of a stable PC. We run 15-30 minute heavy gaming and render loops to confirm zero crashes under real load.',
    },
    {
      num: '04',
      icon: ShieldCheck,
      title: 'We Stand Behind It',
      desc: 'Completed repairs come with a 30-day service warranty.',
      detail: 'If the exact same issue reoccurs within 30 days of our repair or maintenance, our technicians re-inspect it with zero additional service charge.',
    },
  ];

  return (
    <section id="why-us" className="w-full bg-[#f6f5f0] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="max-w-[800px]">
          <span className="inline-block text-xs font-bold tracking-wider text-[#6f6e6a] uppercase">
            WHY PEOPLE CALL US
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            Because <span className="bg-[#d9ff3d] px-2 py-0.5 rounded text-[#0d0f12]">"just replace it, ভাই"</span> <br className="hidden sm:inline" />
            isn't always the answer.
          </h2>

          <p className="text-base sm:text-lg text-[#44464c] mt-5 leading-relaxed">
            Your PC is expensive. Your time is valuable. And nobody likes paying for something they didn't actually need. That's why we diagnose first, explain what's happening, and only recommend the work your PC actually needs.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reasons.map((reason) => {
            const IconComp = reason.icon;
            return (
              <div
                key={reason.num}
                className="bg-white rounded-2xl border border-[#e8e6e1] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
              >
                {/* Number watermark */}
                <span className="absolute top-4 right-4 font-mono text-3xl font-bold text-[#e8e6e1] group-hover:text-[#d9ff3d]/60 transition-colors">
                  {reason.num}
                </span>

                <div>
                  <div className="w-11 h-11 rounded-xl bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center mb-5 shadow-sm">
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

                <div className="mt-6 pt-4 border-t border-[#e8e6e1]/80 flex items-center justify-between text-xs text-[#0d0f12] font-mono font-medium">
                  <span>PCDecode Standard</span>
                  <span className="text-emerald-700">Verified ✓</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Trust Banner */}
        <div className="mt-10 bg-[#0d0f12] text-white rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center sm:text-left">
            <h4 className="font-heading text-xl font-bold text-white">
              No guesswork. No inflated parts quotes.
            </h4>
            <p className="text-sm text-[#a4a8b1]">
              Every diagnosis comes with an honest assessment: what is broken, what can be fixed, and what is totally fine.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-[#d9ff3d]">
              100% Genuine Thermal Pastes
            </div>
            <div className="px-4 py-2 rounded-full border border-white/20 bg-white/5 text-xs font-mono text-white">
              Dhaka + Courier
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
