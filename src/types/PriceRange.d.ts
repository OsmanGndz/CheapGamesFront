// types/PriceRange.ts
export interface PriceRange {
  min: number;
  max: number;
}

export interface PriceFilterProps {
  onPriceChange: (priceRange: PriceRange) => void;
  initialMin?: number;
  initialMax?: number;
  maxLimit?: number;
}