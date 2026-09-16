import { ArrowRight, Phone, MessageSquare, ShieldCheck, Zap } from 'lucide-react';

interface FinalCTASectionProps {
  onBookClick: () => void;
  onTalkClick: () => void;
}

export function FinalCTASection({ onBookClick, onTalkClick }: FinalCTASectionProps) {
  return (
    <section className="w-full bg-[#0d0f12] text-white py-16 md:py-24 border-b border-[#24262b] relative overflow-hidden">
      
      {/* Subtle background radial flare */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#d9ff3d]/10 rounded-full blur-3xl pointer-events-none -z-0"></div>

      <div className="max-w-[980px] mx-auto px-4 sm:px-8 text-center relative z-10">
        
        {/* Eyebrow */}
        <span className="inline-block text-xs font-mono font-bold tracking-widest text-[#d9ff3d] uppercase bg-white/10 px-3 py-1 rounded-full border border-white/10">
          STILL THINKING ABOUT IT?
        </span>

        {/* Heading */}
        <h2 className="font-heading text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mt-5 leading-tight">
          Your PC won't fix itself. <br />
          <span className="text-[#d9ff3d]">We've checked.</span>
        </h2>

        {/* Copy */}
        <p className="text-base sm:text-xl text-[#b4b8c2] mt-6 leading-relaxed max-w-[680px] mx-auto">
          Whether it's overheating, slowing down, making suspicious noises or simply refusing to cooperate — let's figure out what's actually going on.
        </p>

        {/* Buttons */}
        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={onBookClick}
            data-cursor="start"
            className="btn-directional bg-[#d9ff3d] text-[#0d0f12] font-heading font-bold text-base rounded-full px-8 py-4 flex items-center gap-2.5 shadow-lg transition-all cursor-pointer"
            id="final-cta-book-service"
          >
            <span>Book a Service</span>
            <ArrowRight className="w-4 h-4 text-[#0d0f12]" />
          </button>

          <button
            onClick={onTalkClick}
            className="btn-directional bg-white/10 text-white font-heading font-semibold text-base rounded-full px-7 py-4 border border-white/20 flex items-center gap-2.5 transition-all cursor-pointer"
            id="final-cta-whatsapp-us"
          >
            <MessageSquare className="w-4 h-4 text-[#d9ff3d]" />
            <span>WhatsApp Us</span>
          </button>
        </div>

        {/* Small reassurance */}
        <div className="mt-8 flex items-center justify-center gap-4 text-xs text-[#8c909b]">
          <span>Home service in Dhaka</span>
          <span>•</span>
          <span>Nationwide courier</span>
          <span>•</span>
          <span>30-Day service warranty</span>
        </div>

      </div>
    </section>
  );
}
