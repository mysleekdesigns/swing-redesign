"use client";

import { TextAreaCard } from "@/components/ui/textarea-card";
import { Sparkles } from "lucide-react";

interface InterestsSectionProps {
  interests: string;
  onChange: (interests: string) => void;
}

export function InterestsSection({ interests, onChange }: InterestsSectionProps) {
  return (
    <TextAreaCard
      icon={Sparkles}
      title="Tell Us More About You"
      subtitle="Share your interests, hobbies, and what excites you"
      placeholder="What are you interested in? Hobbies, activities, kinks, fetishes - anything that defines your interests and personality..."
      value={interests}
      onChange={onChange}
      maxLength={4000}
      minHeight="min-h-[160px]"
      helperText="Are you interested in three pleasures such as founding and play with others, and anything else about intercourse with someone other than your partner?"
      rows={7}
    />
  );
}