"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { LucideIcon } from "lucide-react";

interface TextAreaCardProps {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  maxLength?: number;
  minHeight?: string;
  helperText?: string;
  showPreview?: boolean;
  required?: boolean;
  rows?: number;
  className?: string;
}

export function TextAreaCard({
  icon: Icon,
  title,
  subtitle,
  placeholder = "Start typing...",
  value,
  onChange,
  maxLength = 4000,
  minHeight = "min-h-[120px]",
  helperText,
  showPreview = false,
  required = false,
  rows = 5,
  className,
}: TextAreaCardProps) {
  const [length, setLength] = useState(value.length);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    setLength(value.length);
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
      setLength(newValue.length);
    }
  };

  const getCharacterCountColor = () => {
    const percentage = (length / maxLength) * 100;
    if (percentage > 90) return "text-destructive";
    if (percentage > 75) return "text-warning";
    return "text-muted-foreground";
  };

  return (
    <div 
      className={cn(
        "rounded-2xl bg-background border border-border p-6 space-y-4",
        "transition-all duration-200 hover:shadow-md hover:border-border/80",
        isFocused && "shadow-md border-primary/50",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              {title}
              {required && <span className="text-destructive ml-1">*</span>}
            </h3>
            {subtitle && (
              <p className="hidden sm:block text-sm text-muted-foreground mt-1">{subtitle}</p>
            )}
          </div>
        </div>
      </div>

      {/* Textarea */}
      <div className="space-y-2">
        {helperText && (
          <p className="text-xs text-muted-foreground">{helperText}</p>
        )}
        
        <div className="relative">
          <textarea
            value={value}
            onChange={handleChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={rows}
            className={cn(
              "w-full px-4 py-3 rounded-xl",
              "bg-muted/50 border border-border",
              "text-foreground placeholder:text-muted-foreground",
              "resize-vertical",
              "transition-all duration-200",
              "focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary",
              "hover:border-border/80",
              minHeight
            )}
          />
        </div>

        {/* Character Counter */}
        <div className="flex justify-between items-center px-1">
          <p className="text-xs text-muted-foreground">
            {length === 0 ? "Start typing to add content" : `${length} characters`}
          </p>
          <span className={cn("text-xs font-medium", getCharacterCountColor())}>
            {length} / {maxLength}
          </span>
        </div>
      </div>

      {/* Preview (Optional) */}
      {showPreview && value && (
        <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
          <Label className="text-xs font-medium text-muted-foreground mb-2 block">
            Preview
          </Label>
          <p className="text-sm text-foreground whitespace-pre-wrap break-words">
            {value}
          </p>
        </div>
      )}

      {/* Mobile-optimized info */}
      {required && length === 0 && (
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/30 md:hidden">
          <p className="text-xs text-warning">This field is required</p>
        </div>
      )}
    </div>
  );
}