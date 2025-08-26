"use client";

import { SimpleSelect } from "@/components/ui/simple-select";
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
    <div className="rounded-2xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Sparkles className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">Lifestyle Preferences</h3>
      </div>
      
      <div className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Would you like to meet people that Smoke or Drink?
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Drinking Preference */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Wine className="h-4 w-4 text-muted-foreground" />
              <Label htmlFor="drink" className="text-sm font-medium text-foreground">
                Drinking
              </Label>
            </div>
            <SimpleSelect
              id="drink"
              value={lifestyle.drink}
              onChange={(e) => onChange({ drink: e.target.value as "do_not_care" | "yes" | "no" })}
              className="w-full"
            >
              {lifestyleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SimpleSelect>
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
            <SimpleSelect
              id="smoke"
              value={lifestyle.smoke}
              onChange={(e) => onChange({ smoke: e.target.value as "do_not_care" | "yes" | "no" })}
              className="w-full"
            >
              {lifestyleOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </SimpleSelect>
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