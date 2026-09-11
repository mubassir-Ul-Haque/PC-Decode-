import { RESULTS_DATA } from '../data';
import { InteractiveBeforeAfter } from './InteractiveBeforeAfter';
import { Sparkles, ArrowRight } from 'lucide-react';

interface ResultsSectionProps {
  onBookClick: () => void;
}

export function ResultsSection({ onBookClick }: ResultsSectionProps) {
  return (
    <section id="results" className="w-full bg-[#faf9f6] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[720px]">
            <span className="inline-block text-xs font-bold tracking-wider text-[#6f6e6a] uppercase">
              DON'T TAKE OUR WORD FOR IT
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
              See the difference.
            </h2>

            <p className="text-base sm:text-lg text-[#4a4d53] mt-4 leading-relaxed">
              A proper PC service should leave evidence. Cleaner components. Better thermals. A working system. Show the actual before-and-after results here.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#f0eee6] border border-[#d8d5cb] rounded-full px-4 py-2 text-xs font-mono text-[#0d0f12] font-semibold shrink-0">
            <span className="w-2 h-2 rounded-full bg-[#d9ff3d] inline-block border border-black/30"></span>
            <span>Interactive: Drag it. See the difference.</span>
          </div>
        </div>

        {/* 3 Before & After Comparison Cards */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {RESULTS_DATA.map((card, idx) => (
            <div
              key={card.id}
              className="bg-white rounded-2xl border border-[#e8e6e1] overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow"
            >
              {/* Card Header */}
              <div className="p-5 border-b border-[#e8e6e1] flex items-center justify-between">
                <div>
                  <span className="font-mono text-xs text-[#6f6e6a]">CARD 0{idx + 1}</span>
                  <h3 className="font-heading text-lg font-bold text-[#0d0f12]">
                    {card.title}
                  </h3>
                </div>
                <span className="text-[11px] font-mono font-medium px-2.5 py-1 rounded-full bg-[#f6f5f0] text-[#0d0f12] border border-[#e8e6e1]">
                  {card.smallLabel}
                </span>
              </div>

              {/* Card Slider */}
              <div className="p-4">
                <InteractiveBeforeAfter
                  beforeImg={card.beforeImg}
                  afterImg={card.afterImg}
                  beforeLabel="Before"
                  afterLabel="After"
                  initialSlider={card.initialSlider}
                  heightClass="h-[260px] sm:h-[280px]"
                  title={card.title}
                />
              </div>

              {/* Card Footer Details */}
              <div className="px-5 pb-5 pt-2 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#575a61]">
                  <span className="font-semibold text-red-700 bg-red-50 px-2 py-0.5 rounded border border-red-200">
                    Before: {card.beforeText}
                  </span>
                  <span className="font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    After: {card.afterText}
                  </span>
                </div>
                <p className="text-[#6f6e6a] text-[11px] italic text-center pt-1 border-t border-[#e8e6e1]/60">
                  "{card.smallLabel}"
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Action Callout */}
        <div className="mt-12 text-center">
          <button
            onClick={onBookClick}
            className="inline-flex items-center gap-2 bg-[#0d0f12] hover:bg-[#22252a] text-white font-semibold text-sm rounded-full px-8 py-3.5 shadow-md hover:shadow-lg transition-all cursor-pointer"
          >
            <span>Get Your PC Serviced Like This</span>
            <ArrowRight className="w-4 h-4 text-[#d9ff3d]" />
          </button>
        </div>

      </div>
    </section>
  );
}
