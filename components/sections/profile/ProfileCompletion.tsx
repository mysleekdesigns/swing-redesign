import { CheckCircle } from "lucide-react";

interface ProfileCompletionProps {
  completeness: number;
  items: {
    label: string;
    completed: boolean;
  }[];
}

export function ProfileCompletion({ completeness, items }: ProfileCompletionProps) {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <h3 className="text-lg font-bold text-foreground mb-4">Profile Completion</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-base text-muted-foreground">Overall Progress</span>
          <span className="text-base font-bold text-primary">{completeness}%</span>
        </div>
        <div className="w-full bg-muted/50 rounded-full h-2">
          <div 
            className="bg-primary h-2 rounded-full transition-all duration-500"
            style={{ width: `${completeness}%` }}
          />
        </div>
        <div className="space-y-2 text-base">
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between">
              <span className="text-muted-foreground">{item.label}</span>
              {item.completed && <CheckCircle className="w-4 h-4 text-primary" />}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}