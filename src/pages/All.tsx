// components/All.tsx
import React, { useState } from "react";
import PriceFilter from "../components/PriceRange/PriceFilter";
import ShowGames from "../components/ShowGames";

interface PriceRange {
  min: number;
  max: number;
}

interface AllProps {
  name: string;
}

interface AllFilter {
  priceRange: PriceRange;
}

const All: React.FC<AllProps> = ({ name }) => {
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange>({
    min: 0,
    max: 4852,
  });
  const [filters, setFilters] = useState<AllFilter>({
    priceRange: selectedPriceRange,
  });

  const handlePriceChange = (priceRange: PriceRange) => {
    setSelectedPriceRange(priceRange);
    // Burada filtreleme işlemini yapabilirsiniz
    console.log("Fiyat aralığı değişti:", priceRange);
  };

  return (
    <div className="flex w-full md:px-12 lg:px-20 xl:px-24 bg-gray-900 text-white min-h-screen gap-4">
      <div className="hidden md:flex w-[30%] xl:w-[20%] flex-col gap-3">
        <h1 className="text-[25px] font-semibold">{name}</h1>
        <div className="flex flex-col items-center gap-2 text-[20px] font-semibold">
          <h3 className="border-b border-blue-400 pb-1">Filtre</h3>
          <PriceFilter
            onPriceChange={handlePriceChange}
            initialMin={0}
            initialMax={5000}
            maxLimit={5000}
            filters={filters}
            setFilters={setFilters}
          />
        </div>
      </div>
      <div className="w-[70%] xl:w-[80%] p-4 border-l border-zinc-200 flex flex-col gap-4">
        <div>filters</div>
        <div className="border-t-1 border-zinc-200 pt-4">
          <ShowGames colNumber={4} isPagination={true} />
        </div>
      </div>
    </div>
  );
};

export default All;
