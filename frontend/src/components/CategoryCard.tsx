import { Link } from '@tanstack/react-router';
import { LucideIcon } from 'lucide-react';

interface CategoryCardProps {
  name: string;
  icon: LucideIcon;
  color: string;
  className?: string;
}

export function CategoryCard({ name, icon: Icon, color, className = '' }: CategoryCardProps) {
  return (
    <Link
      to="/borrow"
      search={{ category: name }}
      className={`group flex flex-col items-center gap-3 p-6 bg-white rounded-2xl border border-border hover:shadow-card-hover hover:border-primary/30 transition-all cursor-pointer ${className}`}
    >
      <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
        <Icon className="w-7 h-7" />
      </div>
      <span className="text-sm font-semibold text-foreground text-center leading-tight">{name}</span>
    </Link>
  );
}
