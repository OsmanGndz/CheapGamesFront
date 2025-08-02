import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchFavories, RemoveFavorite } from "../../services/AuthService";
import ShowGames from "../../components/ShowGames";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import type { ShowGamesProps } from "../../types/ShowGames";
import { toast } from "react-toastify";

const Favories = () => {
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getUrlParams = () => {
    return {
      pageUrl: Number(searchParams.get("page") || 1),
    };
  };

  const urlParams = getUrlParams();

  // pageInfo'nun undefined olamayacağını garanti etmek için tipini zorunlu yapıyoruz
  type PageInfo = {
    currentPage: number;
    totalGame: number;
    pageSize: number;
  };

  const [pageInfo, setPageInfo] = useState<PageInfo>({
    currentPage: urlParams.pageUrl || 1,
    totalGame: 0,
    pageSize: 12,
  });

  const RemoveFromFavories = async (id: number) => {
    try {
      await RemoveFavorite(id);
      queryClient.invalidateQueries({ queryKey: ["favories"] });
      toast.success("Favori ürünlerinizden çıkarıldı.");
    } catch (error) {
      toast.error("Favori ürün silinirken bir hata oluştu.");
    }
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["favories", pageInfo],
    queryFn: () => fetchFavories(pageInfo.currentPage, pageInfo.pageSize),
  });

  useEffect(() => {
    if (data) {
      setPageInfo((prev) => ({
        currentPage: prev?.currentPage ?? 1,
        pageSize: prev?.pageSize ?? 12,
        totalGame: data?.totalGame || 0,
      }));
      handleScrollToTop();
    }
  }, [data]);

  const updateUrl = useCallback(() => {
    const newParams = new URLSearchParams();
    newParams.set("page", String(pageInfo.currentPage));

    setSearchParams(newParams);
  }, [pageInfo.currentPage, setSearchParams]);

  useEffect(() => {
    updateUrl();
  }, [pageInfo.currentPage, pageInfo.pageSize]);

  useEffect(() => {
    const urlPage = Number(searchParams.get("page") || 1);
    // pageSize parametresi eklemek isterseniz burayı da güncelleyebilirsiniz
    if (urlPage !== pageInfo.currentPage) {
      setPageInfo({
        currentPage: urlPage,
        totalGame: pageInfo.totalGame,
        pageSize: pageInfo.pageSize,
      });
    }
  }, [searchParams]);

  return (
    <div className="flex flex-col py-8 px-4 md:px-20 lg:px-40 w-full gap-12">
      <div className="flex flex-col gap-1 justify-center items-center">
        <h1 className="text-3xl font-bold w-full text-center">
          Favori Ürünlerim
        </h1>
        <hr className="w-20 border-2 border-blue-400" />
      </div>

      {data?.games && data.games.length > 0 ? (
        <div className="w-full">
          <ShowGames
            filteredData={data.games || []}
            colNumber={4}
            loading={isLoading}
            error={error}
            isFavoriteMode={true}
            onRemoveFromFavorites={RemoveFromFavories}
            pageInfo={pageInfo}
            setPageInfo={
              setPageInfo as React.Dispatch<
                React.SetStateAction<ShowGamesProps["pageInfo"]>
              >
            }
            isPagination={true}
          />
        </div>
      ) : (
        <p className="text-center w-full text-zinc-300 ">
          Herhangi bir favori ürününüz bulunmamakta
        </p>
      )}
    </div>
  );
};

export default Favories;
