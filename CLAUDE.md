# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
```bash
npm run dev          # Start development server with Turbopack
```

### Build & Production
```bash
npm run build        # Build for production
npm run start        # Start production server
```

### Code Quality
```bash
npm run lint         # Run ESLint with Next.js rules
npx tsc --noEmit     # Run TypeScript type checking (strict mode)
```

## Architecture

This is a Next.js 15 application using the App Router with the following key characteristics:

- **Framework**: Next.js 15.4.5 with React 19
- **Styling**: Tailwind CSS v4 (alpha) with CSS variables and OKLCH color space
- **UI Components**: shadcn/ui style components (New York style) WITHOUT Radix UI dependencies - custom implementations
- **Type Safety**: TypeScript with strict mode enabled
- **Font System**: Geist font family with automatic optimization
- **Animation**: Motion library and tw-animate-css for animations

### Project Structure
- `/app` - Next.js App Router pages and layouts
  - `page.tsx` - Main landing page
  - `profile/page.tsx` - User profile page
  - `search/page.tsx` - Search functionality
- `/components` - Reusable components
  - `/ui` - shadcn/ui style components WITHOUT Radix (button, carousel, dropdown-menu, theme-toggle, checkbox, input, label, select, separator, slider, tabs, etc.)
  - `/layout` - Layout components (Sidebar)
  - `/sections` - Page-specific sections
    - `/home` - Home page components (ConventionCard)
    - `/profile` - Profile page components (ProfileHeader, PhotoGrid, QuickActions, etc.)
    - `/search` - Search page components (SearchFiltersV2, ActiveFilters, ResultsHeader, SortDropdown)
  - `/shared` - Shared components across pages (StatsGrid, TabNavigation)
  - `providers.tsx` - Context providers wrapper
- `/lib` - Utility functions and context
  - `utils.ts` - Includes `cn()` for className merging
  - `theme-context.tsx` - Theme management context with persistence
  - `mock-data.ts` - Sample data for development
- `/public/images` - Static assets including logo-swing.svg

### Path Aliases
- `@/*` maps to the project root, allowing imports like `@/lib/utils`

### Theme System
- Four theme variants available:
  - `light` - Default light theme
  - `dark` - Dark theme with OKLCH dark colors
  - `bubble-gum` - Pink/pastel theme
  - `cyberpunk` - Neon cyberpunk theme (has both light and dark variants)
- Themes are managed via `theme-context.tsx` with localStorage persistence
- Theme cycling: light → dark → bubble-gum → cyberpunk → light
- CSS variables defined in `app/globals.css` using OKLCH color space
- Responsive breakpoints for mobile/tablet/desktop layouts

## Configuration

### Next.js Config
- Image optimization enabled for `images.unsplash.com` and `plus.unsplash.com`
- Turbopack enabled for faster development builds

### TypeScript Config
- Strict mode enabled
- Path alias `@/*` configured
- Target: ES2017
- Module resolution: bundler

### ESLint Config
- Extends Next.js core-web-vitals and TypeScript rules
- Uses FlatCompat for ESLint configuration

### UI Components Config
- shadcn/ui Style: New York
- Base color: Neutral
- CSS variables enabled
- Icon library: Lucide React
- IMPORTANT: NO Radix UI dependencies - all components are custom implementations following shadcn/ui patterns

## Key Dependencies

- **UI Libraries**: 
  - Lucide React (icons)
  - Class Variance Authority (component variants)
  - Embla Carousel (carousel functionality)
  - Motion (animation library)
  - NO Radix UI
- **Styling**: 
  - Tailwind CSS v4 (alpha)
  - Tailwind Merge & clsx (className utilities)
  - tw-animate-css (CSS animations)
- **Utilities**:
  - use-debounce (debouncing hooks)
- **Development**: 
  - ESLint with Next.js rules
  - PostCSS with Tailwind

## Testing

No test framework is currently configured. When adding tests, first check README and package.json for testing approach.

## Quality Standards

- All code must pass `npm run lint` before task completion
- All code must pass `npx tsc --noEmit` before task completion
- Components must be reusable and follow existing patterns
- Create only necessary files - prefer editing existing files

## Best Practices

- Kill Next.js servers after completing tasks (`pkill -f "next dev"`)
- Use responsive breakpoints for all content
- Maintain theme consistency across components
- Leverage existing UI components before creating new ones
- Follow TypeScript strict mode requirements
- Check existing code patterns before implementing new features
- Focus on the specific task requested - avoid scope creep