import React from "react";
import type { FilterProps } from "../types/MiniSlider";

const FilterMenu: React.FC<FilterProps> = ({ filters, filter, setFilter }) => {
  return (
    <div className="flex justify-center">
      <div className="flex gap-4">
        {filters.map((filt, idx) => (
          <div key={`${filt.name}-${idx}`} className={`flex pb-1 items-center gap-1  cursor-pointer hover:text-blue-400 ${filt.name === filter ? "text-white  border-b-1 border-white" : "text-zinc-400"}`} onClick={() => {
            setFilter(filt.name);
          }}>
            {filt.icon}
            <span className="text-sm font-semibold">{filt.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterMenu;
