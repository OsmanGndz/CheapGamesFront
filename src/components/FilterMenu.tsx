import React from "react";

type ObjFilter = { name: string; icon?: React.ReactNode; endpoint: string };
type FilterMenuProps<T extends string | ObjFilter> = {
  filters: T[];
  filter: T;
  setFilter: React.Dispatch<React.SetStateAction<T>>;
};

function FilterMenu<T extends string | ObjFilter>({
  filters,
  filter,
  setFilter,
}: FilterMenuProps<T>) {
  const handleFilterChange = (selectedFilter: T) => {
    setFilter(selectedFilter);
  };

  const isObj = (item: any): item is ObjFilter =>
    typeof item === "object" && item !== null && "name" in item;

  return (
    <div className="flex justify-center">
      <div
        className={`${
          isObj(filters[0])
            ? "grid grid-cols-2 md:grid-cols-4 gap-4"
            : " grid grid-cols-3 md:grid-cols-5  gap-4"
        }`}
      >
        {filters.map((filt, idx) =>
          isObj(filt) ? (
            <div
              key={`${filt.name}-${idx}`}
              className={`flex pb-1 items-center gap-1 text-[16px] justify-center cursor-pointer hover:text-blue-400 ${
                (filter as ObjFilter).name === filt.name
                  ? "text-white border-b-1 border-white"
                  : "text-zinc-400"
              }`}
              onClick={() => handleFilterChange(filt)}
            >
              {filt.icon}
              <span className="font-semibold">{filt.name}</span>
            </div>
          ) : (
            <div
              key={`${filt}-${idx}`}
              className={`flex pb-1 items-center gap-1 text-[20px] justify-center cursor-pointer hover:text-blue-400 ${
                filter === filt
                  ? "text-white border-b-1 border-white"
                  : "text-zinc-400"
              }`}
              onClick={() => handleFilterChange(filt)}
            >
              <span className="font-semibold">{filt}</span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default FilterMenu;
