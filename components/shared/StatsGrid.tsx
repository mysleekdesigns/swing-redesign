interface StatItem {
  value: string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
  className?: string;
}

export function StatsGrid({ stats, className = "" }: StatsGridProps) {
  return (
    <section className={`grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 ${className}`}>
      {stats.map((stat, index) => (
        <div 
          key={index}
          className="bg-card rounded-2xl p-4 sm:p-6 text-center border border-border"
        >
          <div className="text-2xl sm:text-3xl font-bold text-primary mb-1 sm:mb-2">
            {stat.value}
          </div>
          <div className="text-sm sm:text-base text-muted-foreground font-medium">
            {stat.label}
          </div>
        </div>
      ))}
    </section>
  );
}