import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [cursorState, setCursorState] = useState('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true);
      return;
    }

    document.body.classList.add('custom-cursor-enabled');
    const cursor = cursorRef.current;
    if (!cursor) return;

    const xTo = gsap.quickTo(cursor, "x", { duration: 0.15, ease: "power3.out" });
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.15, ease: "power3.out" });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      // Center the cursor exactly on the pointer
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorTrigger = target.closest('[data-cursor]');
      const clickable = target.closest('button, a, [role="button"], input, select, textarea');

      if (cursorTrigger) {
        setCursorState(cursorTrigger.getAttribute('data-cursor') || 'default');
      } else if (clickable) {
        setCursorState('click');
      } else {
        setCursorState('default');
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.body.classList.remove('custom-cursor-enabled');
    };
  }, [isVisible]);

  if (isTouch) return null;

  let size = 35;
  let bg = '#0d0f12';
  let border = 'none';
  let label = '';
  let Icon = null;
  let labelColor = '#d9ff3d';
  let blur = '0px';

  switch (cursorState) {
    case 'click':
      size = 60;
      bg = 'rgba(13, 15, 18, 1)';
      border = 'none';
      label = 'CLICK';
      blur = '0px';
      break;
    case 'view':
      size = 68;
      bg = 'rgba(13, 15, 18, 1)';
      border = 'none';
      label = 'VIEW';
      blur = '0px';
      break;
    case 'explore':
      size = 72;
      bg = 'rgba(13, 15, 18, 1)';
      border = 'none';
      label = 'EXPLORE';
      blur = '0px';
      break;
    case 'drag':
      size = 76;
      bg = 'rgba(255, 255, 255, 0.9)';
      border = '1px solid rgba(13, 15, 18, 0.1)';
      labelColor = '#0d0f12';
      label = 'DRAG';
      blur = '4px';
      break;
    case 'link':
      size = 56;
      bg = '#0d0f12';
      border = 'none';
      Icon = ArrowUpRight;
      blur = '0px';
      break;
    case 'start':
      size = 72;
      bg = '#d9ff3d';
      border = 'none';
      labelColor = '#0d0f12';
      label = 'START';
      blur = '0px';
      break;
    default:
      size = 35;
      bg = '#0d0f12';
      border = 'none';
      blur = '0px';
      break;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full transition-all duration-300 ease-out"
      style={{
        width: size,
        height: size,
        backgroundColor: bg,
        border,
        backdropFilter: blur !== '0px' ? `blur(${blur})` : 'none',
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
      }}
    >
      {label && (
        <span
          className="font-mono text-[10px] font-bold tracking-widest leading-none uppercase"
          style={{ color: labelColor }}
        >
          {label}
        </span>
      )}
      {Icon && <Icon className="w-5 h-5 text-[#d9ff3d]" />}
    </div>
  );
}
