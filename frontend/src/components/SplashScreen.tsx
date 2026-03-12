import { useEffect, useState } from 'react';

interface SplashScreenProps {
  visible: boolean;
}

export default function SplashScreen({ visible }: SplashScreenProps) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!visible) {
      setFadeOut(true);
    }
  }, [visible]);

  if (!visible && fadeOut) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white transition-opacity duration-700 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated logo container */}
      <div className="splash-logo-wrapper flex flex-col items-center gap-6">
        <div className="splash-logo-scale">
          <img
            src="/assets/generated/fluxera-logo-transparent.dim_400x300.png"
            alt="FLUXERA"
            className="w-48 h-36 object-contain"
          />
        </div>
        <div className="splash-brand-text">
          <span className="text-4xl font-black tracking-widest text-primary">FLUXERA</span>
        </div>
        <div className="splash-tagline">
          <span className="text-sm text-muted-foreground tracking-wide">Borrow Instead of Buy</span>
        </div>
        {/* Loading dots */}
        <div className="flex gap-2 mt-4 splash-dots">
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>

      <style>{`
        @keyframes splashScaleIn {
          0% { opacity: 0; transform: scale(0.7); }
          60% { opacity: 1; transform: scale(1.05); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes splashFadeUp {
          0% { opacity: 0; transform: translateY(16px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .splash-logo-scale {
          animation: splashScaleIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .splash-brand-text {
          animation: splashFadeUp 0.5s ease forwards;
          animation-delay: 0.5s;
          opacity: 0;
        }
        .splash-tagline {
          animation: splashFadeUp 0.5s ease forwards;
          animation-delay: 0.75s;
          opacity: 0;
        }
        .splash-dots {
          animation: splashFadeUp 0.5s ease forwards;
          animation-delay: 1s;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}
