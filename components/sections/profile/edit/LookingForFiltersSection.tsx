"use client";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export type PreferenceValue = 
  | "please_choose"
  | "definitely" 
  | "yes"
  | "a_little"
  | "maybe"
  | "no_interest"
  | "block_them";

interface LookingForPreferences {
  couples: PreferenceValue;
  singleLadies: PreferenceValue;
  singleMen: PreferenceValue;
}

interface LookingForFiltersSectionProps {
  preferences: LookingForPreferences;
  onChange: (preferences: Partial<LookingForPreferences>) => void;
}

export function LookingForFiltersSection({ 
  preferences, 
  onChange 
}: LookingForFiltersSectionProps) {
  
  const preferenceOptions = [
    { value: "please_choose", label: "Please Choose" },
    { value: "definitely", label: "Definitely" },
    { value: "yes", label: "Yes" },
    { value: "a_little", label: "A Little" },
    { value: "maybe", label: "Maybe" },
    { value: "no_interest", label: "No Interest (Profile still viewable)" },
    { value: "block_them", label: "Block Them (Profile not viewable)" }
  ];

  const questions = [
    {
      key: "couples" as keyof LookingForPreferences,
      label: "Are you interested in meeting Couples?",
      dropdownLabel: "Couples Preference"
    },
    {
      key: "singleLadies" as keyof LookingForPreferences,
      label: "Are you interested in meeting Single Ladies?",
      dropdownLabel: "Single Ladies Preference"
    },
    {
      key: "singleMen" as keyof LookingForPreferences,
      label: "Are you interested in meeting Single Men?",
      dropdownLabel: "Single Men Preference"
    }
  ];

  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-6 h-full">
      {/* Header Section */}
      <div className="space-y-3">
        <h3 className="text-xl font-semibold text-foreground">
          Who are you looking for?
        </h3>
        <p className="hidden sm:block text-sm text-muted-foreground leading-relaxed">
          By choosing &quot;No Interest&quot;, the profile is still viewable. However, choosing &quot;Block Them&quot;, the profile is no longer visible.
        </p>
      </div>
      
      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {questions.map((question) => (
          <div key={question.key} className="space-y-3">
            <Label 
              htmlFor={`preference-${question.key}`} 
              className="text-sm font-medium text-foreground block leading-relaxed"
            >
              {question.label}
            </Label>
            
            <Select
              value={preferences[question.key]}
              onValueChange={(value) => onChange({ [question.key]: value as PreferenceValue })}
            >
              <SelectTrigger 
                id={`preference-${question.key}`} 
                className="w-full"
                aria-label={question.dropdownLabel}
              >
                <SelectValue placeholder="Please Choose" />
              </SelectTrigger>
              <SelectContent>
                {preferenceOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>

      {/* Additional Info - Mobile/Tablet Only */}
      <div className="xl:hidden p-4 rounded-lg bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground">
          These preferences help match you with compatible members based on your interests.
        </p>
      </div>
    </div>
  );
}