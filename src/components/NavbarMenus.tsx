import { IoMdArrowDropdown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

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

const NavbarMenus = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center gap-2">
      {navbarMenus.map((menu, index) =>
        menu.SubMenus ? (
          <div
            key={`${menu.name}-${index}`}
            className="relative group px-10 py-2 cursor-pointer rounded-lg hover:bg-blue-400 transition-all duration-200 flex justify-center items-center"
          >
            <p className="text-white">{menu.name}</p>
            <IoMdArrowDropdown className="absolute right-1 top-[11px] text-[15px]" />
            {/* Submenu */}
            <div className="absolute left-[28px] top-full hidden group-hover:flex flex-col gap-1 justify-center items-center bg-slate-800 text-white rounded-md shadow-lg z-10 min-w-[120px] px-4 py-2 font-semibold">
              {menu.SubMenus.map((subMenu, idx) => (
                <span
                  key={`${subMenu.name}-${idx}`}
                  onClick={() => navigate(subMenu.url)}
                  className="hover:text-blue-400 cursor-pointer border-b border-transparent hover:border-blue-400 transition-all duration-200"
                >
                  {subMenu.name}
                </span>
              ))}
            </div>
          </div>
        ) : (
          <div
            key={`${menu.name}-${index}`}
            className="px-10 py-2 cursor-pointer rounded-lg hover:bg-blue-400 transition-all duration-200"
            onClick={() => menu.url && navigate(menu.url)}
          >
            <p className="text-white">{menu.name}</p>
          </div>
        )
      )}
    </div>
  );
};

export default NavbarMenus;
