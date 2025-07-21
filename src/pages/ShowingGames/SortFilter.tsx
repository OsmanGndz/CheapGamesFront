import React, { useState } from "react";
import { FaArrowDown } from "react-icons/fa";
import { Modal } from "../../components/Modal";
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

const sortValues = [
  {
    name: "Varsayılan",
    value: "default",
  },
  {
    name: "Fiyata Göre Artan",
    value: "price-asc",
  },
  {
    name: "Fiyata Göre Azalan",
    value: "price-desc",
  },
  {
    name: "İsme Göre A-Z",
    value: "name-asc",
  },
  {
    name: "İsme Göre Z-A",
    value: "name-desc",
  },
];

const pageSizeValues = [
  { name: "12 Oyun", value: 12 },
  { name: "24 Oyun", value: 24 },
  { name: "48 Oyun", value: 48 },
];

const SortFilter: React.FC<SortFilterProps> = ({
  sortFilter,
  setSortFilter,
}) => {
  const [showSortModal, setShowSortModal] = useState(false);
  const [showPageSizeModal, setShowPageSizeModal] = useState(false);

  const handleSortingChange = (sortingFilter: string) => {
    setSortFilter((prev) => ({
      ...prev,
      sortingFilter: sortingFilter,
    }));
    setShowSortModal(false);
  };

  const handlePageSizeChange = (pageSizeFilter: number) => {
    setSortFilter((prev) => ({
      ...prev,
      pageSizeFilter: pageSizeFilter,
    }));
    setShowPageSizeModal(false);
  };

  const getCurrentSortName = () => {
    return (
      sortValues.find((item) => item.value === sortFilter.sortingFilter)
        ?.name || "Varsayılan"
    );
  };

  const getCurrentPageSizeName = () => {
    return (
      pageSizeValues.find((item) => item.value === sortFilter.pageSizeFilter)
        ?.name || "12 Oyun"
    );
  };

  return (
    <>
      {/* Desktop Version */}
      <div className="hidden md:flex justify-end gap-4 text-black w-full">
        <div className="flex gap-2">
          <p className="bg-zinc-200 px-2 py-1">Sırala:</p>
          <select
            name="sorting"
            id="sorting"
            className="bg-zinc-200 px-1"
            style={{ width: "160px" }}
            value={sortFilter.sortingFilter}
            onChange={(e) => handleSortingChange(e.target.value)}
          >
            {sortValues.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-2">
          <p className="bg-zinc-200 px-2 py-1">Göster:</p>
          <select
            name="displayCount"
            id="displayCount"
            className="bg-zinc-200 px-1"
            style={{ width: "100px" }}
            value={sortFilter.pageSizeFilter}
            onChange={(e) => handlePageSizeChange(Number(e.target.value))}
          >
            {pageSizeValues.map((item) => (
              <option key={item.value} value={item.value}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mobile Version */}
      <div className="flex md:hidden justify-end gap-2">
        
        {/* Sort Button */}
        <button
          className="bg-zinc-200 px-2 py-1 text-black flex items-center justify-center gap-1 rounded-md text-sm"
          onClick={() => setShowSortModal(true)}
        >
          {getCurrentSortName()}
          <FaArrowDown className="text-[12px]" />
        </button>

        {/* Page Size Button */}
        <button
          className="bg-zinc-200 px-2 py-1 text-black flex items-center justify-center gap-1 rounded-md text-sm"
          onClick={() => setShowPageSizeModal(true)}
        >
          {getCurrentPageSizeName()}
          <FaArrowDown className="text-[12px]" />
        </button>
      </div>

      {/* Sort Modal */}
      <Modal
        isOpen={showSortModal}
        onClose={() => setShowSortModal(false)}
        title="Sıralama Seçin"
      >
        <div className="space-y-3">
          {sortValues.map((item) => (
            <button
              key={item.value}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 transform hover:scale-[1.02] ${
                sortFilter.sortingFilter === item.value
                  ? "bg-blue-50 border-blue-300 text-blue-700 shadow-md"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-sm"
              }`}
              onClick={() => handleSortingChange(item.value)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                {sortFilter.sortingFilter === item.value && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </Modal>

      {/* Page Size Modal */}
      <Modal
        isOpen={showPageSizeModal}
        onClose={() => setShowPageSizeModal(false)}
        title="Gösterim Sayısı Seçin"
      >
        <div className="space-y-3">
          {pageSizeValues.map((item) => (
            <button
              key={item.value}
              className={`w-full text-left p-4 rounded-lg border transition-all duration-200 transform hover:scale-[1.02] ${
                sortFilter.pageSizeFilter === item.value
                  ? "bg-blue-50 border-blue-300 text-blue-700 shadow-md"
                  : "bg-gray-50 border-gray-200 hover:bg-gray-100 hover:shadow-sm"
              }`}
              onClick={() => handlePageSizeChange(item.value)}
            >
              <div className="flex items-center justify-between">
                <span className="font-medium">{item.name}</span>
                {sortFilter.pageSizeFilter === item.value && (
                  <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                )}
              </div>
            </button>
          ))}
        </div>
      </Modal>
    </>
  );
};

export default SortFilter;
