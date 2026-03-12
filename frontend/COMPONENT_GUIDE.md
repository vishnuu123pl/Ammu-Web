# Fluxera Component & Design System Guide

## Quick Start

### Importing Components
```typescript
// Option 1: Direct import
import { PageContainer, HeroSection, SectionCard } from '@/components';

// Option 2: Named imports for specific components
import { Logo } from '@/components/Logo';

// Option 3: From index file
import { StepCard, BenefitCard, CategoryCard } from '@/components';
```

### Importing Constants
```typescript
// Design constants
import { typography, spacing, categories } from '@/constants/design';

// Responsive utilities
import { responsiveText, responsiveSpacing, responsiveGrid } from '@/constants/responsive';

// Or from index
import { typography, responsiveText } from '@/constants';
```

## Component Library

### PageContainer
Wraps content with max-width and consistent padding.

```typescript
<PageContainer className="py-16">
  <h1>Your Content</h1>
</PageContainer>
```

**Props:**
- `children`: ReactNode
- `className`: Optional additional classes

---

### HeroSection
Hero section with gradient background and blur effects.

```typescript
<HeroSection>
  <h1>Hero Title</h1>
  <p>Hero description</p>
</HeroSection>
```

**Props:**
- `children`: ReactNode
- `className`: Optional additional classes

---

### SectionCard
Flexible card component for content blocks.

```typescript
<SectionCard hover className="lg:col-span-2">
  <h3>Card Title</h3>
  <p>Card content</p>
</SectionCard>
```

**Props:**
- `children`: ReactNode
- `className`: Optional additional classes
- `hover`: boolean (default: true) - Add hover shadow effect

---

### StepCard
Specialized card for step-by-step processes.

```typescript
<StepCard
  step="01"
  icon={SearchIcon}
  title="Search Items"
  description="Browse available items near campus"
/>
```

**Props:**
- `step`: string | number
- `icon`: LucideIcon
- `title`: string
- `description`: string
- `className`: Optional additional classes

---

### BenefitCard
Icon + text card for highlighting features.

```typescript
<BenefitCard
  icon={ShieldIcon}
  title="Verified Students"
  description="All users verified for safe transactions"
/>
```

**Props:**
- `icon`: LucideIcon
- `title`: string
- `description`: string
- `className`: Optional additional classes

---

### CategoryCard
Category display with icon and hover effects.

```typescript
<CategoryCard
  name="Books & Notes"
  icon={BookOpenIcon}
  color="bg-blue-50 text-blue-600"
/>
```

**Props:**
- `name`: string
- `icon`: LucideIcon
- `color`: string (Tailwind classes)
- `className`: Optional additional classes

---

### Logo
Responsive logo component.

```typescript
// Small logo with text
<Logo size="sm" showText />

// Medium logo (default)
<Logo />

// Large logo without text
<Logo size="lg" showText={false} />
```

**Props:**
- `size`: 'sm' | 'md' | 'lg' (default: 'md')
- `showText`: boolean (default: false)
- `className`: Optional additional classes

---

## Constants & Utilities

### Typography System
```typescript
import { typography } from '@/constants/design';

// Usage in components
<h1 className={typography.heading.h1}>Main Title</h1>
<p className={typography.body.large}>Large body text</p>
<span className={typography.label}>Label text</span>
```

**Available variants:**
- `heading`: h1-h6
- `body`: large, base, small, tiny
- `label`: General label styling

### Responsive Text
```typescript
import { responsiveText } from '@/constants/responsive';

<h1 className={responsiveText.heroPrimary}>Responsive Hero</h1>
<h2 className={responsiveText.sectionTitle}>Section Title</h2>
<p className={responsiveText.body}>Body text</p>
```

### Spacing & Layout
```typescript
import { responsiveSpacing, responsiveGrid } from '@/constants/responsive';

<section className={responsiveSpacing.sectionPaddingY}>
  <div className={responsiveGrid.autoFit3}>
    {/* 3-column responsive grid */}
  </div>
</section>
```

### Categories Data
```typescript
import { categories } from '@/constants/design';

categories.map(cat => (
  <CategoryCard
    key={cat.name}
    name={cat.name}
    icon={iconMapping[cat.name]}
    color={cat.color}
  />
))
```

## Color System

All colors use OKLCH for better perceptual uniformity:

### Primary Colors
- `bg-primary` / `text-primary` - Blue (#3b82f6 equivalent)
- `bg-primary-dark` - Darker blue
- `bg-primary-light` - Lighter blue

### Secondary Colors
- `bg-secondary` - Light blue-gray
- `bg-accent` - Teal
- `bg-fluxera-teal` - Team teal color

### Neutral Colors
- `bg-background` - Off-white background
- `text-foreground` - Dark text
- `bg-fluxera-gray-light` - Light gray sections

### Shadow System
- `shadow-card` - Small card shadow
- `shadow-card-hover` - Larger hover shadow
- `shadow-nav` - Navigation shadow

## Layout Patterns

### Hero Section Layout
```typescript
<HeroSection>
  <div className="flex flex-col lg:flex-row items-center gap-12">
    <div className="flex-1 text-center lg:text-left">
      {/* Text content */}
    </div>
    <div className="flex-1">
      {/* Image or visual */}
    </div>
  </div>
</HeroSection>
```

### Grid Sections
```typescript
<PageContainer>
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
    {items.map(item => (
      <CategoryCard key={item.name} {...item} />
    ))}
  </div>
</PageContainer>
```

### Two/Three Column Layouts
```typescript
<PageContainer>
  <div className={responsiveGrid.autoFit3}>
    {items.map(item => (
      <SectionCard key={item.id}>{/* content */}</SectionCard>
    ))}
  </div>
</PageContainer>
```

## Responsive Breakpoints

The design uses Tailwind's standard breakpoints:
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

### Mobile-First Approach
Always start with mobile styles, then use responsive prefixes:

```typescript
// Mobile first
<div className="px-4 sm:px-6 lg:px-8">Content</div>
<h1 className="text-2xl sm:text-3xl lg:text-4xl">Heading</h1>
```

## Best Practices

### Do's
- Use `PageContainer` for consistent max-width wrapping
- Use component library for cards instead of inline JSX
- Import from `@/components` index for cleaner imports
- Use responsive classes for mobile-first design
- Keep components small and focused
- Maintain consistent spacing with the spacing system

### Don'ts
- Don't use arbitrary Tailwind values (e.g., `px-[16px]`)
- Don't duplicate card styling - use SectionCard
- Don't hardcode colors - use design tokens
- Don't ignore mobile users - test on mobile devices
- Don't use `px-2`, `py-3` - use consistent spacing scale

## Examples

### Complete Page Section
```typescript
import { PageContainer, HeroSection, SectionCard, StepCard } from '@/components';
import { responsiveGrid } from '@/constants';

export default function ExamplePage() {
  return (
    <>
      <HeroSection>
        <h1>Page Title</h1>
        <p>Subtitle text</p>
      </HeroSection>

      <section className="py-16 lg:py-24 bg-white">
        <PageContainer>
          <div className={responsiveGrid.autoFit3}>
            {steps.map(step => (
              <StepCard key={step.id} {...step} />
            ))}
          </div>
        </PageContainer>
      </section>
    </>
  );
}
```

### Logo Integration
```typescript
import { Logo } from '@/components';
import { Link } from '@tanstack/react-router';

export default function Navigation() {
  return (
    <header>
      <Link to="/" className="flex items-center gap-3">
        <Logo size="md" showText />
      </Link>
    </header>
  );
}
```

## Troubleshooting

### Components Not Found
- Ensure imports use the correct path: `@/components` or `@/components/ComponentName`
- Check that components are exported in `components/index.ts`

### Colors Not Applying
- Use design tokens: `bg-primary` instead of `bg-blue-500`
- Check that component inherits color classes properly

### Responsive Breakpoints Not Working
- Remember mobile-first: base styles apply to all sizes
- Use responsive prefixes: `sm:`, `md:`, `lg:`
- Check Tailwind config is properly set up

---

**Last Updated**: March 2024
**Version**: 1.0
