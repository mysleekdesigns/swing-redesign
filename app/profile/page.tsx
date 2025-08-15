"use client";

import { useState } from "react";
import Image from "next/image";
import { Sidebar } from "@/components/layout/Sidebar";
import { PhotoGalleryModal } from "@/components/ui/photo-gallery-modal";
import { currentUserProfile, formatActivityTime, getActivityIcon } from "@/lib/mock-data";
import { 
  MapPin, 
  Calendar, 
  Eye, 
  Heart, 
  Users, 
  Trophy,
  CheckCircle,
  Settings,
  Camera,
  Edit3,
  MoreHorizontal,
  MessageCircle,
  Clock,
  MessageSquare,
  Sparkles
} from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'photos'>('about');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { stats, interests, recentActivity, additionalImages, hotDate, profileDescription, fantasies, additionalComments } = currentUserProfile;

  const openGallery = (index: number) => {
    setSelectedImageIndex(index);
    setIsGalleryOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="2xl:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="w-full space-y-4 sm:space-y-6">
          
          {/* Profile Header */}
          <div className="relative overflow-hidden rounded-3xl bg-card border border-border">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
            
            <div className="relative p-4 sm:p-6 lg:p-8">
              <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 lg:gap-8 items-start">
                
                {/* Profile Image and Basic Info */}
                <div className="flex flex-col items-center lg:items-start">
                  <div className="relative group">
                    <div className="w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 rounded-3xl overflow-hidden ring-4 ring-primary/20 shadow-xl">
                      <Image
                        src={currentUserProfile.imageUrl}
                        alt="Profile image"
                        width={160}
                        height={160}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        priority
                      />
                    </div>
                    <button className="absolute -bottom-2 -right-2 p-2 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all hover:scale-110">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  
                  {currentUserProfile.verified && (
                    <div className="flex items-center gap-2 mt-4 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20">
                      <CheckCircle className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium text-primary">Verified</span>
                    </div>
                  )}
                </div>

                {/* Profile Details */}
                <div className="flex-1 space-y-4 sm:space-y-6">
                  <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
                          {currentUserProfile.displayName}
                        </h1>
                        <span className="text-lg sm:text-xl lg:text-2xl text-muted-foreground">
                          {currentUserProfile.age}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground min-w-0">
                        <MapPin className="w-4 h-4" />
                        <span className="font-medium">{currentUserProfile.location}</span>
                      </div>
                      
                      <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground min-w-0">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">
                          Member since {new Date(currentUserProfile.joinDate).toLocaleDateString('en-US', { 
                            month: 'long', 
                            year: 'numeric' 
                          })}
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg hover:shadow-xl">
                        <Edit3 className="w-4 h-4" />
                        <span className="font-medium">Edit Profile</span>
                      </button>
                      <button className="p-2 rounded-xl bg-muted hover:bg-muted/80 transition-colors">
                        <Settings className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <div className="p-3 sm:p-4 rounded-2xl bg-muted/50 border border-border hover-lift cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Eye className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profile Views</p>
                          <p className="text-lg font-bold text-foreground">{stats.profileViews.toLocaleString()}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-4 rounded-2xl bg-muted/50 border border-border hover-lift cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Heart className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Matches</p>
                          <p className="text-lg font-bold text-foreground">{stats.matches}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-4 rounded-2xl bg-muted/50 border border-border hover-lift cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Users className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Events</p>
                          <p className="text-lg font-bold text-foreground">{stats.eventsAttended}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="p-3 sm:p-4 rounded-2xl bg-muted/50 border border-border hover-lift cursor-pointer">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Trophy className="w-4 h-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground">Profile</p>
                          <p className="text-lg font-bold text-foreground">{stats.profileCompleteness}%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex gap-1 p-1 rounded-2xl bg-muted/50 border border-border max-w-fit">
            {[
              { id: 'about', label: 'About' },
              { id: 'activity', label: 'Activity' },
              { id: 'photos', label: 'Photos' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-6 py-2.5 rounded-xl font-medium transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-primary-foreground shadow-lg'
                    : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Main Content */}
            <div className="md:col-span-2 lg:col-span-2 space-y-4 sm:space-y-6">
              
              {activeTab === 'about' && (
                <>
                  {/* Bio Section */}
                  <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-foreground">About Me</h2>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Edit3 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <p className="text-muted-foreground leading-relaxed">
                      {currentUserProfile.bio}
                    </p>
                  </div>

                  {/* Interests Section */}
                  <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-foreground">Interests</h2>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Edit3 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      {interests.map((interest) => (
                        <div
                          key={interest.id}
                          className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 border border-border hover:bg-primary/10 hover:border-primary/20 transition-colors"
                        >
                          <span className="text-lg">{interest.emoji}</span>
                          <span className="font-medium text-foreground">{interest.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Preferences Section */}
                  <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="text-xl font-bold text-foreground">Looking For</h2>
                      <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                        <Edit3 className="w-4 h-4 text-muted-foreground" />
                      </button>
                    </div>
                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-2">
                        {currentUserProfile.preferences.lookingFor.map((item, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 rounded-full bg-primary/10 text-primary font-medium text-sm"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Ages {currentUserProfile.preferences.ageRange[0]}-{currentUserProfile.preferences.ageRange[1]} • 
                        Within {currentUserProfile.preferences.distanceRadius} miles
                      </div>
                    </div>
                  </div>
                  {/* Hot Date Section */}
                  {hotDate && (
                    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-foreground">My Hot Date</h2>
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                          <Edit3 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        <div className="flex gap-3 sm:gap-4">
                          {hotDate.imageUrl && (
                            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden flex-shrink-0">
                              <Image
                                src={hotDate.imageUrl}
                                alt={hotDate.title}
                                width={80}
                                height={80}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground mb-2 text-sm sm:text-base truncate">{hotDate.title}</h3>
                            <p className="text-muted-foreground text-xs sm:text-sm mb-3 line-clamp-2">{hotDate.description}</p>
                            <div className="flex flex-wrap gap-2 sm:gap-4 text-xs sm:text-sm">
                              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground min-w-0">
                                <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                                <span className="truncate">{new Date(hotDate.date).toLocaleDateString()}</span>
                              </div>
                              <div className="flex items-center gap-1 sm:gap-2 text-muted-foreground min-w-0">
                                <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                                <span className="truncate">{hotDate.location}</span>
                              </div>
                              {hotDate.isAttending && (
                                <div className="flex items-center gap-2 text-primary">
                                  <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                                  <span className="font-medium">Attending</span>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Profile Description Section */}
                  {profileDescription && (
                    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-foreground">{profileDescription.title}</h2>
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                          <Edit3 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="space-y-3">
                        <p className="text-muted-foreground leading-relaxed">
                          {profileDescription.content}
                        </p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          <span>Last updated: {new Date(profileDescription.lastUpdated).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Fantasies Section */}
                  {fantasies && fantasies.length > 0 && (
                    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                          <Sparkles className="w-5 h-5 text-primary" />
                          Dreams & Fantasies
                        </h2>
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                          <Edit3 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        {fantasies.map((fantasy) => (
                          <div key={fantasy.id} className="p-4 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{fantasy.title}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                                  {fantasy.category}
                                </span>
                                {fantasy.private && (
                                  <div className="w-2 h-2 rounded-full bg-orange-500" title="Private fantasy" />
                                )}
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">{fantasy.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Additional Comments Section */}
                  {additionalComments && additionalComments.length > 0 && (
                    <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                      <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold text-foreground flex items-center gap-2">
                          <MessageSquare className="w-5 h-5 text-primary" />
                          Additional Notes
                        </h2>
                        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
                          <Edit3 className="w-4 h-4 text-muted-foreground" />
                        </button>
                      </div>
                      <div className="space-y-4">
                        {additionalComments.map((comment) => (
                          <div key={comment.id} className="p-4 rounded-2xl bg-muted/30 border border-border hover:bg-muted/50 transition-colors">
                            <div className="flex items-start justify-between mb-2">
                              <h3 className="font-semibold text-foreground">{comment.title}</h3>
                              <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary font-medium capitalize">
                                {comment.category}
                              </span>
                            </div>
                            <p className="text-muted-foreground text-sm mb-2">{comment.content}</p>
                            <div className="flex items-center gap-2 text-xs text-muted-foreground">
                              <Clock className="w-3 h-3" />
                              <span>{formatActivityTime(comment.timestamp)}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {activeTab === 'activity' && (
                <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                  <h2 className="text-xl font-bold text-foreground mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {recentActivity.map((activity) => (
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
              )}

              {activeTab === 'photos' && (
                <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-bold text-foreground">Photos</h2>
                    <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 transition-colors">
                      <Camera className="w-4 h-4" />
                      <span className="font-medium">Add Photo</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2 sm:gap-3">
                    {additionalImages.map((image, index) => (
                      <div 
                        key={index} 
                        className="group relative aspect-[3/4] rounded-xl overflow-hidden cursor-pointer"
                        onClick={() => openGallery(index)}
                      >
                        <Image
                          src={image}
                          alt={`Photo ${index + 1}`}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                        <button 
                          className="absolute top-1 right-1 p-1 rounded-lg bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <MoreHorizontal className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar Content */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* Quick Actions */}
              <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors">
                    <MessageCircle className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">View Messages</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors">
                    <Heart className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">My Matches</span>
                  </button>
                  <button className="w-full flex items-center gap-3 p-3 rounded-2xl bg-muted/50 hover:bg-primary/10 transition-colors">
                    <Users className="w-5 h-5 text-primary" />
                    <span className="font-medium text-foreground">Browse Events</span>
                  </button>
                </div>
              </div>

              {/* Profile Completion */}
              <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Profile Completion</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Progress</span>
                    <span className="text-sm font-bold text-primary">{stats.profileCompleteness}%</span>
                  </div>
                  <div className="w-full bg-muted/50 rounded-full h-2">
                    <div 
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${stats.profileCompleteness}%` }}
                    />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Add more photos</span>
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Complete bio</span>
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">Verify account</span>
                      <CheckCircle className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Online Status */}
              <div className="p-4 sm:p-6 rounded-3xl bg-card border border-border">
                <h3 className="text-lg font-bold text-foreground mb-4">Status</h3>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-sm font-medium text-foreground">Online now</span>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Last seen: {formatActivityTime(currentUserProfile.lastSeen)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Photo Gallery Modal */}
      <PhotoGalleryModal
        images={additionalImages}
        initialIndex={selectedImageIndex}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </div>
  );
}
