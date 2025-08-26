"use client";

import { TextAreaCard } from "@/components/ui/textarea-card";
import { Heart } from "lucide-react";

interface FantasiesSectionProps {
  fantasies: string;
  onChange: (fantasies: string) => void;
}

export function FantasiesSection({ fantasies, onChange }: FantasiesSectionProps) {
  return (
    <TextAreaCard
      icon={Heart}
      title="Tell us about your fantasies and/or real experiences"
      subtitle="Share your desires, dreams, and memorable experiences"
      placeholder="Share your fantasies and real experiences. Be as open as you're comfortable with - this helps others understand what you're looking for..."
      value={fantasies}
      onChange={onChange}
      maxLength={4000}
      minHeight="min-h-[160px]"
      helperText="Profiles who violate this policy will be placed offline (so that they cannot be found by other members), until the member removes the references and is reviewed by staff which may take 24 to 48 hours."
      rows={7}
    />
  );
}