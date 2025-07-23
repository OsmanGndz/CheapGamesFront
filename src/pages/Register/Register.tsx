import React, { useState } from "react";
import { register } from "../../services/AuthService";
import { useNavigate } from "react-router-dom";

interface RegisterData {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [registerData, setRegisterData] = useState<RegisterData>({
    name: "",
    surname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!registerData) return;

    if (registerData.password !== registerData.confirmPassword) {
      setError("Passwords are not equal");
      return;
    }

    try {
      const response = await register(registerData);
      console.log("Kayıt başarılı:", response);
      // Başarılı kayıt sonrası yönlendirme yapılabilir

      navigate("/login");
    } catch (error: any) {
      setError(error.response.data);
      console.error("Kayıt başarısız:", error);
      // Hata mesajı kullanıcıya gösterilebilir
    }
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center py-4 gap-4">
      <h1 className="text-3xl font-bold">Kayıt Ol</h1>
      <div className="bg-slate-700 w-full md:w-[50%] lg:w-[38%] xl:w-[32%] 2xl:w-[30%] rounded-md p-8 border border-zinc-200 flex flex-col gap-4">
        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <input
            type="text"
            name="name"
            value={registerData.name}
            onChange={handleChange}
            className="w-full p-4 text-black bg-white border border-white rounded-lg"
            placeholder="İsim"
            required
          />
          <input
            type="text"
            name="surname"
            value={registerData.surname}
            onChange={handleChange}
            className="w-full p-4 text-black bg-white border border-white rounded-lg"
            placeholder="Soyisim"
            required
          />
          <input
            type="email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            className="w-full p-4 text-black bg-white border border-white rounded-lg"
            placeholder="E-Posta Adresi"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={registerData.password}
            onChange={handleChange}
            className="w-full p-4 text-black bg-white border border-white rounded-lg"
            placeholder="Parola"
            required
          />
          <input
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={registerData.confirmPassword}
            onChange={handleChange}
            className="w-full p-4 text-black bg-white border border-white rounded-lg"
            placeholder="Parolayı Onayla"
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
          {error && <p className="text-red-400">{error}</p>}

          <button
            type="submit"
            className={`${
              isLoading ? "bg-blue-600/50" : "bg-blue-600"
            } hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer`}
          >
            {isLoading ? "Kayıt Olunuyor..." : "Kayıt Ol"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
