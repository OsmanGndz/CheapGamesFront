import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import { fetchGameById } from "../services/GameService";
import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaCheckCircle,
  FaHeart,
  FaHeartBroken,
} from "react-icons/fa";
import { TbBasketMinus, TbBasketPlus } from "react-icons/tb";
import Spinner from "../components/Spinner";
import { useBasket } from "../Context/BasketContext";
import {
  AddFavorite,
  RemoveFavorite,
  IsFavorite,
} from "../services/AuthService";
import { useUser } from "../Context/UserContext";
import { toast } from "react-toastify";
import { formatDateToReadable } from "../logic/DateFormat.l";

const GameDetails = () => {
  const { id } = useParams();
  const [showMore, setShowMore] = useState(false);
  const { AddToBasket, RemoveFromBasket, isInBasket } = useBasket();
  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const { IsOwned, logout, isAuthenticated } = useUser();
  const navigate = useNavigate();

  const handleAddToBasket = () => {
    if (isAuthenticated) {
      if (data) {
        AddToBasket({ ...data, Id: data.id });
      }
    } else {
      toast.error("Sepete eklemek için giriş yapmalısınız.");
      navigate("/login");
    }
  };

  const handleRemoveFromBasket = () => {
    RemoveFromBasket(Number(id));
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["gameDetails", id],
    queryFn: () => fetchGameById(Number(id)),
    enabled: !!id,
  });

  const handleIsFavorite = async () => {
    try {
      const response = await IsFavorite(Number(id));
      setIsFavorite(response);
    } catch (error) {
      toast.error("Favori ürünleriniz yüklenirken bir hata oluştu.");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!isAuthenticated) {
      setIsFavorite(false);
    } else {
      handleIsFavorite();
    }
  }, [logout, isAuthenticated]);

  const AddToFavorites = async (id: number) => {
    if (!isAuthenticated) {
      toast.error("Favorilere ekleme yapmak için önce giriş yapmalısınız.");
      navigate("/login");
    } else {
      try {
        await AddFavorite(id);
        toast.success("Favori ürünlerinize eklendi.");
        handleIsFavorite();
      } catch (error) {
        toast.error("Favori ürünlerinize eklenirken bir hata oluştu.");
      }
    }
  };

  const RemoveFromFavorites = async (id: number) => {
    try {
      await RemoveFavorite(id);
      handleIsFavorite();
      toast.success("Favori ürünlerinizden çıkarıldı.");
    } catch (error) {
      toast.error("Favori ürün silinirken bir hata oluştu.");
    }
  };

  if (error) {
    toast.error("Ürün detayları yüklenirken bir hata oluştu.");
  }

  return (
    <div className="flex flex-col px-0 sm:px-8 md:px-20 lg:px-32 xl:px-40 py-4">
      {isLoading && (
        <Spinner
          className="flex justify-center items-center w-full"
          color="fill-blue-400"
          size="w-10 h-10"
        />
      )}
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
            </div>
            <div className="flex flex-col gap-8 w-full sm:w-[60%] mt-8">
              <div className="flex items-center w-full font-bold bg-slate-800 rounded-md p-4 gap-2">
                {data.gameDiscount > 0 && data.gamePrice > 0 && (
                  <span className=" text-2xl text-white whitespace-nowrap  ">
                    {(
                      data.gamePrice -
                      (data.gamePrice * data.gameDiscount) / 100
                    ).toFixed(2)}{" "}
                    TL
                  </span>
                )}
                <span
                  className={`${
                    data.gameDiscount > 0 &&
                    "text-zinc-400 line-through text-lg"
                  } text-2xl whitespace-nowrap`}
                >
                  {data.gamePrice === 0
                    ? "Ücretsiz"
                    : `${data.gamePrice.toFixed(2)} TL`}
                </span>
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
                  <p>
                    <strong>Yayınlanma Tarihi:</strong>{" "}
                    {formatDateToReadable(data.releaseDate)}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                {IsOwned(Number(id)) ? (
                  <div className="flex justify-center items-center gap-2 w-full bg-green-700 text-white py-2 rounded-md hover:bg-slate-800 border border-white hover:border-blue-400 cursor-pointer transition-colors duration-300">
                    <FaCheckCircle className="text-white text-lg mr-2" />
                    Ürünlerinde
                  </div>
                ) : !isInBasket(Number(id)) ? (
                  <button
                    className="flex justify-center items-center gap-2 w-full bg-blue-400 text-white py-2 rounded-md hover:bg-slate-800 border border-white lg:hover:border-blue-400 cursor-pointer transition-colors duration-300"
                    onClick={handleAddToBasket}
                  >
                    <TbBasketPlus className="text-lg sm:text-xl text-white" />
                    Sepete Ekle
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center gap-2 w-full bg-red-500 text-white py-2 rounded-md lg:hover:bg-slate-800 border border-white lg:hover:border-blue-400 cursor-pointer transition-colors duration-300"
                    onClick={handleRemoveFromBasket}
                  >
                    <TbBasketMinus className="text-lg sm:text-xl text-white" />
                    Sepetten Çıkar
                  </button>
                )}
                {isFavorite ? (
                  <button
                    className="flex justify-center items-center gap-2 w-full bg-red-500 text-white py-2 rounded-md hover:bg-slate-800 border border-white hover:border-blue-400 cursor-pointer transition-colors duration-300"
                    onClick={() => RemoveFromFavorites(data.id)}
                  >
                    <FaHeartBroken className="text-lg" />
                    Favorilerden Çıkar
                  </button>
                ) : (
                  <button
                    className="flex justify-center items-center gap-2 w-full  bg-slate-800 text-zinc-200 hover:text-gray-700 py-2 rounded-md hover:bg-zinc-100 border border-white hover:border-black hover:shadow-md hover:shadow-pink-500 cursor-pointer transition-colors duration-300"
                    onClick={() => AddToFavorites(data.id)}
                  >
                    <FaHeart className="text-[16px] sm:text-lg text-red-500" />
                    Favorilere Ekle
                  </button>
                )}
              </div>
              <div className="w-full hidden sm:flex flex-col items-center gap-4 relative">
                <div className="flex flex-col justify-center items-center ">
                  <h2 className="text-2xl font-semibold">Ürün Tanıtımı</h2>
                  <hr className="w-12 border-1 text-blue-400" />
                </div>
                <div className="flex w-full justify-start">
                  <div
                    className={`text-zinc-100 text-sm p-2 w-full ${
                      (data.gameDescription?.length || 0) > 400 && showMore
                        ? "h-auto"
                        : "h-24"
                    } overflow-hidden transition-all duration-500 shadow-md shadow-blue-400/50 `}
                  >
                    {data?.gameDescription}
                  </div>
                </div>
                {(data.gameDescription?.length || 0) > 400 && (
                  <button
                    className="flex justify-center items-center text-black gap-1 px-2 cursor-pointer mt-2 bg-zinc-300 absolute -bottom-5"
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
