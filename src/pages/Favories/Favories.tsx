import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchFavories } from "../../services/AuthService";
import ShowGames from "../../components/ShowGames";

const Favories = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["favories"],
    queryFn: fetchFavories,
  });

  return (
    <div className="flex flex-col py-8 px-40 w-full gap-4">
      <div className="flex flex-col gap-1 justify-center items-center">
        <h1 className="text-3xl font-bold w-full text-center">
          Favori Ürünlerim
        </h1>
        <hr className="w-20 border-2 border-blue-400" />
      </div>
      <div className="w-full">
        <ShowGames
          filteredData={data || []}
          colNumber={4}
          loading={isLoading}
          error={error}
        />
      </div>
    </div>
  );
};

export default Favories;
