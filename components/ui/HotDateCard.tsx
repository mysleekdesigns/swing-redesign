import Image from "next/image";
import { Calendar, Clock, MapPin, Users, DollarSign } from "lucide-react";
import { HotDate } from "@/lib/mock-data";

interface HotDateCardProps extends HotDate {
  variant?: 'default' | 'compact';
}

const categoryColors = {
  party: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  outdoor: 'bg-green-500/20 text-green-300 border-green-500/30',
  cultural: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  sports: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  dining: 'bg-primary/20 text-primary border-primary/30',
};

export function HotDateCard({
  title,
  description,
  date,
  time,
  location,
  imageUrl,
  attendeeCount,
  category,
  price,
  variant = 'default',
}: HotDateCardProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  if (variant === 'compact') {
    return (
      <div className="group relative overflow-hidden rounded-xl bg-card hover-lift cursor-pointer ring-2 ring-primary/20 shadow-lg shadow-primary/10">
        <div className="aspect-[16/9] relative overflow-hidden">
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
          
          {/* Category badge - hidden on small mobile screens */}
          <div className={`absolute top-3 left-3 px-3 py-1 rounded-full text-sm font-semibold border max-[468px]:hidden ${categoryColors[category]}`}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </div>
          
          {/* Attendee count */}
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full glass-dark border border-white/10">
            <Users className="w-3 h-3 text-white" />
            <span className="text-sm font-medium text-white">{attendeeCount}</span>
          </div>
          
          {/* Content overlay - reduced padding on small screens */}
          <div className="absolute bottom-0 left-0 right-0 p-4 max-[468px]:p-3">
            <h3 className="text-lg font-bold text-white mb-2 max-[468px]:mb-1 line-clamp-2">{title}</h3>
            <div className="flex items-center gap-4 text-base text-white/80">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{formatDate(date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{time}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative overflow-hidden rounded-xl sm:rounded-2xl bg-card hover-lift cursor-pointer ring-2 ring-primary/20 shadow-lg shadow-primary/10">
      <div className="aspect-[4/3] relative overflow-hidden">
        <Image
          src={imageUrl}
          alt={title}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
        
        {/* Category badge */}
        <div className={`absolute top-3 sm:top-4 left-3 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-sm sm:text-base font-semibold border backdrop-blur-sm ${categoryColors[category]}`}>
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
        
        {/* Price tag */}
        {price && (
          <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex items-center gap-1 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass-dark border border-white/10">
            <DollarSign className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-primary" />
            <span className="text-sm sm:text-base font-semibold text-white">{price.replace('$', '')}</span>
          </div>
        )}
        
        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-6 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="space-y-2 sm:space-y-3">
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white leading-tight line-clamp-2">
              {title}
            </h3>
            
            {/* Description - visible on larger screens */}
            <p className="text-sm sm:text-base text-white/80 line-clamp-2 hidden sm:block">
              {description}
            </p>
            
            <div className="flex flex-wrap gap-2 sm:gap-3 text-sm sm:text-base text-white/90">
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Calendar className="w-3 sm:w-4 h-3 sm:h-4 text-primary flex-shrink-0" />
                <span className="font-medium">{formatDate(date)}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <Clock className="w-3 sm:w-4 h-3 sm:h-4 text-primary flex-shrink-0" />
                <span className="font-medium">{time}</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-1.5">
                <MapPin className="w-3 sm:w-4 h-3 sm:h-4 text-primary flex-shrink-0" />
                <span className="font-medium truncate">{location}</span>
              </div>
            </div>
            
            <div className="flex items-center justify-between pt-1 sm:pt-2">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <Users className="w-3 sm:w-4 h-3 sm:h-4 text-white/60 flex-shrink-0" />
                <span className="text-sm sm:text-base text-white/80">
                  {attendeeCount} {attendeeCount === 1 ? 'person' : 'people'} going
                </span>
              </div>
              
              <button className="px-3 sm:px-4 py-2 sm:py-2.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg font-semibold text-sm sm:text-base transition-colors min-h-[44px] min-w-[80px] flex items-center justify-center">
                Join Event
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
