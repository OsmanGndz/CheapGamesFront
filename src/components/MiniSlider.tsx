import { useEffect, useRef, useState } from "react";
import type { MiniSliderProps } from "../types/MiniSlider";
import FilterMenu from "./FilterMenu";
import { TbBasketPlus } from "react-icons/tb";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const MiniSlider: React.FC<MiniSliderProps> = ({ data, filters }) => {
  const [filter, setFilter] = useState<string>(filters[0].name);
  const filteredData = data.filter((item) => item.filter.includes(filter));
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number>(3);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      const width = window.innerWidth;
      if (width < 1024) {
        setVisibleCards(3);
      } else {
        setVisibleCards(6);
      }
    };
    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) =>
      prev >= Math.max(filteredData.length - visibleCards, 0) ? 0 : prev + 1
    );
  };

  const handleNext = () => {
    goNext();
    resetInterval();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev <= 0 ? Math.max(filteredData.length - visibleCards, 0) : prev - 1
    );
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
  }, [filter, filteredData.length]);

  const translateX = -(currentIndex * (100 / visibleCards));

  return (
    <div className="flex flex-col justify-center gap-8 w-full relative">
      <FilterMenu filters={filters} filter={filter} setFilter={setFilter} />
      {filteredData.length > 0 && (
        <div className="relative overflow-hidden w-full">
          {/* İçerik alanı */}
          <div
            className="flex gap-2 lg:gap-4 transition-transform duration-700 ease-in-out"
            style={{
              transform: `translateX(${translateX}%)`,
            }}
          >
            {filteredData.map((item, index) => (
              <div
                key={`${item.title}-${index}`}
                className="relative flex flex-col flex-shrink-0 rounded-b-lg group overflow-hidden cursor-pointer" style={{width:`${ window.innerWidth > 1024 ? (100 / visibleCards) - 1 : (100/visibleCards) - 2}%`}}
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover rounded-md group-hover:scale-110 transition-transform duration-300"
                />
                <div className="flex flex-col text-[12px] items-center pt-2 pb-6 gap-1 w-full bottom-0 bg-slate-800 rounded-b-lg z-10">
                  {item.title}
                  <div className="flex flex-col sm:flex-row items-center justify-center w-full h-full font-bold">
                    <span className="text-sm text-white">
                      {item.price.toFixed(2)} TL
                    </span>
                    <span className="text-sm font-normal text-zinc-400 line-through ml-2">
                      {(item.price * (1 - item.discount / 100)).toFixed(2)} TL
                    </span>
                  </div>
                </div>
                <div className="absolute bottom-0 flex justify-center items-center p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-slate-800 w-full z-12 h-10 border-1 border-slate-500 rounded-b-lg">
                  <TbBasketPlus className="text-2xl" />
                </div>
              </div>
            ))}
          </div>

          {/* Slider arrow buttons */}
          {filteredData.length > visibleCards && (
            <>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/70 text-white z-10 cursor-pointer text-xl p-2 hover:text-blue-400"
                onClick={handlePrev}
              >
                <FaArrowLeft />
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/70 text-white z-10 cursor-pointer text-xl p-2 hover:text-blue-400"
                onClick={handleNext}
              >
                <FaArrowRight />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniSlider;
