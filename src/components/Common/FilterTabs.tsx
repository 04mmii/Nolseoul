import * as React from "react";

export type CategoryValue = string | string[];

export interface CategoryOption {
  label: string;
  value: CategoryValue;
}

interface FilterTabsProps {
  selected: CategoryValue;
  onSelect: (value: CategoryValue) => void;
  options: CategoryOption[];
}

const FilterTabs: React.FC<FilterTabsProps> = ({
  selected,
  onSelect,
  options,
}) => {
  const isSelected = (value: CategoryValue) => {
    if (Array.isArray(value) && Array.isArray(selected)) {
      return JSON.stringify(value) === JSON.stringify(selected);
    }
    return value === selected;
  };

  return (
    <div className="flex flex-wrap gap-2 my-4">
      {options.map(({ label, value }) => (
        <button
          key={label}
          className={`px-4 py-1 rounded-full border ${
            isSelected(value) ? "bg-black text-white" : "bg-white text-black"
          }`}
          onClick={() => onSelect(value)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};

export default FilterTabs;
