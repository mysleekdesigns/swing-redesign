"use client";

import Image from "next/image";
import { 
  MapPin, 
  Calendar, 
  CheckCircle,
  Settings,
  Edit3,
} from "lucide-react";

interface ProfileHeaderProps {
  profile: {
    displayName: string;
    age: number;
    location: string;
    bio: string;
    imageUrl: string;
    joinDate: string;
    verified?: boolean;
  };
}

export function ProfileHeader({ profile }: ProfileHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-card border border-border">
      <div className="relative p-4 sm:p-6 lg:p-8">
        {/* Action Buttons - positioned absolute top right */}
        <div className="flex flex-col md:flex-row gap-2 lg:gap-3 absolute top-4 right-4 sm:top-6 lg:right-8 z-10">
          {profile.verified && (
            <div className="flex items-center gap-1 lg:gap-2 p-2 md:px-3 md:py-2 lg:px-4 rounded-xl bg-primary/10 border border-primary/20">
              <CheckCircle className="w-4 h-4 text-primary" />
              <span className="text-sm lg:text-base font-medium text-primary hidden md:inline">Premium Member</span>
            </div>
          )}
          <button className="flex items-center gap-1 lg:gap-2 p-2 md:px-3 md:py-2 lg:px-4 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
            <Edit3 className="w-4 h-4" />
            <span className="text-sm lg:text-base font-medium hidden md:inline">Edit Profile</span>
          </button>
          <button className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
            <Settings className="w-4 h-4 lg:w-5 lg:h-5" />
          </button>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
          
          {/* Mobile Layout */}
          <div className="w-full lg:hidden">
            <div className="flex gap-4 w-full">
              {/* Left side - Image Only */}
              <div className="flex-shrink-0">
                <div className="relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-3xl overflow-hidden ring-4 ring-primary/20 shadow-xl">
                    <Image
                      src={profile.imageUrl}
                      alt="Profile image"
                      width={160}
                      height={160}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      priority
                    />
                  </div>
                </div>
              </div>

              {/* Right side - Name, Location, Member Since */}
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                    {profile.displayName}
                  </h1>
                  <span className="text-lg sm:text-xl text-muted-foreground">
                    {profile.age}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium text-base">{profile.location}</span>
                </div>
                
                <div className="flex items-center gap-1 text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <span className="text-base">
                    Member since {new Date(profile.joinDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                
                {/* About Me Section - Shows inline on screens above md (768px) */}
                <div className="mt-3 hidden md:block lg:hidden">
                  <h2 className="text-base font-semibold text-foreground mb-1">About Me</h2>
                  <p className="text-muted-foreground text-base leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              </div>
            </div>
            
            {/* About Me Section - Full width below image on screens md and below */}
            <div className="mt-4 block md:hidden">
              <h2 className="text-base font-semibold text-foreground mb-2">About Me</h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {profile.bio}
              </p>
            </div>
          </div>

          {/* Desktop Layout - Keep original structure */}
          <div className="hidden lg:flex lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
            {/* Profile Image - Enlarged */}
            <div className="flex-shrink-0">
              <div className="relative group">
                <div className="w-48 h-48 lg:w-56 lg:h-56 rounded-3xl overflow-hidden ring-4 ring-primary/20 shadow-xl">
                  <Image
                    src={profile.imageUrl}
                    alt="Profile image"
                    width={224}
                    height={224}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    priority
                  />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="flex-1 space-y-4 sm:space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                    {profile.displayName}
                  </h1>
                  <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">
                    {profile.age}
                  </span>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground min-w-0">
                  <MapPin className="w-4 h-4" />
                  <span className="font-medium">{profile.location}</span>
                </div>
                
                <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground min-w-0">
                  <Calendar className="w-4 h-4" />
                  <span className="text-base">
                    Member since {new Date(profile.joinDate).toLocaleDateString('en-US', { 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                </div>
                
                {/* About Me Section - Moved here */}
                <div className="mt-4">
                  <h2 className="text-lg font-semibold text-foreground mb-2">About Me</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {profile.bio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}