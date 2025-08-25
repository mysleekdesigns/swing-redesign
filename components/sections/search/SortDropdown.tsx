import { cn } from "@/lib/utils";

interface SortDropdownProps {
  sortOptions: { label: string; value: string }[];
  sortBy: string;
  setSortBy: (value: string) => void;
  setShowSortDropdown: (show: boolean) => void;
  dropdownPosition: { top: number; right: number };
}

export function SortDropdown({
  sortOptions,
  sortBy,
  setSortBy,
  setShowSortDropdown,
  dropdownPosition,
}: SortDropdownProps) {
  return (
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
  );
}