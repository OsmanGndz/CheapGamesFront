import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "./PriceFilter.css";

interface PriceRange {
  min: number;
  max: number;
}

interface AllFilter {
  priceRange: PriceRange;
}

interface PriceFilterProps {
  onPriceChange: (priceRange: PriceRange) => void;
  initialMin?: number;
  initialMax?: number;
  maxLimit?: number;
  minLimit?: number;
  filters?: AllFilter;
  setFilters?: React.Dispatch<React.SetStateAction<AllFilter>>;
}

const PriceFilter: React.FC<PriceFilterProps> = ({
  onPriceChange,
  initialMin = 0,
  initialMax = 10000,
  maxLimit = 20000,
  minLimit = 0,
  filters,
  setFilters,
}) => {
  const isControlled = filters && setFilters;

  const getInitialRange = (): PriceRange => {
    if (isControlled) return filters!.priceRange;
    return { min: initialMin, max: initialMax };
  };

  const [localRange, setLocalRange] = useState<PriceRange>(getInitialRange);
  const currentRange = isControlled ? filters!.priceRange : localRange;

  // Local state güncellenip dışarıya bildirilir
  const updateRange = (range: PriceRange) => {
    if (isControlled) {
      setFilters!((prev) => ({ ...prev, priceRange: range }));
    } else {
      setLocalRange(range);
    }
    onPriceChange(range);
  };

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(parseInt(e.target.value), currentRange.max -20);
    updateRange({ ...currentRange, min: value });
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(parseInt(e.target.value), currentRange.min + 20);
    updateRange({ ...currentRange, max: value });
  };

  const handleManualMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateRange({ ...currentRange, min: value });
  };

  const handleManualMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    updateRange({ ...currentRange, max: value });
  };


  const [priceOpen, setPriceOpen] = useState(true);

  return (
    <div className="price-filter py-2">
      <div
        className="price-filter-header p-2 border-b-1"
        onClick={() => setPriceOpen(!priceOpen)}
      >
        <h1>Fiyat</h1>
        {priceOpen ? <FaArrowUp className="arrow-icon" /> : <FaArrowDown />}
      </div>

      {priceOpen && (
        <div className="price-filter-content px-2">
          <div className="price-display">
            <span>{currentRange.min} TL</span>
            <span>{currentRange.max} TL</span>
          </div>

          <div className="slider-container mb-2">
            <div className="slider-wrapper">
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={currentRange.min}
                onChange={handleMinChange}
                className="slider slider-min"
              />
              <input
                type="range"
                min={minLimit}
                max={maxLimit}
                value={currentRange.max}
                onChange={handleMaxChange}
                className="slider slider-max"
              />
            </div>
          </div>

          <div className="flex gap-4">
            <input
              type="number"
              placeholder="En düşük fiyat"
              value={currentRange.min}
              onChange={handleManualMinChange}
              className="price-input"
            />
            <input
              type="number"
              placeholder="En yüksek fiyat"
              value={currentRange.max}
              onChange={handleManualMaxChange}
              className="price-input"
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default PriceFilter;
