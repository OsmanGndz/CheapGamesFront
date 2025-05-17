import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Outlet } from 'react-router-dom'


function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen w-screen bg-slate-900 text-white text-sm" >
      <Navbar />
      <main className="flex-grow p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout