import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
import All from "../pages/ShowingGames/All";
import GameDetails from "../pages/GameDetails";
import Login from "../pages/Login/Login";
import AuthLayout from "../layout/AuthLayout";
import { useUser } from "../Context/UserContext";
import Register from "../pages/Register/Register";
import Account from "../pages/Account/Account";
import Basket from "../pages/Basket/Basket";
import Order from "../pages/Order/Order";
import NotFound from "../pages/NotFound/NotFound";
import Favories from "../pages/Favories/Favories";
import AccountMobile from "../pages/Account/AccountMobile";
import UserProducts from "../pages/UserProducts/UserProducts";

function AppRoutes() {
  const { isAuthenticated } = useUser();

  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route
            path="/playstation"
            element={<All key="playstation" category="Playstation" />}
          />
          <Route
            path="/pc-games/all"
            element={
              <All key="all" platform="Tüm Ürünler" category="computer" />
            }
          />
          <Route
            path="/pc-games/steam"
            element={<All key="steam" platform="Steam" category="computer" />}
          />
          <Route
            path="/pc-games/uplay"
            element={<All key="uplay" platform="Uplay" category="computer" />}
          />
          <Route
            path="/pc-games/ea-origin"
            element={<All key="origin" platform="Origin" category="computer" />}
          />
          <Route
            path="/pc-games/microsoft"
            element={
              <All key="microsoft" platform="Microsoft" category="computer" />
            }
          />
          <Route
            path="/discounts"
            element={<All key="discounts" discounts={true} />}
          />
        </Route>
        {!isAuthenticated && (
          <Route element={<AuthLayout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Route>
        )}
        {isAuthenticated && (
          <Route element={<AuthLayout />}>
            <Route path="/account" element={<Account />} />
            <Route path="/basket" element={<Basket key="basket" />} />
            <Route path="/my-orders" element={<Order key="order" />} />
            <Route path="favories" element={<Favories key="favories" />} />
            <Route
              path="/accountMobile"
              element={<AccountMobile key="accountMobile" />}
            />
            <Route path="my-products" element={<UserProducts />} />
          </Route>
        )}

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
