import Image from "next/image";
import { MapPin, Camera, Heart, MessageCircle } from "lucide-react";

interface UserCardProps {
  username: string;
  age: number;
  location: string;
  imageUrl: string;
  isOnline?: boolean;
  distance?: string;
  photosCount?: number;
  viewedTime?: string;
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
  distance,
  photosCount,
  viewedTime,
  isLiked = false,
  showActions = false,
  variant = 'default',
}: UserCardProps) {
  const aspectRatio = variant === 'compact' ? 'aspect-[4/5]' : 'aspect-[3/4]';
  
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-card hover-lift cursor-pointer transition-all duration-300 ring-2 ring-primary/20 shadow-lg shadow-primary/10">
      <div className={`${aspectRatio} relative overflow-hidden`}>
        <Image
          src={imageUrl}
          alt={`${username}'s profile photo`}
          fill
          className="object-cover transition-all duration-500 group-hover:scale-110"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          priority={variant === 'featured'}
        />        {/* Enhanced gradient overlay with subtle gold accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Status indicators with improved glassmorphism */}
        {isOnline && (
          <div className="absolute top-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark border border-white/10">
            <div className="status-dot status-online animate-pulse" />
            <span className="text-xs font-medium text-white tracking-wide">Online</span>
          </div>
        )}
        
        {photosCount && (
          <div className="absolute top-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark border border-white/10">
            <Camera className="w-3.5 h-3.5 text-white" />
            <span className="text-xs font-medium text-white">{photosCount}</span>
          </div>
        )}
        
        {/* Action buttons for interactive cards */}
        {showActions && (
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              className={`p-2.5 rounded-full glass-dark border border-white/10 hover:scale-110 transition-transform ${
                isLiked ? 'bg-primary/20 border-primary/30' : ''
              }`}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-primary fill-primary' : 'text-white'}`} />
            </button>
            <button 
              className="p-2.5 rounded-full glass-dark border border-white/10 hover:scale-110 transition-transform"
              aria-label="Send message"
            >
              <MessageCircle className="w-4 h-4 text-white" />
            </button>
          </div>
        )}
        
        {/* Enhanced content area with better typography */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-white tracking-tight leading-tight">
              {username}, <span className={variant === 'featured' ? 'text-primary' : 'text-white'}>{age}</span>
            </h3>
            
            <div className="flex items-center gap-2 text-white/90">
              <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
              <span className="text-sm font-medium truncate">{location}</span>
              {distance && (
                <>
                  <span className="text-white/60">•</span>
                  <span className="text-sm font-medium text-primary">{distance}</span>
                </>
              )}
            </div>
            
            {viewedTime && (
              <p className="text-xs text-white/70 font-medium bg-black/20 rounded-full px-2 py-1 inline-block">
                {viewedTime}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}