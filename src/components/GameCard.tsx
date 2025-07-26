import React from "react";
import { TbBasketPlus } from "react-icons/tb";

interface GameCardProps {
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
  width?: string;
  minWidth?: string;
  onAddToCart?: (gameData: GameCardProps) => void;
  onClick?: (gameData: number) => void;
}

const GameCard: React.FC<GameCardProps> = ({
  Id,
  gameName,
  gameDescription,
  gameImage,
  gamePrice,
  gameDiscount,
  categoryName,
  platformName,
  totalSales,
  isStanding,
  releaseDate,
  width = "100%",
  minWidth = "90px",
  onAddToCart,
  onClick,
}) => {
  const originalPrice = gamePrice / (1 - gameDiscount / 100);
  const gameData = {
    Id,
    gameName,
    gameDescription,
    gameImage,
    gamePrice,
    gameDiscount,
    categoryName,
    platformName,
    totalSales,
    isStanding,
    releaseDate,
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick(Id);
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation(); // Kart tıklamasını engelle
    if (onAddToCart) {
      onAddToCart(gameData);
    }
  };

  return (
    <div
      className="relative flex flex-col flex-shrink-0 rounded-b-lg group overflow-hidden cursor-pointer"
      style={{
        width,
        minWidth,
      }}
      onClick={handleCardClick}
    >
      {/* Discount Badge */}
      {gameDiscount > 0 && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded z-10">
          -%{gameDiscount}
        </div>
      )}

      {/* Game Image */}
      <div className="flex-grow aspect-[3/4] relative overflow-hidden">
        <img
          src={gameImage}
          alt={gameName}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>

      {/* Game Info */}
      <div className="flex flex-col text-xs sm:text-sm items-center pt-2 pb-4 gap-1 w-full bg-slate-800 rounded-b-lg z-10 relative h-[80px] justify-between">
        <span className="text-center px-2 font-medium leading-tight overflow-hidden text-ellipsis whitespace-nowrap max-w-full">
          {gameName}
        </span>
        <div className="flex flex-col items-center justify-center w-full font-bold mt-auto">
          <span className="text-sm text-white whitespace-nowrap">
            {gamePrice === 0 ? "Ücretsiz" : `${gamePrice.toFixed(2)} TL`}
          </span>
          {gameDiscount > 0 && gamePrice > 0 && (
            <span className="text-xs font-normal text-zinc-400 line-through whitespace-nowrap">
              {originalPrice.toFixed(2)} TL
            </span>
          )}
        </div>
      </div>

      {/* Hover Overlay - Add to Cart Button */}
      <div className="absolute bottom-0 flex justify-center items-center p-2 opacity-0 group-hover:opacity-100 duration-300 bg-slate-800 w-full z-20 h-12 rounded-b-lg border-1 cursor-pointer">
        <button
          onClick={handleAddToCart}
          className="flex items-center justify-center w-full h-full hover:text-blue-400 transition-colors duration-200 cursor-pointer"
          aria-label="Sepete Ekle"
        >
          <TbBasketPlus className="text-xl sm:text-2xl text-white" />
        </button>
      </div>
    </div>
  );
};

export default GameCard;
