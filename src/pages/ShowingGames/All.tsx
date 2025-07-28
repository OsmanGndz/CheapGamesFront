// components/All.tsx
import React, { useEffect, useState, useCallback } from "react";
import PriceFilter from "../../components/PriceRange/PriceFilter";
import ShowGames from "../../components/ShowGames";
import { useQuery } from "@tanstack/react-query";
import {
  fetchGamesByAllFilter,
  fetchPriceRange,
} from "../../services/GameService";
import { useDebounce } from "../../hooks/useDebounce";
import type { ShowGamesProps } from "../../types/ShowGames";
import SortFilter from "./SortFilter";
import { useSearchParams } from "react-router-dom";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";

interface PriceRange {
  min: number | null;
  max: number | null;
}

interface AllProps {
  platform?: string;
  category?: string;
  discounts?: boolean;
}

const All: React.FC<AllProps> = ({ platform, category, discounts = false }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [isInitialized, setIsInitialized] = useState(false);
  const [shouldUpdateUrl, setShouldUpdateUrl] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getUrlParams = () => {
    return {
      categoryUrl: searchParams.get("category") || category,
      platformUrl: searchParams.get("platform") || platform || "",
      sortUrl: searchParams.get("sort") || "default",
      pageUrl: Number(searchParams.get("page") || 1),
      pageSizeUrl: Number(searchParams.get("pageSize") || 12),
      minPriceUrl: Number(searchParams.get("minPrice")) || null,
      maxPriceUrl: Number(searchParams.get("maxPrice")) || null,
    };
  };

  const urlParams = getUrlParams();

  const { data, isLoading, error } = useQuery({
    queryKey: ["priceRange", platform, category, discounts],
    queryFn: () =>
      fetchPriceRange(category || null, platform || null, discounts),
    staleTime: 1000 * 60 * 30,
  });

  // State'leri başlangıçta URL'den veya default değerlerden initialize et
  const [filters, setFilters] = useState<PriceRange>({
    min: urlParams.minPriceUrl,
    max: urlParams.maxPriceUrl,
  });

  const [sortFilter, setSortFilter] = useState(() => ({
    sortingFilter: urlParams.sortUrl,
    pageSizeFilter: urlParams.pageSizeUrl,
  }));

  const [pageInfo, setPageInfo] = useState<ShowGamesProps["pageInfo"]>(() => ({
    currentPage: urlParams.pageUrl,
    totalGame: 0,
    pageSize: urlParams.pageSizeUrl,
  }));

  // Data yüklendikten sonra price range'i güncelle (sadece URL'de yoksa)
  useEffect(() => {
    if (data && !isInitialized) {
      const { minPrice, maxPrice } = data;

      // Eğer URL'de price parametreleri yoksa, data'dan al
      if (!urlParams.minPriceUrl && !urlParams.maxPriceUrl) {
        setFilters({ min: minPrice, max: maxPrice });
      }

      setIsInitialized(true);
      setShouldUpdateUrl(true);
    }
  }, [data, isInitialized]);

  const debouncedMin = useDebounce(filters.min, 500);
  const debouncedMax = useDebounce(filters.max, 500);

  const {
    data: gameData,
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
      sortFilter?.sortingFilter,
      discounts,
    ],
    queryFn: async () =>
      fetchGamesByAllFilter({
        Category: category,
        Platform: platform,
        minPrice: debouncedMin,
        maxPrice: debouncedMax,
        page: pageInfo?.currentPage,
        pageSize: pageInfo?.pageSize,
        sortingFilter: sortFilter.sortingFilter,
        discount: discounts,
      }),
    staleTime: 1000 * 5,
    enabled: isInitialized,
  });

  useEffect(() => {
    if (gameData) {
      setPageInfo((prev) => ({
        currentPage: prev?.currentPage ?? 1,
        pageSize: prev?.pageSize ?? 12,
        totalGame: gameData.totalGame || 0,
      }));
      handleScrollToTop();
    }
  }, [gameData]);

  useEffect(() => {
    setPageInfo({
      currentPage: 1,
      pageSize: sortFilter.pageSizeFilter,
      totalGame: gameData?.totalGame || 0,
    });
  }, [sortFilter, filters]);

  const handlePriceChange = (priceRange: PriceRange) => {
    setFilters(priceRange);
    setShouldUpdateUrl(true);
  };

  const updateUrl = useCallback(() => {
    if (!shouldUpdateUrl) return;

    const newParams = new URLSearchParams();

    newParams.set("category", category || "");
    if (platform) newParams.set("platform", platform);
    newParams.set("sort", sortFilter.sortingFilter);
    newParams.set("page", String(pageInfo?.currentPage || 1));
    newParams.set("pageSize", String(sortFilter?.pageSizeFilter || 12));
    newParams.set("minPrice", String(filters.min) || "0");
    newParams.set("maxPrice", String(filters.max));

    setSearchParams(newParams, { replace: true });
    setShouldUpdateUrl(false);
  }, [
    shouldUpdateUrl,
    category,
    platform,
    sortFilter.sortingFilter,
    sortFilter.pageSizeFilter,
    pageInfo?.currentPage,
    filters.min,
    filters.max,
    setSearchParams,
  ]);

  // URL güncelleme
  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  // Sort filter değiştiğinde page info ve URL'yi güncelle
  useEffect(() => {
    setPageInfo((prev) => ({
      currentPage: prev?.currentPage ?? 1,
      totalGame: prev?.totalGame ?? 0,
      pageSize: sortFilter.pageSizeFilter,
    }));
    setShouldUpdateUrl(true);
  }, [sortFilter]);

  // Page info değiştiğinde URL'yi güncelle
  useEffect(() => {
    setShouldUpdateUrl(true);
  }, [pageInfo?.currentPage]);

  // Filters değiştiğinde URL'yi güncelle
  useEffect(() => {
    setShouldUpdateUrl(true);
  }, [filters.min, filters.max]);

  if (error) {
    toast.error("Fiyat bilgileri alınırken hata oluştu.");
  }

  return (
    <div className="flex w-full md:px-12 lg:px-20 xl:px-24 bg-gray-900 text-white min-h-screen gap-4">
      {isLoading || !data ? (
        <Spinner
          className="flex justify-center w-[30%] pt-20"
          color="fill-blue-400"
          size="w-8 h-8"
        />
      ) : (
        <div className="hidden md:flex w-[30%] xl:w-[20%] flex-col gap-3">
          <h1 className="text-[25px] font-semibold">
            {platform ? "PC - " + platform : category}
            {discounts ? "Kampanyalar" : ""}
          </h1>
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

      <div className="w-full md:w-[70%] xl:w-[80%] p-4 md:border-l border-zinc-200 flex flex-col gap-4">
        <h1 className="flex md:hidden w-full text-center justify-center text-3xl font-semibold mb-8">
          {platform ? " PC - " + platform : category}
        </h1>
        <div>
          <SortFilter
            key={`${sortFilter.sortingFilter}-${sortFilter.pageSizeFilter}`}
            sortFilter={sortFilter}
            setSortFilter={setSortFilter}
          />
        </div>
        <div className="border-t-1 border-zinc-200 pt-4">
          <ShowGames
            key={`${category}-${platform}`}
            colNumber={4}
            isPagination={true}
            filteredData={gameData?.games || []}
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
