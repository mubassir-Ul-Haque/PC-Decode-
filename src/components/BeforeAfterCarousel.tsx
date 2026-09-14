import { useState, useEffect, useRef, useCallback, MouseEvent, TouchEvent } from 'react';
import { BeforeAfterCase } from '../types';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

interface BeforeAfterCarouselProps {
  cases: BeforeAfterCase[];
  onBookClick?: () => void;
}

export function BeforeAfterCarousel({ cases, onBookClick }: BeforeAfterCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [sliderPos, setSliderPos] = useState<number>(0); // 0% = Before fully visible, 100% = After fully visible
  const [isUserInteracting, setIsUserInteracting] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [isManualPaused, setIsManualPaused] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const idleTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const cycleCountRef = useRef<number>(0);
  const phaseRef = useRef<'pause_before' | 'reveal_after' | 'pause_after' | 'return_before'>('pause_before');
  const phaseStartRef = useRef<number>(Date.now());

  const currentCase = cases[currentIndex] || cases[0];

  // Preload next image to avoid layout shift or flickering
  useEffect(() => {
    const nextIndex = (currentIndex + 1) % cases.length;
    const nextCase = cases[nextIndex];
    if (nextCase) {
      const img1 = new Image();
      img1.src = nextCase.beforeImage;
      const img2 = new Image();
      img2.src = nextCase.afterImage;
    }
  }, [currentIndex, cases]);

  // Check prefers-reduced-motion
  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Handle manual switch of case
  const goToCase = useCallback((index: number) => {
    setCurrentIndex(index);
    setSliderPos(0);
    cycleCountRef.current = 0;
    phaseRef.current = 'pause_before';
    phaseStartRef.current = Date.now();
  }, []);

  const handlePrev = useCallback(() => {
    const newIdx = (currentIndex - 1 + cases.length) % cases.length;
    goToCase(newIdx);
    markUserInteraction();
  }, [currentIndex, cases.length, goToCase]);

  const handleNext = useCallback(() => {
    const newIdx = (currentIndex + 1) % cases.length;
    goToCase(newIdx);
    markUserInteraction();
  }, [currentIndex, cases.length, goToCase]);

  // Mark user interaction & delay resume
  const markUserInteraction = useCallback(() => {
    setIsUserInteracting(true);
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    // Resume autoplay 4.5 seconds after user finishes interacting
    idleTimeoutRef.current = setTimeout(() => {
      setIsUserInteracting(false);
      phaseRef.current = 'pause_before';
      phaseStartRef.current = Date.now();
    }, 4500);
  }, []);

  // Slider Dragging calculations
  const updateSliderFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const pct = Math.round((clampedX / rect.width) * 100);
    setSliderPos(pct);
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    markUserInteraction();
    updateSliderFromClientX(e.clientX);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (isDragging) {
      markUserInteraction();
      updateSliderFromClientX(e.clientX);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    markUserInteraction();
    if (e.touches.length > 0) {
      updateSliderFromClientX(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    markUserInteraction();
    if (e.touches.length > 0) {
      updateSliderFromClientX(e.touches[0].clientX);
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  // AUTOPLAY TIMELINE ANIMATION LOOP
  // Phase 1: Show BEFORE (0%), pause for ~1600ms
  // Phase 2: Animate 0% -> 100% slowly (2200ms)
  // Phase 3: Hold at 100% for ~1800ms (viewer inspects AFTER)
  // Phase 4: Smooth return 100% -> 0% (1800ms)
  // Repeat 2 times -> transition to NEXT CASE
  useEffect(() => {
    if (isUserInteracting || isDragging || isManualPaused || prefersReducedMotion) {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      return;
    }

    const DURATION_PAUSE_BEFORE = 1600;
    const DURATION_REVEAL = 2400;
    const DURATION_PAUSE_AFTER = 2000;
    const DURATION_RETURN = 2000;
    const CYCLES_PER_CASE = 2;

    const easeInOutCubic = (t: number) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const runTimeline = () => {
      const now = Date.now();
      const elapsed = now - phaseStartRef.current;

      if (phaseRef.current === 'pause_before') {
        setSliderPos(0);
        if (elapsed >= DURATION_PAUSE_BEFORE) {
          phaseRef.current = 'reveal_after';
          phaseStartRef.current = now;
        }
      } else if (phaseRef.current === 'reveal_after') {
        const progress = Math.min(1, elapsed / DURATION_REVEAL);
        const eased = easeInOutCubic(progress);
        setSliderPos(Math.round(eased * 100));

        if (progress >= 1) {
          phaseRef.current = 'pause_after';
          phaseStartRef.current = now;
        }
      } else if (phaseRef.current === 'pause_after') {
        setSliderPos(100);
        if (elapsed >= DURATION_PAUSE_AFTER) {
          phaseRef.current = 'return_before';
          phaseStartRef.current = now;
        }
      } else if (phaseRef.current === 'return_before') {
        const progress = Math.min(1, elapsed / DURATION_RETURN);
        const eased = easeInOutCubic(progress);
        setSliderPos(Math.round((1 - eased) * 100));

        if (progress >= 1) {
          cycleCountRef.current += 1;
          if (cycleCountRef.current >= CYCLES_PER_CASE) {
            // Transition to next case
            cycleCountRef.current = 0;
            setCurrentIndex((prev) => (prev + 1) % cases.length);
            phaseRef.current = 'pause_before';
            phaseStartRef.current = now;
          } else {
            // Repeat cycle for this case
            phaseRef.current = 'pause_before';
            phaseStartRef.current = now;
          }
        }
      }

      animFrameRef.current = requestAnimationFrame(runTimeline);
    };

    animFrameRef.current = requestAnimationFrame(runTimeline);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isUserInteracting, isDragging, isManualPaused, prefersReducedMotion, cases.length]);

  return (
    <div
      className="w-full"
      onMouseEnter={() => setIsUserInteracting(true)}
      onMouseLeave={() => {
        setIsDragging(false);
        markUserInteraction();
      }}
    >
      {/* CASE STUDY CONTAINER */}
      <div className="bg-[#101216] border border-[#232732] rounded-[24px] sm:rounded-[32px] p-4 sm:p-7 shadow-2xl overflow-hidden relative">
        
        {/* TOP METADATA BAR */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 sm:pb-6 border-b border-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3">
            <span className="font-mono text-xs font-bold text-[#d9ff3d] bg-white/5 border border-white/10 px-2.5 py-1 rounded-md tracking-wider">
              {currentCase.caseNumber}
            </span>
            <div className="h-4 w-[1px] bg-white/20"></div>
            <h3 className="font-heading font-bold text-white text-base sm:text-lg tracking-tight">
              {currentCase.category}
            </h3>
            <span className="hidden sm:inline-block text-xs font-mono text-[#8b91a0]">
              • {currentCase.systemType} ({currentCase.location})
            </span>
          </div>

          {/* Controls: Prev / Next / Counter */}
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-[#8b91a0] mr-2 hidden sm:inline-block">
              {String(currentIndex + 1).padStart(2, '0')} / {String(cases.length).padStart(2, '0')}
            </span>

            <button
              type="button"
              onClick={() => {
                setIsManualPaused(!isManualPaused);
                markUserInteraction();
              }}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-[#8b91a0] hover:text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer"
              title={isManualPaused ? 'Resume autoplay' : 'Pause autoplay'}
              aria-label="Toggle autoplay"
            >
              {isManualPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
            </button>

            <button
              type="button"
              onClick={handlePrev}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Previous service case"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/15 text-white border border-white/10 flex items-center justify-center transition-all cursor-pointer active:scale-95"
              aria-label="Next service case"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* COMPARISON VIEWPORT */}
        <div className="mt-4 sm:mt-6 relative">
          <div
            ref={containerRef}
            className="relative w-full h-[320px] sm:h-[440px] md:h-[500px] lg:h-[540px] rounded-2xl overflow-hidden bg-[#050608] border border-white/10 select-none cursor-ew-resize touch-none"
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* 1. AFTER IMAGE (Base Layer, Revealed as Slider Moves Right) */}
            <div className="absolute inset-0 w-full h-full">
              <img
                src={currentCase.afterImage}
                alt={currentCase.afterLabel}
                className="w-full h-full object-cover select-none"
                draggable={false}
              />
              {/* After Badge */}
              <div className="absolute top-4 right-4 bg-[#d9ff3d] text-[#0d0f12] font-mono text-[11px] font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none z-10 tracking-wider uppercase">
                {currentCase.afterLabel}
              </div>
            </div>

            {/* 2. BEFORE IMAGE (Clipped Layer, Overlay on Left) */}
            <div
              className="absolute inset-y-0 left-0 overflow-hidden z-10 will-change-[width]"
              style={{ width: `${sliderPos}%` }}
            >
              <div
                className="relative h-full"
                style={{
                  width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
                  minWidth: '100%',
                }}
              >
                <img
                  src={currentCase.beforeImage}
                  alt={currentCase.beforeLabel}
                  className="absolute inset-0 w-full h-full object-cover select-none"
                  draggable={false}
                />
                {/* Before Badge */}
                <div className="absolute top-4 left-4 bg-black/85 text-white border border-white/20 font-mono text-[11px] font-bold px-3 py-1 rounded-full shadow-lg pointer-events-none tracking-wider uppercase">
                  {currentCase.beforeLabel}
                </div>
              </div>
            </div>

            {/* 3. SLIDER DIVIDER LINE & HANDLE */}
            <div
              className="absolute top-0 bottom-0 w-[2px] bg-white z-20 shadow-[0_0_12px_rgba(255,255,255,0.7)] pointer-events-none will-change-[left]"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Center Minimal Grip Handle */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0d0f12] text-white border-2 border-white flex items-center justify-center shadow-xl">
                <div className="flex items-center gap-1">
                  <div className="w-1 h-3 bg-[#d9ff3d] rounded-full"></div>
                  <div className="w-1 h-3 bg-white/70 rounded-full"></div>
                </div>
              </div>
            </div>

            {/* In-image Drag Instruction Hint */}
            <div className="absolute bottom-3.5 right-3.5 bg-black/70 backdrop-blur-md text-[#c6cad5] font-mono text-[10px] px-2.5 py-1 rounded-full border border-white/10 pointer-events-none z-10 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#d9ff3d]"></span>
              <span>{isUserInteracting ? 'Manual Control Active' : 'Drag to compare • Hover to pause'}</span>
            </div>
          </div>
        </div>

        {/* BOTTOM CASE DETAILS & TRANSFORMATION PROOF */}
        <div className="mt-4 sm:mt-6 pt-4 sm:pt-5 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          
          {/* Factual Transformation Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6 flex-1 w-full text-xs">
            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[10px] font-bold uppercase text-white/50 bg-white/5 px-2 py-0.5 rounded border border-white/10 shrink-0">
                BEFORE
              </span>
              <p className="text-[#a0a5b4] leading-relaxed">
                {currentCase.beforeDescription}
              </p>
            </div>

            <div className="flex items-start gap-2.5">
              <span className="font-mono text-[10px] font-bold uppercase text-[#d9ff3d] bg-[#d9ff3d]/10 px-2 py-0.5 rounded border border-[#d9ff3d]/20 shrink-0">
                AFTER
              </span>
              <p className="text-white font-medium leading-relaxed">
                {currentCase.afterDescription}
              </p>
            </div>
          </div>

          {/* Quick Case Thumbnails / Jump Bar */}
          <div className="flex items-center gap-1.5 shrink-0 self-end sm:self-center">
            {cases.map((c, idx) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  goToCase(idx);
                  markUserInteraction();
                }}
                className={`px-2.5 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-[#d9ff3d] text-black shadow-sm'
                    : 'bg-white/5 text-[#8b91a0] hover:text-white hover:bg-white/10'
                }`}
                aria-label={`Jump to Case 0${idx + 1}`}
              >
                0{idx + 1}
              </button>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}
