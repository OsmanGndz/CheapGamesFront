import React, { useState } from "react";
import { ChangePasswordRequest } from "../../services/AuthService";
import { toast } from "react-toastify";

interface ChangePasswordProp {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
const ChangePassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [changePassword, setChangePassword] = useState<ChangePasswordProp>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handlePasswordChange = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Minimum karakter kontrolü
    if (
      changePassword.password.length < 6 ||
      changePassword.newPassword.length < 6 ||
      changePassword.confirmPassword.length < 6
    ) {
      toast.error("Parolalar en az 6 karakter olmalıdır.");
      setIsLoading(false);
      return;
    }

    // Parolalar eşleşiyor mu?
    if (changePassword.newPassword !== changePassword.confirmPassword) {
      toast.error("Parolalar eşleşmiyor.");
      setIsLoading(false);
      return;
    }

    try {
      await ChangePasswordRequest(changePassword);
      toast.success("Parola değiştirildi.");
    } catch (error: any) {
      toast.error(`Parola değiştirilirken bir hata oluştu.`);
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setChangePassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="text-3xl font-bold ">Şifre Değiştirme</h1>
      <form
        onSubmit={handlePasswordChange}
        className="bg-slate-700 flex flex-col p-8 rounded-md gap-4"
      >
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          value={changePassword.password}
          onChange={handleChange}
          className="w-full p-4 text-black bg-white border border-white rounded-lg"
          placeholder="Şifreniz"
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          name="newPassword"
          value={changePassword.newPassword}
          onChange={handleChange}
          className="w-full p-4 text-black bg-white border border-white rounded-lg"
          placeholder="Yeni Şifreniz"
          required
        />
        <input
          type={showPassword ? "text" : "password"}
          name="confirmPassword"
          value={changePassword.confirmPassword}
          onChange={handleChange}
          className="w-full p-4 text-black bg-white border border-white rounded-lg"
          placeholder="Yeni şifrenizi doğrulayın"
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
          className={`${
            isLoading ? "bg-blue-600/50" : "bg-blue-600"
          } hover:bg-blue-700 text-white py-3 rounded-lg font-semibold cursor-pointer`}
        >
          {isLoading ? "Güncelleniyor..." : "Güncelle"}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
