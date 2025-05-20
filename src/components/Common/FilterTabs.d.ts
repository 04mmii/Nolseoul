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
declare const FilterTabs: React.FC<FilterTabsProps>;
export default FilterTabs;
