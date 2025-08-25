import { X } from "lucide-react";

interface ActiveFiltersProps {
  relationshipType: {
    couple: boolean;
    males: boolean;
    females: boolean;
  };
  showOnlyFilters: {
    havePics: boolean;
    certified: boolean;
    paid: boolean;
    watch: boolean;
    soft: boolean;
    full: boolean;
  };
  smoke: string;
  drink: string;
  locationSearch: string;
  memberSearch: string;
  setRelationshipType: (type: React.SetStateAction<{ couple: boolean; males: boolean; females: boolean }>) => void;
  setShowOnlyFilters: (filters: React.SetStateAction<{ havePics: boolean; certified: boolean; paid: boolean; watch: boolean; soft: boolean; full: boolean }>) => void;
  setSmoke: (value: string) => void;
  setDrink: (value: string) => void;
  setLocationSearch: (value: string) => void;
  setMemberSearch: (value: string) => void;
  clearAllFilters: () => void;
}

export function ActiveFilters({
  relationshipType,
  showOnlyFilters,
  smoke,
  drink,
  locationSearch,
  memberSearch,
  setRelationshipType,
  setShowOnlyFilters,
  setSmoke,
  setDrink,
  setLocationSearch,
  setMemberSearch,
  clearAllFilters,
}: ActiveFiltersProps) {
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
}