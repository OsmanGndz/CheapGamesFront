import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchGameById } from "../services/GameService";
import { useEffect, useState } from "react";
import { FaArrowDown, FaHeart } from "react-icons/fa";
import { TbBasketPlus } from "react-icons/tb";
import Spinner from "../components/Spinner";

const GameDetails = () => {
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);
  const { data, error, isLoading } = useQuery({
    queryKey: ["gameDetails", id],
    queryFn: () => fetchGameById(Number(id)),
    enabled: !!id, // Only run the query if id is available
  });

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  return (
    <div className="flex flex-col px-0 sm:px-8 md:px-20 lg:px-32 xl:px-40 py-4">
      {isLoading && (
        <Spinner
          className="flex justify-center items-center w-full"
          color="fill-blue-400"
          size="w-10 h-10"
        />
      )}
      {error && <p>Error loading game details: {error.message}</p>}
      {data && (
        <div className="flex flex-col p-4 gap-8">
          {/*game name*/}
          <div className="flex flex-col items-center justify-center gap-1">
            <h1 className="text-3xl font-bold">{data?.gameName}</h1>
            <hr className="w-12 border-1 text-blue-400" />
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center  sm:justify-start sm:items-start w-full gap-8">
            <div className="flex flex-col gap-4 w-full sm:w-[40%]">
              <div className="flex w-full aspect-video items-center justify-center">
                <img
                  src={data?.gameImage}
                  alt={data?.gameName}
                  loading="lazy"
                  className="w-full h-auto object-cover rounded-lg shadow-md shadow-blue-400/50"
                />
              </div>
              <div className="w-full hidden sm:flex flex-col gap-1 justify-center items-center relative">
                <h2 className="text-lg font-semibold">Ürün Tanıtımı</h2>
                <hr className="w-12 border-1 text-blue-400" />
                <div
                  className={`text-zinc-100 text-sm p-2 ${
                    (data.gameDescription?.length || 0) > 200 && showMore
                      ? "h-auto"
                      : "h-20"
                  } overflow-hidden transition-all duration-300 shadow-md shadow-blue-400/50`}
                >
                  {data?.gameDescription}
                </div>
                {(data.gameDescription?.length || 0) > 200 && (
                  <button
                    className="flex items-center text-black gap-1 px-2 cursor-pointer mt-2 bg-zinc-300 absolute -bottom-5"
                    onClick={() => setShowMore(!showMore)}
                  >
                    {showMore ? (
                      <FaArrowDown className="rotate-180" />
                    ) : (
                      <FaArrowDown />
                    )}
                    {showMore ? "Daha Az Göster" : "Daha Fazla Göster"}
                  </button>
                )}
              </div>
            </div>
            <div className="flex flex-col gap-4 w-full sm:w-[60%] mt-8">
              <div className="flex items-center w-full font-bold bg-slate-800 rounded-md p-4 gap-2">
                <span className="text-2xl text-white whitespace-nowrap">
                  {data.gamePrice === 0
                    ? "Ücretsiz"
                    : `${data.gamePrice.toFixed(2)} TL`}
                </span>
                {data.gameDiscount > 0 && data.gamePrice > 0 && (
                  <span className="text-lg text-zinc-400 line-through whitespace-nowrap">
                    {(data.gamePrice / (1 - data.gameDiscount / 100)).toFixed(
                      2
                    )}{" "}
                    TL
                  </span>
                )}
              </div>
              <div className="flex flex-col gap-2 bg-slate-800 rounded-md p-4">
                <h2 className="text-xl font-semibold">Oyun Bilgileri</h2>
                <hr className="w-32 text-blue-400" />
                <div className="flex flex-col gap-2">
                  <p>
                    <strong>Platform:</strong> {data.platformName}
                  </p>
                  <p>
                    <strong>Kategori:</strong> {data.categoryName}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="flex justify-center items-center gap-2 w-full bg-blue-400 text-white py-2 rounded-md hover:bg-slate-800 border border-white hover:border-blue-400 cursor-pointer transition-colors duration-300">
                  <TbBasketPlus className="text-lg sm:text-xl text-white" />
                  Sepete Ekle
                </button>
                <button className="flex justify-center items-center gap-2 w-full  bg-slate-800 text-zinc-200 hover:text-gray-700 py-2 rounded-md hover:bg-zinc-100 border border-white hover:border-black hover:shadow-md hover:shadow-pink-500 cursor-pointer transition-colors duration-300">
                  <FaHeart className="text-[16px] sm:text-lg text-red-500" />
                  Favorilere Ekle
                </button>
              </div>
            </div>
          </div>
          <div className="w-full flex sm:hidden flex-col gap-1 justify-center items-center relative">
            <h2 className="text-lg font-semibold">Ürün Tanıtımı</h2>
            <hr className="w-12 border-1 text-blue-400" />
            <div
              className={`text-zinc-100 text-sm p-2 ${
                (data.gameDescription?.length || 0) > 200 && showMore
                  ? "h-auto"
                  : "h-20"
              } overflow-hidden transition-all duration-300 shadow-md shadow-blue-400/50`}
            >
              {data?.gameDescription}
            </div>
            {(data.gameDescription?.length || 0) > 200 && (
              <button
                className="flex items-center text-black gap-1 px-2 cursor-pointer mt-2 bg-zinc-300 absolute -bottom-5"
                onClick={() => setShowMore(!showMore)}
              >
                {showMore ? (
                  <FaArrowDown className="rotate-180" />
                ) : (
                  <FaArrowDown />
                )}
                {showMore ? "Daha Az Göster" : "Daha Fazla Göster"}
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default GameDetails;
