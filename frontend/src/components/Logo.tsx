interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

const sizeConfig = {
  sm: { container: 'w-8 h-8', image: 'h-6 w-6', textSize: 'text-sm' },
  md: { container: 'w-10 h-10', image: 'h-8 w-8', textSize: 'text-base' },
  lg: { container: 'w-12 h-12', image: 'h-10 w-10', textSize: 'text-lg' },
};

export function Logo({ size = 'md', showText = false, className = '' }: LogoProps) {
  const config = sizeConfig[size];

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`flex items-center justify-center ${config.container} rounded-lg bg-gradient-to-br from-fluxera-blue to-fluxera-teal shadow-lg`}>
        <img
          src="/src/assets/fluxera-logo.jpg"
          alt="Fluxera"
          className={`${config.image} object-contain`}
        />
      </div>
      {showText && <span className={`font-bold text-primary ${config.textSize}`}>Fluxera</span>}
    </div>
  );
}
