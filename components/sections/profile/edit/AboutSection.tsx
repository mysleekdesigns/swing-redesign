"use client";

import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { User, Eye } from "lucide-react";
import { useState } from "react";

interface AboutSectionProps {
  about: {
    description: string;
    lookingFor: string;
  };
  onChange: (about: { description?: string; lookingFor?: string }) => void;
}

export function AboutSection({ about, onChange }: AboutSectionProps) {
  const [descriptionLength, setDescriptionLength] = useState(about.description.length);
  const maxDescriptionLength = 2000;

  const handleDescriptionChange = (value: string) => {
    if (value.length <= maxDescriptionLength) {
      setDescriptionLength(value.length);
      onChange({ description: value });
    }
  };

  return (
    <div className="rounded-2xl bg-card border border-border p-6 space-y-6 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">About Yourself</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tell us about yourself */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="about-description" className="text-sm font-medium text-foreground">
              Tell Us a Little About Yourself
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Share what makes you unique
            </p>
          </div>
          
          <Textarea
            id="about-description"
            value={about.description}
            onChange={(e) => handleDescriptionChange(e.target.value)}
            placeholder="Tell us about your interests, what you enjoy, and what makes you special..."
            className="min-h-[150px] resize-y"
          />
          
          <div className="flex justify-between items-center">
            <p className="text-xs text-muted-foreground">
              This will be visible on your profile
            </p>
            <span className="text-xs text-muted-foreground">
              {descriptionLength} / {maxDescriptionLength}
            </span>
          </div>
        </div>

        {/* Who are you looking for */}
        <div className="space-y-3">
          <div>
            <Label htmlFor="looking-for" className="text-sm font-medium text-foreground">
              Who are you looking for?
            </Label>
            <p className="text-xs text-muted-foreground mt-1">
              Describe your ideal match
            </p>
          </div>
          
          <Textarea
            id="looking-for"
            value={about.lookingFor}
            onChange={(e) => onChange({ lookingFor: e.target.value })}
            placeholder="Describe the type of person or couple you're hoping to meet..."
            className="min-h-[150px] resize-y"
          />
          
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border">
            <Eye className="h-4 w-4 text-muted-foreground mt-0.5" />
            <p className="text-xs text-muted-foreground">
              By choosing &quot;No interest&quot;, the profile is still viewable. However, choosing &quot;Block Them&quot;, 
              the profile is no longer visible
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}