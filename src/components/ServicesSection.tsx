import { useState } from 'react';
import { SERVICES_DATA } from '../data';
import { InteractiveBeforeAfter } from './InteractiveBeforeAfter';
import { Check, ArrowRight, Sparkles, Thermometer, Cpu, Wrench } from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceName: string) => void;
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  const [activeTab, setActiveTab] = useState<string>(SERVICES_DATA[0].id);

  return (
    <section id="services" className="w-full bg-[#faf9f6] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Section Header */}
        <div className="max-w-[820px]">
          <span className="inline-block text-xs font-bold tracking-wider text-[#6f6e6a] uppercase">
            WHAT WE ACTUALLY DO
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
            From <span className="text-[#a83232]">"ভাই PC টা গরম হয়"</span> <br className="hidden sm:inline" />
            to <span className="text-emerald-700 bg-[#d9ff3d]/60 px-2 py-0.5 rounded">"ভাই এখন একদম ঠিক আছে."</span>
          </h2>

          <p className="text-base sm:text-lg text-[#4a4d53] mt-5 leading-relaxed">
            Whether your PC needs a proper cleanup or serious hardware attention, we handle the work carefully — and test it before calling the job done.
          </p>
        </div>

        {/* Tab Navigation for Desktop/Mobile */}
        <div className="mt-10 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {SERVICES_DATA.map((service, index) => {
            const isActive = activeTab === service.id;
            return (
              <button
                key={service.id}
                onClick={() => setActiveTab(service.id)}
                className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap transition-all cursor-pointer flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#0d0f12] text-white border-[#0d0f12] shadow-sm'
                    : 'bg-white text-[#4a4d53] border-[#e8e6e1] hover:border-[#cfccc3]'
                }`}
              >
                <span className={`font-mono text-xs ${isActive ? 'text-[#d9ff3d]' : 'text-[#6f6e6a]'}`}>
                  0{index + 1}
                </span>
                <span>{service.title}</span>
              </button>
            );
          })}
        </div>

        {/* Services List / Expanded Cards */}
        <div className="mt-8 space-y-12">
          {SERVICES_DATA.map((service) => {
            if (activeTab !== service.id) return null;

            return (
              <div
                key={service.id}
                className="bg-white rounded-2xl border border-[#e8e6e1] p-6 sm:p-8 lg:p-10 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center transition-all animate-fadeIn"
              >
                {/* Left: Copy & Details */}
                <div className="lg:col-span-6 flex flex-col items-start">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs font-bold text-[#0d0f12] bg-[#f0eee6] border border-[#e2ded5] px-2.5 py-1 rounded-md">
                      {service.number}
                    </span>
                    <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      {service.badge}
                    </span>
                    {service.startingPrice && (
                      <span className="text-xs font-medium text-[#6f6e6a]">
                        {service.startingPrice}
                      </span>
                    )}
                  </div>

                  <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#0d0f12] tracking-tight mt-4 leading-snug">
                    {service.heading}
                  </h3>

                  <p className="text-base text-[#46484e] mt-4 leading-relaxed">
                    {service.copy}
                  </p>

                  {/* Feature Checklist */}
                  <div className="mt-6 space-y-2.5 w-full">
                    {service.features.map((feat) => (
                      <div key={feat} className="flex items-start gap-2.5 text-sm text-[#27292e]">
                        <span className="w-5 h-5 rounded-full bg-[#d9ff3d] text-black flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                          ✓
                        </span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action CTA */}
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onSelectService(service.title)}
                      className="bg-[#0d0f12] hover:bg-[#22252b] text-white font-semibold text-sm rounded-full px-7 py-3 flex items-center gap-2 shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
                    >
                      <span>{service.ctaText}</span>
                      <ArrowRight className="w-4 h-4 text-[#d9ff3d]" />
                    </button>

                    <span className="text-xs text-[#6f6e6a]">
                      Home Service in Dhaka • Courier Nationwide
                    </span>
                  </div>
                </div>

                {/* Right: Interactive Before & After Visual */}
                <div className="lg:col-span-6">
                  {service.beforeAfter && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono text-[#6f6e6a] px-1">
                        <span className="font-semibold text-[#0d0f12]">{service.title} Proof</span>
                        <span>{service.beforeAfter.description}</span>
                      </div>

                      <InteractiveBeforeAfter
                        beforeImg={service.beforeAfter.beforeImg}
                        afterImg={service.beforeAfter.afterImg}
                        beforeLabel={service.beforeAfter.beforeLabel}
                        afterLabel={service.beforeAfter.afterLabel}
                        heightClass="h-[320px] sm:h-[360px]"
                        title={service.title}
                      />

                      <div className="p-3 bg-[#faf9f6] rounded-xl border border-[#e8e6e1] text-xs text-[#52555b] flex items-center justify-between">
                        <span className="font-medium text-[#0d0f12]">
                          Evidence-based service:
                        </span>
                        <span>We photograph & log thermals before and after</span>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>

        {/* Bottom Service Grid overview for scannability */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {SERVICES_DATA.map((srv, idx) => (
            <div
              key={srv.id}
              onClick={() => setActiveTab(srv.id)}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                activeTab === srv.id
                  ? 'bg-white border-[#0d0f12] shadow-sm ring-1 ring-[#0d0f12]'
                  : 'bg-[#f6f5f0] border-[#e8e6e1] hover:border-[#cfccc3]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-[#6f6e6a]">0{idx + 1}</span>
                <span className="text-xs font-bold text-[#0d0f12]">{srv.startingPrice}</span>
              </div>
              <h4 className="font-heading font-bold text-base text-[#0d0f12] mt-1">
                {srv.title}
              </h4>
              <p className="text-xs text-[#6f6e6a] mt-1 line-clamp-2">
                {srv.heading}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
