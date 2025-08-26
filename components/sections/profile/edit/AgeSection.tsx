"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Calendar, Heart } from "lucide-react";
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

  const handleYoungestChange = (value: string) => {
    const num = parseInt(value) || 18;
    if (num >= 18 && num <= agePreferences.oldest) {
      onChange({ youngest: num });
      setAgeRange([num, ageRange[1]] as [number, number]);
    }
  };

  const handleOldestChange = (value: string) => {
    const num = parseInt(value) || 99;
    if (num >= agePreferences.youngest && num <= 99) {
      onChange({ oldest: num });
      setAgeRange([ageRange[0], num] as [number, number]);
    }
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
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Heart className="h-4 w-4" />
          <p>Which Ages turn you on?</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="youngest" className="text-sm font-medium text-foreground">
              Youngest
            </Label>
            <Input
              id="youngest"
              type="number"
              min="18"
              max={agePreferences.oldest}
              value={agePreferences.youngest}
              onChange={(e) => handleYoungestChange(e.target.value)}
              className="w-full"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="oldest" className="text-sm font-medium text-foreground">
              Oldest
            </Label>
            <Input
              id="oldest"
              type="number"
              min={agePreferences.youngest}
              max="99"
              value={agePreferences.oldest}
              onChange={(e) => handleOldestChange(e.target.value)}
              className="w-full"
            />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="px-2">
            <Slider
              value={ageRange}
              onValueChange={handleSliderChange}
              min={18}
              max={99}
              step={1}
              className="w-full"
            />
          </div>
          
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>18</span>
            <span className="font-medium text-primary">
              {agePreferences.youngest} - {agePreferences.oldest} years
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