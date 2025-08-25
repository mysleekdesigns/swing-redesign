"use client";

import { Search } from "lucide-react";
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

interface SearchFiltersV1Props {
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
  updateResults: () => void;
}

export function SearchFiltersV1({
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
  updateResults,
}: SearchFiltersV1Props) {
  // Generate age options
  const ageOptions = Array.from({ length: 83 }, (_, i) => (i + 18).toString());

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="filtered">Filtered Search</TabsTrigger>
          <TabsTrigger value="profile">Profile Search</TabsTrigger>
        </TabsList>
        
        <TabsContent value="filtered" className="space-y-6">
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

          {/* Action Buttons */}
          <div className="flex justify-center pt-4">
            <button
              onClick={updateResults}
              className="w-full sm:w-auto px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all hover:scale-105 shadow-lg"
            >
              Update Results
            </button>
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