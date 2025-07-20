import React from "react";

interface SortFilterProps {
  sortFilter: {
    sortingFilter: string;
    pageSizeFilter: number;
  };
  setSortFilter: React.Dispatch<
    React.SetStateAction<{
      sortingFilter: string;
      pageSizeFilter: number;
    }>
  >;
}
const SortFilter: React.FC<SortFilterProps> = ({
  sortFilter,
  setSortFilter,
}) => {
  const handleSortingChange = (sortFilter: string) => {
    setSortFilter((prev) => ({
      ...prev,
      sortingFilter: sortFilter,
    }));
  };
  const handlePageSizeChange = (pageSizeFilter: number) => {
    setSortFilter((prev) => ({
      ...prev,
      pageSizeFilter: pageSizeFilter,
    }));
  };
  return (
    <div className="flex justify-end gap-4 text-black">
      <div className="flex gap-2">
        <p className="bg-zinc-200 px-2 py-1">Sırala:</p>
        <select
          name="sorting"
          id="sorting"
          className="bg-zinc-200 px-1"
          value={sortFilter.sortingFilter}
          onChange={(e) => handleSortingChange(e.target.value)}
        >
          <option value="default">Varsayılan</option>
          <option value="price-asc">Fiyata Göre Artan</option>
          <option value="price-desc">Fiyata Göre Azalan</option>
          <option value="name-asc">İsme Göre A-Z</option>
          <option value="name-desc">İsme Göre Z-A</option>
        </select>
      </div>
      <div className="flex gap-2">
        <p className="bg-zinc-200 px-2 py-1">Göster:</p>
        <select
          name="displayCount"
          id="displayCount"
          className="bg-zinc-200 px-1"
          value={sortFilter.pageSizeFilter}
          onChange={(e) => handlePageSizeChange(Number(e.target.value))}
        >
          <option value="12">12 Oyun</option>
          <option value="24">24 Oyun</option>
          <option value="48">48 Oyun</option>
        </select>
      </div>
    </div>
  );
};

export default SortFilter;
