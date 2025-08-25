import Image from "next/image";
import { Calendar, MapPin, Users, DollarSign } from "lucide-react";
import { Convention } from "@/lib/mock-data";

interface ConventionCardProps extends Convention {
  variant?: 'default' | 'compact';
}

const categoryColors = {
  lifestyle: 'bg-primary/20 text-primary border-primary/30',
  educational: 'bg-accent/20 text-accent-foreground border-accent/30',
  social: 'bg-chart-1/20 text-chart-1 border-chart-1/30',
  wellness: 'bg-secondary/20 text-secondary-foreground border-secondary/30',
};

export function ConventionCard({
  name,
  description,
  date,
  location,
  imageUrl,
  attendeeCount,
  category,
  price,
  variant = 'default',
}: ConventionCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (variant === 'compact') {
    return (
      <div className="group relative overflow-hidden rounded-xl bg-card hover-lift cursor-pointer border border-border/50">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
          
          {/* Category badge */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold border ${categoryColors[category]}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          
          {/* Attendee count */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full glass-dark border border-border/10">
            <Users className="w-3 h-3 text-primary-foreground" />
            <span className="text-sm font-medium text-primary-foreground">{attendeeCount}</span>
          </div>
          
          {/* Content overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-lg font-bold text-primary-foreground mb-2 line-clamp-2">{name}</h3>
            <div className="flex items-center gap-4 text-base text-primary-foreground/80">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(date)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card hover-lift cursor-pointer border border-border/50">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={name}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        
        {/* Category badge */}
        <div className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-base font-semibold border backdrop-blur-sm ${categoryColors[category]}`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
        
        {/* Price tag */}
        {price && (
          <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 rounded-full glass-dark border border-border/10">
            <DollarSign className="w-3.5 h-3.5 text-primary" />
            <span className="text-base font-semibold text-primary-foreground">{price.replace('$', '')}</span>
          </div>
        )}
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-primary-foreground leading-tight line-clamp-2">
              {name}
            </h3>
            
            <p className="text-base text-primary-foreground/80 line-clamp-2">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-3 text-base text-primary-foreground/90">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-primary" />
                <span className="font-medium">{formatDate(date)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="font-medium truncate">{location}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-primary-foreground/60" />
                <span className="text-base text-primary-foreground/80">
                  {attendeeCount} {attendeeCount === 1 ? 'person' : 'people'} attending
                </span>
              </div>
              
              <button className="px-4 py-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-base transition-colors">
                Event Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
