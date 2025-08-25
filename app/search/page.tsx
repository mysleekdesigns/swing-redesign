"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, SlidersHorizontal } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/ui/Footer";
import { UserCard } from "@/components/ui/UserCard";
import { whoIsOnUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { SearchFiltersV1 } from "@/components/sections/search/SearchFiltersV1";
import { SearchFiltersV2 } from "@/components/sections/search/SearchFiltersV2";
import { ActiveFilters } from "@/components/sections/search/ActiveFilters";
import { ResultsHeader } from "@/components/sections/search/ResultsHeader";
import { SortDropdown } from "@/components/sections/search/SortDropdown";

// Filter options
const orientationOptions = [
  { label: "Straight or Bi", value: "straight_or_bi" },
  { label: "Straight", value: "straight" },
  { label: "Bisexual", value: "bisexual" },
  { label: "Gay", value: "gay" },
];

const smokeOptions = [
  { label: "Any", value: "any" },
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const drinkOptions = [
  { label: "Any", value: "any" },
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
  { label: "Socially", value: "socially" },
];

const lastOnlineOptions = [
  { label: "1 Hour", value: "1_hour" },
  { label: "1 Day", value: "1_day" },
  { label: "1 Week", value: "1_week" },
  { label: "1 Month", value: "1_month" },
  { label: "3 Months", value: "3_months" },
  { label: "6 Months", value: "6_months" },
  { label: "1 Year", value: "1_year" },
];

const memberTypeOptions = [
  { label: "Show All Members", value: "all" },
  { label: "New Members Only", value: "new" },
];

const distanceOptions = [
  { label: "10 Miles", value: "10" },
  { label: "25 Miles", value: "25" },
  { label: "50 Miles", value: "50" },
  { label: "100 Miles", value: "100" },
  { label: "250 Miles", value: "250" },
  { label: "500 Miles", value: "500" },
];

const sortOptions = [
  { label: "Distance", value: "distance" },
  { label: "Recently Active", value: "recent" },
  { label: "New", value: "new" }
];

export default function SearchPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('distance');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, right: 0 });
  const [formVersion, setFormVersion] = useState<'v1' | 'v2'>('v1');
  const [activeTabV1, setActiveTabV1] = useState("filtered");
  const [activeTabV2, setActiveTabV2] = useState("basic");
  
  const sortButtonRef = useRef<HTMLButtonElement>(null);
  
  // Filter states - Relationship
  const [relationshipType, setRelationshipType] = useState({
    couple: true,
    males: false,
    females: true,
  });
  const [maleOrientation, setMaleOrientation] = useState('straight_or_bi');
  const [femaleOrientation, setFemaleOrientation] = useState('straight_or_bi');
  
  // Filter states - Age
  const [ageRange, setAgeRange] = useState({
    low: '30',
    high: '45',
  });
  
  // Filter states - Show Only
  const [showOnlyFilters, setShowOnlyFilters] = useState({
    havePics: false,
    certified: false,
    paid: false,
    watch: true,
    soft: true,
    full: true,
  });
  
  // Filter states - Lifestyle
  const [smoke, setSmoke] = useState('any');
  const [drink, setDrink] = useState('any');
  const [lastOnline, setLastOnline] = useState('1_month');
  const [memberType, setMemberType] = useState('all');
  
  // Filter states - Search
  const [locationSearch, setLocationSearch] = useState('');
  const [distance, setDistance] = useState('50');
  const [memberSearch, setMemberSearch] = useState('');
  
  
  // Calculate dropdown position when it opens
  useEffect(() => {
    if (showSortDropdown && sortButtonRef.current) {
      const rect = sortButtonRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8, // 8px margin
        right: window.innerWidth - rect.right // Align to right edge
      });
    }
  }, [showSortDropdown]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortButtonRef.current && !sortButtonRef.current.contains(event.target as Node)) {
        const dropdown = document.getElementById('sort-dropdown');
        if (dropdown && !dropdown.contains(event.target as Node)) {
          setShowSortDropdown(false);
        }
      }
    };

    if (showSortDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [showSortDropdown]);
  
  const filteredUsers = useMemo(() => {
    return whoIsOnUsers.filter(user => {
      // Member search filtering
      if (memberSearch && !user.username.toLowerCase().includes(memberSearch.toLowerCase())) {
        return false;
      }
      
      // Location search filtering
      if (locationSearch && !user.location.toLowerCase().includes(locationSearch.toLowerCase())) {
        return false;
      }
      
      // Age filtering
      const lowAge = parseInt(ageRange.low);
      const highAge = parseInt(ageRange.high);
      if (user.age < lowAge || user.age > highAge) {
        return false;
      }
      
      // Show only filters
      if (showOnlyFilters.havePics && (!user.photosCount || user.photosCount === 0)) {
        return false;
      }
      
      // Member type filtering
      if (memberType === 'new') {
        // Filter for new members (example: joined within last 30 days)
        // This would normally check against a joinDate field
      }
      
      return true;
    });
  }, [memberSearch, locationSearch, ageRange, showOnlyFilters, memberType]);

  const clearAllFilters = () => {
    setRelationshipType({ couple: false, males: false, females: false });
    setMaleOrientation('straight_or_bi');
    setFemaleOrientation('straight_or_bi');
    setAgeRange({ low: '18', high: '100' });
    setShowOnlyFilters({
      havePics: false,
      certified: false,
      paid: false,
      watch: false,
      soft: false,
      full: false,
    });
    setSmoke('any');
    setDrink('any');
    setLastOnline('1_month');
    setMemberType('all');
    setLocationSearch('');
    setDistance('50');
    setMemberSearch('');
  };

  // Component removed - using imported version

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      {/* Main Content */}
      <main className="2xl:ml-64 2xl:pt-4 p-4 sm:p-6 lg:p-8">
        <div className="w-full space-y-4 sm:space-y-6 lg:space-y-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden">
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className="w-full flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold transition-all"
            >
              <SlidersHorizontal className="w-5 h-5" />
              <span>{showMobileFilters ? 'Close Search Form' : 'Open Search Form'}</span>
            </button>
          </div>
          
          {/* Search Filters Section */}
          <section>
            {/* Desktop Filters */}
            <div className="hidden lg:block">
              <div className="section-glass rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 ring-2 ring-primary/20 shadow-lg shadow-primary/10">
                {/* Version Switcher */}
                <div className="flex justify-center gap-2 mb-6">
                  <button
                    onClick={() => setFormVersion('v1')}
                    className={cn(
                      "px-6 py-2 rounded-lg font-medium transition-all",
                      formVersion === 'v1' 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    Version 1
                  </button>
                  <button
                    onClick={() => setFormVersion('v2')}
                    className={cn(
                      "px-6 py-2 rounded-lg font-medium transition-all",
                      formVersion === 'v2' 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    Version 2
                  </button>
                </div>
                
                {/* Render the appropriate form version */}
                {formVersion === 'v1' ? (
                  <SearchFiltersV1
                    activeTab={activeTabV1}
                    setActiveTab={setActiveTabV1}
                    relationshipType={relationshipType}
                    setRelationshipType={setRelationshipType}
                    maleOrientation={maleOrientation}
                    setMaleOrientation={setMaleOrientation}
                    femaleOrientation={femaleOrientation}
                    setFemaleOrientation={setFemaleOrientation}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                    locationSearch={locationSearch}
                    setLocationSearch={setLocationSearch}
                    memberSearch={memberSearch}
                    setMemberSearch={setMemberSearch}
                    lastOnline={lastOnline}
                    setLastOnline={setLastOnline}
                    memberType={memberType}
                    setMemberType={setMemberType}
                    distance={distance}
                    setDistance={setDistance}
                    showOnlyFilters={showOnlyFilters}
                    setShowOnlyFilters={setShowOnlyFilters}
                    smoke={smoke}
                    setSmoke={setSmoke}
                    drink={drink}
                    setDrink={setDrink}
                    orientationOptions={orientationOptions}
                    smokeOptions={smokeOptions}
                    drinkOptions={drinkOptions}
                    lastOnlineOptions={lastOnlineOptions}
                    memberTypeOptions={memberTypeOptions}
                    distanceOptions={distanceOptions}
                  />
                ) : (
                  <SearchFiltersV2
                    activeTab={activeTabV2}
                    setActiveTab={setActiveTabV2}
                    relationshipType={relationshipType}
                    setRelationshipType={setRelationshipType}
                    maleOrientation={maleOrientation}
                    setMaleOrientation={setMaleOrientation}
                    femaleOrientation={femaleOrientation}
                    setFemaleOrientation={setFemaleOrientation}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                    locationSearch={locationSearch}
                    setLocationSearch={setLocationSearch}
                    memberSearch={memberSearch}
                    setMemberSearch={setMemberSearch}
                    lastOnline={lastOnline}
                    setLastOnline={setLastOnline}
                    memberType={memberType}
                    setMemberType={setMemberType}
                    distance={distance}
                    setDistance={setDistance}
                    showOnlyFilters={showOnlyFilters}
                    setShowOnlyFilters={setShowOnlyFilters}
                    smoke={smoke}
                    setSmoke={setSmoke}
                    drink={drink}
                    setDrink={setDrink}
                    orientationOptions={orientationOptions}
                    smokeOptions={smokeOptions}
                    drinkOptions={drinkOptions}
                    lastOnlineOptions={lastOnlineOptions}
                    memberTypeOptions={memberTypeOptions}
                    distanceOptions={distanceOptions}
                  />
                )}
                
                {/* Active Filters Display */}
                <ActiveFilters
                  relationshipType={relationshipType}
                  showOnlyFilters={showOnlyFilters}
                  smoke={smoke}
                  drink={drink}
                  locationSearch={locationSearch}
                  memberSearch={memberSearch}
                  setRelationshipType={setRelationshipType}
                  setShowOnlyFilters={setShowOnlyFilters}
                  setSmoke={setSmoke}
                  setDrink={setDrink}
                  setLocationSearch={setLocationSearch}
                  setMemberSearch={setMemberSearch}
                  clearAllFilters={clearAllFilters}
                />
              </div>
            </div>
            
            {/* Mobile Filters - Collapsible */}
            <div className={cn(
              "lg:hidden overflow-hidden transition-all duration-300",
              showMobileFilters ? "max-h-[3000px]" : "max-h-0"
            )}>
              <div className="section-glass rounded-2xl p-4 ring-2 ring-primary/20 shadow-lg shadow-primary/10">
                {/* Version Switcher for Mobile */}
                <div className="flex justify-center gap-2 mb-4">
                  <button
                    onClick={() => setFormVersion('v1')}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                      formVersion === 'v1' 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    Version 1
                  </button>
                  <button
                    onClick={() => setFormVersion('v2')}
                    className={cn(
                      "px-4 py-2 rounded-lg font-medium text-sm transition-all",
                      formVersion === 'v2' 
                        ? "bg-primary text-primary-foreground shadow-lg" 
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    )}
                  >
                    Version 2
                  </button>
                </div>
                
                {/* Render the appropriate form version */}
                {formVersion === 'v1' ? (
                  <SearchFiltersV1
                    activeTab={activeTabV1}
                    setActiveTab={setActiveTabV1}
                    relationshipType={relationshipType}
                    setRelationshipType={setRelationshipType}
                    maleOrientation={maleOrientation}
                    setMaleOrientation={setMaleOrientation}
                    femaleOrientation={femaleOrientation}
                    setFemaleOrientation={setFemaleOrientation}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                    locationSearch={locationSearch}
                    setLocationSearch={setLocationSearch}
                    memberSearch={memberSearch}
                    setMemberSearch={setMemberSearch}
                    lastOnline={lastOnline}
                    setLastOnline={setLastOnline}
                    memberType={memberType}
                    setMemberType={setMemberType}
                    distance={distance}
                    setDistance={setDistance}
                    showOnlyFilters={showOnlyFilters}
                    setShowOnlyFilters={setShowOnlyFilters}
                    smoke={smoke}
                    setSmoke={setSmoke}
                    drink={drink}
                    setDrink={setDrink}
                    orientationOptions={orientationOptions}
                    smokeOptions={smokeOptions}
                    drinkOptions={drinkOptions}
                    lastOnlineOptions={lastOnlineOptions}
                    memberTypeOptions={memberTypeOptions}
                    distanceOptions={distanceOptions}
                  />
                ) : (
                  <SearchFiltersV2
                    activeTab={activeTabV2}
                    setActiveTab={setActiveTabV2}
                    relationshipType={relationshipType}
                    setRelationshipType={setRelationshipType}
                    maleOrientation={maleOrientation}
                    setMaleOrientation={setMaleOrientation}
                    femaleOrientation={femaleOrientation}
                    setFemaleOrientation={setFemaleOrientation}
                    ageRange={ageRange}
                    setAgeRange={setAgeRange}
                    locationSearch={locationSearch}
                    setLocationSearch={setLocationSearch}
                    memberSearch={memberSearch}
                    setMemberSearch={setMemberSearch}
                    lastOnline={lastOnline}
                    setLastOnline={setLastOnline}
                    memberType={memberType}
                    setMemberType={setMemberType}
                    distance={distance}
                    setDistance={setDistance}
                    showOnlyFilters={showOnlyFilters}
                    setShowOnlyFilters={setShowOnlyFilters}
                    smoke={smoke}
                    setSmoke={setSmoke}
                    drink={drink}
                    setDrink={setDrink}
                    orientationOptions={orientationOptions}
                    smokeOptions={smokeOptions}
                    drinkOptions={drinkOptions}
                    lastOnlineOptions={lastOnlineOptions}
                    memberTypeOptions={memberTypeOptions}
                    distanceOptions={distanceOptions}
                  />
                )}
              </div>
            </div>
          </section>

          {/* Results Section - Now using section-glass like home page */}
          <section className="w-full space-y-6">
            
            {/* Results Header - Consistent glass morphism */}
            <ResultsHeader
              resultCount={filteredUsers.length}
              sortBy={sortBy}
              showSortDropdown={showSortDropdown}
              setShowSortDropdown={setShowSortDropdown}
              sortButtonRef={sortButtonRef}
              sortOptions={sortOptions}
            />

            {/* Enhanced Grid with Entrance Animations - Same as home page */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
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
                    photosCount={user.photosCount}
                    showActions={true}
                    variant="compact"
                  />
                </div>
              ))}
            </div>

            {/* Load More Button - Full width on mobile */}
            {filteredUsers.length > 0 && (
              <div className="pt-4 sm:pt-6 lg:pt-8">
                <button className="w-full lg:w-auto lg:mx-auto lg:block px-8 py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-semibold transition-all hover:scale-105">
                  Load More Members
                </button>
              </div>
            )}

            {/* No Results - Consistent text colors */}
            {filteredUsers.length === 0 && (
              <div className="text-center py-12">
                <div className="space-y-4">
                  <Search className="w-12 h-12 mx-auto text-muted-foreground" />
                  <h3 className="text-lg font-semibold text-foreground">No members found</h3>
                  <p className="text-muted-foreground max-w-md mx-auto">
                    Try adjusting your search criteria or filters to find more members.
                  </p>
                  {(locationSearch || memberSearch) && (
                    <button
                      onClick={clearAllFilters}
                      className="inline-flex items-center gap-2 px-4 py-2 text-base font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                      <X className="w-4 h-4" />
                      Clear all filters
                    </button>
                  )}
                </div>
              </div>
            )}
          </section>
        </div>

        {/* Footer */}
        <Footer />
      </main>

      {/* DROPDOWN PORTAL - RENDERS AT DOCUMENT LEVEL TO ESCAPE ALL STACKING CONTEXTS */}
      {showSortDropdown && (
        <SortDropdown
          sortOptions={sortOptions}
          sortBy={sortBy}
          setSortBy={setSortBy}
          setShowSortDropdown={setShowSortDropdown}
          dropdownPosition={dropdownPosition}
        />
      )}
    </div>
  );
}
