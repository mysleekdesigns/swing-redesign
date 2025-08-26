"use client";

import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Filter, Users, UserX } from "lucide-react";

type FilterType = {
  [key: string]: "interested" | "no_interest" | "block_them" | "viewable";
};

interface FiltersSectionProps {
  filters: FilterType;
  onChange: (filters: FilterType) => void;
  title?: string;
  isSingleMembers?: boolean;
}

export function FiltersSection({ 
  filters, 
  onChange, 
  title = "Interest Filters",
  isSingleMembers = false 
}: FiltersSectionProps) {
  
  const filterOptions = isSingleMembers 
    ? [
        { value: "interested", label: "Interested" },
        { value: "no_interest", label: "No Interest" },
        { value: "block_them", label: "Block Them (Profile not viewable)" }
      ]
    : [
        { value: "viewable", label: "Viewable" },
        { value: "no_interest", label: "No Interest" },
        { value: "block_them", label: "Block Them (Profile not viewable)" }
      ];

  const getFilterLabel = (key: string) => {
    if (isSingleMembers) {
      return key === "men" ? "Single Men" : "Single Women";
    }
    return key === "blockSingles" ? "Singles" : "Couples";
  };

  const getIcon = (key: string) => {
    if (isSingleMembers) {
      return <Users className="h-4 w-4 text-muted-foreground" />;
    }
    return key === "blockSingles" 
      ? <UserX className="h-4 w-4 text-muted-foreground" />
      : <Users className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className="rounded-2xl bg-background border border-border p-6 space-y-4 h-full">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          <Filter className="h-5 w-5 text-primary" />
        </div>
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {Object.keys(filters).map((key) => (
          <div key={key} className="space-y-2">
            <div className="flex items-center gap-2">
              {getIcon(key)}
              <Label 
                htmlFor={`filter-${key}`} 
                className="text-sm font-medium text-foreground"
              >
                {getFilterLabel(key)}
              </Label>
            </div>
            
            <Select
              value={filters[key]}
              onValueChange={(value) => onChange({ [key]: value } as FilterType)}
            >
              <SelectTrigger id={`filter-${key}`} className="w-full">
                <SelectValue placeholder={isSingleMembers ? "Interested" : "Viewable"} />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            {!isSingleMembers && (
              <p className="text-xs text-muted-foreground">
                Are you interested in meeting {key === "blockSingles" ? "Singles" : "Couples"}?
              </p>
            )}
          </div>
        ))}
        
        {isSingleMembers && (
          <div className="p-3 rounded-lg bg-muted/50 border border-border">
            <p className="text-xs text-muted-foreground">
              Control who can view your profile based on member type
            </p>
          </div>
        )}
      </div>
    </div>
  );
}