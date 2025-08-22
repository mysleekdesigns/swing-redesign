# Tailwind CSS v4 Integration with Motion

This guide covers how Motion integrates with this project's Tailwind CSS v4 setup, including OKLCH color space and custom utilities.

## Overview

This project uses:
- **Tailwind CSS v4** with CSS variables and OKLCH color space
- **Custom utilities** for glass effects, hover states, and theme transitions
- **Motion animations** that complement existing Tailwind styles

## Working with Tailwind Classes

### Combining Motion with Tailwind Classes
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="p-6 bg-card rounded-lg shadow-lg hover:shadow-xl"
>
  Motion + Tailwind content
</motion.div>
```

### Using Tailwind Variables in Motion
Access Tailwind's CSS variables directly in Motion animations:

```typescript
<motion.div
  animate={{
    backgroundColor: ["var(--card)", "var(--accent)", "var(--card)"]
  }}
  transition={{ duration: 2, repeat: Infinity }}
  className="p-4 rounded-lg"
>
  Color cycling content
</motion.div>
```

## OKLCH Color Animations

### Animating OKLCH Values
```typescript
<motion.div
  animate={{
    backgroundColor: [
      "oklch(0.98 0 0)",      // Light background
      "oklch(0.75 0.23 85)",  // Primary color
      "oklch(0.98 0 0)"       // Back to light
    ]
  }}
  transition={{ duration: 3, repeat: Infinity }}
  className="p-8 rounded-lg"
>
  OKLCH color animation
</motion.div>
```

### Theme-Aware Animations
```typescript
import { useTheme } from "next-themes"

const ThemeAwareAnimation = () => {
  const { theme } = useTheme()

  return (
    <motion.div
      animate={{
        backgroundColor: theme === "dark" 
          ? "oklch(0.2795 0.0368 260.0310)" // Dark card
          : "oklch(0.98 0 0)"                // Light card
      }}
      transition={{ duration: 0.3 }}
      className="p-6 rounded-lg"
    >
      Theme-aware background
    </motion.div>
  )
}
```

## Working with Existing Custom Utilities

### Glass Effect Animations
Animate elements with the existing `.glass` utility:

```typescript
<motion.div
  initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
  animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
  transition={{ duration: 0.6 }}
  className="glass p-6 rounded-lg"
>
  Animated glass content
</motion.div>
```

### Hover Lift Enhancement
Combine Motion with the existing `.hover-lift` utility:

```typescript
<motion.div
  whileHover={{ 
    y: -12, // Enhanced lift beyond the CSS version
    transition: { duration: 0.2 }
  }}
  className="hover-lift p-6 bg-card rounded-lg cursor-pointer"
>
  Enhanced hover lift
</motion.div>
```

### Gold Gradient Animations
Animate the custom `.gold-gradient` utility:

```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  whileHover={{
    background: [
      "linear-gradient(135deg, oklch(0.75 0.23 85), oklch(0.85 0.2 90))",
      "linear-gradient(135deg, oklch(0.85 0.2 90), oklch(0.95 0.15 95))",
    ]
  }}
  transition={{ duration: 0.3 }}
  className="gold-gradient p-4 rounded-lg"
>
  Animated gold gradient
</motion.div>
```

## Responsive Animations

### Mobile-First Animations
Use Tailwind's responsive system with Motion:

```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="p-4 md:p-6 lg:p-8"
>
  <motion.h2
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
    className="text-lg md:text-xl lg:text-2xl font-semibold"
  >
    Responsive animated content
  </motion.h2>
</motion.div>
```

### Breakpoint-Specific Animations
```typescript
import { useMediaQuery } from "@/lib/hooks/use-media-query"

const ResponsiveAnimation = () => {
  const isMobile = useMediaQuery("(max-width: 768px)")

  return (
    <motion.div
      initial={{ opacity: 0, x: isMobile ? 0 : -100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: isMobile ? 0.3 : 0.5 }}
      className="p-4 bg-card rounded-lg"
    >
      Breakpoint-aware animation
    </motion.div>
  )
}
```

## Dark Mode Integration

### Theme Transition Animations
Work with the existing theme system:

```typescript
<motion.div
  animate={{
    color: "var(--foreground)",
    backgroundColor: "var(--card)"
  }}
  transition={{ duration: 0.3 }} // Matches the CSS transition
  className="p-6 rounded-lg border"
>
  Theme-transitioning content
</motion.div>
```

### Dark Mode Specific Effects
```typescript
import { useTheme } from "next-themes"

const DarkModeGlow = () => {
  const { theme } = useTheme()

  return (
    <motion.div
      whileHover={theme === "dark" ? {
        boxShadow: "0 0 20px oklch(0.75 0.23 85 / 15%)",
        transition: { duration: 0.3 }
      } : {}}
      className="p-6 bg-card rounded-lg"
    >
      Dark mode glow effect
    </motion.div>
  )
}
```

## Performance Optimizations

### Using transform Instead of Layout Properties
Prefer CSS transform properties (which Tailwind generates) over layout changes:

```typescript
// ✅ Good - uses transform
<motion.div
  animate={{ x: 100, scale: 1.1 }}
  className="p-4 bg-card rounded-lg"
>
  Performant animation
</motion.div>

// ❌ Avoid - causes layout recalculation
<motion.div
  animate={{ marginLeft: 100, width: "120%" }}
  className="p-4 bg-card rounded-lg"
>
  Slower animation
</motion.div>
```

### GPU Acceleration
Ensure animations trigger GPU acceleration:

```typescript
<motion.div
  style={{ willChange: "transform" }}
  animate={{ 
    x: [0, 100, 0],
    rotateY: [0, 180, 360]
  }}
  transition={{ duration: 2, repeat: Infinity }}
  className="p-4 bg-card rounded-lg"
>
  GPU-accelerated content
</motion.div>
```

## Custom Animation Utilities

### Creating Reusable Animation Variants
```typescript
// lib/animation-variants.ts
export const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  hover: {
    y: -8,
    transition: { duration: 0.2 }
  }
}

export const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}
```

### Using Custom Variants with Tailwind
```typescript
import { cardVariants, staggerContainer } from "@/lib/animation-variants"

<motion.div
  variants={staggerContainer}
  initial="hidden"
  animate="visible"
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {items.map((item, index) => (
    <motion.div
      key={index}
      variants={cardVariants}
      whileHover="hover"
      className="p-6 bg-card rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      {item.content}
    </motion.div>
  ))}
</motion.div>
```

## Best Practices

1. **Consistency**: Match Motion transition durations with Tailwind's transition classes
2. **Performance**: Use `transform` properties that align with Tailwind's utilities
3. **Accessibility**: Respect `prefers-reduced-motion` in both systems
4. **Theming**: Leverage CSS variables for theme-aware animations
5. **Mobile**: Consider Tailwind's mobile-first approach in animations

## Migration from tw-animate-css

### Before (tw-animate-css)
```html
<div class="animate-fade-in animate-slide-up">
  Content
</div>
```

### After (Motion + Tailwind)
```typescript
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
  className="[insert relevant Tailwind classes]"
>
  Content
</motion.div>
```

This approach gives you:
- More control over timing and easing
- Better TypeScript support
- Programmatic animation triggers
- Advanced features like scroll-triggered animations
