"use client";

import { useState, useMemo } from "react";
import { Search, X, ChevronDown } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { UserCard } from "@/components/ui/UserCard";
import { FilterPill } from "@/components/ui/FilterPill";
import { AdvancedFilters } from "@/components/ui/AdvancedFilters";
import { whoIsOnUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

const quickFilters = [
  { label: "Online Now", value: "online" },
  { label: "Nearby", value: "nearby" },
  { label: "New Members", value: "new" },
  { label: "Age: 18-35", value: "age-18-35" },
  { label: "Verified", value: "verified" }
];

const sortOptions = [
  { label: "Distance", value: "distance" },
  { label: "Recently Active", value: "recent" },
  { label: "New", value: "new" }
];

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [activeQuickFilters, setActiveQuickFilters] = useState<string[]>([]);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  
  const filteredUsers = useMemo(() => {
    return whoIsOnUsers.filter(user => {
      const matchesQuery = !query || 
        user.username.toLowerCase().includes(query.toLowerCase()) ||
        user.location.toLowerCase().includes(query.toLowerCase());
      
      // Basic filter logic for demonstration
      const matchesFilters = activeQuickFilters.length === 0 || 
        activeQuickFilters.some(filter => {
          switch (filter) {
            case 'online':
              return user.isOnline;
            case 'nearby':
              return user.distance && parseInt(user.distance) <= 10;
            case 'age-18-35':
              return user.age >= 18 && user.age <= 35;
            default:
              return true;
          }
        });
      
      return matchesQuery && matchesFilters;
    });
  }, [query, activeQuickFilters]);

  const toggleQuickFilter = (value: string) => {
    setActiveQuickFilters(prev => 
      prev.includes(value) 
        ? prev.filter(f => f !== value)
        : [...prev, value]
    );
  };

  const clearAllFilters = () => {
    setActiveQuickFilters([]);
    setQuery('');
  };

  const totalActiveFilters = activeQuickFilters.length;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="2xl:ml-64 p-4 sm:p-6 lg:p-8">
        <div className="w-full space-y-8">
          
          {/* Enhanced Search Header */}
          <div className="sticky top-0 z-10">
            <div className={cn(
              "rounded-2xl p-6 transition-all duration-300",
              "backdrop-blur-[20px] bg-white/10 border border-white/20",
              "dark:bg-white/5 dark:border-white/10",
              "shadow-lg shadow-black/5",
              "dark:shadow-[0_0_30px_oklch(0.75_0.23_85_/_5%)]",
              "dark:border-primary/20"
            )}>
              <div className="w-full space-y-6">
                
                {/* Search Input */}
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search by username, location..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className={cn(
                      "w-full pl-12 pr-4 py-4 rounded-xl text-foreground placeholder:text-muted-foreground",
                      "transition-all duration-300 focus:outline-none",
                      "backdrop-blur-sm bg-card/50 border border-border",
                      "focus:ring-2 focus:ring-primary/20 focus:border-primary",
                      "dark:bg-white/5 dark:border-white/10",
                      "dark:focus:border-primary/40 dark:focus:ring-primary/10"
                    )}
                  />
                  {query && (
                    <button
                      onClick={() => setQuery('')}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Quick Filters */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-semibold text-foreground">Quick Filters</h3>
                    {totalActiveFilters > 0 && (
                      <button
                        onClick={clearAllFilters}
                        className="text-xs text-muted-foreground hover:text-foreground transition-colors"
                      >
                        Clear all ({totalActiveFilters})
                      </button>
                    )}
                  </div>
                  
                  <div className="flex gap-3 overflow-x-auto pb-2">
                    {quickFilters.map((filter) => (
                      <FilterPill
                        key={filter.value}
                        label={filter.label}
                        isActive={activeQuickFilters.includes(filter.value)}
                        onClick={() => toggleQuickFilter(filter.value)}
                      />
                    ))}
                  </div>
                </div>

                {/* Advanced Filters */}
                <AdvancedFilters
                  isOpen={showAdvancedFilters}
                  onToggle={() => setShowAdvancedFilters(!showAdvancedFilters)}
                />
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="w-full space-y-6">
            
            {/* Results Header */}
            <div className={cn(
              "flex items-center justify-between p-4 rounded-xl",
              "glass border border-white/20",
              "dark:border-white/10"
            )}>
              <div className="flex items-center gap-4">
                <h2 className="text-lg font-semibold text-foreground">
                  {filteredUsers.length} member{filteredUsers.length !== 1 ? 's' : ''} found
                </h2>
                {totalActiveFilters > 0 && (
                  <span className="px-2 py-1 text-xs font-medium bg-primary/20 text-primary rounded-full">
                    {totalActiveFilters} filter{totalActiveFilters !== 1 ? 's' : ''}
                  </span>
                )}
              </div>
              
              {/* Sort Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200",
                    "bg-white/10 border border-white/20 hover:bg-white/20",
                    "dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10",
                    "focus:outline-none focus:ring-2 focus:ring-primary/20"
                  )}
                >
                  <span className="text-sm font-medium text-foreground">
                    Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
                  </span>
                  <ChevronDown className={cn(
                    "w-4 h-4 text-foreground/70 transition-transform duration-200",
                    showSortDropdown && "rotate-180"
                  )} />
                </button>
                
                {showSortDropdown && (
                  <div className={cn(
                    "absolute right-0 top-full mt-2 w-48 py-2 rounded-lg shadow-lg z-20",
                    "backdrop-blur-[20px] bg-white/90 border border-white/20",
                    "dark:bg-card/90 dark:border-white/10"
                  )}>
                    {sortOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setSortBy(option.value);
                          setShowSortDropdown(false);
                        }}
                        className={cn(
                          "w-full px-4 py-2 text-left text-sm transition-colors",
                          "hover:bg-white/20 dark:hover:bg-white/10",
                          sortBy === option.value && "bg-primary/20 text-primary font-medium"
                        )}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Enhanced Grid with Entrance Animations */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
              {filteredUsers.map((user, index) => (
                <div
                  key={user.id}
                  className="animate-in fade-in slide-in-from-bottom-4"
                  style={{
                    animationDelay: (index * 50) + 'ms',
                    animationDuration: '400ms',
                    animationFillMode: 'both'
                  }}
                >
                  <UserCard
                    username={user.username}
                    age={user.age}
                    location={user.location}
                    imageUrl={user.imageUrl}
                    isOnline={user.isOnline}
                    distance={user.distance}
                    photosCount={user.photosCount}
                    showActions={true}
                    variant="compact"
                  />
                </div>
              ))}
            </div>

            {/* Load More Button */}
            {filteredUsers.length > 0 && (
              <div className="flex justify-center pt-8">
                <button className={cn(
                  "px-8 py-3 rounded-xl font-medium transition-all duration-300",
                  "backdrop-blur-[20px] bg-white/10 border border-white/20",
                  "hover:bg-white/20 hover:scale-105",
                  "dark:bg-white/5 dark:border-white/10 dark:hover:bg-white/10",
                  "focus:outline-none focus:ring-2 focus:ring-primary/20",
                  "text-foreground hover:text-foreground"
                )}>
                  Load More Members
                </button>
              </div>
            )}

            {/* No Results */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="space-y-4">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">No members found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your search criteria or filters to find more members.
                  </p>
                  {(query || totalActiveFilters > 0) && (
                    <button
                      onClick={clearAllFilters}
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
