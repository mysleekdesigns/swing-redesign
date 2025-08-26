# STYLEGUIDE.md

This style guide documents the theming and styling patterns used in this Next.js application. It serves as a reference for Claude Code and sub-agents to maintain consistent styling while leveraging our sophisticated theme system.

## Table of Contents
1. [Theme System Overview](#theme-system-overview)
2. [Color System](#color-system)
3. [Component Styling Patterns](#component-styling-patterns)
4. [Spacing & Layout](#spacing--layout)
5. [Typography](#typography)
6. [Effects & Animations](#effects--animations)
7. [Borders & Shadows](#borders--shadows)
8. [Best Practices](#best-practices)
9. [Common Patterns & Examples](#common-patterns--examples)

## Theme System Overview

### Available Themes
The application supports 5 distinct themes, each with unique color palettes:

1. **`light`** - Clean, minimal light theme (default)
2. **`dark`** - Premium dark theme with golden accents
3. **`dark2`** - Alternative dark theme with warmer tones
4. **`bubble-gum`** - Playful pink/pastel theme
5. **`cyberpunk`** - Neon-inspired theme (supports both light and dark variants)

### Theme Implementation
- Themes are applied via CSS classes on the document root element
- Theme switching is handled by `theme-context.tsx` with localStorage persistence
- Theme cycling order: light → dark → dark2 → bubble-gum → cyberpunk → light
- Cyberpunk theme applies both `.cyberpunk` and `.dark` classes for its dark variant

## Color System

### Core Principle: Theme-Aware CSS Variables
**NEVER use hard-coded colors.** Always use CSS variable-based color classes that automatically adapt to the current theme.

### Primary Semantic Colors
These are the foundation colors used throughout the application:

```css
/* Backgrounds */
bg-background          /* Main page background */
bg-card               /* Card/container backgrounds */
bg-popover            /* Popover/dropdown backgrounds */
bg-sidebar            /* Sidebar background */

/* Text Colors */
text-foreground       /* Primary text color */
text-muted-foreground /* Secondary/muted text */
text-card-foreground  /* Text on cards */

/* Interactive Elements */
bg-primary            /* Primary actions (buttons, links) */
text-primary-foreground /* Text on primary backgrounds */
bg-secondary          /* Secondary actions */
text-secondary-foreground /* Text on secondary backgrounds */
bg-accent             /* Accent/highlight elements */
text-accent-foreground /* Text on accent backgrounds */

/* Form Elements */
bg-input              /* Input field backgrounds */
border-input          /* Input field borders */
bg-muted              /* Disabled/muted backgrounds */

/* Feedback Colors */
bg-destructive        /* Error/destructive actions */
text-destructive      /* Error text */
bg-warning            /* Warning states */
bg-online             /* Online status indicator */

/* Borders & Rings */
border-border         /* Default border color */
ring-ring            /* Focus ring color */
```

### Color Opacity Patterns
Use Tailwind's opacity modifiers with theme colors:

```css
bg-primary/90         /* 90% opacity */
border-border/60      /* 60% opacity */
text-foreground/50    /* 50% opacity */
bg-accent/10          /* 10% opacity (subtle backgrounds) */
```

### OKLCH Color Space
All colors are defined using the OKLCH color space for:
- Better color consistency across themes
- More perceptually uniform color transitions
- Enhanced color manipulation capabilities

Example: `oklch(0.75 0.23 85)` where:
- First value: Lightness (0-1)
- Second value: Chroma (color intensity)
- Third value: Hue (angle in degrees)

### Dynamic Color References
Use `from` syntax for color derivations:
```css
background-color: oklch(from var(--background) l c h / 10%);
border: 1px solid oklch(from var(--border) l c h / 20%);
```

## Component Styling Patterns

### Glass Morphism Effects
Three levels of glass effects are available:

```css
/* Light glass effect */
.glass {
  backdrop-filter: blur(12px);
  background-color: oklch(from var(--background) l c h / 10%);
  border: 1px solid oklch(from var(--border) l c h / 20%);
}

/* Dark glass effect (for overlays) */
.glass-dark {
  backdrop-filter: blur(12px);
  background-color: rgba(0, 0, 0, 0.65);
  border: 1px solid oklch(from var(--border) l c h / 10%);
}

/* Section glass (for headers) */
.section-glass {
  backdrop-filter: blur(8px);
  background-color: oklch(from var(--background) l c h / 90%);
  border: 1px solid oklch(from var(--border) l c h / 60%);
}
```

### Dark Mode Variants
Use the `dark:` prefix for dark-theme-specific styles:

```css
/* Component that adapts to dark mode */
className="bg-white dark:bg-gray-900"
className="border-gray-200 dark:border-gray-700"
className="hover:bg-gray-50 dark:hover:bg-gray-800"
```

### Theme-Specific Selectors
For theme-specific customizations beyond light/dark:

```css
/* In globals.css */
.bubble-gum .component { /* Bubble gum specific styles */ }
.cyberpunk .component { /* Cyberpunk specific styles */ }
.dark2 .component { /* Dark2 specific styles */ }
```

### Interactive States
Standard patterns for interactive elements:

```css
/* Hover States */
hover:bg-accent
hover:text-accent-foreground
hover:scale-110
hover:shadow-xl

/* Focus States */
focus-visible:border-ring
focus-visible:ring-ring/50
focus-visible:ring-[3px]
focus-visible:outline-none

/* Disabled States */
disabled:pointer-events-none
disabled:opacity-50
disabled:cursor-not-allowed

/* Active/Selected States */
data-state="active"
aria-selected:bg-primary
```

### Component Variants with CVA
Use Class Variance Authority for component variants:

```typescript
const buttonVariants = cva(
  "base-classes",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        outline: "border bg-background hover:bg-accent",
        ghost: "hover:bg-accent hover:text-accent-foreground",
      },
      size: {
        sm: "h-8 px-3",
        default: "h-9 px-4",
        lg: "h-10 px-6",
      }
    }
  }
)
```

## Spacing & Layout

### Responsive Breakpoints
```css
/* Standard Tailwind breakpoints */
sm:   /* 640px and up */
md:   /* 768px and up */
lg:   /* 1024px and up */
xl:   /* 1280px and up */
2xl:  /* 1536px and up */

/* Custom breakpoints used in the app */
min-[780px]:   /* 780px and up */
min-[1000px]:  /* 1000px and up */
min-[1600px]:  /* 1600px and up */
min-[2100px]:  /* 2100px and up */
```

### Spacing Scale
Consistent spacing using Tailwind's spacing scale:
```css
p-2   /* 0.5rem */
p-3   /* 0.75rem */
p-4   /* 1rem */
p-6   /* 1.5rem */
p-8   /* 2rem */
gap-4 /* 1rem gap in flex/grid */
space-y-4 /* 1rem vertical spacing between children */
```

### Container Patterns
```css
/* Page containers */
<main className="2xl:ml-64 p-4 sm:p-6 lg:p-8">

/* Card containers */
<div className="rounded-2xl bg-card p-6 sm:p-8">

/* Section containers */
<section className="space-y-8">
```

### Grid Layouts
Responsive grid with breakpoint-specific columns:
```css
/* Adaptive grid example from the codebase */
grid-cols-2 
min-[780px]:grid-cols-3 
min-[1000px]:grid-cols-4 
min-[1600px]:grid-cols-6 
min-[2100px]:grid-cols-8
```

## Typography

### Font System
```css
font-sans  /* Geist Sans - Primary font */
font-mono  /* Geist Mono - Code/monospace */
```

### Text Sizes
```css
text-xs    /* 0.75rem */
text-sm    /* 0.875rem */
text-base  /* 1rem - body text */
text-lg    /* 1.125rem */
text-xl    /* 1.25rem */
text-2xl   /* 1.5rem */
text-3xl   /* 1.875rem */
text-4xl   /* 2.25rem */
```

### Font Weights
```css
font-normal  /* 400 */
font-medium  /* 500 */
font-semibold /* 600 */
font-bold    /* 700 */
```

### Text Color Hierarchy
```css
text-foreground        /* Primary text */
text-muted-foreground  /* Secondary text */
text-primary          /* Accent/link text */
text-destructive      /* Error text */
```

## Effects & Animations

### Transitions
```css
transition-all        /* All properties */
transition-colors     /* Color changes only */
transition-transform  /* Transform changes */
transition-opacity    /* Opacity changes */
duration-300         /* 300ms duration */
duration-500         /* 500ms duration */
```

### Hover Lift Effect
```css
.hover-lift {
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px oklch(0 0 0 / 15%);
}
```

### Animation Classes
```css
animate-pulse        /* Pulsing animation */
animate-spin         /* Spinning animation */
/* From tw-animate-css library - additional animations available */
```

### Transform Utilities
```css
scale-110           /* Scale to 110% */
-translate-x-1/2    /* Center horizontally */
rotate-180          /* Rotate 180 degrees */
```

## Borders & Shadows

### Border Radius
Dynamic radius system using CSS variables:
```css
rounded-sm    /* var(--radius) - 4px */
rounded-md    /* var(--radius) - 2px */
rounded-lg    /* var(--radius) */
rounded-xl    /* var(--radius) + 4px */
rounded-2xl   /* 1rem */
rounded-full  /* 9999px */
```

### Border Styles
```css
border           /* 1px solid border */
border-2         /* 2px solid border */
border-border    /* Theme-aware border color */
border-primary   /* Primary color border */
border-border/60 /* Border with opacity */
```

### Shadow Utilities
```css
shadow-xs     /* Extra small shadow */
shadow-sm     /* Small shadow */
shadow        /* Default shadow */
shadow-md     /* Medium shadow */
shadow-lg     /* Large shadow */
shadow-xl     /* Extra large shadow */
shadow-2xl    /* 2X large shadow */

/* Custom shadow with color */
shadow-primary/10  /* Primary color shadow at 10% */
```

## Best Practices

### 1. Theme-Aware Development
- **ALWAYS** use CSS variable-based colors (`bg-primary`, `text-foreground`, etc.)
- **NEVER** hard-code colors (`bg-yellow-500`, `text-gray-900`, etc.)
- Test components in all 5 themes during development

### 2. Responsive Design
- Start with mobile-first approach
- Use responsive prefixes consistently (`sm:`, `md:`, `lg:`)
- Test on various screen sizes, especially custom breakpoints

### 3. Component Consistency
- Follow existing component patterns (check similar components first)
- Use CVA for complex component variants
- Maintain consistent spacing and sizing

### 4. Performance
- Use `transition-colors` instead of `transition-all` when only colors change
- Leverage CSS variables for instant theme switching
- Avoid excessive DOM manipulation for theme changes

### 5. Accessibility
- Always include focus states (`focus-visible:`)
- Provide sufficient color contrast
- Use semantic HTML with proper ARIA attributes

### 6. Code Organization
- Group related utility classes
- Order classes: layout → spacing → typography → colors → effects
- Use `cn()` utility from `lib/utils` for conditional classes

## Common Patterns & Examples

### Button Component Pattern
```tsx
<button className={cn(
  "inline-flex items-center justify-center",
  "rounded-md px-4 py-2",
  "text-sm font-medium",
  "bg-primary text-primary-foreground",
  "hover:bg-primary/90",
  "focus-visible:outline-none focus-visible:ring-2",
  "disabled:pointer-events-none disabled:opacity-50",
  "transition-colors"
)}>
```

### Card with Glass Effect
```tsx
<div className="relative overflow-hidden rounded-2xl bg-card border border-border">
  <div className="absolute inset-0 glass-dark" />
  <div className="relative z-10 p-6">
    {/* Content */}
  </div>
</div>
```

### Form Input Pattern
```tsx
<input className={cn(
  "flex h-9 w-full rounded-md border bg-transparent px-3 py-1",
  "text-base shadow-xs",
  "border-input",
  "placeholder:text-muted-foreground",
  "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
  "disabled:cursor-not-allowed disabled:opacity-50",
  "dark:bg-input/30"
)} />
```

### Status Indicator
```tsx
<div className="flex items-center gap-2">
  <div className="status-dot status-online animate-pulse" />
  <span className="text-sm text-muted-foreground">Online</span>
</div>
```

### Responsive Image Grid
```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
  {items.map(item => (
    <Card key={item.id} />
  ))}
</div>
```

### Theme-Specific Styling
```tsx
<div className={cn(
  "p-4 rounded-lg",
  "bg-card text-card-foreground",
  "dark:bg-card dark:text-card-foreground",
  "bubble-gum:bg-pink-50 bubble-gum:text-pink-900",
  "cyberpunk:bg-gradient-to-br cyberpunk:from-purple-900 cyberpunk:to-pink-900"
)}>
```

## Quick Reference

### Must-Use Theme Colors
- `bg-background`, `bg-card`, `bg-popover` - Backgrounds
- `text-foreground`, `text-muted-foreground` - Text
- `bg-primary`, `bg-secondary`, `bg-accent` - Interactive elements
- `border-border`, `ring-ring` - Borders and focus rings
- `bg-destructive`, `bg-warning`, `bg-online` - Status indicators

### Common Utility Combinations
- Glass cards: `glass` or `glass-dark` or `section-glass`
- Interactive elements: `hover:scale-110 transition-transform`
- Focus states: `focus-visible:ring-2 focus-visible:ring-ring`
- Disabled states: `disabled:opacity-50 disabled:pointer-events-none`
- Premium dark effects: `dark:shadow-primary/15 dark:border-primary/20`

### Theme Class Application
- Light: No additional class needed (default)
- Dark: `.dark` class on document root
- Dark2: `.dark2` class on document root
- Bubble Gum: `.bubble-gum` class on document root
- Cyberpunk Light: `.cyberpunk` class on document root
- Cyberpunk Dark: `.cyberpunk.dark` classes on document root

---

This style guide should be treated as the source of truth for all styling decisions. When in doubt, refer to existing components that implement similar patterns. Always prioritize theme consistency and user experience over individual preferences.