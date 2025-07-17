import React from "react";
import type { FilterGameProps } from "../types/ShowGames";

const FilterGame: React.FC<FilterGameProps> = ({
  filters,
  filter,
  setFilter,
}) => {
  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-3 md:grid-cols-5 gap-1">
        {filters?.map((filt, idx) => (
          <div
            key={`${filt}-${idx}`}
            className={`flex pb-1 items-center gap-1 text-[18px] justify-center  cursor-pointer hover:text-blue-400 ${
              filt === filter
                ? "text-white  border-b-1 border-white"
                : "text-zinc-400"
            }`}
            onClick={() => handleFilterChange(filt)}
          >
            <p className="font-bold">{filt.toUpperCase()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterGame;
