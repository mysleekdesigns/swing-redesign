import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  title: string;
  subtitle?: string;
  icon?: LucideIcon;
  count?: number;
  variant?: 'default' | 'glass' | 'minimal';
  className?: string;
}

export function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  count,
  variant = 'default',
  className = '',
}: SectionHeaderProps) {
  const baseClasses = "flex items-center justify-between mb-6";
  
  const variantClasses = {
    default: "bg-card rounded-xl p-4 border border-border/50",
    glass: "section-glass rounded-2xl p-6",
    minimal: "border-b border-border/30 pb-4"
  };

  return (
    <div className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      <div className="flex items-center gap-3">
        {Icon && (
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Icon className="w-5 h-5 text-primary" />
          </div>
        )}
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold text-foreground tracking-tight">
              {title}
            </h2>
            {count !== undefined && (
              <span className="px-3 py-1 text-base font-semibold text-primary-foreground bg-primary rounded-full">
                {count}
              </span>
            )}
          </div>
          {subtitle && (
            <p className="text-base text-muted-foreground mt-1 font-medium">
              {subtitle}
            </p>
          )}
        </div>
      </div>
      
      {variant === 'glass' && (
        <div className="hidden md:block">
          <div className="w-20 h-px bg-gradient-to-r from-primary/0 via-primary/50 to-primary/0" />
        </div>
      )}
    </div>
  );
}