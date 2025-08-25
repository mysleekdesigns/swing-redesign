import Image from "next/image";

interface Activity {
  id: string;
  title: string;
  description: string;
  timestamp: string;
  type: string;
  imageUrl?: string;
}

interface RecentActivityProps {
  activities: Activity[];
  getActivityIcon: (type: string) => string;
  formatActivityTime: (timestamp: string) => string;
}

export function RecentActivity({ activities, getActivityIcon, formatActivityTime }: RecentActivityProps) {
  return (
    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
      <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors">
            <div className="text-2xl">{getActivityIcon(activity.type)}</div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground">{activity.title}</h3>
              <p className="text-muted-foreground text-sm">{activity.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {formatActivityTime(activity.timestamp)}
              </p>
            </div>
            {activity.imageUrl && (
              <div className="w-12 h-12 rounded-lg overflow-hidden">
                <Image
                  src={activity.imageUrl}
                  alt="Activity"
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}