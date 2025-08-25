import { Edit3 } from "lucide-react";

interface LookingForSectionProps {
  preferences: {
    lookingFor: string[];
    ageRange: [number, number];
    distanceRadius: number;
  };
}

export function LookingForSection({ preferences }: LookingForSectionProps) {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">Looking For</h2>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Edit3 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-3">
        <div className="flex flex-wrap gap-2">
          {preferences.lookingFor.map((item, index) => (
            <span
              key={index}
              className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-base"
            >
              {item}
            </span>
          ))}
        </div>
        <div className="text-base text-muted-foreground">
          Ages {preferences.ageRange[0]}-{preferences.ageRange[1]} • 
          Within {preferences.distanceRadius} miles
        </div>
      </div>
    </div>
  );
}