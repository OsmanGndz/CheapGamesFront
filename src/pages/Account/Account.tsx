import { useQuery } from "@tanstack/react-query";
import { FaUser } from "react-icons/fa";
import { fetchMe } from "../../services/AuthService";
import Spinner from "../../components/Spinner";
import ChangePersonalInfo from "./ChangePersonalInfo";
import ChangePassword from "./ChangePassword";
import { toast } from "react-toastify";

const Account = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["me"],
    queryFn: () => fetchMe(),
  });

  if (isLoading) {
    return (
      <Spinner className="flex w-full items-center justify-center pt-20" />
    );
  }

  if (error) {
    toast.error("Hesap bilgileri yüklenirken bir hata oluştu.");
  }

  return (
    <div className="py-8 flex flex-col md:flex-row w-full gap-8">
      <div className="flex flex-col md:w-[35%] lg:w-[30%] items-center gap-4">
        <FaUser className="text-[160px] text-blue-400" />
        <h1 className="text-xl font-semibold text-center">
          {data?.name} {data?.surname}
        </h1>
      </div>
      <div className="flex flex-col md:w-[50%] lg:w-[40%] gap-16 text-zinc-200">
        <ChangePersonalInfo user={data} />
        <ChangePassword />
      </div>
    </div>
  );
};

export default Account;
