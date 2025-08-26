"use client";

import { TextAreaCard } from "@/components/ui/textarea-card";
import { FileText } from "lucide-react";

interface ProfileDescriptionSectionProps {
  description: string;
  onChange: (description: string) => void;
}

export function ProfileDescriptionSection({ description, onChange }: ProfileDescriptionSectionProps) {
  return (
    <TextAreaCard
      icon={FileText}
      title="Describe Yourself"
      subtitle="Give others a glimpse into who you are"
      placeholder="Share what makes you unique - your personality, interests, what you're passionate about, and what makes you a great match..."
      value={description}
      onChange={onChange}
      maxLength={4000}
      minHeight="min-h-[180px]"
      helperText="This is the most important part of your profile. Others may find you in search results, but they'll decide to connect based on what you write here."
      rows={8}
      required={true}
    />
  );
}