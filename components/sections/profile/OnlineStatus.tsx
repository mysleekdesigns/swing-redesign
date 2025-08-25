interface OnlineStatusProps {
  lastSeen: string;
  formatActivityTime: (timestamp: string) => string;
}

export function OnlineStatus({ lastSeen, formatActivityTime }: OnlineStatusProps) {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <h3 className="text-lg font-bold text-foreground mb-4">Status</h3>
      <div className="flex items-center gap-3">
        <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
        <span className="text-base font-medium text-foreground">Online now</span>
      </div>
      <p className="text-sm text-muted-foreground mt-2">
        Last seen: {formatActivityTime(lastSeen)}
      </p>
    </div>
  );
}