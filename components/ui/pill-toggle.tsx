"use client";

import { useRef, useLayoutEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface PillOption {
  value: string | boolean;
  label: string;
}

interface PillToggleProps {
  options: PillOption[];
  value: string | boolean;
  onChange: (value: string | boolean) => void;
  className?: string;
}

export function PillToggle({ options, value, onChange, className }: PillToggleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const [indicatorWidth, setIndicatorWidth] = useState(0);
  const [indicatorLeft, setIndicatorLeft] = useState(0);
  const [isInitialized, setIsInitialized] = useState(false);

  // Update indicator position when value changes - using useLayoutEffect for synchronous updates
  useLayoutEffect(() => {
    const activeIndex = options.findIndex(option => option.value === value);
    if (activeIndex === -1) return;
    
    const setIndicatorPosition = () => {
      const currentButton = buttonsRef.current[activeIndex];
      const container = containerRef.current;
      
      if (currentButton && container) {
        const buttonRect = currentButton.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        
        // Calculate position relative to container's inner content area
        // Account for the 4px (p-1) padding on the container
        const containerPadding = 4; // p-1 = 4px padding
        const relativeLeft = buttonRect.left - containerRect.left - containerPadding;
        
        setIndicatorLeft(relativeLeft);
        setIndicatorWidth(buttonRect.width);
        
        // Mark as initialized after first positioning
        if (!isInitialized) {
          // Use requestAnimationFrame to ensure smooth initial positioning
          requestAnimationFrame(() => {
            setIsInitialized(true);
          });
        }
      }
    };
    
    setIndicatorPosition();
    
    // Handle window resize
    const handleResize = () => setIndicatorPosition();
    window.addEventListener("resize", handleResize);
    
    return () => window.removeEventListener("resize", handleResize);
  }, [value, options, isInitialized]);

  return (
    <div 
      ref={containerRef}
      className={cn(
        "relative inline-flex items-center gap-0 p-1 bg-muted rounded-full h-9",
        className
      )}
    >
      {/* Sliding Indicator */}
      <div 
        className={cn(
          "absolute top-1 bottom-1 bg-background rounded-full shadow-sm",
          "transition-all duration-500 ease-in-out",
          isInitialized ? "opacity-100" : "opacity-0"
        )}
        style={{
          width: indicatorWidth,
          transform: `translateX(${indicatorLeft}px)`,
          willChange: "transform, width"
        }}
      />
      
      {/* Option Buttons */}
      {options.map((option, index) => (
        <button
          key={String(option.value)}
          ref={(el) => { buttonsRef.current[index] = el; }}
          type="button"
          onClick={() => onChange(option.value)}
          className={cn(
            "relative z-10 px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200",
            value === option.value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground",
            option.label === "Bi Curious" && "whitespace-nowrap"
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}