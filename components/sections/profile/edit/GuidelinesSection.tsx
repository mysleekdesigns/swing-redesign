"use client";

import { AlertTriangle, Info, Shield, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export function GuidelinesSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  const guidelines = [
    {
      icon: Shield,
      title: "Profile Completion",
      content: "This is the most important part of your profile. Please may find you if you search based on age and area but they'll decide to write you based on what you say here. We require something useful in each of the first 5 items. Think of this as your resume: say something to get you noticed, to get people interested in you; something funny, cute, off beat or totally kinky. Anything to spark interest in other people."
    },
    {
      icon: AlertTriangle,
      title: "Important Guidelines",
      content: "References to outside forms of communication/social media, such as kik or kik username, telephone number, gmail, yahoo, facebook and all other means of outside contact, are NOT ALLOWED."
    },
    {
      icon: Info,
      title: "Member Removal Policy",
      content: "Profiles who violate this policy will be placed offline (so that they cannot be found by other members), until the member removes the references and is reviewed is reviewed by staff which may take 24 to 48 hours."
    }
  ];

  const shortGuidelines = [guidelines[0]];
  const displayGuidelines = isExpanded ? guidelines : shortGuidelines;

  return (
    <div className="rounded-2xl bg-card border border-warning/50 p-6 space-y-4 hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-warning/10">
            <AlertTriangle className="h-5 w-5 text-warning" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">Please, do yourself a favor:</h3>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsExpanded(!isExpanded)}
          className="sm:hidden"
        >
          {isExpanded ? (
            <ChevronUp className="h-4 w-4" />
          ) : (
            <ChevronDown className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      <div className="space-y-4">
        {displayGuidelines.map((guideline, index) => (
          <div key={index} className="space-y-2">
            <div className="flex items-start gap-3">
              <div className="p-1.5 rounded bg-muted/50 mt-0.5">
                <guideline.icon className="h-4 w-4 text-muted-foreground" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="text-sm font-medium text-foreground">{guideline.title}</h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {guideline.content}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Mobile toggle hint */}
        {!isExpanded && (
          <div className="sm:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="text-xs text-primary hover:text-primary/90 p-0 h-auto font-normal"
            >
              Show more guidelines...
            </Button>
          </div>
        )}
        
        {/* Desktop additional guidelines (always visible) */}
        <div className="hidden sm:block space-y-4">
          {guidelines.slice(1).map((guideline, index) => (
            <div key={index + 1} className="space-y-2">
              <div className="flex items-start gap-3">
                <div className="p-1.5 rounded bg-muted/50 mt-0.5">
                  <guideline.icon className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="flex-1 space-y-1">
                  <h4 className="text-sm font-medium text-foreground">{guideline.title}</h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {guideline.content}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-3 rounded-lg bg-warning/10 border border-warning/30">
          <div className="flex gap-2 items-start">
            <Info className="h-4 w-4 text-warning mt-0.5 flex-shrink-0" />
            <p className="text-xs text-warning font-medium">
              Tell Us More About You
            </p>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {isExpanded || !shortGuidelines.length ? (
              "All fields below have a 4000 character limit. A small teaser text that shows up when people do a search or who&apos;s online. It should be at least 5-8 words."
            ) : (
              "Complete your profile to increase your chances of finding matches."
            )}
          </p>
        </div>
      </div>
    </div>
  );
}