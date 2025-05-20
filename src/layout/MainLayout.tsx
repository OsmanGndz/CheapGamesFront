import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { useState } from "react";

function MainLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full bg-slate-900 text-white text-sm">
      <div className="flex flex-col w-full max-w-[2000px] min-h-screen">
        <SideBar
          setIsSideBarOpen={setIsSideBarOpen}
          isSideBarOpen={isSideBarOpen}
        />
        <Navbar setIsSideBarOpen={setIsSideBarOpen} />
        <main className="flex-grow p-4">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
