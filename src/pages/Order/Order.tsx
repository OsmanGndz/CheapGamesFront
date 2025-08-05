import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchPastOrder } from "../../services/AuthService";
import { formatDateToReadable } from "../../logic/DateFormat.l";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { Link } from "react-router-dom";

interface OrderItem {
  id: number;
  name: string;
  price: number;
  discount: number;
  image: string;
}

interface OrderData {
  orderId: string;
  date: string;
  games: OrderItem[];
  totalPrice: number;
}

const Order = () => {
  const [expandedOrders, setExpandedOrders] = useState<{
    [key: string]: boolean;
  }>({});

  const { data, isLoading, error } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchPastOrder,
    select: (rawData): OrderData[] => {
      return rawData.map((order: any) => ({
        orderId: order.id,
        date: order.createdAt,
        totalPrice: order.totalPrice,
        games: order.games.map((game: any) => ({
          id: game.id,
          name: game.gameName,
          price: game.gamePrice,
          discount: game.gameDiscount,
          image: game.gameImage,
        })),
      }));
    },
  });

  const toggleExpand = (orderId: string) => {
    setExpandedOrders((prev) => ({
      ...prev,
      [orderId]: !prev[orderId],
    }));
  };

  if (isLoading) {
    return <Spinner className="flex w-full justify-center" />;
  }

  if (error) {
    toast.error("Siparişler yüklenirken bir hata oluştu.");
  }

  return (
    <div className="w-full px-4 md:px-20 lg:px-40 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Geçmiş Siparişlerim
      </h1>
      <div className="flex flex-col gap-8">
        {data?.map((order) => {
          const isExpanded = expandedOrders[order.orderId] ?? false;

          return (
            <div
              key={order.orderId}
              className="bg-gradient-to-r from-slate-700 to-slate-600 p-6 rounded-xl shadow-white shadow-sm border-1 border-slate-900"
            >
              <div className="flex w-full" onClick={() => toggleExpand(order.orderId)}>
                <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center cursor-pointer w-full text-center sm:text-start">
                  <div>
                    <p className="text-lg font-semibold">
                      Sipariş Numarası: {order.orderId}
                    </p>
                    <p className="text-sm text-zinc-400 font-semibold">
                      Tarih: {formatDateToReadable(order.date)}
                    </p>
                  </div>
                  <div className="flex items-center gap-8 text-lg font-bold text-zinc-200">
                    <p>Toplam: {order.totalPrice} TL</p>
                    <div className="hidden sm:flex">
                      {expandedOrders[order.orderId] ? (
                        <IoIosArrowUp className={`text-xl`} />
                      ) : (
                        <IoIosArrowDown className={`text-xl`} />
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex justify-center items-center sm:hidden ">
                      {expandedOrders[order.orderId] ? (
                        <IoIosArrowUp className={`text-xl`} />
                      ) : (
                        <IoIosArrowDown className={`text-xl`} />
                      )}
                    </div>
              </div>

              {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {order.games.map((item) => (
                    <Link
                      to={`/game/${item.id}`}
                      key={item.id}
                      className="flex items-center gap-4 bg-slate-600 p-4 rounded-lg shadow-white shadow-sm"
                      draggable={false}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        draggable={false}
                        className="w-20 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-[16px]">{item.name}</p>
                        <p className=" font-semibold flex gap-2 items-center">
                          {item.discount > 0 ? (
                            <>
                              <span className="text-[16px]">
                                {" "}
                                {(
                                  item.price *
                                  (1 - item.discount / 100)
                                ).toFixed(2)}{" "}
                                TL
                              </span>
                              <span className="line-through text-sm text-zinc-300">
                                {item.price} TL
                              </span>
                            </>
                          ) : (
                            <span className="text-[16px]">{item.price} TL</span>
                          )}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
