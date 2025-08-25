import { MessageCircle, Heart, Users } from "lucide-react";

export function QuickActions() {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border w-full">
      <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
      <div className="space-y-3">
        <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors">
          <MessageCircle className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">View Messages</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors">
          <Heart className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">My Matches</span>
        </button>
        <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors">
          <Users className="w-5 h-5 text-primary" />
          <span className="font-medium text-foreground">Browse Events</span>
        </button>
      </div>
    </div>
  );
}