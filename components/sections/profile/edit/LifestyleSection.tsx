"use client";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wine, Cigarette, Sparkles } from "lucide-react";

interface LifestyleSectionProps {
  lifestyle: {
    drink: "do_not_care" | "yes" | "no";
    smoke: "do_not_care" | "yes" | "no";
  };
  onChange: (lifestyle: { drink?: "do_not_care" | "yes" | "no"; smoke?: "do_not_care" | "yes" | "no" }) => void;
}

export function LifestyleSection({ lifestyle, onChange }: LifestyleSectionProps) {
  const lifestyleOptions = [
    { value: "do_not_care", label: "I do not care" },
    { value: "yes", label: "Yes" },
    { value: "no", label: "No" }
  ];

  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-4">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Lifestyle Preferences</h3>
      </div>
      
      <div className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Drinking Preference */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wine className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="drink" className="text-sm font-medium text-foreground">
                Drinking
              </Label>
            </div>
            <Select
              value={lifestyle.drink}
              onValueChange={(value) => onChange({ drink: value as "do_not_care" | "yes" | "no" })}
            >
              <SelectTrigger id="drink" className="w-full">
                <SelectValue placeholder="I do not care" />
              </SelectTrigger>
              <SelectContent>
                {lifestyleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Filter matches based on drinking preferences
            </p>
          </div>

          {/* Smoking Preference */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cigarette className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="smoke" className="text-sm font-medium text-foreground">
                Smoking
              </Label>
            </div>
            <Select
              value={lifestyle.smoke}
              onValueChange={(value) => onChange({ smoke: value as "do_not_care" | "yes" | "no" })}
            >
              <SelectTrigger id="smoke" className="w-full">
                <SelectValue placeholder="I do not care" />
              </SelectTrigger>
              <SelectContent>
                {lifestyleOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Filter matches based on smoking preferences
            </p>
          </div>
        </div>
        
        <div className="p-3 rounded-lg bg-muted/50 border border-border">
          <p className="text-xs text-muted-foreground">
            These preferences help us match you with compatible people based on lifestyle choices
          </p>
        </div>
      </div>
    </div>
  );
}