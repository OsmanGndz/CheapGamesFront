import React, { useState } from "react";
import type { ShowGamesProps } from "../types/ShowGames";
import FilterMenu from "./FilterMenu";
import type { FilterPattern } from "vite";
import type { FilterProps } from "../types/MiniSlider";
import GameCard from "./GameCard";
import FilterGame from "./FilterGame";

const data = [
  {
    gameName: "The Witcher 3: Wild Hunt",
    gameDescription:
      "A story-driven open world RPG set in a visually stunning fantasy universe.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/0/0c/Witcher_3_cover_art.jpg",
    gamePrice: 19.99,
    gameDiscount: 50,
    totalSales: 25000000,
    categoryName: "RPG",
    platformName: "Steam",
    isStanding: true,
    releaseDate: "2015-05-18",
  },
  {
    gameName: "Cyberpunk 2077",
    gameDescription: "An open-world, action-adventure story set in Night City.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/9/9f/Cyberpunk_2077_box_art.jpg",
    gamePrice: 29.99,
    gameDiscount: 30,
    totalSales: 20000000,
    categoryName: "Action",
    platformName: "Steam",
    isStanding: true,
    releaseDate: "2020-12-10",
  },
  {
    gameName: "Elden Ring",
    gameDescription:
      "An open-world action RPG developed by FromSoftware and George R. R. Martin.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/b/b9/Elden_Ring_Box_art.jpg",
    gamePrice: 59.99,
    gameDiscount: 10,
    totalSales: 18000000,
    categoryName: "Souls-like",
    platformName: "Steam",
    isStanding: false,
    releaseDate: "2022-02-25",
  },
  {
    gameName: "Hades",
    gameDescription:
      "A rogue-like dungeon crawler from the creators of Bastion.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/e/e6/Hades_cover_art.jpg",
    gamePrice: 14.99,
    gameDiscount: 25,
    totalSales: 5000000,
    categoryName: "Roguelike",
    platformName: "Epic Games",
    isStanding: false,
    releaseDate: "2020-09-17",
  },
  {
    gameName: "Stardew Valley",
    gameDescription:
      "A farming simulation game where you inherit your grandfather's old farm.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/f/fd/Stardew_Valley_cover_art.png",
    gamePrice: 9.99,
    gameDiscount: 20,
    totalSales: 20000000,
    categoryName: "Simulation",
    platformName: "Steam",
    isStanding: true,
    releaseDate: "2016-02-26",
  },
  {
    gameName: "Red Dead Redemption 2",
    gameDescription: "An epic tale of life in America's unforgiving heartland.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/4/44/Red_Dead_Redemption_II.jpg",
    gamePrice: 39.99,
    gameDiscount: 35,
    totalSales: 50000000,
    categoryName: "Adventure",
    platformName: "Rockstar Launcher",
    isStanding: false,
    releaseDate: "2018-10-26",
  },
  {
    gameName: "Minecraft",
    gameDescription:
      "A sandbox game about placing blocks and going on adventures.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/5/51/Minecraft_cover.png",
    gamePrice: 26.95,
    gameDiscount: 0,
    totalSales: 200000000,
    categoryName: "Sandbox",
    platformName: "Mojang",
    isStanding: true,
    releaseDate: "2011-11-18",
  },
  {
    gameName: "Valorant",
    gameDescription: "A 5v5 tactical shooter with unique agents and abilities.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/6/6c/Valorant_logo.png",
    gamePrice: 0.0,
    gameDiscount: 0,
    totalSales: 50000000,
    categoryName: "Shooter",
    platformName: "Riot Games",
    isStanding: false,
    releaseDate: "2020-06-02",
  },
  {
    gameName: "God of War",
    gameDescription:
      "A new beginning for Kratos set in the world of Norse mythology.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/a/a7/God_of_War_4_cover.jpg",
    gamePrice: 49.99,
    gameDiscount: 20,
    totalSales: 19000000,
    categoryName: "Action",
    platformName: "PlayStation",
    isStanding: true,
    releaseDate: "2018-04-20",
  },
  {
    gameName: "Hogwarts Legacy",
    gameDescription:
      "An immersive, open-world action RPG set in the 1800s wizarding world.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/5/5e/Hogwarts_Legacy_cover_art.jpg",
    gamePrice: 59.99,
    gameDiscount: 15,
    totalSales: 12000000,
    categoryName: "RPG",
    platformName: "Steam",
    isStanding: false,
    releaseDate: "2023-02-10",
  },
  {
    gameName: "League of Legends",
    gameDescription:
      "A fast-paced, competitive online game that blends speed and strategy.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png",
    gamePrice: 0.0,
    gameDiscount: 0,
    totalSales: 100000000,
    categoryName: "MOBA",
    platformName: "Riot Games",
    isStanding: false,
    releaseDate: "2009-10-27",
  },
  {
    gameName: "GTA V",
    gameDescription: "An action-adventure game set in a vast open world.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/a/a5/Grand_Theft_Auto_V.png",
    gamePrice: 29.99,
    gameDiscount: 50,
    totalSales: 185000000,
    categoryName: "Action",
    platformName: "Rockstar Launcher",
    isStanding: true,
    releaseDate: "2013-09-17",
  },
  {
    gameName: "FIFA 24",
    gameDescription:
      "The latest edition of EA's iconic football simulation game.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/e/e9/FIFA_23_Cover.jpg",
    gamePrice: 69.99,
    gameDiscount: 10,
    totalSales: 15000000,
    categoryName: "Sports",
    platformName: "Origin",
    isStanding: true,
    releaseDate: "2024-09-29",
  },
  {
    gameName: "Call of Duty: Warzone",
    gameDescription:
      "A free-to-play battle royale game from the Call of Duty franchise.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/f/f1/Call_of_Duty_Warzone_cover_art.jpg",
    gamePrice: 0.0,
    gameDiscount: 0,
    totalSales: 100000000,
    categoryName: "Shooter",
    platformName: "Battle.net",
    isStanding: false,
    releaseDate: "2020-03-10",
  },
  {
    gameName: "Terraria",
    gameDescription:
      "A 2D sandbox game with building, mining, combat, and exploration.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/1/1e/Terraria_Steam_artwork.jpg",
    gamePrice: 9.99,
    gameDiscount: 30,
    totalSales: 45000000,
    categoryName: "Sandbox",
    platformName: "Steam",
    isStanding: true,
    releaseDate: "2011-05-16",
  },
  {
    gameName: "The Sims 4",
    gameDescription: "A life simulation game where you control people's lives.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/4/45/The_Sims_4_cover_art.jpg",
    gamePrice: 19.99,
    gameDiscount: 50,
    totalSales: 33000000,
    categoryName: "Simulation",
    platformName: "Origin",
    isStanding: false,
    releaseDate: "2014-09-02",
  },
  {
    gameName: "Among Us",
    gameDescription: "A multiplayer party game about teamwork and betrayal.",
    gameImage:
      "https://upload.wikimedia.org/wikipedia/en/9/9a/Among_Us_cover_art.jpg",
    gamePrice: 4.99,
    gameDiscount: 10,
    totalSales: 50000000,
    categoryName: "Party",
    platformName: "Steam",
    isStanding: false,
    releaseDate: "2018-06-15",
  },
];

const ShowGames: React.FC<ShowGamesProps> = ({ filters = [] }) => {
  const [filter, setFilter] = useState<string>(filters[0] || "ALL");
  // Oyun kartına tıklandığında çalışacak fonksiyon
  const handleGameClick = () => {
    console.log("Oyun tıklandı:");
    // Burada oyun detay sayfasına yönlendirme yapabilirsiniz
  };

  // Sepete ekle butonuna tıklandığında çalışacak fonksiyon
  const handleAddToCart = () => {
    console.log("Sepete eklendi:");
    // Burada sepete ekleme işlemi yapabilirsiniz
  };

  return (
    <div className="w-full flex flex-col gap-8">
      <div>
        {filters?.length > 0 && (
          <FilterGame filters={filters} filter={filter} setFilter={setFilter} />
        )}
      </div>
      <div className="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.slice(0, 12).map((game, index) => (
          <GameCard
            key={`${game.gameName}-${index}`}
            {...game}
            onClick={handleGameClick}
            onAddToCart={handleAddToCart}
          />
        ))}
      </div>
    </div>
  );
};

export default ShowGames;
