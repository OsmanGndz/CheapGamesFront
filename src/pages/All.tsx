// components/All.tsx
import React, { useEffect, useState } from "react";
import PriceFilter from "../components/PriceRange/PriceFilter";
import ShowGames from "../components/ShowGames";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGamesByAllFilter,
  fetchPriceRange,
} from "../services/GameService";
import { useDebounce } from "../hooks/useDebounce";
import type { ShowGamesProps } from "../types/ShowGames";

interface PriceRange {
  min: number;
  max: number;
}

interface AllProps {
  platform?: string;
  category: string;
}

interface AllFilter {
  priceRange: PriceRange;
}

const All: React.FC<AllProps> = ({ platform, category }) => {
  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["priceRange", platform, category],
    queryFn: () => fetchPriceRange(category, platform || null),
    staleTime: 1000 * 60 * 30,
  });

  const [priceRange, setPriceRange] = useState<PriceRange>({
    min: data ? data.minPrice : 0,
    max: data ? data.maxPrice : 5000,
  });
  const [filters, setFilters] = useState<AllFilter>({
    priceRange: {
      min: data ? data.minPrice : 0,
      max: data ? data.maxPrice : 5000,
    },
  });

  useEffect(() => {
    if (data) {
      const { minPrice, maxPrice } = data;
      setPriceRange({ min: minPrice, max: maxPrice });
      setFilters({ priceRange: { min: minPrice, max: maxPrice } });
    }
  }, [data]);

  const debouncedMin = useDebounce(filters.priceRange.min, 500);
  const debouncedMax = useDebounce(filters.priceRange.max, 500);
  const [pageInfo, setPageInfo] = useState<ShowGamesProps["pageInfo"]>({
    currentPage: 1,
    totalGame: 0,
    pageSize: 12,
  });

  const {
    data: game,
    isLoading: loading,
    error: err,
  } = useQuery({
    queryKey: [
      "games/all-filter",
      platform,
      debouncedMin,
      debouncedMax,
      category,
      pageInfo?.currentPage,
      pageInfo?.pageSize,
    ],
    queryFn: async () =>
      fetchGamesByAllFilter({
        Category: category,
        Platform: platform || "Hepsi",
        minPrice: debouncedMin,
        maxPrice: debouncedMax,
        page: pageInfo?.currentPage,
        pageSize: pageInfo?.pageSize,
      }),
    staleTime: 1000 * 5,
  });

  useEffect(() => {
    if (game) {
      setPageInfo((prev) => ({
        currentPage: prev?.currentPage ?? 1,
        pageSize: prev?.pageSize ?? 12,
        totalGame: game.totalGame || 0,
      }));
      handleScrollToTop();
    }
  }, [game]);

  const handlePriceChange = (priceRange: PriceRange) => {
    setFilters({ priceRange: priceRange });
    // Burada filtreleme işlemini yapabilirsiniz
    console.log("Fiyat aralığı değişti:", priceRange);
  };

  return (
    <div className="flex w-full md:px-12 lg:px-20 xl:px-24 bg-gray-900 text-white min-h-screen gap-4">
      {isLoading || !data ? (
        <div>Loading...</div>
      ) : (
        <div className="hidden md:flex w-[30%] xl:w-[20%] flex-col gap-3">
          <h1 className="text-[25px] font-semibold">{platform}</h1>
          <div className="flex flex-col items-center gap-2 text-[20px] font-semibold">
            <h3 className="border-b border-blue-400 pb-1">Filtre</h3>
            <PriceFilter
              onPriceChange={handlePriceChange}
              initialMin={data.minPrice}
              initialMax={data.maxPrice}
              maxLimit={data.maxPrice}
              minLimit={data.minPrice}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
        </div>
      )}

      <div className="w-[70%] xl:w-[80%] p-4 border-l border-zinc-200 flex flex-col gap-4">
        <div>filters</div>
        <div className="border-t-1 border-zinc-200 pt-4">
          <ShowGames
            key={`${category}-${platform}`}
            colNumber={4}
            isPagination={true}
            filteredData={game?.games || []}
            loading={loading}
            error={err}
            pageInfo={pageInfo}
            setPageInfo={setPageInfo}
          />
        </div>
      </div>
    </div>
  );
};

export default All;
