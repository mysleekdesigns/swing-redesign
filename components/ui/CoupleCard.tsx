import Image from "next/image";
import { MapPin, Camera, Heart, MessageCircle, Shield } from "lucide-react";
import { CoupleProfile } from "@/lib/types";

interface CoupleCardProps extends CoupleProfile {
  showActions?: boolean;
  variant?: 'default' | 'compact' | 'featured';
}

export function CoupleCard({
  username,
  age,
  partnerName,
  partnerAge,
  location,
  imageUrl,
  partnerImageUrl,
  isOnline = false,
  distance,
  photosCount,
  viewedTime,
  isLiked = false,
  showActions = false,
  variant = 'default',
  verified = false,
  lookingFor,
}: CoupleCardProps) {
  const aspectRatio = variant === 'compact' ? 'aspect-[4/5]' : 'aspect-[3/4]';
  
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-card hover-lift cursor-pointer transition-all duration-300 ${
      variant === 'featured' ? 'ring-2 ring-primary/20 shadow-lg shadow-primary/10' : ''
    }`}>
      <div className={`${aspectRatio} relative overflow-hidden`}>
        {/* Couple Images Side by Side */}
        <div className="flex h-full">
          {/* Partner 1 Image */}
          <div className="flex-1 relative overflow-hidden">
            <Image
              src={imageUrl}
              alt={`${username.split(' & ')[0]}'s profile photo`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw"
              priority={variant === 'featured'}
            />
          </div>
          
          {/* Divider with golden accent */}
          <div className="w-0.5 bg-gradient-to-b from-transparent via-primary/60 to-transparent relative z-10" />
          
          {/* Partner 2 Image */}
          <div className="flex-1 relative overflow-hidden">
            <Image
              src={partnerImageUrl}
              alt={`${partnerName}'s profile photo`}
              fill
              className="object-cover transition-all duration-500 group-hover:scale-110"
              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 16vw, 12vw"
              priority={variant === 'featured'}
            />
          </div>
        </div>
        
        {/* Unified gradient overlay with golden couple accent */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Couple-specific status indicators */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5">
          {/* Couple badge with golden accent */}
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark border border-primary/20 bg-primary/10">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-xs font-medium text-primary tracking-wide">Couple</span>
          </div>
          
          {verified && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark border border-white/10">
              <Shield className="w-3.5 h-3.5 text-primary" />
              <span className="text-xs font-medium text-white">Verified</span>
            </div>
          )}
        </div>
        
        {/* Status and photo count indicators */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5">
          {isOnline && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark border border-white/10">
              <div className="status-dot status-online animate-pulse" />
              <span className="text-xs font-medium text-white tracking-wide">Online</span>
            </div>
          )}
          
          {photosCount && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full glass-dark border border-white/10">
              <Camera className="w-3.5 h-3.5 text-white" />
              <span className="text-xs font-medium text-white">{photosCount}</span>
            </div>
          )}
        </div>
        
        {/* Action buttons for interactive cards */}
        {showActions && (
          <div className="absolute top-1/2 right-3 transform -translate-y-1/2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <button 
              className={`p-2.5 rounded-full glass-dark border border-white/10 hover:scale-110 transition-all ${
                isLiked ? 'bg-primary/20 border-primary/30 shadow-lg shadow-primary/20' : 'hover:border-primary/20'
              }`}
              aria-label={isLiked ? 'Unlike' : 'Like'}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'text-primary fill-primary' : 'text-white hover:text-primary'} transition-colors`} />
            </button>
            <button 
              className="p-2.5 rounded-full glass-dark border border-white/10 hover:scale-110 hover:border-primary/20 transition-all"
              aria-label="Send message"
            >
              <MessageCircle className="w-4 h-4 text-white hover:text-primary transition-colors" />
            </button>
          </div>
        )}
        
        {/* Enhanced content area with couple-specific styling */}
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/50 to-transparent">
          <div className="space-y-2">
            <div className="flex items-baseline gap-1">
              <h3 className="text-lg font-bold text-white tracking-tight leading-tight flex-1">
                {username.split(' & ')[0]}, <span className={variant === 'featured' ? 'text-primary' : 'text-white'}>{age}</span>
                <span className="text-primary mx-1">&</span>
                {partnerName}, <span className={variant === 'featured' ? 'text-primary' : 'text-white'}>{partnerAge}</span>
              </h3>
            </div>
            
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
            
            {/* Looking for indicator */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-white/70">Looking for:</span>
              <span className="text-xs font-medium text-primary bg-primary/20 rounded-full px-2 py-1 border border-primary/30">
                {lookingFor === 'both' ? 'Couples & Singles' : lookingFor === 'couples' ? 'Couples' : 'Singles'}
              </span>
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