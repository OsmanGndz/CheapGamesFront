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
import ProtectedRoute from "./ProtectedRoute";

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
              <All key="all" platform="Tüm Ürünler" category="Computer" />
            }
          />
          <Route
            path="/pc-games/steam"
            element={<All key="steam" platform="Steam" category="Computer" />}
          />
          <Route
            path="/pc-games/uplay"
            element={<All key="uplay" platform="Uplay" category="Computer" />}
          />
          <Route
            path="/pc-games/ea-origin"
            element={<All key="origin" platform="Origin" category="Computer" />}
          />
          <Route
            path="/pc-games/microsoft"
            element={
              <All key="microsoft" platform="Microsoft" category="Computer" />
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

        <Route element={<AuthLayout />}>
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
            }
          />
          <Route
            path="/basket"
            element={
              <ProtectedRoute>
                <Basket key="basket" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <Order key="order" />
              </ProtectedRoute>
            }
          />
          <Route
            path="favories"
            element={
              <ProtectedRoute>
                <Favories key="favories" />
              </ProtectedRoute>
            }
          />
          <Route
            path="/accountMobile"
            element={
              <ProtectedRoute>
                <AccountMobile key="accountMobile" />
              </ProtectedRoute>
            }
          />
          <Route
            path="my-products"
            element={
              <ProtectedRoute>
                <UserProducts />
              </ProtectedRoute>
            }
          />
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
