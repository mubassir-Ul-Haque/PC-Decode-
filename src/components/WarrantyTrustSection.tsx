import { ShieldCheck, CheckCircle2, Cpu, Headphones } from 'lucide-react';

export function WarrantyTrustSection() {
  const pillars = [
    {
      icon: ShieldCheck,
      title: '30-Day Repair Warranty',
      desc: 'If the exact same issue reoccurs within 30 days, we fix it with zero extra labor fee.',
    },
    {
      icon: Cpu,
      title: 'Genuine Replacement Parts',
      desc: 'No duplicate MOSFETs or cheap fake pastes. Only branded, verified genuine components.',
    },
    {
      icon: CheckCircle2,
      title: 'Final Testing',
      desc: 'Synthetically stressed with FurMark, Cinebench, and MemTest before handing it back.',
    },
    {
      icon: Headphones,
      title: 'Customer Support',
      desc: 'Got a question a week later? Message our tech directly on WhatsApp with your job ID.',
    },
  ];

  return (
    <section className="w-full bg-[#faf9f6] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="max-w-[840px]">
          <span className="inline-block text-xs font-bold tracking-wider text-[#6f6e6a] uppercase">
            WE DON'T DISAPPEAR AFTER THE PAYMENT
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            Good service shouldn't end with <br className="hidden sm:inline" />
            <span className="bg-[#f0eed9] border border-[#d9d5ba] px-2 py-0.5 rounded text-[#0d0f12]">"ভাই টাকা পাঠায়েন."</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4a4d53] mt-5 leading-relaxed">
            We believe the responsibility doesn't stop when the service is complete. That's why completed repairs come with a 30-day service warranty, and our support remains available when you need us.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {pillars.map((pillar) => {
            const IconComp = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-white rounded-2xl border border-[#e8e6e1] p-6 sm:p-7 shadow-sm flex flex-col justify-between hover:border-[#cfccc3] transition-all"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center mb-5 shadow-sm">
                    <IconComp className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  <h3 className="font-heading text-lg font-bold text-[#0d0f12] tracking-tight">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-[#4e5158] mt-2.5 leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-[#e8e6e1] flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-700">
                  <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
                  <span>Documented Service Standard</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Reassurance Strip */}
        <div className="mt-10 p-5 rounded-2xl bg-[#0d0f12] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <span className="w-3 h-3 rounded-full bg-[#d9ff3d] shrink-0"></span>
            <span className="text-sm font-medium text-[#e4e7ec]">
              Every repair is logged with photos, component voltages, and temperatures in your service card.
            </span>
          </div>
          <span className="text-xs font-mono text-[#d9ff3d] bg-white/10 px-3 py-1.5 rounded-full border border-white/10 shrink-0">
            30-Day Physical Warranty Card
          </span>
        </div>

      </div>
    </section>
  );
}
