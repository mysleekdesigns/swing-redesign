"use client";

import { useState, useEffect } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserCard } from "@/components/ui/UserCard";
import { HotDateCard } from "@/components/ui/HotDateCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Footer } from "@/components/ui/Footer";
import { ConventionCard } from "@/components/sections/home/ConventionCard";
import { StatsGrid } from "@/components/shared/StatsGrid";
import { 
  whoIsOnUsers, 
  whoViewedMeUsers, 
  newestMatches, 
  hotDates,
  featuredConvention,
} from "@/lib/mock-data";
import { Users, Eye, Heart, Calendar } from "lucide-react";

export default function Home() {
  // Screen width detection for responsive image count
  const [screenWidth, setScreenWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Set initial screen width
    setScreenWidth(window.innerWidth);
    
    // Add event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Determine image count based on screen width breakpoints
  // Custom breakpoints: ≥2100px: 8 images, ≥1600px: 6 images, ≥1000px: 4 images, ≥780px: 3 images, <780px: 2 images
  const imageCount = screenWidth >= 2100 ? 8 : 
                    screenWidth >= 1600 ? 6 : 
                    screenWidth >= 1000 ? 4 : 
                    screenWidth >= 780 ? 3 : 2;

  // Get dynamic selections based on screen width to match grid layout
  const displayedOnlineUsers = whoIsOnUsers.slice(0, imageCount);
  const displayedViewers = whoViewedMeUsers.slice(0, imageCount);
  const displayedMatches = newestMatches.slice(0, imageCount);
  const displayedEvents = hotDates.slice(0, 4); // Hot Dates stays at 4
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="2xl:ml-64 2xl:pt-4 p-4 sm:p-6 lg:p-8">
        {/* Removed max-width constraint for full-width layout on xlarge screens */}
        <div className="w-full space-y-8">
          
          {/* Convention Section - Full Width */}
          <ConventionCard convention={featuredConvention} />
          {/* Who's On Section */}
          <section>
            <SectionHeader
              title="Who's On"
              subtitle="People currently online and ready to connect"
              icon={Users}
              count={whoIsOnUsers.length}
              variant="glass"
            />
            {/* Grid layout: 2 images (<780px), 3 images (780-999px), 4 images (1000-1599px), 6 images (1600-2099px), 8 images (≥2100px) */}
            <div className="grid grid-cols-2 min-[780px]:grid-cols-3 min-[1000px]:grid-cols-4 min-[1600px]:grid-cols-6 min-[2100px]:grid-cols-8 gap-4">
              {displayedOnlineUsers.map((user) => (
                <UserCard
                  key={user.id}
                  {...user}
                  variant="compact"
                  showActions={true}
                />
              ))}
            </div>
          </section>

          {/* Who Viewed Me Section */}
          <section>
            <SectionHeader
              title="Who Viewed Me"
              subtitle="Recent profile visitors - someone's interested\!"
              icon={Eye}
              count={whoViewedMeUsers.length}
              variant="glass"
            />
            {/* Grid layout: 2 images (<780px), 3 images (780-999px), 4 images (1000-1599px), 6 images (1600-2099px), 8 images (≥2100px) */}
            <div className="grid grid-cols-2 min-[780px]:grid-cols-3 min-[1000px]:grid-cols-4 min-[1600px]:grid-cols-6 min-[2100px]:grid-cols-8 gap-4">
              {displayedViewers.map((user) => (
                <UserCard
                  key={user.id}
                  {...user}
                  showActions={true}
                />
              ))}
            </div>
          </section>

          {/* Newest Matches Section */}
          <section>
            <SectionHeader
              title="Newest Matches"
              subtitle="Fresh connections waiting for your message"
              icon={Heart}
              count={newestMatches.length}
              variant="glass"
            />
            {/* Grid layout: 2 images (<780px), 3 images (780-999px), 4 images (1000-1599px), 6 images (1600-2099px), 8 images (≥2100px) */}
            <div className="grid grid-cols-2 min-[780px]:grid-cols-3 min-[1000px]:grid-cols-4 min-[1600px]:grid-cols-6 min-[2100px]:grid-cols-8 gap-4">
              {displayedMatches.map((user) => (
                <UserCard
                  key={user.id}
                  {...user}
                  variant="featured"
                  showActions={true}
                />
              ))}
            </div>
          </section>

          {/* Hot Dates Section */}
          <section>
            <SectionHeader
              title="Hot Dates"
              subtitle="Exciting events and group activities near you"
              icon={Calendar}
              count={hotDates.length}
              variant="glass"
            />
            {/* Grid layout: 1 column on mobile, 2 columns from medium screens (768px) to 1988px, 4 columns above 1989px */}
            <div className="grid grid-cols-1 md:grid-cols-2 min-[1989px]:grid-cols-4 gap-6">
              {displayedEvents.map((event) => (
                <HotDateCard key={event.id} {...event} />
              ))}
            </div>
            
            {/* View More Events Button */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 border border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105">
                View All Events
              </button>
            </div>
          </section>

          {/* Stats Section */}
          <StatsGrid 
            stats={[
              { value: "2.5K+", label: "Members Online Now" },
              { value: "150+", label: "Events This Month" },
              { value: "95%", label: "Successful Connections" },
              { value: "24/7", label: "Support Available" },
            ]}
          />
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </div>
  );
}
