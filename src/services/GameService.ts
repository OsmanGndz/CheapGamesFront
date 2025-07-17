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

export const fetchGamesByCategory = async (value:string) => {
  const response = await api.get("/game/category", {
    params: {
      categoryName: value
    }
  });
  return response.data;
}

export const fetchGamesByPlatform = async (value:string) => {

  if(value ==="Hepsi"){
    const response = await api.get("/game/category",{
      params: {
        categoryName: "computer"
      }
    });
    return response.data;
  }

  const response = await api.get("/game/platform", {
    params: {
      platformName: value
    }
  });
  return response.data;
}