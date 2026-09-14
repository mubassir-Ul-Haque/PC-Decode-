import { BEFORE_AFTER_CASES } from '../data';
import { BeforeAfterCarousel } from './BeforeAfterCarousel';
import { ArrowRight, Sparkles, ShieldCheck } from 'lucide-react';

interface ResultsSectionProps {
  onBookClick: () => void;
}

export function ResultsSection({ onBookClick }: ResultsSectionProps) {
  return (
    <section id="results" className="w-full bg-[#0b0c0f] py-16 md:py-24 border-b border-[#20232c] text-white">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Editorial Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 sm:mb-12">
          <div className="max-w-[700px]">
            <div className="inline-flex items-center gap-2 border border-white/10 bg-white/5 rounded-full px-3.5 py-1 text-xs font-mono font-bold text-[#d9ff3d] uppercase tracking-wider">
              <span className="w-2 h-2 rounded-full bg-[#d9ff3d] inline-block animate-pulse"></span>
              <span>AUTHENTIC CASE STUDIES</span>
            </div>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mt-3.5 leading-tight">
              THE WORK SPEAKS.
            </h2>

            <p className="text-base sm:text-lg text-[#9da3b4] mt-2.5 leading-relaxed">
              Real PCs. Real service work. Before and after.
            </p>
          </div>

          <div className="text-xs text-[#7e8596] font-mono flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Actual component photography from Dhaka customer benches</span>
          </div>
        </div>

        {/* Reusable Editorial Before/After Carousel */}
        <BeforeAfterCarousel
          cases={BEFORE_AFTER_CASES}
          onBookClick={onBookClick}
        />

        {/* Minimal Bottom Action */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-white/10">
          <p className="text-xs sm:text-sm text-[#8c92a2]">
            Ready to have your cooling system restored and components inspected?
          </p>

          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2.5 bg-[#d9ff3d] hover:bg-[#cbf72b] text-black font-semibold text-sm rounded-full px-7 py-3 transition-all cursor-pointer shadow-md active:scale-95"
            id="results-book-service-btn"
          >
            <span>Book a Service</span>
            <ArrowRight className="w-4 h-4 text-black" />
          </button>
        </div>

      </div>
    </section>
  );
}
