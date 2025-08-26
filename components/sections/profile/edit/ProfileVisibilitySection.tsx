"use client";

import { Eye, Lock, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProfileVisibilitySectionProps {
  visibility?: 'public' | 'members' | 'private';
  onVisibilityChange?: (visibility: 'public' | 'members' | 'private') => void;
}

export function ProfileVisibilitySection({ 
  visibility = 'members', 
  onVisibilityChange 
}: ProfileVisibilitySectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibilityOptions = [
    {
      value: 'public' as const,
      label: 'Block Them (Profile not viewable)',
      description: 'Your profile is completely hidden from this user',
      icon: Lock,
      iconColor: 'text-destructive'
    },
    {
      value: 'members' as const,
      label: 'Block Them (Profile still viewable)', 
      description: 'Block interaction but profile remains visible',
      icon: Shield,
      iconColor: 'text-warning'
    },
    {
      value: 'private' as const,
      label: 'No Interest (Profile still viewable)',
      description: 'Mark as not interested but profile remains visible',
      icon: Users,
      iconColor: 'text-muted-foreground'
    }
  ];

  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-4 transition-all duration-200 hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Eye className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Profile Visibility</h3>
            <p className="hidden sm:block text-sm text-muted-foreground mt-1">Control who can see and interact with your profile</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? "Show Less" : "Show Options"}
        </Button>
      </div>

      {/* Info Section */}
      <div className="p-4 rounded-xl bg-muted/30 border border-border/50 space-y-3">
        <div className="flex items-start gap-3">
          <Shield className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <p className="text-sm text-foreground font-medium">Are you interested in meeting Singles?</p>
            <p className="text-xs text-muted-foreground">
              Choosing your interests helps us show your profile to relevant members
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <Lock className="h-4 w-4 text-muted-foreground mt-1 flex-shrink-0" />
          <div className="space-y-2 flex-1">
            <p className="text-sm text-foreground font-medium">Are you interested in meeting Single Men?</p>
            <p className="text-xs text-muted-foreground">
              By choosing &apos;No Interest&apos;, the profile is no longer visible
            </p>
          </div>
        </div>
      </div>

      {/* Visibility Options (Expandable) */}
      {isExpanded && (
        <div className="space-y-3 pt-2">
          {visibilityOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => onVisibilityChange?.(option.value)}
              className={`w-full p-4 rounded-xl border transition-all duration-200 text-left ${
                visibility === option.value 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-border/80 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-1.5 rounded-lg bg-muted/50 mt-0.5`}>
                  <option.icon className={`h-4 w-4 ${option.iconColor}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{option.label}</p>
                  <p className="text-xs text-muted-foreground mt-1">{option.description}</p>
                </div>
                {visibility === option.value && (
                  <div className="h-5 w-5 rounded-full bg-primary flex items-center justify-center">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Additional Guidelines */}
      <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
        <div className="flex gap-2 items-start">
          <Shield className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
          <div className="space-y-1">
            <p className="text-xs text-warning font-medium">
              Important Privacy Notice
            </p>
            <p className="text-xs text-muted-foreground">
              References to outside forms of communication/social media, such as kik or kik username, 
              telephone number, gmail, yahoo, facebook and all other means of outside contact, are NOT ALLOWED.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}