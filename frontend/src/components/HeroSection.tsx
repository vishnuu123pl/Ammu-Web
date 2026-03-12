import { ReactNode } from 'react';

interface HeroSectionProps {
  children: ReactNode;
  className?: string;
}

export function HeroSection({ children, className = '' }: HeroSectionProps) {
  return (
    <section className={`relative bg-gradient-to-br from-fluxera-gray-light via-white to-fluxera-blue-pale overflow-hidden ${className}`}>
      {/* Decorative blurred elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-primary blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-accent blur-3xl" />
      </div>
      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-28">
        {children}
      </div>
    </section>
  );
}
