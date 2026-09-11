import { useState } from 'react';
import { REVIEWS_DATA } from '../data';
import { Star, ShieldCheck, MapPin, MessageSquareQuote } from 'lucide-react';

export function ReviewsSection() {
  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<'all' | 'Home Service' | 'Courier' | 'Hardware Repair'>('all');

  const filteredReviews = REVIEWS_DATA.filter(
    (rev) => filter === 'all' || rev.type === filter
  );

  const displayedReviews = showAll ? filteredReviews : filteredReviews.slice(0, 3);

  return (
    <section id="reviews" className="w-full bg-[#f6f5f0] py-16 md:py-24 border-b border-[#e8e6e1]">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-8">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[760px]">
            <span className="inline-block text-xs font-bold tracking-wider text-[#6f6e6a] uppercase">
              WHAT CUSTOMERS SAY
            </span>

            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#0d0f12] mt-3 leading-tight">
              We can tell you we're good. <br className="hidden sm:inline" />
              Our customers can tell you better.
            </h2>

            <p className="text-base sm:text-lg text-[#4a4d53] mt-4 leading-relaxed">
              Real customers. Real PCs. Real problems. And hopefully, fewer <span className="italic font-medium text-[#0d0f12]">"ভাই PC আবার বন্ধ হয়ে গেছে"</span> calls.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[#0d0f12] bg-white border border-[#e8e6e1] px-4 py-2 rounded-full shadow-sm text-xs font-mono font-bold">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-current" />
                ))}
              </div>
              <span className="ml-1 text-[#0d0f12]">4.9 / 5.0 (800+ fixes)</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-8 flex flex-wrap gap-2">
          {(['all', 'Home Service', 'Courier', 'Hardware Repair'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilter(type)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all ${
                filter === type
                  ? 'bg-[#0d0f12] text-white border-[#0d0f12]'
                  : 'bg-white text-[#4a4d53] border-[#e8e6e1] hover:border-[#cfccc3]'
              }`}
            >
              {type === 'all' ? 'All Reviews' : type}
            </button>
          ))}
        </div>

        {/* Reviews Cards Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {displayedReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-[#e8e6e1] p-6 sm:p-7 flex flex-col justify-between shadow-sm hover:shadow-md transition-shadow relative"
            >
              <div>
                {/* Rating stars & badge */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex text-amber-500">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-[#f6f5f0] text-[#0d0f12] border border-[#e8e6e1]">
                    {rev.type}
                  </span>
                </div>

                {/* Quote */}
                <p className="text-sm sm:text-base text-[#1b1c20] leading-relaxed font-normal italic">
                  "{rev.quote}"
                </p>
              </div>

              {/* Author Info */}
              <div className="mt-6 pt-4 border-t border-[#e8e6e1] flex items-center justify-between">
                <div>
                  <div className="text-sm font-bold text-[#0d0f12]">
                    — {rev.author}
                  </div>
                  <div className="text-xs text-[#6f6e6a] flex items-center gap-1 mt-0.5">
                    <MapPin className="w-3 h-3 text-[#6f6e6a]" />
                    <span>{rev.location}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[11px] font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>Verified</span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* CTA: Read More Reviews */}
        <div className="mt-10 text-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="inline-flex items-center gap-2 border border-[#cfccc3] hover:border-[#0d0f12] bg-white text-[#0d0f12] text-sm font-semibold rounded-full px-7 py-3 transition-all cursor-pointer shadow-sm"
          >
            <span>{showAll ? 'Show Fewer Reviews' : 'Read More Reviews'}</span>
          </button>
        </div>

      </div>
    </section>
  );
}
