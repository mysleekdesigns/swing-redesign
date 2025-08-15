"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserCard } from "@/components/ui/UserCard";
import { HotDateCard } from "@/components/ui/HotDateCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { 
  whoIsOnUsers, 
  whoViewedMeUsers, 
  newestMatches, 
  hotDates,
  featuredConvention,
} from "@/lib/mock-data";
import { Users, Eye, Heart, Calendar, MapPin, DollarSign } from "lucide-react";

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
      <main className="2xl:ml-64 p-4 sm:p-6 lg:p-8">
        {/* Removed max-width constraint for full-width layout on xlarge screens */}
        <div className="w-full space-y-8">
          
          {/* Convention Section - Full Width */}
          <section>
              <div className="relative overflow-hidden rounded-3xl section-glass p-8 ring-2 ring-primary/20 shadow-lg shadow-primary/10">
                <div className="flex flex-col lg:flex-row gap-6 h-full">
                  {/* Text Content - Left Side */}
                  <div className="lg:w-full xl:w-1/2 lg:pr-6">
                    <div className="relative z-10 h-full flex flex-col justify-between">
                      <div className="inline-block w-fit px-3 py-1.5 rounded-full text-sm font-semibold mb-8 bg-primary/20 text-primary border border-primary/30">
                        Lifestyle
                      </div>
                      
                      <div className="space-y-4 flex-1 flex flex-col justify-center">
                        <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
                          {featuredConvention.name}
                        </h2>
                        
                        <p className="text-lg text-muted-foreground">
                          {featuredConvention.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span className="font-medium">
                              {new Date(featuredConvention.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            <span className="font-medium">{featuredConvention.location}</span>
                          </div>
                          {featuredConvention.price && (
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4 text-primary" />
                              <span className="font-medium">{featuredConvention.price.replace('$', '')}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4 text-primary" />
                            <span className="font-medium">{featuredConvention.attendeeCount} people attending</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-wrap gap-4 mt-8">
                        <button className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground hover:text-primary-foreground rounded-xl font-semibold transition-colors">
                          Register Now
                        </button>
                        <button className="px-6 py-3 border border-border hover:bg-accent text-foreground hover:text-accent-foreground rounded-xl font-semibold transition-colors">
                          Event Details
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Image - Right Side */}
                  <div className="lg:w-1/4 xl:w-1/2 hidden xl:block">
                    <div className="relative h-64 lg:h-full rounded-2xl overflow-hidden">
                      <Image
                        src={featuredConvention.imageUrl}
                        alt={featuredConvention.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                    </div>
                  </div>
                </div>
                
                {/* Decorative background elements matching welcome section */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-primary/5 rounded-full blur-2xl" />
              </div>
          </section>
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
            {/* Grid layout: responsive from 1 to 4 columns for full-width display */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="section-glass rounded-2xl p-6 text-center ring-2 ring-primary/20 shadow-lg shadow-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">2.5K+</div>
              <div className="text-sm text-muted-foreground font-medium">Members Online Now</div>
            </div>
            <div className="section-glass rounded-2xl p-6 text-center ring-2 ring-primary/20 shadow-lg shadow-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">150+</div>
              <div className="text-sm text-muted-foreground font-medium">Events This Month</div>
            </div>
            <div className="section-glass rounded-2xl p-6 text-center ring-2 ring-primary/20 shadow-lg shadow-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">95%</div>
              <div className="text-sm text-muted-foreground font-medium">Successful Connections</div>
            </div>
            <div className="section-glass rounded-2xl p-6 text-center ring-2 ring-primary/20 shadow-lg shadow-primary/10">
              <div className="text-3xl font-bold text-primary mb-2">24/7</div>
              <div className="text-sm text-muted-foreground font-medium">Support Available</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

