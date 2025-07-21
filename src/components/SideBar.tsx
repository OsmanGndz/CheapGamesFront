import { MdCancel } from "react-icons/md";
import type { SideBarProps } from "../types/SideBar";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
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
    url: "/playstation",
  },
  {
    id: 4,
    name: "KAMPANYALAR",
    url: "/discounts",
  },
];

const SideBar: React.FC<SideBarProps> = ({
  setIsSideBarOpen,
  isSideBarOpen,
}) => {
  const navigate = useNavigate();
  const [openMenus, setOpenMenus] = useState<{ [key: number]: boolean }>({});
  const sideBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        sideBarRef.current &&
        !sideBarRef.current.contains(event.target as Node)
      ) {
        setIsSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setIsSideBarOpen]);

  const toggleSubMenu = (id: number) => {
    setOpenMenus((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  return (
    <>
      {/* Overlay - Arka planı karartma */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 lg:hidden ${
          isSideBarOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSideBarOpen(false)}
      />

      {/* Sidebar */}
      <div
        ref={sideBarRef}
        className={`fixed lg:hidden top-0 left-0 h-full w-[80%] z-50 bg-slate-800 text-[20px] transition-transform duration-700 ease-in-out transform ${
          isSideBarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="font-semibold bg-slate-700 p-4 flex justify-between items-center">
          <p>MENÜ</p>
          <MdCancel
            className="text-[28px] cursor-pointer hover:text-red-400 transition-colors"
            onClick={() => setIsSideBarOpen(false)}
          />
        </div>

        <div className="flex flex-col gap-6 pt-10 font-semibold text-[18px]">
          {navbarMenus.map((menu) =>
            menu.SubMenus ? (
              <div
                key={menu.id}
                className="px-6 py-2 cursor-pointer rounded-lg transition-all duration-400 flex flex-col"
              >
                <div
                  className="flex items-center justify-between hover:text-blue-400 transition-colors"
                  onClick={() => toggleSubMenu(menu.id)}
                >
                  <p className="text-white">{menu.name}</p>
                  {openMenus[menu.id] ? (
                    <FiMinusCircle className="text-[24px] text-blue-400" />
                  ) : (
                    <FiPlusCircle className="text-[24px]" />
                  )}
                </div>

                <div
                  className={`grid transition-all duration-500 overflow-hidden transform ${
                    openMenus[menu.id]
                      ? "grid-rows-[1fr] opacity-100 max-h-[500px]"
                      : "grid-rows-[0fr] opacity-0 max-h-0"
                  }`}
                >
                  <div className="flex flex-col bg-slate-700 w-full mt-2 font-normal text-[16px] rounded-b-2xl">
                    {menu.SubMenus.map((subMenu, index) => (
                      <div
                        key={`${subMenu.name}-${index}`}
                        className={`py-2 px-8 ${
                          menu.SubMenus.length - 1 === index
                            ? ""
                            : "border-b border-stone-800"
                        }`}
                      >
                        <p
                          onClick={() => {
                            navigate(subMenu.url);
                            setIsSideBarOpen(false);
                          }}
                          className="cursor-pointer text-white hover:text-blue-400 transition-colors"
                        >
                          {subMenu.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div
                key={menu.id}
                className="px-6 py-2 cursor-pointer rounded-lg hover:bg-blue-400 transition-all duration-200"
                onClick={() => {
                  navigate(menu.url || "/");
                  setIsSideBarOpen(false);
                }}
              >
                <p className="text-white hover:text-white">{menu.name}</p>
              </div>
            )
          )}
        </div>
      </div>
    </>
  );
};

export default SideBar;
