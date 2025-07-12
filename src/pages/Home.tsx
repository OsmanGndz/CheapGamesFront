import Slide from "../components/Slide";
import yanslide1 from "../assets/Yanslides/yanslide1.jpg";
import yanslide2 from "../assets/Yanslides/yanslide2.jpg";
import yanslide3 from "../assets/Yanslides/yanslide3.jpg";
import { FaArrowRight } from "react-icons/fa";
import MiniSlider from "../components/MiniSlider";
import { GiTrophyCup } from "react-icons/gi";
import { IoDiamondSharp, IoRocketSharp } from "react-icons/io5";
import { FaRegHourglassHalf } from "react-icons/fa6";
import { useQuery } from "@tanstack/react-query";
import { fetchGameData } from "../services/GameService";


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

const allGamesFilters = [
  {
    name: "ÇOK SATANLAR",
    icon: <GiTrophyCup className="text-xl" />,
  },
  {
    name: "ÖNE ÇIKANLAR",
    icon: <IoRocketSharp className="text-xl" />,
  },
  {
    name: "YENİ EKLENENLER",
    icon: <IoDiamondSharp className="text-xl" />,
  },
  {
    name: "ÖN SİPARİŞ OYUNLARI",
    icon: <FaRegHourglassHalf className="text-[15px]" />,
  },
];
const Home = () => {
  const {data: allGamesSlideData, isLoading, error} = useQuery({
    queryKey: ["allGamesSlideData"],
    queryFn: fetchGameData
  })

  //if (isLoading) return <p>Yükleniyor...</p>;
  //if (error) return <p>Hata oluştu</p>;

  return (
    <div className="w-full h-full flex flex-col gap-8">
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
      <div className="flex flex-col w-full h-full gap-8">
        <div className="flex w-full h-full">
          <MiniSlider data={allGamesSlideData} filters={allGamesFilters} />
        </div>
        <div>PC OYUNLARI</div>
        <div>PLAYSTATION OYUNLARI</div>
      </div>
    </div>
  );
};

export default Home;
