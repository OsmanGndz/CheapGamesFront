import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import MainLayout from "../layout/MainLayout";
import All from "../pages/All";

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/playstation" element={<All name="Playstation" />} />
          <Route path="/pc-games/all" element={<All name="Tüm Ürünler" />} />
          <Route path="/pc-games/steam" element={<All name="Steam" />} />
          <Route path="/pc-games/uplay" element={<All name="Uplay" />} />
          <Route
            path="/pc-games/ea-origin"
            element={<All name="Ea-origin" />}
          />
          <Route
            path="/pc-games/microsoft"
            element={<All name="Microsoft" />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
