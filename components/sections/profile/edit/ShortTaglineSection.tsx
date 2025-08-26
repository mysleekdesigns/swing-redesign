"use client";

import { TextAreaCard } from "@/components/ui/textarea-card";
import { MessageCircle } from "lucide-react";

interface ShortTaglineSectionProps {
  tagline: string;
  onChange: (tagline: string) => void;
}

export function ShortTaglineSection({ tagline, onChange }: ShortTaglineSectionProps) {
  return (
    <TextAreaCard
      icon={MessageCircle}
      title="Short Tag Line"
      subtitle="A teaser that shows in search results and who's online"
      placeholder="Write a short, catchy line that grabs attention (5-8 words minimum)..."
      value={tagline}
      onChange={onChange}
      maxLength={200}
      minHeight="min-h-[80px]"
      helperText="This appears when people search or view who's online. Make it catchy and memorable!"
      rows={3}
      showPreview={true}
    />
  );
}