import React from "react";
import type { ShowGamesProps } from "../types/ShowGames";
import GameCard from "./GameCard";
import Pagination from "./Pagination";
import Spinner from "./Spinner";
import { useBasket } from "../Context/BasketContext";
import { toast } from "react-toastify";

interface dataProps {
  Id: number;
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
  colNumber = 6,
  isPagination = false,
  loading = false,
  error = null,
  pageInfo,
  setPageInfo,
  isFavoriteMode,
  onRemoveFromFavorites,
  isUserProductsMode,
}) => {
  const { AddToBasket } = useBasket();

  // Sepete ekle butonuna tıklandığında çalışacak fonksiyon
  const handleAddToCart = (gameData: dataProps) => {
    AddToBasket(gameData);
  };

  if (error) {
    toast.error("Oyunlar yüklenirken bir hata oluştu.");
  }

  return (
    <div className="w-full flex flex-col gap-8">
      {loading && (
        <Spinner
          className="flex justify-center items-center w-full"
          color="fill-blue-400"
          size="w-10 h-10"
        />
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
                path={`/game/${id}`}
                onAddToCart={handleAddToCart}
                isFavoriteMode={isFavoriteMode}
                onRemoveFromFavorites={onRemoveFromFavorites}
                isUserProductsMode={isUserProductsMode}
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
