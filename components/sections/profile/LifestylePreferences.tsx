import { Edit3 } from "lucide-react";

interface LifestylePreferencesProps {
  preferences: {
    watch: number;
    soft: number;
    full: number;
    couples: number;
    females: number;
    males: number;
    smoke: string;
    drink: string;
    age: string;
  };
}

export function LifestylePreferences({ preferences }: LifestylePreferencesProps) {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-foreground">Lifestyle Preferences</h2>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Edit3 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>

      {/* Progress Bars Section */}
      <div className="space-y-4 mb-6">
        {/* Row 1: Watch, Soft, Full */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PreferenceBar label="Watch" value={preferences.watch} color="green" />
          <PreferenceBar label="Soft" value={preferences.soft} color="blue" />
          <PreferenceBar label="Full" value={preferences.full} color="purple" />
        </div>

        {/* Row 2: Couples, Females, Males */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <PreferenceBar label="Couples" value={preferences.couples} color="pink" />
          <PreferenceBar label="Females" value={preferences.females} color="green" />
          <PreferenceBar label="Males" value={preferences.males} color="orange" hasBorder />
        </div>
      </div>

      {/* Preference Level Legend */}
      <div className="border-t border-border pt-4 mb-4">
        <h3 className="text-base font-medium text-foreground mb-3">Legend:</h3>
        <div className="flex flex-wrap gap-4 text-base">
          <LegendItem color="green" label="Definitely (100% interested)" />
          <LegendItem color="blue" label="Yes (80%)" />
          <LegendItem color="purple" label="A little (60%)" />
          <LegendItem color="pink" label="Maybe (20%)" />
          <LegendItem color="muted" label="No interest (0%)" hasBorder />
        </div>
      </div>

      {/* Additional Preferences */}
      <div className="border-t border-border pt-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <span className="text-base font-bold text-foreground">Smoke: </span>
            <span className="text-base text-foreground">{preferences.smoke}</span>
          </div>
          <div>
            <span className="text-base font-bold text-foreground">Drink: </span>
            <span className="text-base text-foreground">{preferences.drink}</span>
          </div>
          <div>
            <span className="text-base font-bold text-foreground">Age Range: </span>
            <span className="text-base text-foreground">{preferences.age}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PreferenceBar({ 
  label, 
  value, 
  color,
  hasBorder = false
}: { 
  label: string; 
  value: number; 
  color: string;
  hasBorder?: boolean;
}) {
  const getColorClasses = () => {
    switch (color) {
      case 'green': return 'bg-gradient-to-r from-chart-1 to-chart-1/80';
      case 'blue': return 'bg-gradient-to-r from-accent to-accent/80';
      case 'purple': return 'bg-gradient-to-r from-secondary to-secondary/80';
      case 'pink': return 'bg-gradient-to-r from-primary to-primary/80';
      case 'orange': return 'bg-gradient-to-r from-chart-4 to-chart-4/80';
      default: return 'bg-gradient-to-r from-muted to-muted-foreground';
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <span className="text-base font-medium text-foreground">{label}</span>
        <span className="text-base text-muted-foreground">{value}%</span>
      </div>
      <div className={`w-full bg-muted rounded-full h-2 ${hasBorder ? 'border border-muted-foreground/20' : ''}`}>
        <div 
          className={`${getColorClasses()} h-2 rounded-full transition-all duration-300`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

function LegendItem({ 
  color, 
  label,
  hasBorder = false
}: { 
  color: string; 
  label: string;
  hasBorder?: boolean;
}) {
  const getColorClass = () => {
    switch (color) {
      case 'green': return 'bg-chart-1';
      case 'blue': return 'bg-accent';
      case 'purple': return 'bg-secondary';
      case 'pink': return 'bg-primary';
      case 'muted': return 'bg-muted';
      default: return 'bg-muted-foreground';
    }
  };

  return (
    <div className="flex items-center gap-2">
      <div className={`w-4 h-4 ${getColorClass()} rounded ${hasBorder ? 'border border-muted-foreground/20' : ''}`}></div>
      <span className="text-muted-foreground">{label}</span>
    </div>
  );
}