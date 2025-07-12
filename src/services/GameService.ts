import api from "../api/info";

export const fetchGameData = async () => {
    
    const response = await api.get("/game");
    return response.data;
    
  };