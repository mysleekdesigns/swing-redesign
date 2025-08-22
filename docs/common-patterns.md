# Common Animation Patterns

This guide covers frequently used animation patterns in this project using Motion.

## Table of Contents

1. [Fade Animations](#fade-animations)
2. [Slide Animations](#slide-animations)
3. [Scale Animations](#scale-animations)
4. [Stagger Animations](#stagger-animations)
5. [Hover Effects](#hover-effects)
6. [Page Transitions](#page-transitions)
7. [Loading States](#loading-states)
8. [Scroll Animations](#scroll-animations)

## Fade Animations

### Basic Fade In
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5 }}
>
  Content
</motion.div>
```

### Fade In with Delay
```typescript
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  Delayed content
</motion.div>
```

### Fade Out on Exit
```typescript
import { AnimatePresence } from "motion/react"

<AnimatePresence>
  {isVisible && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      Conditional content
    </motion.div>
  )}
</AnimatePresence>
```

## Slide Animations

### Slide Up from Bottom
```typescript
<motion.div
  initial={{ opacity: 0, y: 50 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  Content slides up
</motion.div>
```

### Slide In from Left
```typescript
<motion.div
  initial={{ opacity: 0, x: -100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  Content slides from left
</motion.div>
```

### Slide In from Right
```typescript
<motion.div
  initial={{ opacity: 0, x: 100 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ duration: 0.5, ease: "easeInOut" }}
>
  Content slides from right
</motion.div>
```

## Scale Animations

### Scale In
```typescript
<motion.div
  initial={{ opacity: 0, scale: 0.8 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.4, ease: "easeOut" }}
>
  Content scales in
</motion.div>
```

### Bounce Scale
```typescript
<motion.div
  initial={{ scale: 0 }}
  animate={{ scale: 1 }}
  transition={{ 
    duration: 0.5,
    ease: "easeInOut",
    type: "spring",
    bounce: 0.4
  }}
>
  Bouncy content
</motion.div>
```

## Stagger Animations

### Stagger Children
```typescript
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
}

<motion.ul
  variants={containerVariants}
  initial="hidden"
  animate="visible"
>
  {items.map((item, index) => (
    <motion.li
      key={index}
      variants={itemVariants}
    >
      {item}
    </motion.li>
  ))}
</motion.ul>
```

### Stagger Cards
```typescript
const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1 }
}

<motion.div
  initial="hidden"
  animate="visible"
  transition={{ staggerChildren: 0.2 }}
  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
>
  {cards.map((card, index) => (
    <motion.div
      key={index}
      variants={cardVariants}
      className="p-6 bg-card rounded-lg"
    >
      {card.content}
    </motion.div>
  ))}
</motion.div>
```

## Hover Effects

### Lift on Hover
```typescript
<motion.div
  whileHover={{ 
    y: -8,
    transition: { duration: 0.2 }
  }}
  className="cursor-pointer"
>
  Hoverable content
</motion.div>
```

### Scale on Hover
```typescript
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ duration: 0.2 }}
  className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
>
  Click me
</motion.button>
```

### Glow Effect on Hover
```typescript
<motion.div
  whileHover={{
    boxShadow: "0 0 20px rgba(255, 255, 255, 0.3)",
    transition: { duration: 0.3 }
  }}
  className="p-4 bg-card rounded-lg"
>
  Glowing content
</motion.div>
```

## Page Transitions

### Smooth Page Transition
```typescript
// app/template.tsx
"use client"
import { motion } from "motion/react"

const pageVariants = {
  initial: {
    opacity: 0,
    x: "-100vw"
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  },
  exit: {
    opacity: 0,
    x: "100vw",
    transition: {
      duration: 0.4,
      ease: "easeInOut"
    }
  }
}

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {children}
    </motion.div>
  )
}
```

### Fade Page Transition
```typescript
const fadePageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export default function FadeTemplate({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      variants={fadePageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
    >
      {children}
    </motion.div>
  )
}
```

## Loading States

### Pulse Loading
```typescript
<motion.div
  animate={{
    opacity: [0.5, 1, 0.5],
  }}
  transition={{
    duration: 1.5,
    repeat: Infinity,
    ease: "easeInOut"
  }}
  className="w-full h-4 bg-muted rounded"
/>
```

### Skeleton Loading
```typescript
const SkeletonCard = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="p-6 bg-card rounded-lg space-y-4"
  >
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity }}
      className="h-4 bg-muted rounded w-3/4"
    />
    <motion.div
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}
      className="h-4 bg-muted rounded w-1/2"
    />
  </motion.div>
)
```

### Spinner Loading
```typescript
<motion.div
  animate={{ rotate: 360 }}
  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
  className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full"
/>
```

## Scroll Animations

### Scroll-triggered Fade In
```typescript
import { useInView } from "motion/react"
import { useRef } from "react"

const ScrollFadeIn = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-10%" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  )
}
```

### Parallax Scroll Effect
```typescript
import { useScroll, useTransform } from "motion/react"

const ParallaxSection = ({ children }: { children: React.ReactNode }) => {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 1000], [0, -100])

  return (
    <motion.div style={{ y }}>
      {children}
    </motion.div>
  )
}
```

## Tips for Using These Patterns

1. **Performance**: Use `transform` properties (x, y, scale, rotate) over layout properties (width, height) for better performance
2. **Accessibility**: Respect `prefers-reduced-motion` setting
3. **Timing**: Keep animations snappy (0.2-0.6s) for better UX
4. **Easing**: Use appropriate easing functions (`easeOut` for entrances, `easeIn` for exits)
5. **Consistency**: Maintain consistent animation durations and easing across your app
