import { ImCreditCard } from "react-icons/im";
import { FaBoxOpen, FaInstagram, FaUser, FaUserPlus } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { IoLogoGameControllerB, IoMdSearch } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
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
import Spinner from "./Spinner";
import { toast } from "react-toastify";
import { useBasket } from "../Context/BasketContext";

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
    icon: <FaBoxOpen className="text-lg" />,
    value: "Ürünlerim",
    url: "/my-products",
  },
  {
    id: 4,
    icon: <MdFavorite className="text-lg" />,
    value: "Favorilerim",
    url: "/favories",
  },
  {
    id: 5,
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
  const { GetBasketIds } = useBasket();
  const [isPersonMenuOpen, setIsPersonMenuOpen] = useState<boolean>(false);
  const [basketNumber, setBasketNumebr] = useState<number>(
    GetBasketIds().length || 0
  );

  useEffect(() => {
    setBasketNumebr(GetBasketIds().length);
  }, [GetBasketIds]);

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

  // Ana düzeltme burada - gameId tipini düzelttik ve error handling ekledik
  const handleGameClick = (gameId: string | number) => {
    try {
      console.log("Game clicked, ID:", gameId);
      if (!gameId) {
        console.error("Game ID is undefined or null");
        return;
      }

      navigate(`/game/${gameId}`);
      setSearch("");
      setIsSearchBarOpen(false);
    } catch (error) {
      console.error("Error navigating to game:", error);
    }
  };

  const handlePersonMenu = () => {
    setIsPersonMenuOpen(!isPersonMenuOpen);
  };

  // Logout işlemi için ayrı fonksiyon
  const handleLogout = () => {
    try {
      logout();
      setIsPersonMenuOpen(false);
      toast.success("Çıkış yapıldı.");
    } catch (error) {
      toast.error("Çıkış yapılırken bir hata oluştu.");
    }
  };

  // Account menu click handler
  const handleAccountMenuClick = (item: any) => {
    if (item.value === "Çıkış Yap") {
      handleLogout();
    }
    setIsPersonMenuOpen(false);
  };

  const handleBasketClick = () => {
    if (isAuthenticated) {
      navigate("/basket");
    } else {
      toast.error("Sepete erişmek için önce giriş yapmalısınız.");
      navigate("/login");
    }
  };

  if (error) {
    toast.error("Arama sonuçları yüklenirken bir hata oluştu.");
  }

  return (
    <div className="flex flex-col w-full bg-slate-800">
      <div className="border-b-1 border-blue-400 ">
        <div className="hidden lg:flex gap-4 items-center p-2">
          <div className="flex gap-1 cursor-pointer hover:text-blue-400">
            <ImCreditCard className="text-xl text-blue-400" />
            <p>Bakiye Yükle</p>
          </div>
          <Link
            to={"https://www.instagram.com/osmangunduz108/"}
            target="_blank"
            rel="noopener noreferrer"
            className="flex gap-1 cursor-pointer hover:text-blue-400"
          >
            <FaInstagram className="text-xl text-blue-400" />
            <p>Instagram</p>
          </Link>
          <div className="flex gap-1 ml-[20%]">
            <GiTrophyCup className="text-xl text-blue-400" />
            <p>Türkiye'nin En Büyük Ucuz Oyun Mağazası</p>
          </div>
        </div>
        <div className="flex lg:hidden gap-4 items-center justify-center px-2 py-3 ">
          {isAuthenticated ? (
            <Link
              to={"/accountMobile"}
              rel="noopener noreferrer"
              className="flex gap-1 cursor-pointer hover:text-blue-400"
            >
              <LuUserRoundCheck className="text-lg text-blue-400" />
              <p>Hesabım</p>
            </Link>
          ) : (
            <Link
              to={"/login"}
              rel="noopener noreferrer"
              className="flex gap-1 cursor-pointer hover:text-blue-400"
            >
              <LuUserRoundCheck className="text-xl text-blue-400" />
              <p>Giriş Yap</p>
            </Link>
          )}
          {isAuthenticated ? (
            <button
              className="flex gap-1 cursor-pointer hover:text-blue-400"
              onClick={handleLogout}
            >
              <CiLogout className="text-lg text-blue-400" />
              <p>Çıkış Yap</p>
            </button>
          ) : (
            <Link
              to={"/register"}
              rel="noopener noreferrer"
              className="flex gap-1 cursor-pointer hover:text-blue-400"
            >
              <FaUserPlus className="text-xl text-blue-400" />
              <p>Kayıt Ol</p>
            </Link>
          )}
          <div className="flex gap-1">
            <ImCreditCard className="text-xl text-blue-400" />
            <p>Bakiye Yükle</p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="hidden lg:flex items-center justify-between w-full py-2 border-b-1 border-blue-400 p-2">
          <Link
            to={"/"}
            rel="noopener noreferrer"
            className="flex gap-1 items-center cursor-pointer hover:text-blue-400"
          >
            <IoLogoGameControllerB className="text-[48px] text-blue-300" />
            <p className="text-[30px] italic font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
              CHEAPGAMES
            </p>
          </Link>
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
                <div className="text-center flex justify-center items-center w-full">
                  <Spinner />
                </div>
              ) : (
                <ul className="h-full overflow-y-auto">
                  {data?.games?.length > 0 ? (
                    data?.games.map((game: any) => (
                      <li
                        key={game.id}
                        className="flex gap-4 cursor-pointer hover:bg-blue-400 p-2 rounded-lg h-24"
                        onClick={() => handleGameClick(game.id)}
                      >
                        <img
                          src={game.gameImage}
                          alt={game.gameName}
                          className="w-[10%]"
                        />
                        <div className="flex flex-col pt-2 gap-1">
                          <h1 className="font-bold">{game.gameName}</h1>
                          <div className="flex gap-2">
                            {game.gameDiscount > 0 && (
                              <p className="text-black ">
                                {(
                                  game.gamePrice -
                                  game.gamePrice * (game.gameDiscount / 100)
                                ).toFixed(2)}{" "}
                                TL
                              </p>
                            )}
                            <p
                              className={`${
                                game.gameDiscount > 0
                                  ? "text-gray-600 line-through"
                                  : "text-black"
                              }`}
                            >
                              {game.gamePrice} TL
                            </p>
                          </div>
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
                      <Link
                        to={`${item.url}`}
                        rel="noopener noreferer"
                        key={`${idx} - ${item.value}`}
                        className="flex items-center gap-2 w-full h-full cursor-pointer hover:bg-blue-400 p-2 rounded-md"
                        onClick={() => handleAccountMenuClick(item)}
                      >
                        {item.icon}
                        <p>{item.value}</p>
                      </Link>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link
                to={"/login"}
                rel="noopener noreferer"
                className="flex gap-1 items-center cursor-pointer bg-blue-400 hover:bg-blue-500 p-1 rounded-lg"
              >
                <FaUser />
                <p>Giriş / Kayıt</p>
              </Link>
            )}
            <Link
              to={`${isAuthenticated ? "/basket" : "/login"}`}
              onClick={handleBasketClick}
              rel="noopener noreferer"
              className="cursor-pointer relative"
            >
              <p className="absolute bg-red-500 rounded-full px-1 text-[10px] -right-1">
                {basketNumber}
              </p>
              <LuShoppingBasket className="text-[26px] hover:text-blue-400" />
            </Link>
          </div>
        </div>
        {/* MOBİL NAVBAR */}
        <div className="flex lg:hidden items-center justify-between w-full py-4 border-b-1 border-blue-400 p-2 relative">
          <Link
            to={"/"}
            rel="noopener noreferer"
            className="flex gap-1 items-center cursor-pointer hover:text-blue-400"
          >
            <IoLogoGameControllerB className="text-[32px] text-blue-300" />
            <p className="text-[22px] italic font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
              CHEAPGAMES
            </p>
          </Link>
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
            <Link
              to={`${isAuthenticated ? "/basket" : "/login"}`}
              rel="noopener noreferer"
              className="flex gap-4 items-center cursor-pointer relative"
              onClick={handleBasketClick}
            >
              <p className="absolute bg-red-500 rounded-full px-1 text-[10px] top-0 right-0">
                {basketNumber}
              </p>
              <LuShoppingBasket className="text-[30px]" />
            </Link>
          </div>

          {/* MOBİL ARAMA ÇUBUĞU - Click Sorunu Düzeltildi */}
          {isSearchBarOpen && (
            <div
              className="absolute top-full left-0 right-0 z-[9999] px-2 bg-slate-800"
              ref={searchRef}
              style={{ zIndex: 9999 }}
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
                <IoMdSearch className="text-blue-400 text-[22px] pointer-events-none" />
              </div>

              {/* Arama Sonuçları */}
              {search.length > 0 && (
                <div
                  className={`${
                    data?.games?.length > 0 ? "max-h-[250px]" : "h-[50px]"
                  } w-full bg-zinc-200 rounded-lg border-2 border-blue-400 text-black shadow-xl overflow-hidden`}
                  style={{
                    position: "relative",
                    zIndex: 10000,
                  }}
                >
                  {isLoading ? (
                    <div className="p-4">
                      <p className="text-center">Loading...</p>
                    </div>
                  ) : (
                    <>
                      {data?.games?.length > 0 ? (
                        <div className="overflow-y-auto max-h-[250px] p-2">
                          {data.games.map((game: any, index: number) => (
                            <div
                              key={`${game.id}-${index}`}
                              className="flex gap-3 cursor-pointer hover:bg-blue-400 p-3 rounded-lg transition-all duration-200 mb-1 active:bg-blue-500 h-24 justify-center"
                              onTouchEnd={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                handleGameClick(game.id);
                              }}
                            >
                              <div className="flex-shrink-0">
                                <img
                                  src={game.gameImage}
                                  alt={game.gameName}
                                  className="w-12 h-18 object-cover rounded"
                                  draggable={false}
                                />
                              </div>
                              <div className="flex flex-col justify-center flex-1 min-w-0 pointer-events-none">
                                <h3 className="font-bold text-sm truncate text-gray-900">
                                  {game.gameName}
                                </h3>
                                <div className="flex gap-2">
                                  {game.gameDiscount > 0 && (
                                    <p className="text-black ">
                                      {(
                                        game.gamePrice -
                                        game.gamePrice *
                                          (game.gameDiscount / 100)
                                      ).toFixed(2)}{" "}
                                      TL
                                    </p>
                                  )}
                                  <p
                                    className={`${
                                      game.gameDiscount > 0
                                        ? "text-gray-600 line-through"
                                        : "text-black"
                                    }`}
                                  >
                                    {game.gamePrice.toFixed(2)} TL
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="p-4">
                          <p className="text-center">Arama sonuç bulunamadı</p>
                        </div>
                      )}
                    </>
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
