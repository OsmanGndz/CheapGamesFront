import { useEffect, useRef, useState } from "react";
import type { FilterProps, MiniSliderProps } from "../types/MiniSlider";
import FilterMenu from "./FilterMenu";
import GameCard from "./GameCard";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { fetchFilteredGameData } from "../services/GameService";
import { useQuery } from "@tanstack/react-query";

// const data = [
//   {
//     gameName: "The Witcher 3: Wild Hunt",
//     gameDescription:
//       "A story-driven open world RPG set in a visually stunning fantasy universe.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
//     gamePrice: 19.99,
//     gameDiscount: 50,
//     totalSales: 25000000,
//     categoryName: "RPG",
//     platformName: "Steam",
//     isStanding: true,
//     releaseDate: "2015-05-18",
//   },
//   {
//     gameName: "Cyberpunk 2077",
//     gameDescription: "An open-world, action-adventure story set in Night City.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
//     gamePrice: 29.99,
//     gameDiscount: 30,
//     totalSales: 20000000,
//     categoryName: "Action",
//     platformName: "Steam",
//     isStanding: true,
//     releaseDate: "2020-12-10",
//   },
//   {
//     gameName: "Elden Ring",
//     gameDescription:
//       "An open-world action RPG developed by FromSoftware and George R. R. Martin.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
//     gamePrice: 59.99,
//     gameDiscount: 10,
//     totalSales: 18000000,
//     categoryName: "Souls-like",
//     platformName: "Steam",
//     isStanding: false,
//     releaseDate: "2022-02-25",
//   },
//   {
//     gameName: "Hades",
//     gameDescription:
//       "A rogue-like dungeon crawler from the creators of Bastion.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/e/e6/Hades_cover_art.jpg",
//     gamePrice: 14.99,
//     gameDiscount: 25,
//     totalSales: 5000000,
//     categoryName: "Roguelike",
//     platformName: "Epic Games",
//     isStanding: false,
//     releaseDate: "2020-09-17",
//   },
//   {
//     gameName: "Stardew Valley",
//     gameDescription:
//       "A farming simulation game where you inherit your grandfather's old farm.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/f/fd/Stardew_Valley_cover_art.png",
//     gamePrice: 9.99,
//     gameDiscount: 20,
//     totalSales: 20000000,
//     categoryName: "Simulation",
//     platformName: "Steam",
//     isStanding: true,
//     releaseDate: "2016-02-26",
//   },
//   {
//     gameName: "Red Dead Redemption 2",
//     gameDescription: "An epic tale of life in America's unforgiving heartland.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
//     gamePrice: 39.99,
//     gameDiscount: 35,
//     totalSales: 50000000,
//     categoryName: "Adventure",
//     platformName: "Rockstar Launcher",
//     isStanding: false,
//     releaseDate: "2018-10-26",
//   },
//   {
//     gameName: "Minecraft",
//     gameDescription:
//       "A sandbox game about placing blocks and going on adventures.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
//     gamePrice: 26.95,
//     gameDiscount: 0,
//     totalSales: 200000000,
//     categoryName: "Sandbox",
//     platformName: "Mojang",
//     isStanding: true,
//     releaseDate: "2011-11-18",
//   },
//   {
//     gameName: "Valorant",
//     gameDescription: "A 5v5 tactical shooter with unique agents and abilities.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/6/6c/Valorant_logo.png",
//     gamePrice: 0.0,
//     gameDiscount: 0,
//     totalSales: 50000000,
//     categoryName: "Shooter",
//     platformName: "Riot Games",
//     isStanding: false,
//     releaseDate: "2020-06-02",
//   },
//   {
//     gameName: "God of War",
//     gameDescription:
//       "A new beginning for Kratos set in the world of Norse mythology.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
//     gamePrice: 49.99,
//     gameDiscount: 20,
//     totalSales: 19000000,
//     categoryName: "Action",
//     platformName: "PlayStation",
//     isStanding: true,
//     releaseDate: "2018-04-20",
//   },
//   {
//     gameName: "Hogwarts Legacy",
//     gameDescription:
//       "An immersive, open-world action RPG set in the 1800s wizarding world.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/5/5e/Hogwarts_Legacy_cover_art.jpg",
//     gamePrice: 59.99,
//     gameDiscount: 15,
//     totalSales: 12000000,
//     categoryName: "RPG",
//     platformName: "Steam",
//     isStanding: false,
//     releaseDate: "2023-02-10",
//   },
//   {
//     gameName: "League of Legends",
//     gameDescription:
//       "A fast-paced, competitive online game that blends speed and strategy.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png",
//     gamePrice: 0.0,
//     gameDiscount: 0,
//     totalSales: 100000000,
//     categoryName: "MOBA",
//     platformName: "Riot Games",
//     isStanding: false,
//     releaseDate: "2009-10-27",
//   },
//   {
//     gameName: "GTA V",
//     gameDescription: "An action-adventure game set in a vast open world.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
//     gamePrice: 29.99,
//     gameDiscount: 50,
//     totalSales: 185000000,
//     categoryName: "Action",
//     platformName: "Rockstar Launcher",
//     isStanding: true,
//     releaseDate: "2013-09-17",
//   },
//   {
//     gameName: "FIFA 24",
//     gameDescription:
//       "The latest edition of EA's iconic football simulation game.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/e/e9/FIFA_23_Cover.jpg",
//     gamePrice: 69.99,
//     gameDiscount: 10,
//     totalSales: 15000000,
//     categoryName: "Sports",
//     platformName: "Origin",
//     isStanding: true,
//     releaseDate: "2024-09-29",
//   },
//   {
//     gameName: "Call of Duty: Warzone",
//     gameDescription:
//       "A free-to-play battle royale game from the Call of Duty franchise.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/f/f1/Call_of_Duty_Warzone_cover_art.jpg",
//     gamePrice: 0.0,
//     gameDiscount: 0,
//     totalSales: 100000000,
//     categoryName: "Shooter",
//     platformName: "Battle.net",
//     isStanding: false,
//     releaseDate: "2020-03-10",
//   },
//   {
//     gameName: "Terraria",
//     gameDescription:
//       "A 2D sandbox game with building, mining, combat, and exploration.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/1/1e/Terraria_Steam_artwork.jpg",
//     gamePrice: 9.99,
//     gameDiscount: 30,
//     totalSales: 45000000,
//     categoryName: "Sandbox",
//     platformName: "Steam",
//     isStanding: true,
//     releaseDate: "2011-05-16",
//   },
//   {
//     gameName: "The Sims 4",
//     gameDescription: "A life simulation game where you control people's lives.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/4/45/The_Sims_4_cover_art.jpg",
//     gamePrice: 19.99,
//     gameDiscount: 50,
//     totalSales: 33000000,
//     categoryName: "Simulation",
//     platformName: "Origin",
//     isStanding: false,
//     releaseDate: "2014-09-02",
//   },
//   {
//     gameName: "Among Us",
//     gameDescription: "A multiplayer party game about teamwork and betrayal.",
//     gameImage:
//       "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg",
//     gamePrice: 4.99,
//     gameDiscount: 10,
//     totalSales: 50000000,
//     categoryName: "Party",
//     platformName: "Steam",
//     isStanding: false,
//     releaseDate: "2018-06-15",
//   },
// ];

interface dataProps {
  id?: number;
  gameName: string;
  gameDescription: string;
  gameImage: string;
  gamePrice: number;
  gameDiscount: number;
  categoryName: string;
  platformName: string;
  totalSales: number;
  isStanding: boolean;
  releaseDate: string;
}

const MiniSlider: React.FC<MiniSliderProps> = ({ isloading, error, data }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState<number>(1);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const getVisibleCards = () => {
    if (typeof window === "undefined") return 1;

    const width = window.innerWidth;
    if (width < 640) return 2;
    if (width < 1024) return 4;
    return 6;
  };

  useEffect(() => {
    const updateVisibleCards = () => {
      const newVisibleCards = getVisibleCards();
      setVisibleCards(newVisibleCards);
    };

    updateVisibleCards();
    window.addEventListener("resize", updateVisibleCards);

    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  const goNext = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max((data ? data.length : 0) - visibleCards, 0);
      return prev >= maxIndex ? 0 : prev + 1;
    });
  };

  const handleNext = () => {
    goNext();
    resetInterval();
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => {
      const maxIndex = Math.max((data ? data.length : 0) - visibleCards, 0);
      return prev <= 0 ? maxIndex : prev - 1;
    });
    resetInterval();
  };

  const startInterval = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(goNext, 10000);
  };

  const resetInterval = () => {
    startInterval();
  };

  useEffect(() => {
    setCurrentIndex(0);
    startInterval();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [data?.length ?? 0, visibleCards]);

  const translateX = -(currentIndex * (100 / visibleCards + 0.05));

  // Oyun kartına tıklandığında çalışacak fonksiyon
  const handleGameClick = (gameData: dataProps) => {
    console.log("Oyun tıklandı:", gameData);
    // Burada oyun detay sayfasına yönlendirme yapabilirsiniz
  };

  // Sepete ekle butonuna tıklandığında çalışacak fonksiyon
  const handleAddToCart = (gameData: dataProps) => {
    console.log("Sepete eklendi:", gameData);
    // Burada sepete ekleme işlemi yapabilirsiniz
  };

  if (isloading) {
    return (
      <p className="flex w-full items-center justify-center">...Yükleniyor</p>
    );
  }
  if (error) {
    return (
      <p className="flex w-full items-center justify-center text-red-500">
        Error: {error}
      </p>
    );
  }

  return (
    <div className="flex flex-col justify-center gap-8 w-full relative">
      {data && data.length > 0 && (
        <div className="relative overflow-hidden w-full">
          {/* Slider Container */}
          <div
            className="flex transition-transform duration-700 ease-in-out items-stretch"
            style={{
              transform: `translateX(${translateX}%)`,
              gap: "0.5rem",
            }}
          >
            {data.map((item, index) => (
              <GameCard
                key={`${item.gameName}-${index}`}
                {...item}
                width={`calc(${100 / visibleCards}% - 0.44rem)`}
                minWidth="90px"
                onClick={handleGameClick}
                onAddToCart={handleAddToCart}
              />
            ))}
          </div>

          {/* Navigation Buttons */}
          {data.length > visibleCards && (
            <>
              <button
                className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-black/70 text-white z-30 cursor-pointer p-2 sm:p-3 hover:text-blue-400 hover:bg-black/80 transition-colors duration-200 rounded-r-md"
                onClick={handlePrev}
                aria-label="Previous"
              >
                <FaArrowLeft className="text-sm sm:text-xl" />
              </button>
              <button
                className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-black/70 text-white z-30 cursor-pointer p-2 sm:p-3 hover:text-blue-400 hover:bg-black/80 transition-colors duration-200 rounded-l-md"
                onClick={handleNext}
                aria-label="Next"
              >
                <FaArrowRight className="text-sm sm:text-xl" />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default MiniSlider;
