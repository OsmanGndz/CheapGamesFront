import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { fetchPastOrder } from "../../services/AuthService";
import { formatDateToReadable } from "../../logic/DateFormat.l";
import Spinner from "../../components/Spinner";
import { toast } from "react-toastify";
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
    <div className="w-full px-40 py-10">
      <h1 className="text-3xl font-bold text-center mb-6">
        Geçmiş Siparişlerim
      </h1>
      <div className="flex flex-col gap-8">
        {data?.map((order) => {
          const isExpanded = expandedOrders[order.orderId] ?? false;

          return (
            <div
              key={order.orderId}
              className="bg-slate-700 p-6 rounded-xl shadow-md"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(order.orderId)}
              >
                <div>
                  <p className="text-lg font-semibold">
                    Sipariş Numarası: {order.orderId}
                  </p>
                  <p className="text-sm text-zinc-400 font-semibold">
                    Tarih: {formatDateToReadable(order.date)}
                  </p>
                </div>
                <div className="text-lg font-bold text-zinc-200">
                  Toplam: ₺{order.totalPrice}
                </div>
              </div>

              {isExpanded && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                  {order.games.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 bg-slate-500 p-4 rounded-lg shadow"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 object-cover rounded"
                      />
                      <div>
                        <p className="font-semibold text-[16px]">{item.name}</p>
                        <p className="text-sm text-zinc-300 font-semibold">
                          ₺{item.price}
                        </p>
                      </div>
                    </div>
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
