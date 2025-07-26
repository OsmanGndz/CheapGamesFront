import { FaTrash } from "react-icons/fa";
import { useBasket } from "../../Context/BasketContext";
import { useEffect, useState } from "react";
import { CompleteOrderApi } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

const Basket = () => {
  const { basket, RemoveFromBasket, GetBasketIds, ResetBasket } = useBasket();
  const [gameIds, setGameIds] = useState<number[]>(GetBasketIds() || []);
  const navigate = useNavigate();

  const totalPrice = basket.reduce((sum, item) => sum + item.price, 0);
  const totalItems = basket.length;

  useEffect(() => {
    setGameIds(GetBasketIds());
  }, [basket]);

  const CompleteOrder = () => {
    try {
      CompleteOrderApi(gameIds);
      ResetBasket();
      navigate("/")
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col px-40 w-full py-8">
      {/* Başlık */}
      <div className="flex flex-col gap-1 w-full justify-center items-center mb-8">
        <h1 className="w-full text-center text-3xl font-bold">
          Alışveriş Sepetim
        </h1>
        <hr className="w-16 border-2 text-blue-400" />
      </div>

      {basket && basket.length > 0 ? (
        <div className="flex w-full gap-8">
          {/* Sol taraf: Ürünler */}
          <div className="w-[70%]">
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-sm text-left rtl:text-right text-black">
                <thead className="text-[14px] uppercase text-zinc-200 bg-slate-700">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Resim
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Ürün Adı
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Tutar
                    </th>
                    <th scope="col" className="px-6 py-3">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {basket.map((item, idx) => (
                    <tr
                      key={idx}
                      className="odd:bg-slate-400 even:bg-slate-500 text-[16px] font-semibold border-b border-gray-200"
                    >
                      <td className="px-6 py-4 w-32">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="object-cover w-16 h-16"
                        />
                      </td>
                      <td className="px-6 py-4">{item.name}</td>
                      <td className="px-6 py-4">₺{item.price.toFixed(2)}</td>
                      <td className="px-6 py-4 w-20">
                        <div className="bg-red-600 w-12 h-12 hover:scale-110 transform-content duration-500 flex items-center justify-center cursor-pointer rounded-full">
                          <FaTrash
                            className="text-xl text-zinc-200 w-full text-center cursor-pointer"
                            onClick={() => RemoveFromBasket(item.id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sağ taraf: Özet */}
          <div className="w-[30%] bg-slate-700 p-6 text-white rounded-lg shadow-md h-fit">
            <h2 className="text-xl font-bold mb-4">Sipariş Özeti</h2>
            <div className="flex justify-between mb-2">
              <span>Toplam Ürün:</span>
              <span>{totalItems} adet</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Toplam Tutar:</span>
              <span>₺{totalPrice.toFixed(2)}</span>
            </div>
            <hr className="my-4 border-gray-400" />
            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
              onClick={CompleteOrder}
            >
              Alışverişi Tamamla
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full text-center font-semibold">
          Alışveriş Sepetiniz boş!
        </div>
      )}
    </div>
  );
};

export default Basket;
