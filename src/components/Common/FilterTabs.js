import { jsx as _jsx } from "react/jsx-runtime";
const FilterTabs = ({ selected, onSelect, options, }) => {
    const isSelected = (value) => {
        if (Array.isArray(value) && Array.isArray(selected)) {
            return JSON.stringify(value) === JSON.stringify(selected);
        }
        return value === selected;
    };
    return (_jsx("div", { className: "flex flex-wrap gap-2 my-4", children: options.map(({ label, value }) => (_jsx("button", { className: `px-4 py-1 rounded-full border ${isSelected(value) ? "bg-black text-white" : "bg-white text-black"}`, onClick: () => onSelect(value), children: label }, label))) }));
};
export default FilterTabs;
