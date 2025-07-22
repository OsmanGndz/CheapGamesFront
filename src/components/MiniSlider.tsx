import { useEffect, useRef, useState } from "react";
import type { MiniSliderProps } from "../types/MiniSlider";
import GameCard from "./GameCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
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

const MiniSlider: React.FC<MiniSliderProps> = ({ isloading, error, data }) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getVisibleCards = () => {
    if (typeof window === "undefined") return 1;

    const width = window.innerWidth;
    if (width < 640) return 2;
    if (width < 1024) return 4;
    return 6;
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max((data ? data.length : 0) - visibleCards, 0);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handleNext = () => {
    goNext();
    resetInterval();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max((data ? data.length : 0) - visibleCards, 0);
      return prev <= 0 ? maxIndex : prev - 1;
    });
    resetInterval();
  };

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 10000);
  };

  const resetInterval = () => {
    startInterval();
  };

  useEffect(() => {
    setCurrentIndex(0);
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data?.length ?? 0, visibleCards]);

  const translateX = -(currentIndex * (100 / visibleCards + 0.05));

  // Oyun kartına tıklandığında çalışacak fonksiyon
  const handleGameClick = (gameData: number) => {
    navigate(`/game/${gameData}`);
  };

  // Sepete ekle butonuna tıklandığında çalışacak fonksiyon
  const handleAddToCart = (gameData: dataProps) => {
    console.log("Sepete eklendi:", gameData);
    // Burada sepete ekleme işlemi yapabilirsiniz
  };

  if (isloading) {
    return (
      <Spinner className="flex justify-center items-center w-full" color="fill-blue-400" size="w-10 h-10"/>
    );
  }
  if (error) {
    return (
      <p className="flex w-full items-center justify-center text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-8 w-full relative">
      {data && data.length > 0 && (
        <div className="relative overflow-hidden w-full">
          {/* Slider Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out items-stretch"
            style={{
              transform: `translateX(${translateX}%)`,
              gap: "0.5rem",
            }}
          >
            {data.map((item, index) => {
              const { id, ...rest } = item as any;
              return (
                <GameCard
                  key={`${item.gameName}-${index}`}
                  {...rest}
                  {...(id !== undefined ? { Id: id } : {})}
                  width={`calc(${100 / visibleCards}% - 0.44rem)`}
                  minWidth="90px"
                  onClick={handleGameClick}
                  onAddToCart={handleAddToCart}
                />
              );
            })}
          </div>

          {/* Navigation Buttons */}
          {data.length > visibleCards && (
            <>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/70 text-white z-30 cursor-pointer p-2 sm:p-3 hover:text-blue-400 hover:bg-black/80 transition-colors duration-200 rounded-r-md"
                onClick={handlePrev}
                aria-label="Previous"
              >
                <FaArrowLeft className="text-sm sm:text-xl" />
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/70 text-white z-30 cursor-pointer p-2 sm:p-3 hover:text-blue-400 hover:bg-black/80 transition-colors duration-200 rounded-l-md"
                onClick={handleNext}
                aria-label="Next"
              >
                <FaArrowRight className="text-sm sm:text-xl" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniSlider;
