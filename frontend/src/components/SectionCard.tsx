import { ReactNode } from 'react';

interface SectionCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
}

export function SectionCard({ children, className = '', hover = true }: SectionCardProps) {
  return (
    <div
      className={`bg-white rounded-xl p-6 border border-border ${
        hover ? 'hover:shadow-card-hover transition-shadow' : 'shadow-card'
      } ${className}`}
    >
      {children}
    </div>
  );
}
