import React, { useState } from "react";
import type { ShowGamesProps } from "../types/ShowGames";
import GameCard from "./GameCard";
import FilterGame from "./FilterGame";
import Pagination from "./Pagination";

const ShowGames: React.FC<ShowGamesProps> = ({
    filteredData = [],
  filters = [],
  colNumber = 6,
  isPagination = false,
  loading = false,
  error = null,
  pageInfo,
  setPageInfo,
}) => {
const [filter, setFilter] = useState<string>(filters[0]);
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
      {loading && (
        <div className="flex justify-center items-center h-64">
          ... Yükleniyor
        </div>
      )}
      {error && (
        <div className="text-red-500">
          Hata oluştu: {error.message || "Bilinmeyen hata"}
        </div>
      )}
      <div
        className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-4,
          ${colNumber == 4 && "lg:grid-cols-4"}
          ${colNumber == 6 && "lg:grid-cols-6"}`}
      >
        {filteredData &&
          filteredData
            .map((game: any, index: any) => (
              <GameCard
                key={`${game.gameName}-${index}`}
                {...game}
                onClick={handleGameClick}
                onAddToCart={handleAddToCart}
              />
            ))}
      </div>
      {isPagination && (
        <Pagination pageInfo={pageInfo} setPageInfo={setPageInfo} />
      )}
    </div>
  );
};

export default ShowGames;
