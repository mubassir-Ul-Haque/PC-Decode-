import { Search, Home, CheckSquare, Truck } from 'lucide-react';

export function TrustStrip() {
  const trustItems = [
    {
      icon: Search,
      title: 'Diagnose First',
      desc: 'We identify what is actually wrong before suggesting parts or repairs.',
    },
    {
      icon: Home,
      title: 'Home Service in Dhaka',
      desc: 'Technicians come to your location with diagnostic and maintenance equipment.',
    },
    {
      icon: CheckSquare,
      title: 'Customer Approval',
      desc: 'Clear explanation and pricing upfront. No work begins without your green light.',
    },
    {
      icon: Truck,
      title: 'Nationwide Courier',
      desc: 'Outside Dhaka? Safe courier intake and return delivery across 64 districts.',
    },
  ];

  return (
    <section className="w-full bg-[#0d0f12] text-white py-8 border-y border-[#26282e]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {trustItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start gap-3.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="w-10 h-10 rounded-lg bg-[#d9ff3d]/10 text-[#d9ff3d] border border-[#d9ff3d]/20 flex items-center justify-center shrink-0 mt-0.5">
                  <IconComponent className="w-5 h-5 stroke-[2.2]" />
                </div>
                <div className="flex flex-col">
                  <div className="flex items-center gap-2">
                    <h3 className="font-heading text-lg font-semibold text-white tracking-tight uppercase">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm font-medium text-white/50 mt-1.5 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
