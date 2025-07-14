import { useQuery } from "@tanstack/react-query";
import { fetchFilteredGameData } from "../services/GameService";
import type { FilterProps } from "../types/MiniSlider";
import { useEffect } from "react";

const FilterMenu: React.FC<FilterProps> = ({
  filters,
  filter,
  setFilter,
  setFilteredData,
  setIsLoading,
  setError,
}) => {
  // 1. React Query ile filtrelenmiş veriyi getir
  // const {
  //   data: filteredGames,
  //   isLoading,
  //   error,
  // } = useQuery({
  //   queryKey: ["games", filter.endpoint], // endpoint'e göre cache'lenir
  //   queryFn: () => fetchFilteredGameData(filter.endpoint),
  //   enabled: !!filter, // filtre varsa çalışır
  //   staleTime: 1000 * 60 * 5,
  // });

  // // 2. Query'den gelen veriyi state'e aktar
  // useEffect(() => {
  //   if (filteredGames) {
  //     setFilteredData(filteredGames);
  //   }
  //   setIsLoading(isLoading);
  //   setError(error);
  // }, [filteredGames, isLoading, error]);

  // 3. Filtre seçildiğinde sadece filtre state'ini değiştir
  const handleFilterChange = (selectedFilter: FilterProps["filter"]) => {
    setFilter(selectedFilter);
  };

  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {filters?.map((filt, idx) => (
          <div
            key={`${filt.name}-${idx}`}
            className={`flex pb-1 items-center gap-1 text-[16px] justify-center  cursor-pointer hover:text-blue-400 ${
              filt.name === filter.name
                ? "text-white  border-b-1 border-white"
                : "text-zinc-400"
            }`}
            onClick={() => handleFilterChange(filt)}
          >
            {filt.icon}
            <span className="font-semibold">{filt.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilterMenu;
