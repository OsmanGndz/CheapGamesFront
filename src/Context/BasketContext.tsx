import React, { createContext, useState, useContext, useEffect } from "react";

interface dataProps {
  Id: number;
  gameName: string;
  gameDescription: string;
  gameImage: string;
  gamePrice: number;
  gameDiscount: number;
  categoryName: string;
  platformName: string;
  totalSales: number;
  isStanding: boolean;
  releaseDate: string;
}

interface GameType {
  id: number;
  image: string;
  name: string;
  price: number;
}

interface BasketContextType {
  AddToBasket: (game: dataProps) => void;
  RemoveFromBasket: (id: number) => void;
  GetBasketIds: () => number[];
  ResetBasket: () => void;
  basket: GameType[];
}

const BasketContext = createContext<BasketContextType | undefined>(undefined);

export const BasketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [basket, setBasket] = useState<GameType[]>(() => {
    // Sayfa ilk yüklendiğinde localStorage'dan sepeti al
    const storedBasket = localStorage.getItem("basket");
    return storedBasket ? JSON.parse(storedBasket) : [];
  });

  // Sepet her değiştiğinde localStorage'a kaydet
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
  }, [basket]);

  const AddToBasket = (game: dataProps) => {
    const newItem: GameType = {
      id: game.Id,
      name: game.gameName,
      image: game.gameImage,
      price: game.gamePrice,
    };
    setBasket((prev) => [...prev, newItem]);
  };

  const RemoveFromBasket = (id: number) => {
    setBasket((prev) => prev.filter((g) => g.id !== id));
  };

  const GetBasketIds = () => {
    return basket.map((item) => item.id);
  };

  const ResetBasket = () => {
    setBasket([]);
  };

  return (
    <BasketContext.Provider
      value={{
        AddToBasket,
        RemoveFromBasket,
        GetBasketIds,
        basket,
        ResetBasket,
      }}
    >
      {children}
    </BasketContext.Provider>
  );
};

export const useBasket = () => {
  const context = useContext(BasketContext);
  if (!context)
    throw new Error("useBasket must be used within a BasketProvider");
  return context;
};

export default BasketContext;
