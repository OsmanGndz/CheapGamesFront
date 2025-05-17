import { ImCreditCard } from "react-icons/im";
import { FaInstagram, FaUser } from "react-icons/fa";
import { GiTrophyCup } from "react-icons/gi";
import { IoLogoGameControllerB, IoMdSearch } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { LuShoppingBasket } from "react-icons/lu";
import NavbarMenus from "./NavbarMenus";

const Navbar = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    console.log(search);
  };

  return (
    <div className="flex flex-col w-full bg-slate-800">
      <div className="flex gap-4 items-center border-b-1 border-blue-400 pb-2 p-2">
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
      <div className="flex  items-center justify-between py-2 border-b-1 border-blue-400 w-full p-2">
        <div
          className="flex gap-1 items-center cursor-pointer hover:text-blue-400"
          onClick={() => navigate("/")}
        >
          <IoLogoGameControllerB className="text-[48px] text-blue-300" />
          <p className="text-[30px] italic font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
            CHEAPGAMES
          </p>
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
      <div className="w-full px-2">
        <NavbarMenus />
      </div>
    </div>
  );
};

export default Navbar;
