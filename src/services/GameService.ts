import api from "../api/info";

export const fetchGameData = async () => {
    const response = await api.get("/game");
    return response.data;
  };

export const fetchFilteredGameData = async (filter: string) => {
    const response = await api.get("/game/filter",{
      params:{
        filter: filter
      }
    });
    return response.data;
}  