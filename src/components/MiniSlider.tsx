import { useEffect, useRef, useState } from "react";
import type { MiniSliderProps } from "../types/MiniSlider";
import GameCard from "./GameCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import Spinner from "./Spinner";
import { useBasket } from "../Context/BasketContext";

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

const MiniSlider: React.FC<MiniSliderProps> = ({ isloading, error, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const { AddToBasket } = useBasket();

  // Drag/Swipe state
  const dragStartX = useRef<number | null>(null);
  const dragStartY = useRef<number | null>(null);
  const dragDeltaX = useRef<number>(0);
  const isDragging = useRef<boolean>(false);
  const dragType = useRef<"mouse" | "touch" | null>(null);

  // Drag/Swipe handlers
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if ("touches" in e) {
      dragType.current = "touch";
      dragStartX.current = e.touches[0].clientX;
      dragStartY.current = e.touches[0].clientY;
    } else {
      dragType.current = "mouse";
      dragStartX.current = e.clientX;
      dragStartY.current = e.clientY;
    }
    isDragging.current = true;
    dragDeltaX.current = 0;
    // Metin seçimini engelle
    document.body.style.userSelect = "none";
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current || dragStartX.current === null) return;
    // Sadece doğru tipte event işlenmeli
    if (
      ("touches" in e && dragType.current !== "touch") ||
      (!("touches" in e) && dragType.current !== "mouse")
    )
      return;
    let clientX = 0;
    let clientY = 0;
    if ("touches" in e) {
      if (e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      }
    } else {
      // MouseEvent
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    const deltaX = clientX - dragStartX.current;
    const deltaY = clientY - (dragStartY.current ?? 0);
    if (Math.abs(deltaY) > Math.abs(deltaX)) return;
    dragDeltaX.current = deltaX;
    if (e.cancelable) e.preventDefault();
    e.stopPropagation();
  };

  const handleDragEnd = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging.current) return;
    // Sadece doğru tipte event işlenmeli
    if (e) {
      if (
        ("touches" in e && dragType.current !== "touch") ||
        (!("touches" in e) && dragType.current !== "mouse")
      )
        return;
    }
    isDragging.current = false;
    document.body.style.userSelect = "";
    if (Math.abs(dragDeltaX.current) > 50) {
      const isDesktop =
        typeof window !== "undefined" && window.innerWidth >= 1024;
      const times = isDesktop ? 2 : 1;
      if (dragDeltaX.current > 0) {
        for (let i = 0; i < times; i++) handlePrev();
      } else {
        for (let i = 0; i < times; i++) handleNext();
      }
    }
    dragStartX.current = null;
    dragStartY.current = null;
    dragDeltaX.current = 0;
    dragType.current = null;
    if (e && e.stopPropagation) e.stopPropagation();
  };

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

  // Sepete ekle butonuna tıklandığında çalışacak fonksiyon
  const handleAddToCart = (gameData: dataProps) => {
    AddToBasket(gameData);
  };

  if (isloading) {
    return (
      <Spinner
        className="flex justify-center items-center w-full"
        color="fill-blue-400"
        size="w-10 h-10"
      />
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
        <div
          className="relative overflow-hidden w-full"
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ userSelect: isDragging.current ? "none" : undefined }}
        >
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
                  path={`/game/${id}`}
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
