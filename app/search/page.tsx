"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { Search, X, ChevronDown, SlidersHorizontal } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Footer } from "@/components/ui/Footer";
import { UserCard } from "@/components/ui/UserCard";
import { whoIsOnUsers } from "@/lib/mock-data";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { useDebouncedCallback } from "use-debounce";

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
  
  // Generate age options
  const ageOptions = Array.from({ length: 83 }, (_, i) => (i + 18).toString());
  
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

  const updateResults = () => {
    // This would trigger a search with current filters
    // For now, the filtering happens automatically via useMemo
  };

  // Active Filters Display Component
  const ActiveFilters = () => {
    const activeFilters = [];
    
    // Collect active filters
    if (relationshipType.couple) activeFilters.push({ label: "Couple", key: "couple" });
    if (relationshipType.males) activeFilters.push({ label: "Males", key: "males" });
    if (relationshipType.females) activeFilters.push({ label: "Females", key: "females" });
    if (showOnlyFilters.havePics) activeFilters.push({ label: "Have Pics", key: "havePics" });
    if (showOnlyFilters.certified) activeFilters.push({ label: "Certified", key: "certified" });
    if (showOnlyFilters.paid) activeFilters.push({ label: "Paid", key: "paid" });
    if (showOnlyFilters.watch) activeFilters.push({ label: "Watch", key: "watch" });
    if (showOnlyFilters.soft) activeFilters.push({ label: "Soft", key: "soft" });
    if (showOnlyFilters.full) activeFilters.push({ label: "Full", key: "full" });
    if (smoke !== 'any') activeFilters.push({ label: `Smoke: ${smoke}`, key: "smoke" });
    if (drink !== 'any') activeFilters.push({ label: `Drink: ${drink}`, key: "drink" });
    if (locationSearch) activeFilters.push({ label: locationSearch, key: "location" });
    if (memberSearch) activeFilters.push({ label: memberSearch, key: "member" });
    
    if (activeFilters.length === 0) return null;
    
    return (
      <div className="flex flex-wrap gap-2 mt-4">
        {activeFilters.map((filter) => (
          <button
            key={filter.key}
            className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm hover:bg-primary/20 transition-colors"
            onClick={() => {
              // Handle removing individual filters
              switch(filter.key) {
                case 'couple': setRelationshipType(prev => ({ ...prev, couple: false })); break;
                case 'males': setRelationshipType(prev => ({ ...prev, males: false })); break;
                case 'females': setRelationshipType(prev => ({ ...prev, females: false })); break;
                case 'havePics': setShowOnlyFilters(prev => ({ ...prev, havePics: false })); break;
                case 'certified': setShowOnlyFilters(prev => ({ ...prev, certified: false })); break;
                case 'paid': setShowOnlyFilters(prev => ({ ...prev, paid: false })); break;
                case 'watch': setShowOnlyFilters(prev => ({ ...prev, watch: false })); break;
                case 'soft': setShowOnlyFilters(prev => ({ ...prev, soft: false })); break;
                case 'full': setShowOnlyFilters(prev => ({ ...prev, full: false })); break;
                case 'smoke': setSmoke('any'); break;
                case 'drink': setDrink('any'); break;
                case 'location': setLocationSearch(''); break;
                case 'member': setMemberSearch(''); break;
              }
            }}
          >
            {filter.label}
            <X className="w-3 h-3" />
          </button>
        ))}
        <button
          onClick={clearAllFilters}
          className="inline-flex items-center gap-1 px-3 py-1 bg-muted text-muted-foreground rounded-full text-sm hover:bg-muted/80 transition-colors"
        >
          Clear All
          <X className="w-3 h-3" />
        </button>
      </div>
    );
  };

  // Filter Sections Component (Version 1)
  const FilterSections = () => (
    <div className="space-y-6">
      {/* Main Filter Grid - Optimized for cohesive layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        
        {/* FIRST ROW */}
        {/* Relationship Section */}
        <div className="flex flex-col h-full">
          <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-border/50 min-h-[240px] flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="text-base font-semibold text-foreground mb-4">Relationship</h3>
            <div className="flex-1 space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="couple"
                checked={relationshipType.couple}
                onCheckedChange={(checked) =>
                  setRelationshipType(prev => ({ ...prev, couple: !!checked }))
                }
              />
              <Label htmlFor="couple" className="text-sm font-medium cursor-pointer">
                Couple
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="males"
                checked={relationshipType.males}
                onCheckedChange={(checked) =>
                  setRelationshipType(prev => ({ ...prev, males: !!checked }))
                }
              />
              <Label htmlFor="males" className="text-sm font-medium cursor-pointer">
                Males
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="females"
                checked={relationshipType.females}
                onCheckedChange={(checked) =>
                  setRelationshipType(prev => ({ ...prev, females: !!checked }))
                }
              />
              <Label htmlFor="females" className="text-sm font-medium cursor-pointer">
                Females
              </Label>
            </div>
            
            {/* Orientation Dropdowns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Male</Label>
                <Select value={maleOrientation} onValueChange={setMaleOrientation}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>
                      {orientationOptions.find(opt => opt.value === maleOrientation)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {orientationOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Female</Label>
                <Select value={femaleOrientation} onValueChange={setFemaleOrientation}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>
                      {orientationOptions.find(opt => opt.value === femaleOrientation)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {orientationOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            </div>
          </div>
        </div>

        {/* Show Only Section (moved to middle of first row) */}
        <div className="flex flex-col h-full">
          <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-border/50 min-h-[180px] md:min-h-[240px] flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="text-base font-semibold text-foreground mb-4">Show Only</h3>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="havePics"
                checked={showOnlyFilters.havePics}
                onCheckedChange={(checked) =>
                  setShowOnlyFilters(prev => ({ ...prev, havePics: !!checked }))
                }
              />
              <Label htmlFor="havePics" className="text-sm font-medium cursor-pointer">
                Have Pics
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="certified"
                checked={showOnlyFilters.certified}
                onCheckedChange={(checked) =>
                  setShowOnlyFilters(prev => ({ ...prev, certified: !!checked }))
                }
              />
              <Label htmlFor="certified" className="text-sm font-medium cursor-pointer">
                Certified
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="paid"
                checked={showOnlyFilters.paid}
                onCheckedChange={(checked) =>
                  setShowOnlyFilters(prev => ({ ...prev, paid: !!checked }))
                }
              />
              <Label htmlFor="paid" className="text-sm font-medium cursor-pointer">
                Paid
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="watch"
                checked={showOnlyFilters.watch}
                onCheckedChange={(checked) =>
                  setShowOnlyFilters(prev => ({ ...prev, watch: !!checked }))
                }
              />
              <Label htmlFor="watch" className="text-sm font-medium cursor-pointer">
                Watch
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="soft"
                checked={showOnlyFilters.soft}
                onCheckedChange={(checked) =>
                  setShowOnlyFilters(prev => ({ ...prev, soft: !!checked }))
                }
              />
              <Label htmlFor="soft" className="text-sm font-medium cursor-pointer">
                Soft
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="full"
                checked={showOnlyFilters.full}
                onCheckedChange={(checked) =>
                  setShowOnlyFilters(prev => ({ ...prev, full: !!checked }))
                }
              />
              <Label htmlFor="full" className="text-sm font-medium cursor-pointer">
                Full
              </Label>
            </div>
          </div>
            </div>
          </div>
        </div>

        {/* Location Section (moved to third in first row) */}
        <div className="flex flex-col h-full">
          <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-border/50 min-h-[240px] flex flex-col h-full hover:shadow-md transition-shadow">
            <h3 className="text-base font-semibold text-foreground mb-4">Location</h3>
            <div className="flex-1 space-y-3">
              {/* Location Search */}
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">City or Postal Code</Label>
                <Input
                  type="text"
                  placeholder="Enter location..."
                  value={locationSearch}
                  onChange={(e) => setLocationSearch(e.target.value)}
                  className="w-full bg-white dark:bg-white/10 border-border/50"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Distance</Label>
                <Select value={distance} onValueChange={setDistance}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>
                      {distanceOptions.find(opt => opt.value === distance)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {distanceOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* SECOND ROW */}
        {/* Activity Section (first in second row) */}
        <div>
          <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-border/50 min-h-[180px] hover:shadow-md transition-shadow">
            <h3 className="text-base font-semibold text-foreground mb-4">Activity</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Last On</Label>
                <Select value={lastOnline} onValueChange={setLastOnline}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>
                      {lastOnlineOptions.find(opt => opt.value === lastOnline)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {lastOnlineOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">New</Label>
                <Select value={memberType} onValueChange={setMemberType}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>
                      {memberTypeOptions.find(opt => opt.value === memberType)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {memberTypeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Age Range Section (moved to second in second row) */}
        <div>
          <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-border/50 min-h-[180px] hover:shadow-md transition-shadow">
            <h3 className="text-base font-semibold text-foreground mb-4">Age Range</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Low</Label>
                <Select value={ageRange.low} onValueChange={(value) => setAgeRange(prev => ({ ...prev, low: value }))}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>{ageRange.low}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map(age => (
                      <SelectItem key={age} value={age}>
                        {age}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">High</Label>
                <Select value={ageRange.high} onValueChange={(value) => setAgeRange(prev => ({ ...prev, high: value }))}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>{ageRange.high}</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {ageOptions.map(age => (
                      <SelectItem key={age} value={age}>
                        {age}
                    </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Lifestyle Section (moved to third in second row) */}
        <div>
          <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-border/50 min-h-[180px] hover:shadow-md transition-shadow">
            <h3 className="text-base font-semibold text-foreground mb-4">Lifestyle</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Smoke</Label>
                <Select value={smoke} onValueChange={setSmoke}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>
                      {smokeOptions.find(opt => opt.value === smoke)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {smokeOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-sm text-muted-foreground">Drink</Label>
                <Select value={drink} onValueChange={setDrink}>
                  <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                    <SelectValue>
                      {drinkOptions.find(opt => opt.value === drink)?.label}
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    {drinkOptions.map(option => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Search Section - Separate from other filters */}
      <div className="bg-white dark:bg-white/5 rounded-lg p-4 border border-border/50 hover:shadow-md transition-shadow">
        <h3 className="text-base font-semibold text-foreground mb-4">Profile Search</h3>
        <div className="max-w-md mx-auto">
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Search by Profile Name</Label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Enter profile name..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="pl-10 w-full bg-white dark:bg-white/10 border-border/50"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-center pt-4">
        <button
          onClick={updateResults}
          className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:scale-105 shadow-lg"
        >
          Update Results
        </button>
      </div>
    </div>
  );

  // Filter Sections Component (Version 2 - Modern Tabbed Interface)
  const FilterSectionsV2 = ({ activeTab, setActiveTab }: { activeTab: string; setActiveTab: (value: string) => void }) => {
    // Local state for immediate slider feedback
    const [localAgeRange, setLocalAgeRange] = useState<[number, number]>([parseInt(ageRange.low), parseInt(ageRange.high)]);
    
    // Debounced callback to update actual filter state
    const debouncedAgeUpdate = useDebouncedCallback(
      (value: [number, number]) => {
        setAgeRange({ low: value[0].toString(), high: value[1].toString() });
      },
      300 // Wait 300ms after user stops sliding
    );
    
    return (
      <div className="space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="basic">Filtered Search</TabsTrigger>
            <TabsTrigger value="profile">Profile Search</TabsTrigger>
          </TabsList>
        
        <TabsContent value="basic" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Relationship Section */}
            <div className="bg-white dark:bg-white/5 rounded-lg p-6 border border-border/50 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4">Looking For</h3>
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-base">Relationship Type</Label>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => setRelationshipType(prev => ({ ...prev, couple: !prev.couple }))}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 transition-all",
                        relationshipType.couple 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      Couples
                    </button>
                    <button
                      onClick={() => setRelationshipType(prev => ({ ...prev, males: !prev.males }))}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 transition-all",
                        relationshipType.males 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      Males
                    </button>
                    <button
                      onClick={() => setRelationshipType(prev => ({ ...prev, females: !prev.females }))}
                      className={cn(
                        "px-4 py-2 rounded-lg border-2 transition-all",
                        relationshipType.females 
                          ? "border-primary bg-primary/10 text-primary" 
                          : "border-border hover:border-primary/50"
                      )}
                    >
                      Females
                    </button>
                  </div>
                </div>
                
                {/* Orientation Filters */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Male Orientation</Label>
                    <div className="flex flex-wrap gap-2">
                      {orientationOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => setMaleOrientation(option.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm transition-all",
                            maleOrientation === option.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Female Orientation</Label>
                    <div className="flex flex-wrap gap-2">
                      {orientationOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => setFemaleOrientation(option.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm transition-all",
                            femaleOrientation === option.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Age Range with Slider */}
            <div className="bg-white dark:bg-white/5 rounded-lg p-6 border border-border/50 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4">Age Range</h3>
              <div className="space-y-6">
                <div className="px-3">
                  <Slider
                    min={18}
                    max={100}
                    step={1}
                    value={localAgeRange}
                    onValueChange={(value) => {
                      setLocalAgeRange(value); // Immediate UI update
                      debouncedAgeUpdate(value); // Delayed filter update
                    }}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>Min: {localAgeRange[0]} years</span>
                  <span>Max: {localAgeRange[1]} years</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Location, Show Only, and Lifestyle Sections */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Location Section */}
            <div className="bg-white dark:bg-white/5 rounded-lg p-6 border border-border/50 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4">Location</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base">City or Postal Code</Label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter location..."
                      value={locationSearch}
                      onChange={(e) => setLocationSearch(e.target.value)}
                      className="pl-10 w-full bg-white dark:bg-white/10 border-border/50"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-base">Distance</Label>
                  <Select value={distance} onValueChange={setDistance}>
                    <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                      <SelectValue>
                        {distanceOptions.find(opt => opt.value === distance)?.label}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                      {distanceOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            {/* Show Only Filters */}
            <div className="bg-white dark:bg-white/5 rounded-lg p-6 border border-border/50 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4">Show Only</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { id: 'havePics', label: 'Have Pictures' },
                  { id: 'certified', label: 'Certified' },
                  { id: 'paid', label: 'Paid Members' },
                  { id: 'watch', label: 'Watch' },
                  { id: 'soft', label: 'Soft Swap' },
                  { id: 'full', label: 'Full Swap' }
                ].map((filter) => (
                  <button
                    key={filter.id}
                    onClick={() => setShowOnlyFilters(prev => ({ 
                      ...prev, 
                      [filter.id]: !prev[filter.id as keyof typeof showOnlyFilters] 
                    }))}
                    className={cn(
                      "px-3 py-2 rounded-lg border-2 text-sm transition-all text-left",
                      showOnlyFilters[filter.id as keyof typeof showOnlyFilters]
                        ? "border-primary bg-primary/10 text-primary" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Lifestyle & Activity */}
            <div className="bg-white dark:bg-white/5 rounded-lg p-6 border border-border/50 hover:shadow-md transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4">Lifestyle & Activity</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Smoke</Label>
                    <div className="flex flex-wrap gap-2">
                      {smokeOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => setSmoke(option.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm transition-all",
                            smoke === option.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Drink</Label>
                    <div className="flex flex-wrap gap-2">
                      {drinkOptions.map(option => (
                        <button
                          key={option.value}
                          onClick={() => setDrink(option.value)}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-sm transition-all",
                            drink === option.value
                              ? "bg-primary text-primary-foreground"
                              : "bg-muted hover:bg-muted/80 text-muted-foreground"
                          )}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Last Online</Label>
                    <Select value={lastOnline} onValueChange={setLastOnline}>
                      <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                        <SelectValue>
                          {lastOnlineOptions.find(opt => opt.value === lastOnline)?.label}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {lastOnlineOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Member Type</Label>
                    <Select value={memberType} onValueChange={setMemberType}>
                      <SelectTrigger className="w-full bg-white dark:bg-white/10 border-border/50">
                        <SelectValue>
                          {memberTypeOptions.find(opt => opt.value === memberType)?.label}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        {memberTypeOptions.map(option => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="profile" className="space-y-6">
          <div className="bg-white dark:bg-white/5 rounded-lg p-6 md:p-8 border border-border/50 hover:shadow-md transition-shadow">
            <div className="max-w-2xl">
              <h3 className="text-lg font-semibold text-foreground mb-6">Profile Search</h3>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label className="text-base font-medium">Search by Profile Name</Label>
                  <div className="relative max-w-md">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Enter username to search..."
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      className="pl-10 w-full bg-white dark:bg-white/10 border-border/50 h-11 text-base"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Active Filters Display */}
      <ActiveFilters />
      
        {/* Action Buttons */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={clearAllFilters}
            className="px-6 py-3 border-2 border-border hover:border-primary/50 text-foreground font-semibold rounded-xl transition-all hover:scale-105"
          >
            Clear Filters
          </button>
          <button
            onClick={updateResults}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:scale-105 shadow-lg"
          >
            Update Results
          </button>
        </div>
      </div>
    );
  };

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
              <span>Open Search Form</span>
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
                {formVersion === 'v1' ? <FilterSections /> : <FilterSectionsV2 activeTab={activeTabV2} setActiveTab={setActiveTabV2} />}
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
                {formVersion === 'v1' ? <FilterSections /> : <FilterSectionsV2 activeTab={activeTabV2} setActiveTab={setActiveTabV2} />}
              </div>
            </div>
          </section>

          {/* Results Section - Now using section-glass like home page */}
          <section className="w-full space-y-6">
            
            {/* Results Header - Consistent glass morphism */}
            <div className="section-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 ring-2 ring-primary/20 shadow-lg shadow-primary/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <h2 className="text-lg font-semibold text-foreground">
                    {filteredUsers.length} member{filteredUsers.length !== 1 ? 's' : ''} found
                  </h2>
                </div>
                
                {/* Sort Dropdown - FIXED POSITIONING TO ESCAPE STACKING CONTEXTS */}
                <div className="relative">
                  <button
                    ref={sortButtonRef}
                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                    className="flex items-center gap-2 px-4 py-4 rounded-xl bg-white dark:bg-gray-800 border border-border hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
                  >
                    <span className="text-base font-medium text-foreground">
                      Sort: {sortOptions.find(opt => opt.value === sortBy)?.label}
                    </span>
                    <ChevronDown className={cn(
                      "w-4 h-4 text-muted-foreground transition-transform duration-200",
                      showSortDropdown && "rotate-180"
                    )} />
                  </button>
                </div>
              </div>
            </div>

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
        <div
          id="sort-dropdown"
          className="fixed w-48 py-2 rounded-xl shadow-xl bg-white dark:bg-gray-800 border border-border z-[999999]"
          style={{
            top: dropdownPosition.top,
            right: dropdownPosition.right,
          }}
        >
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                setSortBy(option.value);
                setShowSortDropdown(false);
              }}
              className={cn(
                "w-full px-4 py-2 text-left text-base transition-colors hover:bg-accent hover:text-accent-foreground",
                sortBy === option.value && "bg-primary/20 text-primary font-medium"
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
