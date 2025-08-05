import { useQuery } from "@tanstack/react-query";
import {
  fetchMyProducts,
} from "../../services/AuthService";
import ShowGames from "../../components/ShowGames";
import { useSearchParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import type { ShowGamesProps } from "../../types/ShowGames";

const UserProducts = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<ShowGamesProps["filteredData"]>([]);

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

  const { data, isLoading, error } = useQuery({
    queryKey: ["my-products", pageInfo],
    queryFn: () => fetchMyProducts(pageInfo.currentPage, pageInfo.pageSize),
  });

  useEffect(() => {
    if (data) {
      setPageInfo((prev) => ({
        currentPage: prev?.currentPage ?? 1,
        pageSize: prev?.pageSize ?? 12,
        totalGame: data?.totalGames || 0,
      }));

      setProducts(data.games.map((item: any) => item.game));
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
        <h1 className="text-3xl font-bold w-full text-center">Ürünlerim</h1>
        <hr className="w-20 border-2 border-blue-400" />
      </div>

      {products && products?.length > 0 ? (
        <div className="w-full">
          <ShowGames
            isUserProductsMode={true}
            filteredData={products || []}
            colNumber={4}
            loading={isLoading}
            error={error}
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
          Herhangi bir ürününüz bulunmamakta
        </p>
      )}
    </div>
  );
};

export default UserProducts;
