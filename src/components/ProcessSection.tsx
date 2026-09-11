import { MessageSquare, MapPin, Wrench, CheckCircle2 } from 'lucide-react';

export function ProcessSection() {
  const steps = [
    {
      num: '01',
      icon: MessageSquare,
      title: 'Tell Us What\'s Wrong',
      banglaQuotes: [
        '"ভাই PC অন হয় কিন্তু display আসে না."',
        '"ভাই game খেললে অনেক গরম হয়."',
      ],
      desc: 'Whatever the problem is, tell us what you\'re experiencing.',
    },
    {
      num: '02',
      icon: MapPin,
      title: 'We Check It',
      desc: 'For Dhaka customers, our technician comes to your location.',
      subtext: 'Outside Dhaka? Ship safely via our secure courier intake flow.',
    },
    {
      num: '03',
      icon: Wrench,
      title: 'We Fix What Needs Fixing',
      desc: 'We explain the issue and carry out the required service or repair.',
      subtext: 'Clear pricing upfront before doing any hardware replacements.',
    },
    {
      num: '04',
      icon: CheckCircle2,
      title: 'We Test Everything',
      desc: 'Because "চালু হচ্ছে" and "properly working" are two different things.',
      subtext: '30-minute gaming/render stress tests + 30-day repair warranty certificate.',
    },
  ];

  return (
    <section className="w-full bg-[#f6f5f0] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="max-w-[760px]">
          <span className="inline-block text-xs font-bold tracking-wider text-[#6f6e6a] uppercase">
            HOW IT WORKS
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            No complicated process. <br className="hidden sm:inline" />
            Just four simple steps.
          </h2>
        </div>

        {/* 4 Steps Grid */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const IconComp = step.icon;
            return (
              <div
                key={step.num}
                className="bg-white rounded-2xl border border-[#e8e6e1] p-6 flex flex-col justify-between shadow-sm relative overflow-hidden"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-10 h-10 rounded-lg bg-[#0d0f12] text-[#d9ff3d] flex items-center justify-center font-bold">
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
                    <div className="my-3 space-y-1.5 bg-[#f6f5f0] p-3 rounded-lg border border-[#e8e6e1] text-xs font-medium text-[#2d3036]">
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
                    <p className="text-xs text-[#6f6e6a] mt-2">
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
