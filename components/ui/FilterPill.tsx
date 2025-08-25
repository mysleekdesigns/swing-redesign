"use client";

import { cn } from "@/lib/utils";

interface FilterPillProps {
  label: string;
  isActive?: boolean;
  onClick?: () => void;
  className?: string;
}

export function FilterPill({ 
  label, 
  isActive = false, 
  onClick, 
  className 
}: FilterPillProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        // Base styles with enhanced transitions
        "px-4 py-2 rounded-full text-base font-medium transition-all duration-300 ease-out",
        "hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
        "whitespace-nowrap cursor-pointer",
        
        // Inactive state - Maximum contrast for light mode
        !isActive && [
          // Light mode: Pure white background with strong border for maximum contrast
          "bg-background border-2 border-border text-foreground",
          "hover:border-border/80 hover:shadow-md hover:text-foreground",
          // Dark mode: Keep the existing glass effect
          "dark:bg-card/5 dark:text-foreground/70 dark:border-border/10",
          "dark:hover:bg-card/10 dark:hover:text-foreground/90",
        ],
        
        // Active state with golden background
        isActive && [
          "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground",
          "border-2 border-primary/50 shadow-lg shadow-primary/20",
          "hover:from-primary/90 hover:to-primary/80",
          "dark:shadow-[0_0_30px_oklch(0.75_0.23_85_/_15%)]",
          "dark:border-primary/40"
        ],
        
        className
      )}
    >
      {label}
    </button>
  );
}
