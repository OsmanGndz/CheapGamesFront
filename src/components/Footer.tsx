import { FaRegSmile } from "react-icons/fa";
import { ImCreditCard } from "react-icons/im";
import { IoLogoGameControllerB } from "react-icons/io";
import { IoRocketSharp } from "react-icons/io5";
import { MdDiscount } from "react-icons/md";
import { Link } from "react-router-dom";

const topPart = [
  {
    id: 1,
    name: "HIZLI TESLİMAT",
    icon: <IoRocketSharp className="text-blue-400 text-3xl" />,
  },
  {
    id: 2,
    name: "GÜVENLİ ALIŞVERİŞ",
    icon: <ImCreditCard className="text-blue-400 text-3xl " />,
  },
  {
    id: 3,
    name: "UYGUN FİYATLAR",
    icon: <MdDiscount className="text-blue-400 text-3xl" />,
  },
  {
    id: 4,
    name: "MÜŞTERİ MEMNUNİYETİ",
    icon: <FaRegSmile className="text-blue-400 text-3xl" />,
  },
];
const fastAccess = [
  {
    id: 1,
    name: "Hakkımızda",
    url: "/hakkimizda",
  },
  {
    id: 2,
    name: "Giriş Yap",
    url: "/login",
  },
  {
    id: 3,
    name: "Kayıt Ol",
    url: "/register",
  },
  {
    id: 4,
    name: "Hesabım",
    url: "/myaccount",
  },
  {
    id: 5,
    name: "Şifremi Unuttum",
    url: "/forgot-password",
  },
  {
    id: 6,
    name: "Sıkça Sorulan Sorular",
    url: "/sss",
  },
];
const formal = [
  {
    id: 1,
    name: "Üyelik Sözleşmesi",
    url: "/uyelik-sozlesmesi",
  },
  {
    id: 2,
    name: "Hzimet Sözleşmesi",
    url: "/hizmet-sozlesmesi",
  },
  {
    id: 3,
    name: "Kullanım Koşulları",
    url: "/kullanim-kosullari",
  },
  {
    id: 4,
    name: "Mesafeli Satış Sözleşmesi",
    url: "/mesafeli-satis-sozlesmesi",
  },
  {
    id: 5,
    name: "Gizlilik ve Güvenlik Politikası",
    url: "/gizlilik-politikasi",
  },
  {
    id: 6,
    name: "İptal ve İade Sözleşmesi",
    url: "/iptal-iade-sozlesmesi",
  },
  {
    id: 7,
    name: "KVKK Gizlilik Sözleşmesi",
    url: "/kvkk-gizlilik-sozlesmesi",
  },
];
const Footer = () => {
  return (
    <div className="flex flex-col bg-slate-950 w-full min-h-[200px] py-8 gap-8">
      {/*top part */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-0 px-12 lg:px-20">
        {topPart.map((part, idx) => (
          <div
            className="flex flex-row items-center gap-4 "
            key={`${part}-${idx}`}
          >
            {part.icon}
            <p className="text-white text-[16px] font-semibold">{part.name}</p>
          </div>
        ))}
      </div>
      {/*middle part */}
      <div className="md:grid flex flex-col justify-center items-center md:grid-cols-3 px-4 lg:px-12 gap-12 lg:gap-20">
        {/* logo part */}
        <div className="flex flex-col gap-1 items-center">
          <Link
            to={"/"}
            rel="noopener noreferer"
            className="flex gap-1 items-center cursor-pointer"
          >
            <IoLogoGameControllerB className="text-[48px] text-blue-300" />
            <p className="text-[30px] italic font-bold bg-gradient-to-r from-blue-300 to-blue-700 bg-clip-text text-transparent">
              CHEAPGAMES
            </p>
          </Link>
          <p className="text-center font-bold text-[16px] border-b-2 border-blue-400 pb-2">
            Türkiye'nin En Uygun ve En Güvenilir Ucuz Oyun Mağazası
          </p>
          <p className="pt-2 text-zinc-300">Adres V.D / 123456789</p>
        </div>
        {/* Hızlı erişim*/}
        <div>
          <p className="font-semibold text-[18px] pb-1">Hızlı Erişim</p>
          <hr className="border-1 w-16 text-blue-400" />
          <div className="pt-2 flex flex-col gap-2 font-semibold">
            {fastAccess.map((item, idx) => (
              <Link
                to={item.url}
                key={`${item.name}-${idx}`}
                className="cursor-pointer"
              >
                <p className="text-zinc-400">{item.name}</p>
              </Link>
            ))}
          </div>
        </div>
        {/* Kurumsal */}
        <div>
          <p className="font-semibold text-[18px] pb-1">Kurumsal</p>
          <hr className="border-1 w-16 text-blue-400" />
          <div className="pt-2 flex flex-col gap-2 font-semibold">
            {formal.map((item, idx) => (
              <Link
                to={item.url}
                key={`${item.name}-${idx}`}
                className="cursor-pointer"
              >
                <p className="text-zinc-400">{item.name}</p>
              </Link>
            ))}
          </div>
        </div>
      </div>
      {/*bottom part */}
      <div className="flex flex-col items-center justify-center gap-2 border-t-1 border-blue-400 pt-4">
        <p className="text-zinc-400 text-[14px]">
          © 2023 CheapGames. Tüm Hakları Saklıdır.
        </p>
        <p className="text-zinc-400 text-[14px]">
          Tüm fiyatlar KDV dahil olup, stoklarla sınırlıdır.
        </p>
      </div>
    </div>
  );
};

export default Footer;
