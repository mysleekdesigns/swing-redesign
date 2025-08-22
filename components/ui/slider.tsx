"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  min?: number;
  max?: number;
  step?: number;
  value?: [number, number];
  defaultValue?: [number, number];
  onValueChange?: (value: [number, number]) => void;
  formatLabel?: (value: number) => string;
  showLabels?: boolean;
  disabled?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    className, 
    min = 0, 
    max = 100, 
    step = 1, 
    value: controlledValue,
    defaultValue = [min, max],
    onValueChange,
    formatLabel = (v) => v.toString(),
    showLabels = true,
    disabled = false,
    ...props 
  }, ref) => {
    const [uncontrolledValue, setUncontrolledValue] = React.useState<[number, number]>(defaultValue);
    const value = controlledValue ?? uncontrolledValue;
    const [activeThumb, setActiveThumb] = React.useState<number | null>(null);
    const trackRef = React.useRef<HTMLDivElement>(null);
    
    const handleValueChange = React.useCallback((newValue: [number, number]) => {
      const clampedValue: [number, number] = [
        Math.max(min, Math.min(newValue[0], newValue[1])),
        Math.min(max, Math.max(newValue[0], newValue[1]))
      ];
      
      if (!controlledValue) {
        setUncontrolledValue(clampedValue);
      }
      onValueChange?.(clampedValue);
    }, [controlledValue, onValueChange, min, max]);
    
    const getPercentage = (val: number) => {
      return ((val - min) / (max - min)) * 100;
    };
    
    const handleMouseDown = (thumbIndex: number) => (e: React.MouseEvent) => {
      if (disabled) return;
      e.preventDefault();
      setActiveThumb(thumbIndex);
      
      const handleMouseMove = (e: MouseEvent) => {
        if (!trackRef.current) return;
        
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const newValue = Math.round((percent * (max - min) + min) / step) * step;
        
        const newValues: [number, number] = [...value];
        newValues[thumbIndex] = newValue;
        handleValueChange(newValues);
      };
      
      const handleMouseUp = () => {
        setActiveThumb(null);
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
      
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    };
    
    const handleTouchStart = (thumbIndex: number) => (e: React.TouchEvent) => {
      if (disabled) return;
      e.preventDefault();
      setActiveThumb(thumbIndex);
      
      const handleTouchMove = (e: TouchEvent) => {
        if (!trackRef.current) return;
        
        const touch = e.touches[0];
        const rect = trackRef.current.getBoundingClientRect();
        const percent = Math.max(0, Math.min(1, (touch.clientX - rect.left) / rect.width));
        const newValue = Math.round((percent * (max - min) + min) / step) * step;
        
        const newValues: [number, number] = [...value];
        newValues[thumbIndex] = newValue;
        handleValueChange(newValues);
      };
      
      const handleTouchEnd = () => {
        setActiveThumb(null);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleTouchEnd);
      };
      
      document.addEventListener('touchmove', handleTouchMove, { passive: false });
      document.addEventListener('touchend', handleTouchEnd);
    };
    
    const leftPercent = getPercentage(value[0]);
    const rightPercent = getPercentage(value[1]);
    
    return (
      <div 
        ref={ref} 
        className={cn("relative w-full", disabled && "opacity-50 cursor-not-allowed", className)}
        {...props}
      >
        {showLabels && (
          <div className="flex justify-between mb-2">
            <span className="text-sm text-muted-foreground">{formatLabel(value[0])}</span>
            <span className="text-sm text-muted-foreground">{formatLabel(value[1])}</span>
          </div>
        )}
        
        <div className="relative h-11 flex items-center">
          <div 
            ref={trackRef}
            className="relative h-2 w-full rounded-full bg-secondary"
          >
            <div
              className="absolute h-full rounded-full bg-primary"
              style={{
                left: `${leftPercent}%`,
                right: `${100 - rightPercent}%`
              }}
            />
            
            <div
              role="slider"
              tabIndex={disabled ? -1 : 0}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                !disabled && "hover:scale-110 cursor-grab active:cursor-grabbing",
                activeThumb === 0 && "ring-2 ring-ring ring-offset-2",
                disabled && "cursor-not-allowed"
              )}
              style={{ left: `${leftPercent}%` }}
              onMouseDown={handleMouseDown(0)}
              onTouchStart={handleTouchStart(0)}
              aria-label={`Minimum value: ${formatLabel(value[0])}`}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value[0]}
              aria-disabled={disabled}
            />
            
            <div
              role="slider"
              tabIndex={disabled ? -1 : 0}
              className={cn(
                "absolute top-1/2 -translate-y-1/2 -translate-x-1/2 h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                !disabled && "hover:scale-110 cursor-grab active:cursor-grabbing",
                activeThumb === 1 && "ring-2 ring-ring ring-offset-2",
                disabled && "cursor-not-allowed"
              )}
              style={{ left: `${rightPercent}%` }}
              onMouseDown={handleMouseDown(1)}
              onTouchStart={handleTouchStart(1)}
              aria-label={`Maximum value: ${formatLabel(value[1])}`}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={value[1]}
              aria-disabled={disabled}
            />
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };