import { LucideIcon } from 'lucide-react';

interface BenefitCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  className?: string;
}

export function BenefitCard({ icon: Icon, title, description, className = '' }: BenefitCardProps) {
  return (
    <div className={`flex gap-4 p-6 rounded-2xl bg-fluxera-gray-light border border-border hover:shadow-card transition-shadow ${className}`}>
      <div className="w-12 h-12 rounded-xl bg-fluxera-blue-pale flex items-center justify-center shrink-0">
        <Icon className="w-6 h-6 text-primary" />
      </div>
      <div>
        <h3 className="font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
