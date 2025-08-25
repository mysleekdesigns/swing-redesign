import Image from "next/image";
import { MapPin, Camera, Heart, MessageCircle } from "lucide-react";

interface UserCardProps {
  username: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline?: boolean;
  photosCount?: number;
  isLiked?: boolean;
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export function UserCard({
  username,
  age,
  location,
  imageUrl,
  isOnline = false,
  photosCount,
  isLiked = false,
  showActions = false,
  variant = 'default',
}: UserCardProps) {
  const aspectRatio = variant === 'compact' ? 'aspect-[4/5]' : 'aspect-[3/4]';
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card cursor-pointer transition-all duration-300 border border-border">
      <div className={`${aspectRatio} relative overflow-hidden`}>
        <Image
          src={imageUrl}
          alt={`${username}'s profile photo`}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority={variant === 'featured'}
        />        {/* Enhanced gradient overlay with subtle gold accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status indicators with improved glassmorphism */}
        {isOnline && (
          <div className="absolute top-2 sm:top-3 right-2 sm:right-3 flex items-center justify-center w-fit h-fit p-1.5 sm:p-2 rounded-full glass-dark border border-border/10">
            <div className="status-dot status-online animate-pulse" />
          </div>
        )}
        
        {photosCount && (
          <div className="absolute top-2 sm:top-3 left-2 sm:left-3 flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full glass-dark border border-border/10">
            <Camera className="w-3 sm:w-3.5 h-3 sm:h-3.5 text-white" />
            <span className="text-xs sm:text-sm font-medium text-white">{photosCount}</span>
          </div>
        )}
        
        {/* Enhanced content area with better typography */}
        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="space-y-1.5 sm:space-y-2">
            {/* Action buttons for interactive cards */}
            {showActions && (
              <div className="flex gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
                <button 
                  className={`w-8 h-8 sm:w-9 sm:h-9 p-1.5 sm:p-2 rounded-full glass-dark border border-border/10 hover:scale-110 transition-transform ${
                    isLiked ? 'bg-primary/20 border-primary/30' : ''
                  }`}
                  aria-label={isLiked ? 'Unlike' : 'Like'}
                >
                  <Heart className={`w-full h-full ${isLiked ? 'text-primary fill-primary' : 'text-white'}`} />
                </button>
                <button 
                  className="w-8 h-8 sm:w-9 sm:h-9 p-1.5 sm:p-2 rounded-full glass-dark border border-border/10 hover:scale-110 transition-transform"
                  aria-label="Send message"
                >
                  <MessageCircle className="w-full h-full text-white" />
                </button>
              </div>
            )}
            
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white tracking-tight leading-tight">
              {username}, <span className={variant === 'featured' ? 'text-primary' : 'text-white'}>{age}</span>
            </h3>
            
            <div className="flex items-center gap-1.5 sm:gap-2 text-white/90">
              <MapPin className="w-3 sm:w-3.5 h-3 sm:h-3.5 flex-shrink-0" />
              <span className="text-sm sm:text-base font-medium truncate">{location}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
