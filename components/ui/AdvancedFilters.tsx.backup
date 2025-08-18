"use client";

import { useState } from "react";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
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

  const activeFilterCount = Object.values(selectedFilters).flat().length + (isPhotoVerified ? 1 : 0);

  return (
    <div className={cn("w-full", className)}>
      {/* Toggle Button with improved light mode contrast */}
      <button
        onClick={onToggle}
        className={cn(
          "w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300",
          // Light mode: Use muted background for better contrast
          "bg-muted border border-border/60 hover:bg-muted/80",
          // Dark mode: Keep existing glass effect
          "dark:backdrop-blur-[20px] dark:bg-white/5 dark:border-white/10 dark:hover:border-white/20",
          "focus:outline-none focus:ring-2 focus:ring-primary/20"
        )}
      >
        <div className="flex items-center gap-3">
          <SlidersHorizontal className="w-5 h-5 text-foreground/70" />
          <span className="text-base font-medium text-foreground">Advanced Filters</span>
          {activeFilterCount > 0 && (
            <span className="flex items-center justify-center w-6 h-6 text-sm font-bold text-primary-foreground bg-primary rounded-full">
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
          "p-6 rounded-xl",
          // Light mode: Use card background for better contrast
          "bg-card border border-border/60 shadow-sm",
          // Dark mode: Keep existing glass effect
          "dark:backdrop-blur-[20px] dark:bg-white/5 dark:border-white/10",
          "dark:shadow-[0_0_30px_oklch(0.75_0.23_85_/_5%)]"
        )}>
          

          {/* Responsive Filter Groups Container */}
          <div className={cn(
            // Mobile: Single column, stack vertically
            "grid grid-cols-1 gap-6",
            // Tablet: Two columns for better space utilization
            "md:grid-cols-2 md:gap-x-8 md:gap-y-6",
            // Large screens: Two columns with more spacing
            "lg:grid-cols-2 lg:gap-x-10 lg:gap-y-6",
            // Extra large screens: Consider three columns for very wide screens
            "xl:grid-cols-2 xl:gap-x-12 xl:gap-y-8"
          )}>
            {/* Filter Groups */}
            {filterGroups.map((group) => (
              <div key={group.title} className="space-y-3">
                <h3 className="text-base font-semibold text-foreground">{group.title}</h3>
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

            {/* Photo Verified Toggle - Always spans full width */}
            <div className="space-y-3 md:col-span-2">
              <h3 className="text-base font-semibold text-foreground">Verification</h3>
              <FilterPill
                label="Photo Verified"
                isActive={isPhotoVerified}
                onClick={() => setIsPhotoVerified(!isPhotoVerified)}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
