"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export type SimpleSelectProps = React.SelectHTMLAttributes<HTMLSelectElement>

const SimpleSelect = React.forwardRef<HTMLSelectElement, SimpleSelectProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <select
        className={cn(
          "flex h-9 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-xs",
          "border-input",
          "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
          "focus-visible:outline-none",
          "disabled:cursor-not-allowed disabled:opacity-50",
          "dark:bg-input/30",
          "transition-colors",
          "[&>option]:bg-background [&>option]:text-foreground",
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </select>
    )
  }
)
SimpleSelect.displayName = "SimpleSelect"

export { SimpleSelect }