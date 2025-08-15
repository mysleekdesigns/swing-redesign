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
- **Styling**: Tailwind CSS v4 with CSS variables and OKLCH color space
- **UI Components**: shadcn/ui components (New York style) with Radix UI primitives
- **Type Safety**: TypeScript with strict mode enabled
- **Font System**: Geist font family with automatic optimization

### Project Structure
- `/app` - Next.js App Router pages and layouts
- `/components` - Reusable components
  - `/ui` - shadcn/ui components (ConventionCard, HotDateCard, UserCard, dropdown-menu, theme-toggle)
  - `/layout` - Layout components (Sidebar)
  - `providers.tsx` - Context providers wrapper
- `/lib` - Utility functions and context
  - `utils.ts` - Includes `cn()` for className merging
  - `theme-context.tsx` - Theme management context with persistence
  - `mock-data.ts` - Sample data for development
- `/public/images` - Static assets including logo-swing.svg

### Path Aliases
- `@/*` maps to the project root, allowing imports like `@/lib/utils`

### Styling System
- Tailwind CSS v4 with CSS variables for theming
- Dark mode support with `.dark` class variant
- Multiple theme variants: default, bubble-gum, cyberpunk, golden accent
- Custom utilities in `app/globals.css` including hover-lift effects and status indicators
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

## Key Dependencies

- **UI Libraries**: Radix UI (dropdown-menu), Lucide React (icons), Class Variance Authority (component variants)
- **Styling**: Tailwind Merge, clsx for className utilities, tw-animate-css for animations
- **Development**: ESLint with Next.js rules, PostCSS with Tailwind

## Testing

No test framework is currently configured. When adding tests, first check README and package.json for testing approach.

## Agent-Based Workflow

### IMPORTANT: Task Delegation
- **ALL tasks** (redesigns, features, bug fixes) MUST go through the `project-manager` agent first
- Claude Code should NEVER attempt to code directly - always delegate to project-manager
- The project manager researches, plans, and delegates to specialized sub-agents

### Quality Standards
- All code must pass `npm run lint` before task completion
- All code must pass `npx tsc --noEmit` before task completion
- Components must be reusable and follow existing patterns
- Create only necessary files - prefer editing existing files

### Sub-Agent Specializations
- `project-manager`: Primary coordinator for ALL tasks - MUST be used as entry point
- `ui-ux-designer`: Design decisions, user flows, visual modernization
- `frontend-developer`: React/Next.js implementation, TypeScript code
- `marketing-expert`: Conversion optimization, SEO, messaging
- `content-strategist`: Information architecture, copywriting
- `accessibility-specialist`: WCAG compliance, inclusive design
- `performance-analyst`: Core Web Vitals, speed optimization

### Development Process
1. User request → Project Manager (ALWAYS)
2. Project Manager researches and creates task plan
3. Project Manager delegates to appropriate sub-agents
4. Sub-agents work in parallel within their expertise
5. Each sub-agent runs quality checks before completion
6. Project Manager verifies all work passes linting/type checking
7. Task marked complete only after all checks pass

## Best Practices

- Kill Next.js servers after completing tasks (`pkill -f "next dev"`)
- Use responsive breakpoints for all content
- Maintain theme consistency across components
- Leverage existing UI components before creating new ones
- Follow TypeScript strict mode requirements
- Check existing code patterns before implementing new features
- the project mananger is only supposed to delegate tasks to relevant sub agentms depending on the task at hand. the sub agents are supposed to do the work.