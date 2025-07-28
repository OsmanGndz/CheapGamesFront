import { useEffect, useState } from "react";
import { UpdateUserInformation } from "../../services/AuthService";
import { toast } from "react-toastify";

interface UpdateData {
  name: string;
  surname: string;
  email: string;
}

interface User {
  id: number;
  name: string;
  surname: string;
  email: string;
}

interface ChangePersonalInfoProps {
  user: User;
}

const ChangePersonalInfo = ({ user }: ChangePersonalInfoProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [updateData, setUpdateData] = useState<UpdateData>({
    name: "",
    surname: "",
    email: "",
  });

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      (updateData.name === "",
      updateData.surname === "",
      updateData.email === "")
    )
      return;

    try {
      await UpdateUserInformation(updateData);
      toast.success("Kullanıcı bilgileriniz başarılı şekilde değiştirildi.");
    } catch (error: any) {
      toast.error("Kullanıcı bilgileri değiştirilirken bir hata oluştu.");
    }
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setUpdateData({
      name: user?.name,
      surname: user?.surname,
      email: user?.email,
    });
  }, [user]);

  return (
    <div className="flex flex-col w-full gap-4">
      <h1 className="text-3xl font-bold ">Kişisel Bilgilerini Güncelle</h1>
      <form
        onSubmit={handleUpdate}
        className="bg-slate-700 flex flex-col p-8 rounded-md gap-4"
      >
        <input
          type="text"
          name="name"
          value={updateData.name}
          onChange={handleChange}
          className="w-full p-4 text-black bg-white border border-white rounded-lg"
          placeholder="İsim"
          required
        />
        <input
          type="text"
          name="surname"
          value={updateData.surname}
          onChange={handleChange}
          className="w-full p-4 text-black bg-white border border-white rounded-lg"
          placeholder="Soyisim"
          required
        />
        <input
          type="email"
          name="email"
          value={updateData.email}
          onChange={handleChange}
          className="w-full p-4 text-black bg-white border border-white rounded-lg"
          placeholder="E-Posta Adresi"
          required
        />

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

export default ChangePersonalInfo;
