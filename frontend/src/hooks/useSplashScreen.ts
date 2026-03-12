import { useState, useEffect } from 'react';

const SPLASH_SESSION_KEY = 'fluxera_splash_shown';

export function useSplashScreen() {
  const [showSplash, setShowSplash] = useState<boolean>(() => {
    try {
      return !sessionStorage.getItem(SPLASH_SESSION_KEY);
    } catch {
      return true;
    }
  });

  useEffect(() => {
    if (!showSplash) return;

    const timer = setTimeout(() => {
      setShowSplash(false);
      try {
        sessionStorage.setItem(SPLASH_SESSION_KEY, '1');
      } catch {
        // ignore
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [showSplash]);

  return { showSplash };
}
