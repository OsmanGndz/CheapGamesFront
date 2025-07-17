import { useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = () => {
  // Örnek oyun verisi (100+ oyun)
  const generateGames = () => {
    const games = [];
    for (let i = 1; i <= 257; i++) {
      games.push({
        id: i,
        name: `Oyun ${i}`,
        category: ["Aksiyon", "Macera", "Spor", "Strateji", "Yarış"][
          Math.floor(Math.random() * 5)
        ],
        rating: (Math.random() * 5).toFixed(1),
      });
    }
    return games;
  };

  const [games] = useState(generateGames());
  const [currentPage, setCurrentPage] = useState(1);
  const gamesPerPage = 20; // Sayfa başına oyun sayısı

  // Toplam sayfa sayısı
  const totalPages = Math.ceil(games.length / gamesPerPage);

  // Görünür sayfa numaralarını hesapla
  const getVisiblePages = () => {
    const visibleCount = 10;
    let startPage = Math.max(1, currentPage - Math.floor(visibleCount / 2));
    let endPage = Math.min(totalPages, startPage + visibleCount - 1);

    // Eğer son sayfalara yakınsak, başlangıcı ayarla
    if (endPage - startPage + 1 < visibleCount) {
      startPage = Math.max(1, endPage - visibleCount + 1);
    }

    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const handlePageChange = (page: any) => {
    setCurrentPage(page);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="p-2">
      <div className="flex flex-wrap items-center gap-1">
        {/* Geri Butonu */}
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className={`flex items-center px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
            currentPage === 1
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          <IoIosArrowBack />
          Önceki
        </button>

        {/* İlk sayfa (1'den uzaksa) */}
        {getVisiblePages()[0] > 1 && (
          <>
            <button
              onClick={() => handlePageChange(1)}
              className="px-4 py-2 rounded-lg font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 cursor-pointer transition-colors"
            >
              1
            </button>
            {getVisiblePages()[0] > 2 && (
              <span className="px-2 py-2 text-gray-500">...</span>
            )}
          </>
        )}

        {/* Görünür sayfa numaraları */}
        {getVisiblePages().map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
              page === currentPage
                ? "bg-blue-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}

        {/* Son sayfa (görünür aralıktan uzaksa) */}
        {getVisiblePages()[getVisiblePages().length - 1] < totalPages && (
          <>
            {getVisiblePages()[getVisiblePages().length - 1] <
              totalPages - 1 && (
              <span className="px-2 py-2 text-gray-500">...</span>
            )}
            <button
              onClick={() => handlePageChange(totalPages)}
              className="px-4 py-2 rounded-lg font-medium cursor-pointer bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
            >
              {totalPages}
            </button>
          </>
        )}

        {/* İleri Butonu */}
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages}
          className={`flex items-center px-4 py-2 rounded-lg font-medium cursor-pointer transition-colors ${
            currentPage === totalPages
              ? "bg-gray-100 text-gray-400 cursor-not-allowed"
              : "bg-blue-500 text-white hover:bg-blue-600"
          }`}
        >
          Sonraki
          <IoIosArrowForward />
        </button>
      </div>

      {/* Sayfa Bilgisi */}
      <div className="mt-4 text-sm text-zinc-300">
        {(currentPage - 1) * gamesPerPage + 1} -{" "}
        {Math.min(currentPage * gamesPerPage, games.length)} arası gösteriliyor
        (Toplam: {games.length})
      </div>
    </div>
  );
};

export default Pagination;
