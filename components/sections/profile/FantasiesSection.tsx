import { Sparkles, Edit3 } from "lucide-react";

interface Fantasy {
  id: string;
  title: string;
  description: string;
  category: string;
  private?: boolean;
}

interface FantasiesSectionProps {
  fantasies: Fantasy[];
}

export function FantasiesSection({ fantasies }: FantasiesSectionProps) {
  if (!fantasies || fantasies.length === 0) return null;

  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          Dreams & Fantasies
        </h2>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Edit3 className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
      <div className="space-y-4">
        {fantasies.map((fantasy) => (
          <div key={fantasy.id} className="p-4 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
            <div className="flex items-start justify-between mb-2">
              <h3 className="font-semibold text-foreground">{fantasy.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                  {fantasy.category}
                </span>
                {fantasy.private && (
                  <div className="w-2 h-2 rounded-full bg-warning" title="Private fantasy" />
                )}
              </div>
            </div>
            <p className="text-muted-foreground text-sm">{fantasy.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}