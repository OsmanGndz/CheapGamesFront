import { useState } from "react";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { GiTrophyCup } from "react-icons/gi";
import { IoDiamondSharp, IoRocketSharp } from "react-icons/io5";
import MiniSlider from "../../components/MiniSlider";
import FilterMenu from "../../components/FilterMenu";
import { useQuery } from "@tanstack/react-query";
import { fetchFilteredGameData } from "../../services/GameService";

const allGamesFilters = [
  {
    name: "ÇOK SATANLAR",
    icon: <GiTrophyCup className="text-xl" />,
    endpoint: "mostsales",
  },
  {
    name: "ÖNE ÇIKANLAR",
    icon: <IoRocketSharp className="text-xl" />,
    endpoint: "standings",
  },
  {
    name: "YENİ EKLENENLER",
    icon: <IoDiamondSharp className="text-xl" />,
    endpoint: "newadded",
  },
  {
    name: "ÖN SİPARİŞ OYUNLARI",
    icon: <FaRegHourglassHalf className="text-[15px]" />,
    endpoint: "preorder",
  },
];
const FilterHome = () => {
  const [filter, setFilter] = useState<{
    name: string;
    icon: React.ReactNode;
    endpoint: string;
  }>(allGamesFilters[0]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["games/", filter.endpoint],
    queryFn: () => fetchFilteredGameData(filter.endpoint),
    staleTime: 1000 * 60 * 30,
    refetchOnWindowFocus: false,
  });

  return (
    <div className="flex flex-col justify-center items-center w-full gap-8">
      <FilterMenu
        filters={allGamesFilters}
        filter={filter}
        setFilter={setFilter}
      />

      <div className="flex w-full">
        <MiniSlider
          isloading={isLoading}
          error={error ? String(error) : ""}
          data={data ? data.slice(0, 12) : []}
        />
      </div>
    </div>
  );
};

export default FilterHome;
