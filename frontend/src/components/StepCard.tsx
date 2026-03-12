import { ReactNode } from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  step: string | number;
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function StepCard({ step, icon: Icon, title, description, className = '' }: StepCardProps) {
  return (
    <div className={`relative flex flex-col items-center text-center p-8 rounded-2xl bg-fluxera-gray-light border border-border hover:shadow-card-hover transition-shadow ${className}`}>
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm font-black w-8 h-8 rounded-full flex items-center justify-center">
        {step}
      </div>
      <div className="w-16 h-16 rounded-2xl bg-fluxera-blue-pale flex items-center justify-center mb-4 mt-2">
        <Icon className="w-8 h-8 text-primary" />
      </div>
      <h3 className="text-lg font-bold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}
