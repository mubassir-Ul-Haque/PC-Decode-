import { useState, useRef, useCallback, MouseEvent, TouchEvent } from 'react';
import { ChevronsLeftRight, MoveHorizontal } from 'lucide-react';

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

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    handleMove(e.clientX);
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
        className={`relative w-full ${heightClass} rounded-xl overflow-hidden border border-[#e8e6e1] bg-[#121316] cursor-ew-resize group`}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onClick={handleClick}
      >
        {/* After Image (Background) */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src={afterImg}
            alt={afterLabel}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute top-3 right-3 bg-[#d9ff3d] text-[#0d0f12] font-mono text-xs font-semibold px-2.5 py-1 rounded-full shadow-sm tracking-wide">
            {afterLabel}
          </div>
        </div>

        {/* Before Image (Clipped Overlay) */}
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
            <div className="absolute top-3 left-3 bg-[#0d0f12]/90 text-white border border-white/20 font-mono text-xs font-medium px-2.5 py-1 rounded-full shadow-sm">
              {beforeLabel}
            </div>
          </div>
        </div>

        {/* Divider line & handle */}
        <div
          className="absolute inset-y-0 w-0.5 bg-[#d9ff3d] shadow-[0_0_12px_rgba(217,255,61,0.7)] flex items-center justify-center pointer-events-none"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-[#0d0f12] text-[#d9ff3d] border-2 border-[#d9ff3d] flex items-center justify-center shadow-md transform -translate-x-1/2 group-hover:scale-110 transition-transform">
            <ChevronsLeftRight className="w-4 h-4" />
          </div>
        </div>

        {/* Drag Helper Pill */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none bg-[#0d0f12]/80 backdrop-blur-sm border border-white/10 text-white/90 text-[11px] font-medium px-3 py-1 rounded-full flex items-center gap-1.5 shadow">
          <MoveHorizontal className="w-3 h-3 text-[#d9ff3d]" />
          <span>Drag to compare ({sliderPosition}%)</span>
        </div>
      </div>
    </div>
  );
}
