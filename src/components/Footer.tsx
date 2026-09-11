import { Terminal, Phone, Mail, MapPin, Heart } from 'lucide-react';

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
          
          {/* Brand Col */}
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
              Professional PC Repair & Maintenance • Dhaka + Nationwide Courier
            </div>

            <p className="text-xs sm:text-sm text-[#9da1ac] mt-4 leading-relaxed max-w-[340px]">
              Deep cleaning, thermal maintenance, hardware diagnostics, GPU repair and motherboard servicing — handled with care, tested properly and backed by our service warranty.
            </p>

            <div className="mt-6 flex items-center gap-3 text-xs text-[#b0b4bf]">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Dhaka Technicians on Standby</span>
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
                  Thermal Maintenance
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Hardware Diagnostics
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  GPU Repair
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#services')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Motherboard Repair
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: COMPANY */}
          <div className="lg:col-span-2">
            <h4 className="font-heading text-xs font-bold tracking-widest text-[#d9ff3d] uppercase mb-4">
              COMPANY
            </h4>
            <ul className="space-y-2.5 text-sm text-[#b0b4be]">
              <li>
                <button onClick={() => scrollTo('#why-us')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Why PCDecode
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#courier')} className="hover:text-white transition-colors cursor-pointer text-left">
                  How It Works
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#results')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Results
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#reviews')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Reviews
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: SUPPORT */}
          <div className="lg:col-span-3">
            <h4 className="font-heading text-xs font-bold tracking-widest text-[#d9ff3d] uppercase mb-4">
              SUPPORT
            </h4>
            <ul className="space-y-2.5 text-sm text-[#b0b4be]">
              <li>
                <button onClick={onBookClick} className="hover:text-[#d9ff3d] transition-colors cursor-pointer text-left">
                  Book a Service
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#quiz')} className="hover:text-[#d9ff3d] transition-colors cursor-pointer text-left">
                  PC Persona Quiz
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#health-score')} className="hover:text-[#d9ff3d] transition-colors cursor-pointer text-left">
                  PC Health Score
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo('#courier')} className="hover:text-white transition-colors cursor-pointer text-left">
                  Courier Service
                </button>
              </li>
              <li>
                <button onClick={onOpenPackingGuide} className="hover:text-white transition-colors cursor-pointer text-left">
                  Packing Guide
                </button>
              </li>
              <li>
                <button onClick={onOpenContact} className="hover:text-white transition-colors cursor-pointer text-left">
                  Contact
                </button>
              </li>
            </ul>

            <div className="mt-6 pt-4 border-t border-[#202228] text-xs text-[#828692] space-y-1">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#d9ff3d]" />
                <span>Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-[#d9ff3d]" />
                <span>+880 1700-000000 (24/7 WhatsApp)</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Line & Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7e828e]">
          <div className="font-heading font-bold text-sm text-white tracking-wide">
            Your PC. Our Problem.
          </div>

          <div>
            © 2026 PCDecode. All rights reserved.
          </div>
        </div>

      </div>
    </footer>
  );
}
