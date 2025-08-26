"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin } from "lucide-react";

interface LocationSectionProps {
  location: {
    current: string;
  };
  onChange: (location: { current: string }) => void;
}

export function LocationSection({ location, onChange }: LocationSectionProps) {
  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-4 h-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <MapPin className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Location</h3>
          <p className="text-sm text-muted-foreground">Please enter your real city name or postal code</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="current-location" className="text-sm font-medium text-foreground">
            Current Location
          </Label>
          <Input
            id="current-location"
            type="text"
            value={location.current}
            onChange={(e) => onChange({ current: e.target.value })}
            placeholder="Enter city or postal code"
          />
        </div>
        
        <p className="text-xs text-muted-foreground">
          Your location helps us find matches near you
        </p>
      </div>
    </div>
  );
}