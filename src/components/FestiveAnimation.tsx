import React, { useEffect, useRef, useState } from 'react';
import { useBakery } from '../context/BakeryContext';
import { Sparkles, X, Snowflake, PartyPopper, EyeOff } from 'lucide-react';

type AnimationMode = 'snow' | 'confetti' | 'off';

interface Particle {
  x: number;
  y: number;
  size: number;
  speedY: number;
  speedX: number;
  opacity: number;
  swaySpeed: number;
  swayOffset: number;
  color?: string;
  rotation?: number;
  rotationSpeed?: number;
  shape?: 'circle' | 'crystal' | 'rect' | 'star';
}

export const FestiveAnimation: React.FC = () => {
  const { colorPalette } = useBakery();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [mode, setMode] = useState<AnimationMode>('snow');
  const [widgetMinimized, setWidgetMinimized] = useState<boolean>(false);

  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);

  const isHoliday = colorPalette === 'holiday';

  // Holiday color palette for confetti
  const confettiColors = [
    '#C81E2E', // Festive Ruby Red
    '#D4AF37', // Star Gold
    '#15803D', // Winter Pine Emerald
    '#FDFBF7', // Frosted Cream
    '#E11D48', // Cranberry Rose
    '#F59E0B'  // Warm Honey Amber
  ];

  useEffect(() => {
    if (!isHoliday || mode === 'off') {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    const particleCount = mode === 'snow' ? 50 : 40;

    const initParticles = () => {
      const newParticles: Particle[] = [];
      for (let i = 0; i < particleCount; i++) {
        if (mode === 'snow') {
          newParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size: Math.random() * 2.8 + 1.2,
            speedY: Math.random() * 0.9 + 0.5,
            speedX: (Math.random() - 0.5) * 0.4,
            opacity: Math.random() * 0.55 + 0.35,
            swaySpeed: Math.random() * 0.02 + 0.01,
            swayOffset: Math.random() * Math.PI * 2,
            shape: Math.random() > 0.75 ? 'crystal' : 'circle'
          });
        } else {
          // Confetti mode
          newParticles.push({
            x: Math.random() * width,
            y: Math.random() * height - height,
            size: Math.random() * 7 + 4,
            speedY: Math.random() * 1.8 + 1.2,
            speedX: (Math.random() - 0.5) * 1.2,
            opacity: Math.random() * 0.4 + 0.6,
            swaySpeed: Math.random() * 0.04 + 0.02,
            swayOffset: Math.random() * Math.PI * 2,
            color: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            rotation: Math.random() * 360,
            rotationSpeed: (Math.random() - 0.5) * 6,
            shape: Math.random() > 0.4 ? 'rect' : 'circle'
          });
        }
      }
      particlesRef.current = newParticles;
    };

    initParticles();

    // Check for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    let frameCount = 0;

    const render = () => {
      frameCount++;
      ctx.clearRect(0, 0, width, height);

      const particles = particlesRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mode === 'snow') {
          p.y += p.speedY;
          p.x += Math.sin(frameCount * p.swaySpeed + p.swayOffset) * 0.6 + p.speedX;

          // Wrap around bottom
          if (p.y > height + 10) {
            p.y = -10;
            p.x = Math.random() * width;
          }
          if (p.x > width + 10) p.x = -10;
          if (p.x < -10) p.x = width + 10;

          ctx.save();
          ctx.globalAlpha = p.opacity;

          if (p.shape === 'crystal') {
            // Elegant star snowflake
            ctx.fillStyle = '#FFFFFF';
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();

            // Tiny outer sparkle glow
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(p.x - p.size * 1.8, p.y);
            ctx.lineTo(p.x + p.size * 1.8, p.y);
            ctx.moveTo(p.x, p.y - p.size * 1.8);
            ctx.lineTo(p.x, p.y + p.size * 1.8);
            ctx.stroke();
          } else {
            // Soft rounded snowflake
            const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
            gradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.6)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        } else if (mode === 'confetti') {
          p.y += p.speedY;
          p.x += Math.sin(frameCount * p.swaySpeed + p.swayOffset) * 1.2 + p.speedX;
          if (p.rotation !== undefined && p.rotationSpeed !== undefined) {
            p.rotation += p.rotationSpeed;
          }

          // Wrap around bottom
          if (p.y > height + 20) {
            p.y = -20;
            p.x = Math.random() * width;
          }
          if (p.x > width + 20) p.x = -20;
          if (p.x < -20) p.x = width + 20;

          ctx.save();
          ctx.translate(p.x, p.y);
          if (p.rotation !== undefined) {
            ctx.rotate((p.rotation * Math.PI) / 180);
          }
          ctx.globalAlpha = p.opacity;
          ctx.fillStyle = p.color || '#C81E2E';

          if (p.shape === 'rect') {
            const aspectFlip = Math.cos(frameCount * 0.05 + p.swayOffset);
            ctx.fillRect(-p.size / 2, (-p.size * aspectFlip) / 2, p.size, p.size * aspectFlip * 0.6);
          } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size * 0.4, 0, Math.PI * 2);
            ctx.fill();
          }

          ctx.restore();
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    animationFrameRef.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isHoliday, mode]);

  if (!isHoliday) return null;

  return (
    <>
      {/* Non-intrusive full-screen canvas */}
      {mode !== 'off' && (
        <canvas
          ref={canvasRef}
          className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-500"
          style={{ width: '100vw', height: '100vh' }}
          aria-hidden="true"
        />
      )}

      {/* Floating Holiday Theme Controls widget */}
      <aside 
        aria-label="Holiday Seasonal Visual Effects Controls"
        className="fixed bottom-20 left-4 sm:bottom-6 sm:left-6 z-40 transition-all duration-300"
      >
        {widgetMinimized ? (
          <button
            onClick={() => setWidgetMinimized(false)}
            className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-white/95 dark:bg-[#1A231E]/95 backdrop-blur-md border border-[#E3ECE6] dark:border-stone-700 text-[#C81E2E] shadow-xl hover:scale-105 transition-all text-xs font-bold"
            title="Expand Holiday Animation Controls"
            aria-label="Expand Holiday Animation Controls"
          >
            <span className="text-base animate-bounce">🎄</span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#241416] dark:text-white">
              {mode === 'snow' ? 'Snow Active' : mode === 'confetti' ? 'Confetti Active' : 'Paused'}
            </span>
          </button>
        ) : (
          <div className="bg-white/95 dark:bg-[#1A231E]/95 backdrop-blur-md border border-[#E3ECE6] dark:border-stone-700 rounded-2xl p-2.5 shadow-2xl flex items-center gap-1.5 text-xs text-[#241416] dark:text-[#FDFBF7]">
            <div className="flex items-center gap-1.5 px-2 py-1 bg-[#F4F8F5] dark:bg-stone-800 rounded-xl">
              <Sparkles className="w-3.5 h-3.5 text-[#C81E2E] animate-pulse" />
              <span className="font-semibold text-[11px]">Holiday Magic:</span>
            </div>

            {/* Snow Mode Toggle */}
            <button
              onClick={() => setMode('snow')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-medium transition-all ${
                mode === 'snow'
                  ? 'bg-[#C81E2E] text-white font-bold shadow-xs'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
              title="Falling Snowflakes animation"
            >
              <Snowflake className="w-3.5 h-3.5" />
              <span className="text-[11px]">Snow</span>
            </button>

            {/* Confetti Mode Toggle */}
            <button
              onClick={() => setMode('confetti')}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl font-medium transition-all ${
                mode === 'confetti'
                  ? 'bg-[#C81E2E] text-white font-bold shadow-xs'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
              title="Festive Party Confetti animation"
            >
              <PartyPopper className="w-3.5 h-3.5" />
              <span className="text-[11px]">Confetti</span>
            </button>

            {/* Pause Animation */}
            <button
              onClick={() => setMode(mode === 'off' ? 'snow' : 'off')}
              className={`p-1.5 rounded-xl transition-all ${
                mode === 'off'
                  ? 'bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-100 font-bold'
                  : 'hover:bg-stone-100 dark:hover:bg-stone-800 text-stone-500'
              }`}
              title={mode === 'off' ? 'Resume Falling Animation' : 'Pause Animation'}
              aria-label={mode === 'off' ? 'Resume Falling Animation' : 'Pause Animation'}
            >
              <EyeOff className="w-3.5 h-3.5" />
            </button>

            {/* Minimize widget */}
            <button
              onClick={() => setWidgetMinimized(true)}
              className="p-1 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors ml-0.5"
              title="Minimize panel"
              aria-label="Minimize holiday controls"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </aside>
    </>
  );
};
