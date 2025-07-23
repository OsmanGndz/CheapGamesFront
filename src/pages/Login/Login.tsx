import { useState } from "react";
import { login } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../Context/UserContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { Login } = useUser();

  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const response = await login(email, password);
      const userData = {
        id: response.user.id,
        name: response.user.name,
        surname: response.user.surname,
        email: response.user.email,
        token: response.token,
      };
      Login(userData);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Giriş başarısız! Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full py-4 gap-4">
      <h1 className="text-3xl font-bold">Giriş Yap</h1>

      <div className="bg-slate-700 w-full md:w-[50%] lg:w-[38%] xl:w-[32%] 2xl:w-[30%] rounded-md p-8 border border-zinc-200 flex flex-col gap-4">
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-4 text-black bg-white border border-white rounded-lg"
            placeholder="E-Posta Adresi"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-4 text-black bg-white border border-white rounded-lg"
            placeholder="Parola"
            required
          />

          <label className="flex w-fit items-center cursor-pointer">
            <input
              type="checkbox"
              className="sr-only peer"
              onChange={() => setShowPassword(!showPassword)}
            />
            <div className="relative w-11 h-6 bg-gray-400 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className="ms-3 text-sm font-medium text-zinc-200">
              Parolayı Göster
            </span>
          </label>

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer"
          >
            Giriş Yap
          </button>

          {error && (
            <p className="text-red-500 text-sm font-medium mt-2">{error}</p>
          )}
        </form>
        <div className="flex flex-col justify-center items-center w-full">
          <p>Hala bir hesabın yok mu?</p>
          <button
            className="underline font-bold cursor-pointer"
            onClick={() => navigate("/register")}
          >
            Hesap oluştur
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
