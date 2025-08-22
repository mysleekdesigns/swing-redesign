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
    // Use controlled values directly if provided, otherwise use internal state
    const isControlled = controlledValue !== undefined;
    const [internalMinVal, setInternalMinVal] = React.useState(defaultValue[0]);
    const [internalMaxVal, setInternalMaxVal] = React.useState(defaultValue[1]);
    
    // Use controlled values if provided, otherwise use internal state
    const minVal = isControlled ? controlledValue[0] : internalMinVal;
    const maxVal = isControlled ? controlledValue[1] : internalMaxVal;
    
    const minValRef = React.useRef<HTMLInputElement>(null);
    const maxValRef = React.useRef<HTMLInputElement>(null);
    const range = React.useRef<HTMLDivElement>(null);
    
    // Convert value to percentage
    const getPercent = React.useCallback(
      (value: number) => Math.round(((value - min) / (max - min)) * 100),
      [min, max]
    );
    
    // Set width of the range to change from the left side
    React.useEffect(() => {
      if (maxValRef.current) {
        const minPercent = getPercent(minVal);
        const maxPercent = getPercent(+maxValRef.current.value);
        
        if (range.current) {
          range.current.style.left = `${minPercent}%`;
          range.current.style.width = `${maxPercent - minPercent}%`;
        }
      }
    }, [minVal, getPercent]);
    
    // Set width of the range to change from the right side
    React.useEffect(() => {
      if (minValRef.current) {
        const minPercent = getPercent(+minValRef.current.value);
        const maxPercent = getPercent(maxVal);
        
        if (range.current) {
          range.current.style.width = `${maxPercent - minPercent}%`;
        }
      }
    }, [maxVal, getPercent]);
    
    return (
      <div 
        ref={ref} 
        className={cn("relative w-full", disabled && "opacity-50", className)}
        {...props}
      >
        {showLabels && (
          <div className="flex justify-between mb-4">
            <span className="text-sm text-muted-foreground">{formatLabel(minVal)}</span>
            <span className="text-sm text-muted-foreground">{formatLabel(maxVal)}</span>
          </div>
        )}
        
        <div className="relative">
          {/* Minimum value input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={minVal}
            ref={minValRef}
            onChange={(event) => {
              const value = Math.min(+event.target.value, maxVal - 1);
              if (isControlled) {
                onValueChange?.([value, maxVal]);
              } else {
                setInternalMinVal(value);
                onValueChange?.([value, maxVal]);
              }
            }}
            className={cn(
              "absolute pointer-events-none w-full h-0 outline-none",
              "[&::-webkit-slider-thumb]:pointer-events-auto",
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:h-5",
              "[&::-webkit-slider-thumb]:w-5",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-primary",
              "[&::-webkit-slider-thumb]:border-2",
              "[&::-webkit-slider-thumb]:border-primary",
              "[&::-webkit-slider-thumb]:cursor-pointer",
              "[&::-webkit-slider-thumb]:shadow-md",
              "[&::-webkit-slider-thumb]:mt-1",
              "[&::-webkit-slider-thumb]:transition-all",
              "[&::-webkit-slider-thumb]:hover:scale-110",
              "[&::-webkit-slider-thumb]:focus-visible:outline-none",
              "[&::-webkit-slider-thumb]:focus-visible:ring-2",
              "[&::-webkit-slider-thumb]:focus-visible:ring-ring",
              "[&::-webkit-slider-thumb]:focus-visible:ring-offset-2",
              "[&::-moz-range-thumb]:pointer-events-auto",
              "[&::-moz-range-thumb]:appearance-none",
              "[&::-moz-range-thumb]:h-5",
              "[&::-moz-range-thumb]:w-5",
              "[&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:bg-primary",
              "[&::-moz-range-thumb]:border-2",
              "[&::-moz-range-thumb]:border-primary",
              "[&::-moz-range-thumb]:cursor-pointer",
              "[&::-moz-range-thumb]:shadow-md",
              "[&::-moz-range-thumb]:transition-all",
              "[&::-moz-range-thumb]:hover:scale-110",
              "[&::-moz-range-thumb]:focus-visible:outline-none",
              "[&::-moz-range-thumb]:focus-visible:ring-2",
              "[&::-moz-range-thumb]:focus-visible:ring-ring",
              "[&::-moz-range-thumb]:focus-visible:ring-offset-2",
              "z-[3]",
              minVal > max - 100 && "z-[5]"
            )}
            style={{
              zIndex: minVal > max - 100 ? 5 : 3
            }}
            disabled={disabled}
          />
          
          {/* Maximum value input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            ref={maxValRef}
            onChange={(event) => {
              const value = Math.max(+event.target.value, minVal + 1);
              if (isControlled) {
                onValueChange?.([minVal, value]);
              } else {
                setInternalMaxVal(value);
                onValueChange?.([minVal, value]);
              }
            }}
            className={cn(
              "absolute pointer-events-none w-full h-0 outline-none",
              "[&::-webkit-slider-thumb]:pointer-events-auto",
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:h-5",
              "[&::-webkit-slider-thumb]:w-5",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-primary",
              "[&::-webkit-slider-thumb]:border-2",
              "[&::-webkit-slider-thumb]:border-primary",
              "[&::-webkit-slider-thumb]:cursor-pointer",
              "[&::-webkit-slider-thumb]:shadow-md",
              "[&::-webkit-slider-thumb]:mt-1",
              "[&::-webkit-slider-thumb]:transition-all",
              "[&::-webkit-slider-thumb]:hover:scale-110",
              "[&::-webkit-slider-thumb]:focus-visible:outline-none",
              "[&::-webkit-slider-thumb]:focus-visible:ring-2",
              "[&::-webkit-slider-thumb]:focus-visible:ring-ring",
              "[&::-webkit-slider-thumb]:focus-visible:ring-offset-2",
              "[&::-moz-range-thumb]:pointer-events-auto",
              "[&::-moz-range-thumb]:appearance-none",
              "[&::-moz-range-thumb]:h-5",
              "[&::-moz-range-thumb]:w-5",
              "[&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:bg-primary",
              "[&::-moz-range-thumb]:border-2",
              "[&::-moz-range-thumb]:border-primary",
              "[&::-moz-range-thumb]:cursor-pointer",
              "[&::-moz-range-thumb]:shadow-md",
              "[&::-moz-range-thumb]:transition-all",
              "[&::-moz-range-thumb]:hover:scale-110",
              "[&::-moz-range-thumb]:focus-visible:outline-none",
              "[&::-moz-range-thumb]:focus-visible:ring-2",
              "[&::-moz-range-thumb]:focus-visible:ring-ring",
              "[&::-moz-range-thumb]:focus-visible:ring-offset-2",
              "z-[4]"
            )}
            disabled={disabled}
          />
          
          {/* Slider track */}
          <div className="relative h-2 mt-2">
            {/* Track background */}
            <div className="absolute w-full h-2 rounded-full bg-muted" />
            
            {/* Track progress (colored range) */}
            <div
              ref={range}
              className="absolute h-2 rounded-full bg-primary transition-all"
            />
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };