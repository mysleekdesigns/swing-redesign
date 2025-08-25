"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsHeaderProps {
  resultCount: number;
  sortBy: string;
  showSortDropdown: boolean;
  setShowSortDropdown: (show: boolean) => void;
  sortButtonRef: React.RefObject<HTMLButtonElement>;
  sortOptions: { label: string; value: string }[];
}

export function ResultsHeader({
  resultCount,
  sortBy,
  showSortDropdown,
  setShowSortDropdown,
  sortButtonRef,
  sortOptions,
}: ResultsHeaderProps) {
  return (
    <div className="section-glass rounded-xl sm:rounded-2xl p-4 sm:p-6 ring-2 ring-primary/20 shadow-lg shadow-primary/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-semibold text-foreground">
            {resultCount} member{resultCount !== 1 ? 's' : ''} found
          </h2>
        </div>
        
        {/* Sort Dropdown Button */}
        <div className="relative">
          <button
            ref={sortButtonRef}
            onClick={() => setShowSortDropdown(!showSortDropdown)}
            className="flex items-center gap-2 px-4 py-4 rounded-xl bg-background border border-border hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all duration-200"
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
  );
}