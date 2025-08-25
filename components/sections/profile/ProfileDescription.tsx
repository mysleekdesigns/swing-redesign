import { Edit3, Clock } from "lucide-react";

interface ProfileDescriptionProps {
  description: {
    title: string;
    content: string;
    lastUpdated: string;
  };
}

export function ProfileDescription({ description }: ProfileDescriptionProps) {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground">{description.title}</h2>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Edit3 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-3">
        <p className="text-muted-foreground leading-relaxed">
          {description.content}
        </p>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>Last updated: {new Date(description.lastUpdated).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}