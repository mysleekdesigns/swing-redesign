"use client";

import { Slider } from "@/components/ui/slider";
import { Calendar } from "lucide-react";
import { useState } from "react";

interface AgeSectionProps {
  agePreferences: {
    youngest: number;
    oldest: number;
  };
  onChange: (agePreferences: { youngest?: number; oldest?: number }) => void;
}

export function AgeSection({ agePreferences, onChange }: AgeSectionProps) {
  const [ageRange, setAgeRange] = useState<[number, number]>([agePreferences.youngest, agePreferences.oldest]);

  const handleSliderChange = (values: number | [number, number]) => {
    // Ensure we have an array for age range
    if (!Array.isArray(values)) return;
    setAgeRange(values);
    onChange({ youngest: values[0], oldest: values[1] });
  };

  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-4 h-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Age Preferences</h3>
      </div>
      
      <div className="space-y-4">
        <div className="space-y-3">
          <div className="px-2">
            <Slider
              value={ageRange}
              onValueChange={handleSliderChange}
              min={18}
              max={99}
              step={1}
              showLabels={false}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>18</span>
            <span className="font-medium text-primary">
              {agePreferences.youngest} - {agePreferences.oldest}
            </span>
            <span>99</span>
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground">
            Select the age range of people you&apos;d like to meet
          </p>
        </div>
      </div>
    </div>
  );
}