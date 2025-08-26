"use client";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Settings2 } from "lucide-react";

interface PreferencesSectionProps {
  preferences: {
    watch: "definitely" | "maybe" | "no";
    soft: "definitely" | "maybe" | "no";
    full: "definitely" | "maybe" | "no";
  };
  onChange: (preferences: {
    watch?: "definitely" | "maybe" | "no";
    soft?: "definitely" | "maybe" | "no";
    full?: "definitely" | "maybe" | "no";
  }) => void;
}

export function PreferencesSection({ preferences, onChange }: PreferencesSectionProps) {
  const preferenceOptions = [
    { value: "definitely", label: "Definitely" },
    { value: "maybe", label: "Maybe" },
    { value: "no", label: "No" }
  ];

  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-4 h-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Settings2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Preferences</h3>
          <p className="hidden sm:block text-sm text-muted-foreground">What sort of Pleasures are You Seeking?</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Watch */}
        <div className="space-y-2">
          <Label htmlFor="watch" className="text-sm font-medium text-primary">
            Watch
          </Label>
          <Select
            value={preferences.watch}
            onValueChange={(value) => onChange({ watch: value as "definitely" | "maybe" | "no" })}
          >
            <SelectTrigger id="watch" className="w-full">
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              {preferenceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Are you interested in tame pleasures such as meeting others at a nude beach, or same room sex, but with <span className="font-medium">your own partner?</span> Things such as these?
          </p>
        </div>

        {/* Soft */}
        <div className="space-y-2">
          <Label htmlFor="soft" className="text-sm font-medium text-warning">
            Soft
          </Label>
          <Select
            value={preferences.soft}
            onValueChange={(value) => onChange({ soft: value as "definitely" | "maybe" | "no" })}
          >
            <SelectTrigger id="soft" className="w-full">
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              {preferenceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Are you interested in Moderate pleasures such as touching and <span className="font-medium">oral play with others</span>, and anything else short of intercourse with someone other than your partner?
          </p>
        </div>

        {/* Full */}
        <div className="space-y-2">
          <Label htmlFor="full" className="text-sm font-medium text-destructive">
            Full
          </Label>
          <Select
            value={preferences.full}
            onValueChange={(value) => onChange({ full: value as "definitely" | "maybe" | "no" })}
          >
            <SelectTrigger id="full" className="w-full">
              <SelectValue placeholder="Select preference" />
            </SelectTrigger>
            <SelectContent>
              {preferenceOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-muted-foreground">
            Are you interested in Wild pleasures such as having <span className="font-medium">sex</span> with someone other than your partner?
          </p>
        </div>
      </div>
    </div>
  );
}