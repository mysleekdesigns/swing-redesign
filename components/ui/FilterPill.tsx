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
        // Base styles with glass morphism
        "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ease-out",
        "backdrop-blur-[20px] border border-white/20",
        "hover:scale-105 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary/20",
        "whitespace-nowrap cursor-pointer",
        
        // Inactive state
        !isActive && [
          "bg-white/10 text-foreground/80",
          "hover:bg-white/20 hover:text-foreground",
          "dark:bg-white/5 dark:text-white/70",
          "dark:hover:bg-white/10 dark:hover:text-white/90",
          "dark:border-white/10"
        ],
        
        // Active state with golden background
        isActive && [
          "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground",
          "border-primary/30 shadow-lg shadow-primary/20",
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
