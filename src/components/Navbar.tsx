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

const Navbar: React.FC<NavbarProps> = ({setIsSideBarOpen}) => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsSearchBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
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
          <div className="flex gap-1 cursor-pointer hover:text-blue-400">
            <LuUserRoundCheck className="text-xl text-blue-400" />
            <p>Giriş Yap</p>
          </div>
          <div className="flex gap-1 cursor-pointer hover:text-blue-400">
            <FaUserPlus className="text-xl text-blue-400" />
            <p>Kayıt Ol</p>
          </div>
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
            <p></p>
          </div>
          <div className="flex items-center justify-between bg-slate-900 rounded-lg p-2 w-[50%]">
            <input
              type="text"
              placeholder="Ürün ara..."
              value={search}
              onChange={handleSearch}
              className="w-full focus:outline-none text-[12px] placeholder-zinc-300 "
            />
            <IoMdSearch className="text-blue-400 text-[22px]" />
          </div>
          <div className="flex gap-4 items-center">
            <div className="flex gap-1 items-center cursor-pointer bg-blue-400 p-1 rounded-lg ">
              <FaUser />
              <p>Giriş / Kayıt</p>
            </div>
            <div>
              <LuShoppingBasket className="text-[26px]" />
            </div>
          </div>
        </div>
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
          <div className="flex gap-4 items-center ">
            <div onClick={() => setIsSideBarOpen(true)} className="cursor-pointer">
              <IoMenu className="text-[30px]" />
            </div>
            <div className="" ref={searchRef}>
              <IoMdSearch
                className="text-[30px]"
                onClick={() => setIsSearchBarOpen(true)}
              />
              {isSearchBarOpen && (
                <div className="absolute left-0 top-full flex justify-between bg-slate-900 rounded-lg p-2 w-full border-2 border-blue-400">
                  <input
                    type="text"
                    placeholder="Ürün ara..."
                    value={search}
                    onChange={handleSearch}
                    className="w-full focus:outline-none text-[12px] placeholder-zinc-300 "
                  />
                  <IoMdSearch className="text-blue-400 text-[22px]" />
                </div>
              )}
            </div>
            <div className="flex gap-4 items-center">
              <div>
                <LuShoppingBasket className="text-[30px]" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden lg:flex w-full px-2 z-25">
        <NavbarMenus />
      </div>
    </div>
  );
};

export default Navbar;
