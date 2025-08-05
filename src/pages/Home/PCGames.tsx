import ShowGames from "../../components/ShowGames";
import { useQuery } from "@tanstack/react-query";
import { fetchGamesByAllFilter } from "../../services/GameService";
import { useState } from "react";
import FilterMenu from "../../components/FilterMenu";

const pcGameFilters = ["Hepsi", "Steam", "Origin", "Uplay", "Microsoft"];

const PCGames = () => {
  const [filter, setFilter] = useState<string>(pcGameFilters[0]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pcGames", filter],
    queryFn: () =>
      fetchGamesByAllFilter({
        Category: "Computer",
        Platform: filter === "Hepsi" ? "Tüm Ürünler" : filter,
        pageSize: 12,
        page:1
      }),
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        <FilterMenu<string>
          filters={pcGameFilters}
          filter={filter}
          setFilter={setFilter}
        />
      </div>
      <ShowGames
        colNumber={6}
        filteredData={data?.games}
        loading={isLoading}
        error={error}
      />
    </div>
  );
};

export default PCGames;
