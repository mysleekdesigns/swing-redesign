"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tag, Sparkle } from "lucide-react";
import { useState } from "react";

interface TagLineSectionProps {
  tagLine: string;
  onChange: (tagLine: string) => void;
}

export function TagLineSection({ tagLine, onChange }: TagLineSectionProps) {
  const [length, setLength] = useState(tagLine.length);
  const maxLength = 100;

  const handleChange = (value: string) => {
    if (value.length <= maxLength) {
      setLength(value.length);
      onChange(value);
    }
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-all duration-300 h-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Tag className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Tag Line</h3>
      </div>
      
      <div className="space-y-3">
        <div>
          <Label htmlFor="tagline" className="text-sm font-medium text-foreground">
            Short Tag Line
          </Label>
          <p className="text-xs text-muted-foreground mt-1">
            A catchy phrase that appears in search results
          </p>
        </div>
        
        <div className="relative">
          <Input
            id="tagline"
            type="text"
            value={tagLine}
            onChange={(e) => handleChange(e.target.value)}
            placeholder="Enter a short, catchy tag line..."
            className="pr-10"
          />
          <Sparkle className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        </div>
        
        <div className="flex justify-between items-center">
          <p className="text-xs text-muted-foreground">
            Make it memorable and fun!
          </p>
          <span className={`text-xs ${length > 80 ? 'text-warning' : 'text-muted-foreground'}`}>
            {length} / {maxLength}
          </span>
        </div>
        
        {tagLine && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">Preview:</p>
            <p className="text-sm text-foreground mt-1">{tagLine}</p>
          </div>
        )}
      </div>
    </div>
  );
}