import { ImCreditCard } from "react-icons/im";
import { FaInstagram, FaUser, FaUserPlus } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { IoLogoGameControllerB, IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { LuShoppingBasket, LuUserRoundCheck } from "react-icons/lu";
import NavbarMenus from "./NavbarMenus";
import { IoMenu } from "react-icons/io5";
import type { NavbarProps } from "../types/Navbar";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchedGames } from "../services/GameService";
import { useUser } from "../Context/UserContext";
import { CiLogout } from "react-icons/ci";
import { MdFavorite, MdManageAccounts } from "react-icons/md";
import { FaClockRotateLeft } from "react-icons/fa6";

// Hesabım, siparişlerim, favorilerim, çıkış yap
const accountMenuValues = [
  {
    id: 1,
    icon: <MdManageAccounts className="text-lg" />,
    value: "Hesabım",
    url: "/account",
  },
  {
    id: 2,
    icon: <FaClockRotateLeft className="text-lg" />,
    value: "Siparişlerim",
    url: "/my-orders",
  },
  {
    id: 3,
    icon: <MdFavorite className="text-lg" />,
    value: "Favorilerim",
    url: "/favories",
  },
  {
    id: 4,
    icon: <CiLogout className="text-lg" />,
    value: "Çıkış Yap",
    url: "/",
  },
];

const Navbar: React.FC<NavbarProps> = ({ setIsSideBarOpen }) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const desktopSearchRef = useRef<HTMLDivElement>(null);
  const personMenuRef = useRef<HTMLDivElement>(null);
  const { isAuthenticated, logout } = useUser();
  const [isPersonMenuOpen, setIsPersonMenuOpen] = useState<boolean>(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ["searchGames", search],
    queryFn: () => fetchSearchedGames(search),
    enabled: search.length > 0,
    refetchOnWindowFocus: false,
    retry: false,
  });

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Mobil arama çubuğu için
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchBarOpen(false);
        setSearch(""); // Mobil için de search'ü temizle
      }

      // Masaüstü arama sonuçları için
      if (
        desktopSearchRef.current &&
        !desktopSearchRef.current.contains(event.target as Node)
      ) {
        setSearch("");
      }

      if (
        personMenuRef.current &&
        !personMenuRef.current.contains(event.target as Node)
      ) {
        setIsPersonMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleGameClick = (gameId: any) => {
    navigate(`/game/${gameId}`);
    setSearch("");
    setIsSearchBarOpen(false); // Mobilde arama çubuğunu da kapat
  };
  const handlePersonMenu = () => {
    setIsPersonMenuOpen(!isPersonMenuOpen);
  };

  return (
    <div className="flex flex-col w-full bg-slate-800">
      <div className="border-b-1 border-blue-400 ">
        <div className="hidden lg:flex gap-4 items-center p-2">
          <div className="flex gap-1 cursor-pointer hover:text-blue-400">
            <ImCreditCard className="text-xl text-blue-400" />
            <p>Bakiye Yükle</p>
          </div>
          <div className="flex gap-1 cursor-pointer hover:text-blue-400">
            <FaInstagram className="text-xl text-blue-400" />
            <p>Instagram</p>
          </div>
          <div className="flex gap-1 ml-[20%]">
            <GiTrophyCup className="text-xl text-blue-400" />
            <p>Türkiye'nin En Büyük Ucuz Oyun Mağazası</p>
          </div>
        </div>
        <div className="flex lg:hidden gap-4 items-center justify-center px-2 py-3 ">
          {isAuthenticated ? (
            <button
              className="flex gap-1 cursor-pointer hover:text-blue-400"
              onClick={handlePersonMenu}
            >
              <LuUserRoundCheck className="text-lg text-blue-400" />
              <p>Hesabım</p>
            </button>
          ) : (
            <button
              className="flex gap-1 cursor-pointer hover:text-blue-400"
              onClick={() => navigate("/login")}
            >
              <LuUserRoundCheck className="text-xl text-blue-400" />
              <p>Giriş Yap</p>
            </button>
          )}
          {isAuthenticated ? (
            <button
              className="flex gap-1 cursor-pointer hover:text-blue-400"
              onClick={logout}
            >
              <CiLogout className="text-lg text-blue-400" />
              <p>Çıkış Yap</p>
            </button>
          ) : (
            <button className="flex gap-1 cursor-pointer hover:text-blue-400">
              <FaUserPlus className="text-xl text-blue-400" />
              <p>Kayıt Ol</p>
            </button>
          )}
          <div className="flex gap-1">
            <ImCreditCard className="text-xl text-blue-400" />
            <p>Bakiye Yükle</p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="hidden lg:flex items-center justify-between w-full py-2 border-b-1 border-blue-400 p-2">
          <div
            className="flex gap-1 items-center cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/")}
          >
            <IoLogoGameControllerB className="text-[48px] text-blue-300" />
            <p className="text-[30px] italic font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
              CHEAPGAMES
            </p>
          </div>
          <div
            className="flex flex-col w-[50%] justify-between items-center relative"
            ref={desktopSearchRef}
          >
            <div className="flex w-full items-center justify-between bg-slate-900 rounded-lg p-2">
              <input
                type="text"
                placeholder="Ürün ara..."
                value={search}
                onChange={handleSearch}
                className="w-full focus:outline-none text-[12px] placeholder-zinc-300 bg-transparent"
              />
              <IoMdSearch className="text-blue-400 text-[22px]" />
            </div>
            <div
              className={`${
                data?.games?.length > 0
                  ? search.length > 0
                    ? "w-full h-[250px] z-50"
                    : "hidden"
                  : search.length > 0
                  ? "w-full h-[50px] z-50"
                  : "hidden"
              } absolute top-12 bg-zinc-200 rounded-lg p-2 border-2 border-blue-400 text-black `}
            >
              {isLoading ? (
                <p className="text-center ">Loading...</p>
              ) : error ? (
                <p className="text-center">Error fetching data</p>
              ) : (
                <ul className="h-full overflow-y-auto">
                  {data?.games.length > 0 ? (
                    data?.games.map((game: any) => (
                      <li
                        key={game.id}
                        className="flex gap-4 cursor-pointer hover:bg-blue-400 p-2 rounded-lg"
                        onClick={() => handleGameClick(game.id)}
                      >
                        <img
                          src={game.gameImage}
                          alt={game.gameName}
                          className="w-[10%]"
                        />
                        <div className="flex flex-col pt-2 gap-1">
                          <h1 className="font-bold">{game.gameName}</h1>
                          <p className="text-gray-600">{game.gamePrice} TL</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p className="text-center">Arama sonuç bulunamadı</p>
                  )}
                </ul>
              )}
            </div>
          </div>
          <div className="flex gap-4">
            {isAuthenticated ? (
              <div
                ref={personMenuRef}
                className="flex flex-col items-center justify-center relative "
              >
                <button
                  className="cursor-pointer text-blue-400 hover:text-blue-500"
                  onClick={handlePersonMenu}
                >
                  <FaUser className="text-xl" />
                </button>
                {isPersonMenuOpen && (
                  <ul className="absolute right-0 top-full bg-zinc-300 w-[150px] text-black p-2 rounded-md z-60">
                    {accountMenuValues.map((item, idx) => (
                      <li
                        key={`${idx} - ${item.value}`}
                        className="flex items-center gap-2 w-full h-full cursor-pointer hover:bg-blue-400 p-2 rounded-md"
                        onClick={() => navigate(item.url)}
                      >
                        {item.icon}
                        <p>{item.value}</p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <button
                className="flex gap-1 items-center cursor-pointer bg-blue-400 hover:bg-blue-500 p-1 rounded-lg"
                onClick={() => navigate("/login")}
              >
                <FaUser />
                <p>Giriş / Kayıt</p>
              </button>
            )}
            <button className="cursor-pointer" onClick={()=>navigate("/basket")}>
              <LuShoppingBasket className="text-[26px] hover:text-blue-400" />
            </button>
          </div>
        </div>
        {/* MOBİL NAVBAR - Düzeltilmiş Kısım */}
        <div className="flex lg:hidden items-center justify-between w-full py-4 border-b-1 border-blue-400 p-2 relative">
          <div
            className="flex gap-1 items-center cursor-pointer hover:text-blue-400"
            onClick={() => navigate("/")}
          >
            <IoLogoGameControllerB className="text-[32px] text-blue-300" />
            <p className="text-[22px] italic font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
              CHEAPGAMES
            </p>
          </div>
          <div className="flex gap-4 items-center">
            <div
              onClick={() => setIsSideBarOpen(true)}
              className="cursor-pointer"
            >
              <IoMenu className="text-[30px]" />
            </div>
            <div>
              <IoMdSearch
                className="text-[30px] cursor-pointer"
                onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
              />
            </div>
            <button
              className="flex gap-4 items-center cursor-pointer"
              onClick={() => navigate("/basket")}
            >
              <LuShoppingBasket className="text-[30px]" />
            </button>
          </div>

          {/* MOBİL ARAMA ÇUBUĞU - Tamamen Yeniden Düzenlendi */}
          {isSearchBarOpen && (
            <div
              className="absolute top-full left-0 right-0 z-50 px-2"
              ref={searchRef}
            >
              {/* Arama Input'u */}
              <div className="flex justify-between bg-slate-900 rounded-lg p-2 w-full border-2 border-blue-400 mb-1">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={search}
                  onChange={handleSearch}
                  className="w-full focus:outline-none text-[14px] placeholder-zinc-300 bg-transparent text-white"
                  autoFocus
                />
                <IoMdSearch className="text-blue-400 text-[22px]" />
              </div>

              {/* Arama Sonuçları */}
              {search.length > 0 && (
                <div
                  className={`${
                    data?.games?.length > 0 ? "h-[250px]" : "h-[50px]"
                  } w-full bg-zinc-200 rounded-lg p-2 border-2 border-blue-400 text-black shadow-lg`}
                >
                  {isLoading ? (
                    <p className="text-center py-4">Loading...</p>
                  ) : error ? (
                    <p className="text-center py-4">Error fetching data</p>
                  ) : (
                    <div className="h-full overflow-y-auto">
                      {data?.games?.length > 0 ? (
                        <ul className="space-y-1">
                          {data.games.map((game: any) => (
                            <li
                              key={game.id}
                              className="flex gap-3 cursor-pointer hover:bg-blue-400 p-2 rounded-lg transition-colors"
                              onClick={() => handleGameClick(game.id)}
                            >
                              <img
                                src={game.gameImage}
                                alt={game.gameName}
                                className="w-12 h-12 object-cover rounded"
                              />
                              <div className="flex flex-col justify-center flex-1 min-w-0">
                                <h3 className="font-bold text-sm truncate">
                                  {game.gameName}
                                </h3>
                                <p className="text-gray-600 text-xs">
                                  {game.gamePrice} TL
                                </p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-center py-4">
                          Arama sonuç bulunamadı
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="hidden lg:flex w-full px-2 z-25">
        <NavbarMenus />
      </div>
    </div>
  );
};

export default Navbar;
