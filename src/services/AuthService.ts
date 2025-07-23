import api from "../api/info"

export const login = async (email:string, password:string)=>{

    try {
    const response = await api.post("/auth/login", {
      email,
      password
    });

    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }

}
interface RegisterParams {
  name: string;
  surname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export const register = async ({
  name,
  surname,
  email,
  password,
  confirmPassword,
}: RegisterParams) => {
  try {
    const response = await api.post("/user/register", {
      name,
      surname,
      email,
      password,
      confirmPassword,
    });

    return response;
  } catch (error) {
    console.error("Register failed:", error);
    throw error;
  }
};
