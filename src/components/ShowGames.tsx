import React, { useState } from "react";
import type { ShowGamesProps } from "../types/ShowGames";
import GameCard from "./GameCard";
import FilterGame from "./FilterGame";
import Pagination from "./Pagination";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";

interface dataProps {
  id: number;
  gameName: string;
  gameDescription: string;
  gameImage: string;
  gamePrice: number;
  gameDiscount: number;
  categoryName: string;
  platformName: string;
  totalSales: number;
  isStanding: boolean;
  releaseDate: string;
}

const ShowGames: React.FC<ShowGamesProps> = ({
  filteredData,
  filters = [],
  colNumber = 6,
  isPagination = false,
  loading = false,
  error = null,
  pageInfo,
  setPageInfo,
  filter,
  setFilter,
}) => {
  const navigate = useNavigate();

  // Oyun kartına tıklandığında çalışacak fonksiyon
  const handleGameClick = (gameData: number) => {
    navigate(`/game/${gameData}`);
  };

  // Sepete ekle butonuna tıklandığında çalışacak fonksiyon
  const handleAddToCart = (gameData: dataProps) => {
    console.log("Sepete eklendi:", gameData);
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
        <Spinner
          className="flex justify-center items-center w-full"
          color="fill-blue-400"
          size="w-10 h-10"
        />
      )}
      {error && (
        <div className="flex justify-center items-center w-full text-red-500">
          Error: {error.message || "Bilinmeyen hata"}
        </div>
      )}
      <div
        className={`grid grid-cols-2 sm:grid-cols-4 gap-4 py-4,
          ${colNumber == 4 && "lg:grid-cols-4"}
          ${colNumber == 6 && "lg:grid-cols-6"}`}
      >
        {filteredData &&
          filteredData.map((game: any, index: any) => {
            const { id, ...rest } = game as any;
            return (
              <GameCard
                key={`${game.gameName}-${index}`}
                {...rest}
                {...(id !== undefined ? { Id: id } : {})}
                onClick={handleGameClick}
                onAddToCart={handleAddToCart}
              />
            );
          })}
      </div>
      {isPagination && (
        <Pagination
          key={`${pageInfo?.pageSize} - ${pageInfo?.currentPage} - ${pageInfo?.totalGame} `}
          pageInfo={pageInfo}
          setPageInfo={setPageInfo}
        />
      )}
    </div>
  );
};

export default ShowGames;
