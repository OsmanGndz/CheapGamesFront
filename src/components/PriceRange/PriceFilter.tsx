// components/PriceFilter.tsx
import React, { useState } from "react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import "./PriceFilter.css";

interface PriceRange {
  min: number;
  max: number;
}

interface PriceFilterProps {
  onPriceChange: (priceRange: PriceRange) => void;
  initialMin?: number;
  initialMax?: number;
  maxLimit?: number;
}

const PriceFilter: React.FC<PriceFilterProps> = ({ 
  onPriceChange, 
  initialMin = 0, 
  initialMax = 10000,
  maxLimit = 20000 
}) => {
  const [priceOpen, setPriceOpen] = useState(true);
  const [priceRange, setPriceRange] = useState<PriceRange>({ 
    min: initialMin, 
    max: initialMax 
  });
  
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newRange = {
      ...priceRange,
      min: Math.min(value, priceRange.max - 100)
    };
    setPriceRange(newRange);
    onPriceChange(newRange);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    const newRange = {
      ...priceRange,
      max: Math.max(value, priceRange.min + 100)
    };
    setPriceRange(newRange);
    onPriceChange(newRange);
  };

  const handleManualMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const newRange = { ...priceRange, min: value };
    setPriceRange(newRange);
    onPriceChange(newRange);
  };

  const handleManualMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value) || 0;
    const newRange = { ...priceRange, max: value };
    setPriceRange(newRange);
    onPriceChange(newRange);
  };

  const handleFilterApply = () => {
    onPriceChange(priceRange);
    console.log('Fiyat filtresi uygulandı:', priceRange);
  };

  const getSliderBackground = () => {
    const minPercent = (priceRange.min / maxLimit) * 100;
    const maxPercent = (priceRange.max / maxLimit) * 100;
    
    return `linear-gradient(to right, #374151 0%, #374151 ${minPercent}%, #3b82f6 ${minPercent}%, #3b82f6 ${maxPercent}%, #374151 ${maxPercent}%, #374151 100%)`;
  };

  return (
    <div className="price-filter">
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
            <span>{priceRange.min} TL</span>
            <span>{priceRange.max} TL</span>
          </div>
          
          <div className="slider-container mb-2">
            <div className="slider-wrapper">
              <input
                type="range"
                min="0"
                max={maxLimit}
                value={priceRange.min}
                onChange={handleMinChange}
                className="slider slider-min"
              />
              <input
                type="range"
                min="0"
                max={maxLimit}
                value={priceRange.max}
                onChange={handleMaxChange}
                className="slider slider-max"
              />
            </div>
          </div>
          
          <div className="flex gap-4">
            <div className="input-group">
              <input
                type="number"
                placeholder="En düşük fiyat"
                value={priceRange.min}
                onChange={handleManualMinChange}
                className="price-input"
              />
            </div>
            <div className="input-group">
              <input
                type="number"
                placeholder="En yüksek fiyat"
                value={priceRange.max}
                onChange={handleManualMaxChange}
                className="price-input"
              />
            </div>
          </div>
          
          <button 
            onClick={handleFilterApply}
            className="filter-button"
          >
            Filtrele
          </button>
        </div>
      )}
    </div>
  );
};

export default PriceFilter;