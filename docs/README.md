# Motion (Framer Motion) Documentation

This documentation covers the integration and usage of Motion (the React 19 compatible successor to Framer Motion) in this Next.js 15 project.

## Quick Navigation

- [Getting Started](./getting-started.md) - Installation and basic setup
- [Common Patterns](./common-patterns.md) - Frequently used animation patterns
- [Tailwind Integration](./tailwind-integration.md) - Working with Tailwind CSS v4
- [shadcn/ui Integration](./shadcn-integration.md) - Animating shadcn/ui components
- [Best Practices](./best-practices.md) - Performance and development guidelines
- [Examples](./examples/) - Code examples for this project

## What's Included

This project is configured with:
- **Motion**: v12.23.12 (React 19 compatible)
- **Next.js 15**: App Router with TypeScript
- **Tailwind CSS v4**: With OKLCH color space
- **shadcn/ui**: New York style components

## Migration Notes

This project uses the new `motion` package instead of `framer-motion` for React 19 compatibility. All imports use:

```typescript
import { motion, AnimatePresence } from "motion/react"
```

Instead of the legacy:
```typescript
import { motion, AnimatePresence } from "framer-motion" // ❌ Not compatible with React 19
```

## Key Features Available

- **motion components**: `motion.div`, `motion.button`, etc.
- **AnimatePresence**: For exit animations
- **Variants**: Reusable animation configurations
- **Gestures**: Drag, hover, tap, focus animations
- **Layout animations**: Automatic layout transitions
- **Scroll-triggered animations**: useScroll, useTransform
- **Custom hooks**: useAnimation, useMotionValue, etc.

## Getting Support

For Motion-specific questions, refer to the [official documentation](https://motion.dev/docs/react).
For project-specific implementation, see the examples in this documentation.
