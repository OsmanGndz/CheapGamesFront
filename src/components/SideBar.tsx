import { MdCancel } from "react-icons/md";
import type { SideBarProps } from "../types/SideBar";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";

const navbarMenus = [
  {
    id: 1,
    name: "ANASAYFA",
    url: "/",
  },
  {
    id: 2,
    name: "PC OYUNLARI",
    SubMenus: [
      { name: "Hepsi", url: "/pc-games/all" },
      { name: "Steam", url: "/pc-games/steam" },
      { name: "Uplay", url: "/pc-games/uplay" },
      { name: "EA-Origin", url: "/pc-games/ea-origin" },
      { name: "Microsoft", url: "/pc-games/microsoft" },
    ],
  },
  {
    id: 3,
    name: "PS4-PS5 OYUNLARI",
    url: "/ps-games",
  },
];

const SideBar: React.FC<SideBarProps> = ({ setIsSideBarOpen }) => {
  const navigate = useNavigate();
  const [isBarOpen, setIsBarOpen] = useState(false);
  return (
    <div className="flex flex-col lg:hidden fixed bg-slate-800 w-[80%] h-full z-10 text-[20px]">
      <div className="font-semibold bg-slate-700 p-4 flex justify-between items-center">
        <p>MENÜ</p>
        <MdCancel
          className="text-[28px]"
          onClick={() => setIsSideBarOpen(false)}
        />
      </div>
      <div className="flex flex-col gap-6 pt-10 font-semibold text-[18px]">
        {navbarMenus.map((menu, index) =>
          menu.SubMenus ? (
            <div
              key={`${menu.name}-${index}`}
              className="relative px-6 py-2 cursor-pointer rounded-lg hover:bg-blue-400 transition-all duration-200 flex flex-col "
              onClick={() => setIsBarOpen(!isBarOpen)}
            >
              <div className="flex items-center ">
                <p className="text-white">{menu.name}</p>
                {isBarOpen ? (
                  <FiMinusCircle className="absolute right-6 text-[24px]" />
                ) : (
                  <FiPlusCircle className="absolute right-6 text-[24px]" />
                )}
              </div>
              {isBarOpen && (
                <div className="bg-slate-700 w-full mt-2 transition-all duration-800 font-normal text-[16px] rounded-b-2xl">
                  {menu.SubMenus.map((subMenu, index) => (
                    <div key={`${subMenu}-${index}`} className={`py-2 px-8 ${menu.SubMenus.length -1 === index ? "": "border-b border-stone-800"}` }>
                        <p onClick={() => navigate(subMenu.url)}>{subMenu.name}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div
              key={`${menu.name}-${index}`}
              className="px-6 py-2 cursor-pointer rounded-lg hover:bg-blue-400 transition-all duration-200"
              onClick={() => menu.url && navigate(menu.url)}
            >
              <p className="text-white">{menu.name}</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default SideBar;
