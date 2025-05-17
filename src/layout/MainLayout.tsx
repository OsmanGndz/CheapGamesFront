import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'
import SideBar from '../components/SideBar'
import { useState } from 'react';


function MainLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false);
  return (
    <div className="flex flex-col min-h-screen w-screen bg-slate-900 text-white text-sm" >
      {isSideBarOpen && <SideBar setIsSideBarOpen={setIsSideBarOpen} />}
      <Navbar setIsSideBarOpen = {setIsSideBarOpen} />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout