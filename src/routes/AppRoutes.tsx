import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layout/MainLayout";
import All from "../pages/ShowingGames/All";
import GameDetails from "../pages/GameDetails";

function AppRoutes() {
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
      </Routes>
    </>
  );
}

export default AppRoutes;
