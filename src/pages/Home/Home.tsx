import Slide from "../../components/Slide";
import yanslide1 from "../../assets/Yanslides/yanslide1.jpg";
import yanslide2 from "../../assets/Yanslides/yanslide2.jpg";
import yanslide3 from "../../assets/Yanslides/yanslide3.jpg";
import { FaArrowRight } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import ShowGames from "../../components/ShowGames";
import FilterHome from "./FilterHome";
import PlaystationHome from "./PlaystationHome";

const yanSlides = [
  {
    id: 1,
    title: "Yan Slide 1",
    imageUrl: yanslide1,
  },
  {
    id: 2,
    title: "Yan Slide 2",
    imageUrl: yanslide2,
  },
  {
    id: 3,
    title: "Yan Slide 3",
    imageUrl: yanslide3,
  },
];

const pcGameFilters = ["Hepsi", "Steam", "Origin", "Uplay", "Microsoft"];
const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full flex flex-col gap-8 items-center">
      <div className="flex w-full aspect-[16/9] lg:aspect-[25/9] gap-1 lg:gap-4">
        <div className="w-full lg:w-[70%] h-full">
          <Slide />
        </div>
        <div className="hidden lg:flex lg:w-[30%] h-full">
          <div className="flex flex-col gap-1 lg:gap-4 w-full h-full">
            {yanSlides.map((slide) => (
              <div
                key={slide.title}
                className="relative w-full h-full cursor-pointer overflow-hidden group"
              >
                <img
                  src={slide.imageUrl}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-sm lg:rounded-lg transform transition-transform duration-400 group-hover:scale-115"
                />
                <div className="absolute right-4 bottom-4  transition-all duration-300 opacity-0 group-hover:opacity-100  hover:text-blue-400">
                  <FaArrowRight />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-col w-full h-full gap-12">
        <div className="flex w-full h-full">
          <FilterHome />
        </div>
        <div className="flex flex-col w-full h-full gap-8">
          <div className="flex items-center justify-center gap-1">
            <div
              className="flex items-center cursor-pointer hover:text-blue-400 gap-1"
              onClick={() => navigate("/playstation")}
            >
              <h1 className="font-bold text-4xl">PLAYSTATION</h1>
              <span>
                <IoIosArrowForward className="text-xl" />
              </span>
            </div>
          </div>
          <PlaystationHome />
        </div>

        <div className="flex flex-col w-full h-full gap-4 justify-center">
          <div className="flex items-center justify-center gap-1">
            <div
              className="flex items-center gap-1 cursor-pointer hover:text-blue-400"
              onClick={() => navigate("/pc-games/all")}
            >
              <h1 className="font-bold text-4xl">PC OYUNLARI</h1>
              <span>
                <IoIosArrowForward className="text-xl" />
              </span>
            </div>
          </div>
          <div className="flex w-full h-full">
            <ShowGames filters={pcGameFilters} colNumber={6} />
          </div>
        </div>
      </div>
      <div className="text-center text-[18px] text-white flex flex-col gap-4 px-12 pt-8 pb-4">
        <p>
          Bu site, yalnızca eğitim ve portföy amaçlı geliştirilmiştir. Herhangi
          bir ticari gelir, satış ya da resmi temsil amacı bulunmamaktadır.
          Kullanılan oyun görselleri, açıklamalar ve fiyat bilgileri tamamen
          örnek verilerden ibarettir.
        </p>
        <p className="">
          Bu proje, kendini front-end ve back-end geliştirme alanlarında
          ilerletmek isteyen yazılımcılar için hazırlanmış bir örnek çalışmadır.
          Gerçek bir oyun satış platformu değildir ve hiçbir oyunun satışı
          yapılmamaktadır.
        </p>
        <p className="font-semibold">
          Bu proje, Steam, PlayStation, Epic Games, Uplay vb. herhangi bir oyun
          platformu ile bağlantılı değildir.
        </p>
      </div>
    </div>
  );
};

export default Home;
