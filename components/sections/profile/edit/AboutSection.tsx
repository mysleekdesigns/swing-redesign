"use client";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { PillToggle } from "@/components/ui/pill-toggle";
import { User } from "lucide-react";

interface AboutSectionProps {
  about: {
    memberType: string;
    heightFeet: number;
    heightInches: number;
    weight: number;
    age: number;
    smoke: boolean;
    drink: boolean;
    orientation: string;
  };
  onChange: (about: { 
    memberType?: string;
    heightFeet?: number;
    heightInches?: number;
    weight?: number;
    age?: number;
    smoke?: boolean;
    drink?: boolean;
    orientation?: string;
  }) => void;
}

export function AboutSection({ about, onChange }: AboutSectionProps) {
  // Generate feet options (3-8)
  const feetOptions = Array.from({ length: 6 }, (_, i) => i + 3);
  
  // Generate inches options (0-11)
  const inchesOptions = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <User className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Tell Us a Little About You</h3>
          <p className="hidden sm:block text-sm text-muted-foreground mt-1">{about.memberType || "Male Member"}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 lg:gap-6">
        {/* Height Section */}
        <div className="col-span-2 md:col-span-1 space-y-2">
          <Label className="text-sm font-medium text-foreground">Height:</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Select
                value={about.heightFeet.toString()}
                onValueChange={(value) => onChange({ heightFeet: parseInt(value) })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {feetOptions.map(ft => (
                    <SelectItem key={ft} value={ft.toString()}>
                      {ft}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground mt-1 block text-center">ft</span>
            </div>
            <div className="flex-1">
              <Select
                value={about.heightInches.toString()}
                onValueChange={(value) => onChange({ heightInches: parseInt(value) })}
              >
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {inchesOptions.map(inch => (
                    <SelectItem key={inch} value={inch.toString()}>
                      {inch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className="text-xs text-muted-foreground mt-1 block text-center">in</span>
            </div>
          </div>
        </div>

        {/* Weight Section */}
        <div className="col-span-2 md:col-span-1 space-y-2">
          <Label className="text-sm font-medium text-foreground">Weight:</Label>
          <div>
            <Input
              type="number"
              value={about.weight}
              onChange={(e) => onChange({ weight: parseInt(e.target.value) || 0 })}
              className="w-full"
              min={50}
              max={500}
            />
            <span className="text-xs text-muted-foreground mt-1 block text-center">lbs</span>
          </div>
        </div>

        {/* Age Section */}
        <div className="col-span-2 md:col-span-1 space-y-2">
          <Label className="text-sm font-medium text-foreground">
            Age: <span className="text-primary font-semibold">{about.age} Yrs</span>
          </Label>
          <Slider
            min={18}
            max={100}
            step={1}
            value={about.age}
            onValueChange={(value) => onChange({ age: value as number })}
            singleValue={true}
            showLabels={false}
            className="w-full pt-2"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>18</span>
            <span>100</span>
          </div>
        </div>

        {/* Smoke Section */}
        <div className="col-span-1 space-y-2">
          <Label className="text-sm font-medium text-foreground">Smoke:</Label>
          <PillToggle
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" }
            ]}
            value={about.smoke}
            onChange={(value) => onChange({ smoke: value as boolean })}
          />
        </div>

        {/* Drink Section */}
        <div className="col-span-1 space-y-2">
          <Label className="text-sm font-medium text-foreground">Drink:</Label>
          <PillToggle
            options={[
              { value: true, label: "Yes" },
              { value: false, label: "No" }
            ]}
            value={about.drink}
            onChange={(value) => onChange({ drink: value as boolean })}
          />
        </div>

        {/* Orientation Section */}
        <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-2">
          <Label className="text-sm font-medium text-foreground">Orientation:</Label>
          <PillToggle
            options={[
              { value: "straight", label: "Straight" },
              { value: "bi-curious", label: "Bi Curious" },
              { value: "bisexual", label: "Bi" }
            ]}
            value={about.orientation}
            onChange={(value) => onChange({ orientation: value as string })}
          />
        </div>
      </div>
      
      <div className="p-3 rounded-lg bg-muted/50 border border-border">
        <p className="text-xs text-muted-foreground">
          This information helps us match you with compatible members and will be displayed on your profile
        </p>
      </div>
    </div>
  );
}