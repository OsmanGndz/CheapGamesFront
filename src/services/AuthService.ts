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

export const fetchMe = async ()=>{

    try {
    const response = await api.get("/auth/me");
    return response.data;
  } catch (error) {
    console.error("Login failed:", error);
    throw error;
  }
}
interface UpdateData {
  name: string;
  surname: string;
  email: string;
}
export const UpdateUserInformation = async ({ name, surname, email }:UpdateData)=>{
  try{
    const response = await api.put("/auth/me",{
      name : name,
      surname: surname,
      email: email
    })
    return response.data
  }catch(error){
    console.error("Login failed:", error);
    throw error;
  }

}
interface ChangePasswordProp {
  password: string;
  newPassword: string;
  confirmPassword: string;
}
export const ChangePasswordRequest = async ({password, newPassword, confirmPassword}:ChangePasswordProp)=>{
try{
    const response = await api.put("/auth/change-password",{
      password : password,
      newPassword: newPassword,
      passwordConfirmation: confirmPassword
    })
    return response.data
  }catch(error){
    console.error("Login failed:", error);
    throw error;
  }
}

export const CompleteOrderApi = async (gameIds:number[])=>{
try{
    const response = await api.post("/order",{
      gameIds: gameIds
    })
    return response.data
  }catch(error){
    console.error("Order could not given succesfully:", error);
    throw error;
  }
}

export const fetchPastOrder = async ()=> {
  try {
    const response = await api.get("/order")
    return response.data
  } catch (error) {
    console.log(error)
  }

}

export const fetchFavories = async ()=> {
  try {
    const response = await api.get("/favorite")
    return response.data
  } catch (error) {
    console.log(error)
  }

}

export const AddFavorite = async (id:number)=>{
  try {
    const response = await api.post("/favorite",id)
    return response.data
  } catch (error) {
    console.log(error)
  }
}
