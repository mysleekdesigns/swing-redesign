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
          "bg-white border-2 border-gray-300 text-gray-900",
          "hover:border-gray-400 hover:shadow-md hover:text-gray-900",
          // Dark mode: Keep the existing glass effect
          "dark:bg-white/5 dark:text-white/70 dark:border-white/10",
          "dark:hover:bg-white/10 dark:hover:text-white/90",
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
