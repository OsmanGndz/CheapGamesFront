import { FaBoxOpen } from "react-icons/fa";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdFavorite } from "react-icons/md";
import { TbPencilCog } from "react-icons/tb";
import { Link } from "react-router-dom";

const choices = [
  {
    name: "Hesap Bilgilerimi Değiştir",
    icon: <TbPencilCog className="text-[40px]" />,
    url: "/account",
  },
  {
    name: "Siparişlerim",
    icon: <FaClockRotateLeft className="text-[40px]" />,
    url: "/my-orders",
  },
  {
    name: "Ürünlerim",
    icon: <FaBoxOpen className="text-[40px]" />,
    url: "/my-products",
  },
  {
    name: "Favorilerim",
    icon: <MdFavorite className="text-[40px]" />,
    url: "/favories",
  },
];

const AccountMobile = () => {
  return (
    <div className="flex flex-col gap-8 w-full px-4 sm:px-20 md:px-40 lg:hidden">
      <h1 className="text-3xl font-bold text-center">Hesabım</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 items-center justify-center w-full gap-4">
        {choices.map((item) => (
          <Link
            to={item.url}
            className="w-full flex items-center justify-center border-1 h-24 gap-4 p-4"
          >
            {item.icon}
            <h3 className="text-lg font-semibold">{item.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AccountMobile;
