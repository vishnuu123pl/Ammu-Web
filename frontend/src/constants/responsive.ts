// Responsive typography utilities for mobile-first design

export const responsiveText = {
  // Hero text - scales nicely on mobile to desktop
  heroPrimary: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold',
  heroSecondary: 'text-2xl sm:text-3xl md:text-4xl font-semibold',
  
  // Section headings
  sectionTitle: 'text-2xl sm:text-3xl md:text-4xl font-bold',
  subsectionTitle: 'text-xl sm:text-2xl font-semibold',
  
  // Body text with improved readability
  body: 'text-base sm:text-lg leading-relaxed',
  bodySmall: 'text-sm sm:text-base leading-relaxed',
  
  // Labels and small text
  label: 'text-xs sm:text-sm font-semibold',
};

// Responsive spacing
export const responsiveSpacing = {
  sectionPaddingY: 'py-12 sm:py-16 md:py-20 lg:py-24',
  containerGapX: 'gap-4 sm:gap-6 md:gap-8 lg:gap-12',
  containerGapY: 'gap-6 sm:gap-8 md:gap-10 lg:gap-12',
};

// Responsive grid layouts
export const responsiveGrid = {
  autoFit2: 'grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6',
  autoFit3: 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6',
  autoFit4: 'grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6',
};
