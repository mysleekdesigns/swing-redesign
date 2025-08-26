"use client";

import { TextAreaCard } from "@/components/ui/textarea-card";
import { Info } from "lucide-react";

interface AdditionalInfoSectionProps {
  additionalInfo: string;
  onChange: (value: string) => void;
}

export function AdditionalInfoSection({ additionalInfo, onChange }: AdditionalInfoSectionProps) {
  return (
    <TextAreaCard
      icon={Info}
      title="Additional Information"
      subtitle="Anything else you'd like to share"
      placeholder="Share additional details about yourself, your lifestyle, what makes you unique..."
      value={additionalInfo}
      onChange={onChange}
      maxLength={4000}
      minHeight="min-h-[140px]"
      helperText="What else would you like us to know about you?"
      rows={6}
    />
  );
}