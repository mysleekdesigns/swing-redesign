# Getting Started with Motion

This guide covers how to use Motion (Framer Motion for React 19) in this Next.js 15 project.

## Installation

Motion is already installed in this project:

```bash
npm install motion
```

## Basic Usage

### 1. Client Component Requirement

Since Motion uses browser APIs, all animated components must be client components:

```typescript
"use client"
import { motion } from "motion/react"

export default function AnimatedComponent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      Hello, animated world!
    </motion.div>
  )
}
```

### 2. Core Concepts

#### motion Elements
Transform any HTML element into an animated one:

```typescript
<motion.div />      // Animated div
<motion.button />   // Animated button
<motion.section />  // Animated section
```

#### Animation Props
- `initial`: Starting state
- `animate`: Target state  
- `exit`: Exit animation (requires AnimatePresence)
- `transition`: Animation configuration

```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  exit={{ opacity: 0, scale: 0.8 }}
  transition={{ 
    duration: 0.3,
    ease: "easeInOut"
  }}
>
  Content
</motion.div>
```

### 3. Working with Next.js App Router

#### Page-Level Animations
Create animated page templates:

```typescript
// app/template.tsx
"use client"
import { motion } from "motion/react"

const pageVariants = {
  initial: { opacity: 0, x: -200 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: 200 }
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ type: "tween", ease: "easeInOut", duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

#### Layout Animations
For persistent layouts that don't remount:

```typescript
// components/layout/AnimatedLayout.tsx
"use client"
import { motion } from "motion/react"

export function AnimatedLayout({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      layout
      transition={{ duration: 0.3 }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  )
}
```

### 4. TypeScript Configuration

Motion includes full TypeScript support. Types are automatically inferred:

```typescript
import { motion, MotionProps, Variants } from "motion/react"

// Custom component with motion props
interface AnimatedCardProps extends MotionProps {
  title: string
  children: React.ReactNode
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

export function AnimatedCard({ title, children, ...motionProps }: AnimatedCardProps) {
  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      {...motionProps}
      className="p-6 rounded-lg bg-card"
    >
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      {children}
    </motion.div>
  )
}
```

### 5. Integration with Existing tw-animate-css

Motion works alongside the existing `tw-animate-css` animations. You can:

1. **Replace** tw-animate classes with Motion animations for more control
2. **Combine** both for different use cases
3. **Migrate gradually** from tw-animate to Motion

Example migration:
```typescript
// Before: Using tw-animate-css
<div className="animate-fade-in animate-slide-up">
  Content
</div>

// After: Using Motion
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

## Next Steps

- Read [Common Patterns](./common-patterns.md) for frequently used animations
- Learn about [Tailwind Integration](./tailwind-integration.md)
- Explore [shadcn/ui Integration](./shadcn-integration.md)
- Review [Best Practices](./best-practices.md) for optimal performance
