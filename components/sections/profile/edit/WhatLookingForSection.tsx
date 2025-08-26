"use client";

import { TextAreaCard } from "@/components/ui/textarea-card";
import { Search } from "lucide-react";

interface WhatLookingForSectionProps {
  lookingFor: string;
  onChange: (lookingFor: string) => void;
}

export function WhatLookingForSection({ lookingFor, onChange }: WhatLookingForSectionProps) {
  return (
    <TextAreaCard
      icon={Search}
      title="What are you looking for?"
      subtitle="Describe your ideal match, connection, or experience"
      placeholder="Be specific about what kind of people, relationships, or experiences you're seeking. What would make a perfect match for you?"
      value={lookingFor}
      onChange={onChange}
      maxLength={4000}
      minHeight="min-h-[160px]"
      helperText="By choosing 'No Interest', the profile is no longer visible"
      rows={7}
      required
    />
  );
}