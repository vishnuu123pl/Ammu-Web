import { MapPin } from 'lucide-react';

interface ItemLocationDisplayProps {
  location: string;
}

export default function ItemLocationDisplay({ location }: ItemLocationDisplayProps) {
  if (!location) return null;

  return (
    <div className="bg-fluxera-blue-pale border border-primary/20 rounded-xl p-3 flex items-start gap-2">
      <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
      <div>
        <p className="text-xs font-semibold text-primary mb-0.5">Location</p>
        <p className="text-sm text-foreground">{location}</p>
      </div>
    </div>
  );
}
