import { useQuery } from "@tanstack/react-query";
import { fetchGamesByCategory } from "../../services/GameService";
import MiniSlider from "../../components/MiniSlider";

const PlaystationHome = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["playstationGames"],
    queryFn: () => fetchGamesByCategory("Playstation"),
    staleTime: 1000 * 60 * 30,
  });

  return (
    <div className="">
      <MiniSlider
        isloading={isLoading}
        error={error ? String(error) : ""}
        data={data ? data.slice(0, 12) : []}
      />
    </div>
  );
};

export default PlaystationHome;
