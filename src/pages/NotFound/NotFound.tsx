import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4 bg-slate-900">
      <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
      <p className="text-2xl font-semibold text-white mb-4">Sayfa Bulunamadı</p>
      <p className="text-zinc-400 mb-6">
        Aradığınız sayfa mevcut değil veya taşınmış olabilir.
      </p>
      <Link
        to="/"
        className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};

export default NotFound;
