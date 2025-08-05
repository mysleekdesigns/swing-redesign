"use client";

import { Sidebar } from "@/components/layout/Sidebar";
import { ProfileCard } from "@/components/ui/ProfileCard";
import { HotDateCard } from "@/components/ui/HotDateCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { 
  whoIsOnUsers, 
  whoViewedMeUsers, 
  newestMatches, 
  hotDates
} from "@/lib/mock-data";
import { Users, Eye, Heart, Calendar } from "lucide-react";

export default function Home() {
  // Get fixed selections for display (avoids hydration issues)
  const displayedOnlineUsers = whoIsOnUsers.slice(0, 6);
  const displayedViewers = whoViewedMeUsers.slice(0, 6);
  const displayedMatches = newestMatches.slice(0, 6);
  const displayedEvents = hotDates.slice(0, 4);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-2xl mx-auto space-y-8">
          
          {/* Welcome Section */}
          <div className="relative overflow-hidden rounded-3xl couples-hero-bg section-glass p-8 lg:p-12">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="couple-badge flex items-center gap-2 px-4 py-2 rounded-full">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium text-primary tracking-wide">Premium Couples Platform</span>
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight leading-tight">
                Where Couples <span className="text-primary">Connect</span>
                <br />
                <span className="text-2xl sm:text-3xl lg:text-4xl text-muted-foreground font-normal">
                  & Adventures Begin
                </span>
              </h1>
              
              <p className="text-lg lg:text-xl text-muted-foreground mb-8 max-w-3xl leading-relaxed">
                Join the most sophisticated community for couples in the lifestyle. 
                Connect with like-minded partners, discover exclusive events, and explore 
                new experiences together in a safe, premium environment.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button className="couple-primary-btn px-8 py-4 text-primary-foreground rounded-xl font-semibold">
                  Explore Couples
                </button>
                <button className="couple-secondary-btn px-8 py-4 text-foreground rounded-xl font-semibold">
                  Premium Events
                </button>
              </div>
              
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <span>70% Verified Couples</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <span>Exclusive Member Events</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/60" />
                  <span>Premium Community</span>
                </div>
              </div>
            </div>
          </div>

          {/* Who's On Section */}
          <section>
            <SectionHeader
              title="Couples Online"
              subtitle="Premium members currently online and ready to connect"
              icon={Users}
              count={whoIsOnUsers.length}
              variant="glass"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {displayedOnlineUsers.map((user) => (
                <ProfileCard
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
              title="Premium Interest"
              subtitle="Quality members have viewed your profile - someone's intrigued!"
              icon={Eye}
              count={whoViewedMeUsers.length}
              variant="glass"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {displayedViewers.map((user) => (
                <ProfileCard
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
              title="Perfect Connections"
              subtitle="Premium matches curated just for you - start the conversation"
              icon={Heart}
              count={newestMatches.length}
              variant="glass"
            />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {displayedMatches.map((user) => (
                <ProfileCard
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
              title="Exclusive Experiences"
              subtitle="Premium events crafted for couples and select singles"
              icon={Calendar}
              count={hotDates.length}
              variant="glass"
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedEvents.map((event) => (
                <HotDateCard key={event.id} {...event} />
              ))}
            </div>
            
            {/* View More Events Button */}
            <div className="text-center mt-8">
              <button className="couple-secondary-btn px-8 py-3 text-foreground rounded-xl font-semibold">
                Discover Premium Events
              </button>
            </div>
          </section>

          {/* Stats Section */}
          <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="couple-stat-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">1.8K+</div>
              <div className="text-sm text-muted-foreground font-medium">Verified Couples Online</div>
            </div>
            <div className="couple-stat-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">85+</div>
              <div className="text-sm text-muted-foreground font-medium">Premium Events Monthly</div>
            </div>
            <div className="couple-stat-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">97%</div>
              <div className="text-sm text-muted-foreground font-medium">Quality Connections</div>
            </div>
            <div className="couple-stat-card rounded-2xl p-6 text-center">
              <div className="text-3xl font-bold text-primary mb-2">VIP</div>
              <div className="text-sm text-muted-foreground font-medium">Concierge Support</div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
