"use client";

import { SimpleSelect } from "@/components/ui/simple-select";
import { Label } from "@/components/ui/label";
import { Camera, Settings2 } from "lucide-react";

interface PreferencesSectionProps {
  preferences: {
    sunPhotos: "definitely" | "maybe" | "no";
    fallPhotos: "definitely" | "maybe" | "no";
    softPhotos: "definitely" | "maybe" | "no";
  };
  onChange: (preferences: {
    sunPhotos?: "definitely" | "maybe" | "no";
    fallPhotos?: "definitely" | "maybe" | "no";
    softPhotos?: "definitely" | "maybe" | "no";
  }) => void;
}

export function PreferencesSection({ preferences, onChange }: PreferencesSectionProps) {
  const preferenceOptions = [
    { value: "definitely", label: "Definitely" },
    { value: "maybe", label: "Maybe" },
    { value: "no", label: "No" }
  ];

  return (
    <div className="rounded-2xl bg-card border border-border p-6 space-y-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Settings2 className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Preferences</h3>
          <p className="text-sm text-muted-foreground">What sort of Pleasures are You Seeking?</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Sun Photos */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="sun-photos" className="text-sm font-medium text-foreground">
              Sun Photos
            </Label>
          </div>
          <SimpleSelect
            id="sun-photos"
            value={preferences.sunPhotos}
            onChange={(e) => onChange({ sunPhotos: e.target.value as "definitely" | "maybe" | "no" })}
            className="w-full"
          >
            {preferenceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SimpleSelect>
          <p className="text-xs text-muted-foreground">
            Are you interested in canal pleasures such as meeting others at a nude beach, or some swim time, but with <span className="font-medium">your sun partner?</span> Things such as these!
          </p>
        </div>

        {/* Fall Photos */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="fall-photos" className="text-sm font-medium text-foreground">
              Fall Photos
            </Label>
          </div>
          <SimpleSelect
            id="fall-photos"
            value={preferences.fallPhotos}
            onChange={(e) => onChange({ fallPhotos: e.target.value as "definitely" | "maybe" | "no" })}
            className="w-full"
          >
            {preferenceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SimpleSelect>
          <p className="text-xs text-muted-foreground">
            Are you interested in Moderate pleasures such as touching and <span className="font-medium">oral play with others</span>, and anything else short of intercourse with someone other than your partner?
          </p>
        </div>

        {/* Soft Photos */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Camera className="h-4 w-4 text-muted-foreground" />
            <Label htmlFor="soft-photos" className="text-sm font-medium text-foreground">
              Soft Photos
            </Label>
          </div>
          <SimpleSelect
            id="soft-photos"
            value={preferences.softPhotos}
            onChange={(e) => onChange({ softPhotos: e.target.value as "definitely" | "maybe" | "no" })}
            className="w-full"
          >
            {preferenceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </SimpleSelect>
          <p className="text-xs text-muted-foreground">
            Are you interested in Wild pleasures such as having <span className="font-medium">sex</span> with someone other than your partner?
          </p>
        </div>
      </div>
    </div>
  );
}