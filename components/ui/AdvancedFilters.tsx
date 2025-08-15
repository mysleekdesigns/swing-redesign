"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterPill } from "./FilterPill";

interface AdvancedFiltersProps {
  isOpen: boolean;
  onToggle: () => void;
  className?: string;
}

interface FilterGroup {
  title: string;
  options: { label: string; value: string }[];
}

const filterGroups: FilterGroup[] = [
  {
    title: "Age Range",
    options: [
      { label: "18-25", value: "18-25" },
      { label: "26-35", value: "26-35" },
      { label: "36-45", value: "36-45" },
      { label: "46+", value: "46+" }
    ]
  },
  {
    title: "Distance",
    options: [
      { label: "5km", value: "5km" },
      { label: "10km", value: "10km" },
      { label: "25km", value: "25km" },
      { label: "50km+", value: "50km+" }
    ]
  },
  {
    title: "Online Status",
    options: [
      { label: "Online Now", value: "online" },
      { label: "Recently Active", value: "recent" },
      { label: "All", value: "all" }
    ]
  },
  {
    title: "Interests",
    options: [
      { label: "Travel", value: "travel" },
      { label: "Music", value: "music" },
      { label: "Sports", value: "sports" },
      { label: "Food", value: "food" },
      { label: "Art", value: "art" },
      { label: "Movies", value: "movies" },
      { label: "Books", value: "books" },
      { label: "Gaming", value: "gaming" }
    ]
  }
];

export function AdvancedFilters({ isOpen, onToggle, className }: AdvancedFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});
  const [isPhotoVerified, setIsPhotoVerified] = useState(false);

  const toggleFilter = (groupTitle: string, value: string) => {
    setSelectedFilters(prev => {
      const group = prev[groupTitle] || [];
      const isSelected = group.includes(value);
      
      return {
        ...prev,
        [groupTitle]: isSelected 
          ? group.filter(item => item !== value)
          : [...group, value]
      };
    });
  };

  const clearAllFilters = () => {
    setSelectedFilters({});
    setIsPhotoVerified(false);
  };

  const activeFilterCount = Object.values(selectedFilters).flat().length + (isPhotoVerified ? 1 : 0);

  return (
    <div className={cn("w-full", className)}>
      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300",
          "glass border border-white/20 hover:border-white/30",
          "dark:border-white/10 dark:hover:border-white/20",
          "focus:outline-none focus:ring-2 focus:ring-primary/20"
        )}
      >
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-foreground/70" />
          <span className="text-sm font-medium text-foreground">Advanced Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-primary-foreground bg-primary rounded-full">
              {activeFilterCount}
            </span>
          )}
        </div>
        <ChevronDown 
          className={cn(
            "w-4 h-4 text-foreground/70 transition-transform duration-300",
            isOpen && "rotate-180"
          )} 
        />
      </button>

      {/* Collapsible Content */}
      <div className={cn(
        "overflow-hidden transition-all duration-300 ease-in-out",
        isOpen ? "max-h-[800px] opacity-100 mt-4" : "max-h-0 opacity-0"
      )}>
        <div className={cn(
          "p-6 rounded-xl space-y-6",
          "backdrop-blur-[20px] bg-white/10 border border-white/20",
          "dark:bg-white/5 dark:border-white/10",
          "shadow-lg shadow-black/5",
          "dark:shadow-[0_0_30px_oklch(0.75_0.23_85_/_5%)]"
        )}>
          
          {/* Clear Filters Button */}
          {activeFilterCount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                {activeFilterCount} filter{activeFilterCount !== 1 ? 's' : ''} active
              </span>
              <button
                onClick={clearAllFilters}
                className="flex items-center gap-2 px-3 py-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-3 h-3" />
                Clear all
              </button>
            </div>
          )}

          {/* Filter Groups */}
          {filterGroups.map((group) => (
            <div key={group.title} className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.options.map((option) => (
                  <FilterPill
                    key={option.value}
                    label={option.label}
                    isActive={selectedFilters[group.title]?.includes(option.value)}
                    onClick={() => toggleFilter(group.title, option.value)}
                  />
                ))}
              </div>
            </div>
          ))}

          {/* Photo Verified Toggle */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-foreground">Verification</h3>
            <FilterPill
              label="Photo Verified"
              isActive={isPhotoVerified}
              onClick={() => setIsPhotoVerified(!isPhotoVerified)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
