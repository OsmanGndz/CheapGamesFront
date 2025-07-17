import React, { useState } from "react";
import type { ShowGamesProps } from "../types/ShowGames";
import GameCard from "./GameCard";
import FilterGame from "./FilterGame";
import Pagination from "./Pagination";
import { useQuery } from "@tanstack/react-query";
import { fetchGamesByPlatform } from "../services/GameService";


const ShowGames: React.FC<ShowGamesProps> = ({
  filters = [],
  colNumber = 6,
  isPagination = false,
}) => {
  const [filter, setFilter] = useState<string>(filters[0]);

  const {data, isLoading, error} = useQuery({
    queryKey: ["games/platform", filter],
    queryFn: async () => fetchGamesByPlatform(filter),
    staleTime: 1000 * 60 * 30
  })

  // Oyun kartına tıklandığında çalışacak fonksiyon
  const handleGameClick = () => {
    console.log("Oyun tıklandı:");
    // Burada oyun detay sayfasına yönlendirme yapabilirsiniz
  };

  // Sepete ekle butonuna tıklandığında çalışacak fonksiyon
  const handleAddToCart = () => {
    console.log("Sepete eklendi:");
    // Burada sepete ekleme işlemi yapabilirsiniz
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        {filters?.length > 0 && (
          <FilterGame filters={filters} filter={filter} setFilter={setFilter} />
        )}
      </div>
      { isLoading && (
        <div className="flex justify-center items-center h-64">
          <p>Loading...</p>
        </div>
      )}

      {error && (
        <div className="flex justify-center items-center h-64">
          <p>Error loading games: {error.message}</p>
        </div>
      )}
      <div
        className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-4,
          ${colNumber == 4 && "lg:grid-cols-4"}
          ${colNumber == 6 && "lg:grid-cols-6"}`}
      >
        {data && data.slice(0, 12).map((game:any, index:any) => (
          <GameCard
            key={`${game.gameName}-${index}`}
            {...game}
            onClick={handleGameClick}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
      {isPagination && <Pagination />}
    </div>
  );
};

export default ShowGames;
