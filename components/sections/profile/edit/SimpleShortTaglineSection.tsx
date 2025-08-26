"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface SimpleShortTaglineSectionProps {
  tagline: string;
  onChange: (tagline: string) => void;
}

export function SimpleShortTaglineSection({ tagline, onChange }: SimpleShortTaglineSectionProps) {
  const [length, setLength] = useState(tagline.length);
  const maxLength = 100;

  useEffect(() => {
    setLength(tagline.length);
  }, [tagline]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(newValue);
      setLength(newValue.length);
    }
  };

  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-4 transition-all duration-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-start gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <MessageSquare className="h-5 w-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground">
            Short Tag Line: <span className="text-destructive">*</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">
            A small teaser text that shows up when people do a search or who&apos;s online. It should be at least 3-5 words.
          </p>
        </div>
      </div>

      {/* Input Field */}
      <div className="space-y-3">
        <Input
          type="text"
          value={tagline}
          onChange={handleChange}
          placeholder="Enter your short tag line..."
          className="w-full h-12 px-4 text-base bg-muted/50 border-border focus:border-primary"
        />
        
        {/* Character Counter */}
        <div className="px-1">
          <span className={cn(
            "text-sm",
            length > 90 ? "text-destructive" : 
            length > 75 ? "text-warning" : 
            "text-muted-foreground"
          )}>
            <span className="font-medium">{length}/100</span> characters used
          </span>
        </div>
      </div>
    </div>
  );
}