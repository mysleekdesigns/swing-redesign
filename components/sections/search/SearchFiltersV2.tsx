"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
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

interface SearchFiltersV2Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  relationshipType: {
    couple: boolean;
    males: boolean;
    females: boolean;
  };
  setRelationshipType: (type: React.SetStateAction<{ couple: boolean; males: boolean; females: boolean }>) => void;
  maleOrientation: string;
  setMaleOrientation: (value: string) => void;
  femaleOrientation: string;
  setFemaleOrientation: (value: string) => void;
  ageRange: {
    low: string;
    high: string;
  };
  setAgeRange: (range: React.SetStateAction<{ low: string; high: string }>) => void;
  showOnlyFilters: {
    havePics: boolean;
    certified: boolean;
    paid: boolean;
    watch: boolean;
    soft: boolean;
    full: boolean;
  };
  setShowOnlyFilters: (filters: React.SetStateAction<{ havePics: boolean; certified: boolean; paid: boolean; watch: boolean; soft: boolean; full: boolean }>) => void;
  smoke: string;
  setSmoke: (value: string) => void;
  drink: string;
  setDrink: (value: string) => void;
  lastOnline: string;
  setLastOnline: (value: string) => void;
  memberType: string;
  setMemberType: (value: string) => void;
  locationSearch: string;
  setLocationSearch: (value: string) => void;
  distance: string;
  setDistance: (value: string) => void;
  memberSearch: string;
  setMemberSearch: (value: string) => void;
}

export function SearchFiltersV2({
  activeTab,
  setActiveTab,
  relationshipType,
  setRelationshipType,
  maleOrientation,
  setMaleOrientation,
  femaleOrientation,
  setFemaleOrientation,
  ageRange,
  setAgeRange,
  showOnlyFilters,
  setShowOnlyFilters,
  smoke,
  setSmoke,
  drink,
  setDrink,
  lastOnline,
  setLastOnline,
  memberType,
  setMemberType,
  locationSearch,
  setLocationSearch,
  distance,
  setDistance,
  memberSearch,
  setMemberSearch,
}: SearchFiltersV2Props) {
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
                <div className="flex flex-wrap gap-2">
                  {distanceOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setDistance(option.value)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-all",
                        distance === option.value
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
    </div>
  );
}