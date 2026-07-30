'use client';

import React, { useEffect, useRef } from 'react';

type SectionTheme = 'hero' | 'about' | 'services' | 'projects' | 'experience' | 'contact';

interface SectionBackgroundProps {
  theme: SectionTheme;
  style?: React.CSSProperties;
  className?: string;
  contentClassName?: string;
  children?: React.ReactNode;
}

// ── We use vibrant colors but they will be applied as soft radial glows ──
// This ensures no hard horizontal seam lines between sections.
const THEMES: Record<SectionTheme, { r: number; g: number; b: number }> = {
  hero:       { r: 79,  g: 142, b: 247  }, // Bright Blue
  about:      { r: 162, g: 89,  b: 255  }, // Purple
  services:   { r: 0,   g: 212, b: 255  }, // Cyan
  projects:   { r: 255, g: 77,  b: 141  }, // Pink
  experience: { r: 0,   g: 229, b: 160  }, // Green
  contact:    { r: 162, g: 89,  b: 255  }, // Purple
};

interface Stream {
  x: number;
  y: number;        
  length: number;   
  tailLen: number;  
  baseSpeed: number;
  alpha: number;
  width: number;
  dir: 1 | -1;      
}

export default function SectionBackground({ theme, style, className, contentClassName, children }: SectionBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { r, g, b } = THEMES[theme];

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let afId: number;
    let streams: Stream[] = [];

    // ── Scroll velocity (bidirectional) ──────────────────────────────────────
    let lastScrollY = window.scrollY;
    let scrollVel   = 0;   
    let smoothVel   = 0;   

    const onScroll = () => {
      const cur   = window.scrollY;
      const delta = cur - lastScrollY;          
      scrollVel   = delta * 0.8; // Increased scroll reactivity
      lastScrollY = cur;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Init streams ─────────────────────────────────────────────────────────
    let lastW = 0;
    let lastH = 0;
    const init = () => {
      if (!canvas) return;
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === lastW && h === lastH) return;
      
      lastW = w;
      lastH = h;
      canvas.width  = w;
      canvas.height = h;
      streams = [];

      // Exactly 2 lines as requested
      const cols  = 2;
      const slotW = canvas.width / cols;

      for (let i = 0; i < cols; i++) {
        const length  = Math.random() * 300 + 150;
        const tailLen = length * (Math.random() * 1.5 + 1.2);
        const startY  = Math.random() * (canvas.height + length + tailLen);
        streams.push({
          x:         slotW * i + slotW * 0.15 + Math.random() * slotW * 0.7,
          y:         startY,
          length,
          tailLen,
          baseSpeed: Math.random() * 1.2 + 0.4,
          alpha:     Math.random() * 0.5 + 0.5, // Even brighter (0.5 to 1.0)
          width:     Math.random() * 2.0 + 1.2, // Thicker lines so they are clearly visible
          dir:       1, // direction flag no longer used for rendering, just base speed
        });
      }
    };

    // ── Draw one frame ────────────────────────────────────────────────────────
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const cW = canvas.width;
      const cH = canvas.height;

      // Smooth scroll velocity
      smoothVel += (scrollVel - smoothVel) * 0.15;
      scrollVel *= 0.85;

      const scrollPush = smoothVel;

      streams.forEach((s, idx) => {
        // ── Movement ───────────────────────────────────────────────────────
        // When scrollPush is positive (scrolling down), move > 0 (lines go down)
        // When scrollPush is negative (scrolling up), move < 0 (lines go up)
        // If not scrolling, lines drift down at baseSpeed
        let move = s.baseSpeed + scrollPush;
        s.y += move;

        // ── Draw the stream ────────────────────────────────────────────────
        // We never flip the physical structure.
        // Head is always at the bottom (s.y), tail is always above it.
        const headY = s.y;
        const tailY = s.y - s.length - s.tailLen;

        const lineGrad = ctx.createLinearGradient(0, tailY, 0, headY);
        // Fade from top (tail) to bottom (head)
        lineGrad.addColorStop(0,    `rgba(${r},${g},${b},0)`);
        lineGrad.addColorStop(0.6,  `rgba(${r},${g},${b},${s.alpha * 0.2})`);
        lineGrad.addColorStop(0.9,  `rgba(${r},${g},${b},${s.alpha * 0.7})`);
        lineGrad.addColorStop(1,    `rgba(${r},${g},${b},${s.alpha})`);

        const clampT = Math.max(0, tailY);
        const clampB = Math.min(cH, headY);

        if (clampB > clampT) {
          // Outer soft glow
          ctx.save();
          ctx.globalAlpha = 0.4;
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth   = s.width + 4;
          ctx.lineCap     = 'round';
          ctx.beginPath();
          ctx.moveTo(s.x, clampT);
          ctx.lineTo(s.x, clampB);
          ctx.stroke();

          // Sharp inner line
          ctx.globalAlpha = 1;
          ctx.strokeStyle = lineGrad;
          ctx.lineWidth   = s.width;
          ctx.beginPath();
          ctx.moveTo(s.x, clampT);
          ctx.lineTo(s.x, clampB);
          ctx.stroke();
          ctx.restore();

          // White hot tip (always at the bottom edge)
          const tipSize = 8;
          const tipY1 = Math.max(0, headY - tipSize);
          const tipY2 = Math.min(cH, headY);
          
          if (tipY1 < tipY2) {
            const tipGrad = ctx.createLinearGradient(0, tipY1, 0, tipY2);
            tipGrad.addColorStop(0, `rgba(255,255,255,0)`);
            tipGrad.addColorStop(1, `rgba(255,255,255,${s.alpha})`);
            
            ctx.save();
            ctx.strokeStyle = tipGrad;
            ctx.lineWidth   = s.width;
            ctx.beginPath();
            ctx.moveTo(s.x, tipY1);
            ctx.lineTo(s.x, tipY2);
            ctx.stroke();
            ctx.restore();
          }
        }

        // ── Recycle off-screen streams ─────────────────────────────────────
        const offBottom = tailY > cH;
        const offTop    = headY < 0;

        // If the line falls off the bottom completely, or gets pushed off the top completely
        if (offBottom || offTop) {
          const length  = Math.random() * 250 + 100;
          const tailLen = length * (Math.random() * 1.5 + 1.2);
          
          streams[idx] = {
            x:         Math.max(4, Math.min(cW - 4, s.x + (Math.random() * 40 - 20))),
            // If it went off the bottom, respawn it at the top. 
            // If it went off the top, respawn it at the bottom.
            y:         offBottom ? -(length + tailLen) : cH + length + tailLen,
            length,
            tailLen,
            baseSpeed: Math.random() * 0.8 + 0.3,
            alpha:     Math.random() * 0.5 + 0.3,
            width:     Math.random() * 1.5 + 0.8,
            dir:       1,
          };
        }
      });

      afId = requestAnimationFrame(draw);
    };

    init();
    draw();

    const ro = new ResizeObserver(() => init());
    ro.observe(canvas);

    return () => {
      window.removeEventListener('scroll', onScroll);
      ro.disconnect();
      cancelAnimationFrame(afId);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [r, g, b]);

  return (
    <div className={className} style={{ position: 'relative', width: '100%', ...style }}>
      {/* Background Container */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          zIndex: 0,
          background: 'transparent',
          pointerEvents: 'none',
        }}
      >
        {/* Dynamic ambient glow - Reduced intensity */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `radial-gradient(circle at 50% 50%, rgba(${r},${g},${b},0.15) 0%, rgba(${r},${g},${b},0.04) 50%, transparent 85%)`,
          pointerEvents: 'none',
          zIndex: 1,
        }} />

        {/* Animated canvas */}
        <canvas
          ref={canvasRef}
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            display: 'block', zIndex: 2,
          }}
        />
      </div>

      {/* Content Container */}
      <div className={contentClassName} style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%' }}>
        {children}
      </div>
    </div>
  );
}
