"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface SliderProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange' | 'defaultValue'> {
  min?: number;
  max?: number;
  step?: number;
  value?: number | [number, number];
  defaultValue?: number | [number, number];
  onValueChange?: (value: number | [number, number]) => void;
  formatLabel?: (value: number) => string;
  showLabels?: boolean;
  disabled?: boolean;
  singleValue?: boolean;
}

const Slider = React.forwardRef<HTMLDivElement, SliderProps>(
  ({ 
    className, 
    min = 0, 
    max = 100, 
    step = 1, 
    value: controlledValue,
    defaultValue,
    onValueChange,
    formatLabel = (v) => v.toString(),
    showLabels = true,
    disabled = false,
    singleValue = false,
    ...props 
  }, ref) => {
    // Determine if single value mode
    const isSingle = singleValue || typeof controlledValue === 'number' || typeof defaultValue === 'number';
    
    // Default values based on mode
    const getDefaultValue = () => {
      if (defaultValue !== undefined) return defaultValue;
      return isSingle ? min : [min, max];
    };
    
    const initialValue = getDefaultValue();
    
    // Use controlled values directly if provided, otherwise use internal state
    const isControlled = controlledValue !== undefined;
    const [internalMinVal, setInternalMinVal] = React.useState(
      isSingle ? min : (Array.isArray(initialValue) ? initialValue[0] : min)
    );
    const [internalMaxVal, setInternalMaxVal] = React.useState(
      isSingle ? (typeof initialValue === 'number' ? initialValue : max) : 
      (Array.isArray(initialValue) ? initialValue[1] : max)
    );
    
    // Use controlled values if provided, otherwise use internal state
    const minVal = isSingle ? min : 
      (isControlled ? (Array.isArray(controlledValue) ? controlledValue[0] : min) : internalMinVal);
    const maxVal = isSingle ? 
      (isControlled ? (typeof controlledValue === 'number' ? controlledValue : max) : internalMaxVal) :
      (isControlled ? (Array.isArray(controlledValue) ? controlledValue[1] : max) : internalMaxVal);
    
    const minValRef = React.useRef<HTMLInputElement>(null);
    const maxValRef = React.useRef<HTMLInputElement>(null);
    const range = React.useRef<HTMLDivElement>(null);
    
    // Convert value to percentage
    const getPercent = React.useCallback(
      (value: number) => Math.round(((value - min) / (max - min)) * 100),
      [min, max]
    );
    
    // Set width of the range
    React.useEffect(() => {
      if (isSingle) {
        // For single value, show range from min to current value
        const percent = getPercent(maxVal);
        if (range.current) {
          range.current.style.left = '0%';
          range.current.style.width = `${percent}%`;
        }
      } else {
        // For dual value, show range between min and max
        if (maxValRef.current) {
          const minPercent = getPercent(minVal);
          const maxPercent = getPercent(+maxValRef.current.value);
          
          if (range.current) {
            range.current.style.left = `${minPercent}%`;
            range.current.style.width = `${maxPercent - minPercent}%`;
          }
        }
      }
    }, [minVal, maxVal, getPercent, isSingle]);
    
    return (
      <div 
        ref={ref} 
        className={cn("relative w-full", disabled && "opacity-50", className)}
        {...props}
      >
        {showLabels && (
          <div className="flex justify-between mb-4">
            {isSingle ? (
              <span className="text-sm text-muted-foreground font-medium">
                {formatLabel(maxVal)}
              </span>
            ) : (
              <>
                <span className="text-sm text-muted-foreground">{formatLabel(minVal)}</span>
                <span className="text-sm text-muted-foreground">{formatLabel(maxVal)}</span>
              </>
            )}
          </div>
        )}
        
        <div className="relative">
          {/* Minimum value input - only show for dual mode */}
          {!isSingle && (
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
              "[&::-webkit-slider-thumb]:bg-gradient-to-br",
              "[&::-webkit-slider-thumb]:from-primary",
              "[&::-webkit-slider-thumb]:to-accent",
              "[&::-webkit-slider-thumb]:border-2",
              "[&::-webkit-slider-thumb]:border-background",
              "[&::-webkit-slider-thumb]:cursor-pointer",
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
              "[&::-moz-range-thumb]:bg-gradient-to-br",
              "[&::-moz-range-thumb]:from-primary",
              "[&::-moz-range-thumb]:to-accent",
              "[&::-moz-range-thumb]:border-2",
              "[&::-moz-range-thumb]:border-background",
              "[&::-moz-range-thumb]:cursor-pointer",
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
          )}
          
          {/* Maximum/Single value input */}
          <input
            type="range"
            min={min}
            max={max}
            step={step}
            value={maxVal}
            ref={maxValRef}
            onChange={(event) => {
              const value = +event.target.value;
              if (isSingle) {
                // For single mode, just update the value
                if (isControlled) {
                  onValueChange?.(value);
                } else {
                  setInternalMaxVal(value);
                  onValueChange?.(value);
                }
              } else {
                // For dual mode, ensure max is greater than min
                const clampedValue = Math.max(value, minVal + 1);
                if (isControlled) {
                  onValueChange?.([minVal, clampedValue]);
                } else {
                  setInternalMaxVal(clampedValue);
                  onValueChange?.([minVal, clampedValue]);
                }
              }
            }}
            className={cn(
              "absolute pointer-events-none w-full h-0 outline-none",
              "[&::-webkit-slider-thumb]:pointer-events-auto",
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:h-5",
              "[&::-webkit-slider-thumb]:w-5",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-gradient-to-br",
              "[&::-webkit-slider-thumb]:from-primary",
              "[&::-webkit-slider-thumb]:to-accent",
              "[&::-webkit-slider-thumb]:border-2",
              "[&::-webkit-slider-thumb]:border-background",
              "[&::-webkit-slider-thumb]:cursor-pointer",
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
              "[&::-moz-range-thumb]:bg-gradient-to-br",
              "[&::-moz-range-thumb]:from-primary",
              "[&::-moz-range-thumb]:to-accent",
              "[&::-moz-range-thumb]:border-2",
              "[&::-moz-range-thumb]:border-background",
              "[&::-moz-range-thumb]:cursor-pointer",
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
            <div className="absolute w-full h-2 rounded-full bg-muted/50 border border-border/20" />
            
            {/* Track progress (colored range) */}
            <div
              ref={range}
              className="absolute h-2 rounded-full bg-gradient-to-r from-primary via-accent to-primary transition-all"
            />
          </div>
        </div>
      </div>
    );
  }
);

Slider.displayName = "Slider";

export { Slider };