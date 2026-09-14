import { useState, useRef, useCallback, MouseEvent, TouchEvent } from 'react';
import { ChevronsLeftRight } from 'lucide-react';

interface InteractiveBeforeAfterProps {
  beforeImg: string;
  afterImg: string;
  beforeLabel?: string;
  afterLabel?: string;
  initialSlider?: number;
  heightClass?: string;
  title?: string;
}

export function InteractiveBeforeAfter({
  beforeImg,
  afterImg,
  beforeLabel = 'Before',
  afterLabel = 'After',
  initialSlider = 50,
  heightClass = 'h-[300px]',
  title,
}: InteractiveBeforeAfterProps) {
  const [sliderPosition, setSliderPosition] = useState<number>(initialSlider);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = Math.round((clampedX / rect.width) * 100);
    setSliderPosition(percentage);
  }, []);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    setIsDragging(true);
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  const handleClick = (e: MouseEvent<HTMLDivElement>) => {
    handleMove(e.clientX);
  };

  return (
    <div className="w-full select-none" id={title ? `slider-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}>
      <div
        ref={containerRef}
        className={`relative w-full ${heightClass} rounded-2xl overflow-hidden border border-[#e8e6e1] bg-[#1a1c23] cursor-ew-resize group`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleMouseUp}
        onClick={handleClick}
      >
        {/* After Image (Full background) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={afterImg}
            alt={afterLabel}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-3.5 right-3.5 bg-[#d9ff3d] text-[#0d0f12] font-mono text-xs font-bold px-3 py-1 rounded-full shadow-md">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (Clipped Left Layer) */}
        <div
          className="absolute inset-y-0 left-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div
            className="relative h-full"
            style={{
              width: containerRef.current ? `${containerRef.current.offsetWidth}px` : '100%',
              minWidth: '100%',
            }}
          >
            <img
              src={beforeImg}
              alt={beforeLabel}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
            <div className="absolute top-3.5 left-3.5 bg-[#0d0f12]/80 text-white font-mono text-xs font-bold px-3 py-1 rounded-full shadow-md">
              {beforeLabel}
            </div>
          </div>
        </div>

        {/* Vertical Divider Handle */}
        <div
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] cursor-ew-resize"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* Handle Grip Disc */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#0d0f12] text-[#d9ff3d] border-2 border-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
            <ChevronsLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Subtle Hint */}
        <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-sm text-white/80 font-mono text-[10px] px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Drag to compare
        </div>
      </div>
    </div>
  );
}
