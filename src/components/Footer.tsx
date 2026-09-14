import { Terminal, Phone, Mail, MapPin, Heart, Clock, Truck, ShieldCheck, MessageSquare } from 'lucide-react';
import { DUMMY_COURIER_HUB } from '../data/courierHub';

interface FooterProps {
  onBookClick: () => void;
  onOpenPackingGuide: () => void;
  onOpenContact: () => void;
}

export function Footer({ onBookClick, onOpenPackingGuide, onOpenContact }: FooterProps) {
  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="w-full bg-[#0a0b0e] text-white pt-16 pb-12 border-t border-[#202228]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#202228]">
          
          {/* Brand & About PCDecode Col */}
          <div className="lg:col-span-4 flex flex-col items-start">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-[#d9ff3d] rounded-lg flex items-center justify-center text-black">
                <Terminal className="w-5 h-5 stroke-[2.5]" />
              </div>
              <span className="font-heading text-xl font-bold tracking-tight text-white">
                PCDecode
              </span>
            </div>

            <div className="mt-2 text-xs font-mono text-[#d9ff3d]">
              Professional PC Repair & Hardware Diagnostics
            </div>

            <p className="text-xs sm:text-sm text-[#9da1ac] mt-4 leading-relaxed max-w-[340px]">
              We believe your PC isn't automatically obsolete just because it crashed. We diagnose root causes first, replace only what's failed, and verify everything with synthetic stress tests before delivery.
            </p>

            <div className="mt-6 flex flex-col gap-2 text-xs text-[#b0b4bf]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Dhaka Technicians on Standby</span>
              </div>
              <div className="flex items-center gap-2 text-[#8c919d]">
                <Truck className="w-3.5 h-3.5 text-[#d9ff3d]" />
                <span>Serving all 64 Districts via Courier</span>
              </div>
            </div>
          </div>

          {/* Column 2: SERVICES */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-bold tracking-widest text-[#d9ff3d] uppercase mb-4">
              SERVICES
            </h4>
            <ul className="space-y-2.5 text-sm text-[#b0b4be]">
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Deep Cleaning
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Thermal Paste / Maintenance
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Hardware Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  GPU & Motherboard Repair
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Full Tune-up & Inspection
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: NAVIGATION */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xs font-bold tracking-widest text-[#d9ff3d] uppercase mb-4">
              EXPLORE
            </h4>
            <ul className="space-y-2.5 text-sm text-[#b0b4be]">
              <li>
                <button onClick={() => scrollTo('#why-us')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Why PCDecode
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#how-it-works')} className="hover:text-white transition-colors cursor-pointer text-left">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#results')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Technical Results
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#courier')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Courier Service
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#reviews')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Customer Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: LAB ADDRESS & CONTACT */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-bold tracking-widest text-[#d9ff3d] uppercase mb-4">
              DIAGNOSTIC LAB & CONTACT
            </h4>
            
            <div className="space-y-3 text-xs text-[#b0b4be]">
              <div>
                <div className="font-bold text-white text-sm">{DUMMY_COURIER_HUB.labName}</div>
                <p className="mt-1 text-[#9da1ac] font-mono leading-relaxed">
                  {DUMMY_COURIER_HUB.addressLine1}, {DUMMY_COURIER_HUB.addressLine2}<br />
                  {DUMMY_COURIER_HUB.city}-{DUMMY_COURIER_HUB.postalCode}, Bangladesh
                </p>
              </div>

              <div className="pt-2 border-t border-[#202228] space-y-1.5 font-mono">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#d9ff3d] shrink-0" />
                  <span>Sat - Thu: 10:00 AM - 8:00 PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[#d9ff3d] shrink-0" />
                  <span>Lab: {DUMMY_COURIER_HUB.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-3.5 h-3.5 text-[#25D366] shrink-0" />
                  <span>WhatsApp: +880 1700-000000</span>
                </div>
              </div>

              <div className="pt-3 flex flex-wrap gap-2">
                <button
                  onClick={onBookClick}
                  className="bg-[#d9ff3d] hover:bg-[#cbf72b] text-black font-semibold px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer"
                >
                  Book a Service
                </button>
                <button
                  onClick={onOpenPackingGuide}
                  className="bg-white/10 hover:bg-white/20 text-white font-medium px-3 py-1.5 rounded-lg text-xs transition-colors cursor-pointer border border-white/10"
                >
                  Packing Guide
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7e828e]">
          <div className="font-heading font-bold text-sm text-white tracking-wide">
            Diagnose first. Replace only when necessary.
          </div>

          <div>
            © 2026 PCDecode. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
