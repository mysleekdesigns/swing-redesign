"use client";

import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/ui/Footer";
import { PhotoGalleryModal } from "@/components/ui/photo-gallery-modal";
import { ProfileHeader } from "@/components/sections/profile/ProfileHeader";
import { TabNavigation } from "@/components/shared/TabNavigation";
import { LifestylePreferences } from "@/components/sections/profile/LifestylePreferences";
import { LookingForSection } from "@/components/sections/profile/LookingForSection";
import { ProfileHotDate } from "@/components/sections/profile/ProfileHotDate";
import { ProfileDescription } from "@/components/sections/profile/ProfileDescription";
import { FantasiesSection } from "@/components/sections/profile/FantasiesSection";
import { AdditionalComments } from "@/components/sections/profile/AdditionalComments";
import { RecentActivity } from "@/components/sections/profile/RecentActivity";
import { PhotoGrid } from "@/components/sections/profile/PhotoGrid";
import { QuickActions } from "@/components/sections/profile/QuickActions";
import { ProfileCompletion } from "@/components/sections/profile/ProfileCompletion";
import { OnlineStatus } from "@/components/sections/profile/OnlineStatus";
import { currentUserProfile, formatActivityTime, getActivityIcon } from "@/lib/mock-data";
import { Eye, Heart, Users, Trophy } from "lucide-react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<'about' | 'activity' | 'photos'>('about');
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  
  const { stats, lifestylePreferences, recentActivity, additionalImages, hotDate, profileDescription, fantasies, additionalComments } = currentUserProfile;

  const tabs = [
    { id: "about", label: "About" },
    { id: "activity", label: "Activity" },
    { id: "photos", label: "Photos" }
  ] as const;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="2xl:ml-64 2xl:pt-4 p-4 sm:p-6 lg:p-8">
        <div className="w-full space-y-4 sm:space-y-6">
          
          {/* Profile Header */}
          <ProfileHeader profile={currentUserProfile} />

          {/* Tab Navigation with Sliding Indicator */}
          <TabNavigation tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
          {/* Tab Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
            
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-4 sm:space-y-6">
              
              {activeTab === 'about' && (
                <>
                  {/* Lifestyle Preferences Section */}
                  <LifestylePreferences preferences={lifestylePreferences} />

                  {/* Preferences Section */}
                  <LookingForSection 
                    preferences={{
                      lookingFor: currentUserProfile.preferences.lookingFor,
                      ageRange: currentUserProfile.preferences.ageRange,
                      distanceRadius: currentUserProfile.preferences.distanceRadius
                    }}
                  />
                  {/* Hot Date Section */}
                  {hotDate && <ProfileHotDate hotDate={hotDate} />}

                  {/* Profile Description Section */}
                  {profileDescription && (
                    <ProfileDescription 
                      displayName={profileDescription.title}
                      description={profileDescription.content}
                      lastUpdated={profileDescription.lastUpdated}
                    />
                  )}

                  {/* Fantasies Section */}
                  {fantasies && fantasies.length > 0 && <FantasiesSection fantasies={fantasies} />}

                  {/* Additional Comments Section */}
                  {additionalComments && additionalComments.length > 0 && (
                    <AdditionalComments 
                      comments={additionalComments} 
                      formatActivityTime={formatActivityTime}
                    />
                  )}
                </>
              )}

              {activeTab === 'activity' && (
                <RecentActivity 
                  activities={recentActivity} 
                  getActivityIcon={getActivityIcon}
                  formatActivityTime={formatActivityTime}
                />
              )}

              {activeTab === 'photos' && (
                <PhotoGrid 
                  images={additionalImages} 
                  onImageClick={(index) => {
                    setSelectedImageIndex(index);
                    setIsGalleryOpen(true);
                  }} 
                />
              )}
            </div>

            {/* Sidebar Content */}
            {/* Sidebar Content - Improved responsive layout */}
            <div className="space-y-4 sm:space-y-6">
              
              {/* Stats Cards - Always 2 per row, use full width */}
              <div className="grid grid-cols-2 gap-3 w-full">
                <div className="p-3 sm:p-4 rounded-2xl bg-muted/50 border border-border hover-lift cursor-pointer">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10">
                      <Eye className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-base text-muted-foreground">Profile Views</p>
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
                      <p className="text-base text-muted-foreground">Matches</p>
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
                      <p className="text-base text-muted-foreground">Events</p>
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
                      <p className="text-base text-muted-foreground">Profile</p>
                      <p className="text-lg font-bold text-foreground">{stats.profileCompleteness}%</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Quick Actions - Full width on all sizes */}
              <QuickActions />

              {/* Profile Completion and Status - Side by side on md+, stacked on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
                {/* Profile Completion */}
                <ProfileCompletion 
                  completeness={stats.profileCompleteness} 
                  items={[
                    { label: "Add more photos", completed: true },
                    { label: "Complete bio", completed: true },
                    { label: "Verify account", completed: true }
                  ]}
                />

                {/* Online Status */}
                <OnlineStatus 
                  lastSeen={currentUserProfile.lastSeen} 
                  formatActivityTime={formatActivityTime}
                />
            </div>
              </div>
            </div>        </div>

        {/* Footer */}
        <Footer />
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
