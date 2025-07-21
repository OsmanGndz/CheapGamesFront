import ShowGames from "../../components/ShowGames";
import { useQuery } from "@tanstack/react-query";
import { fetchGamesByAllFilter } from "../../services/GameService";
import { useState } from "react";
const pcGameFilters = ["Hepsi", "Steam", "Origin", "Uplay", "Microsoft"];
const PCGames = () => {
  const [filter, setFilter] = useState<string>(pcGameFilters[0]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["pcGames", filter],
    queryFn: () =>
      fetchGamesByAllFilter({
        Category: "computer",
        Platform: filter === "Hepsi" ? "Tüm Ürünler" : filter,
        pageSize: 12,
      }),
    staleTime: 1000 * 60 * 30, // 5 minutes
  }); // Assume this hook fetches PC games data
  return (
    <div className="w-full">
      <ShowGames
        filters={pcGameFilters}
        colNumber={6}
        filteredData={data?.games}
        loading={isLoading}
        error={error}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
};

export default PCGames;
