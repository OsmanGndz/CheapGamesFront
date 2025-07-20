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

export const fetchGamesByAllFilter = async ({
  page,
  pageSize,
  Category,
  Platform,
  minPrice,
  maxPrice,
  sortingFilter,
}: {
  page?: number;
  pageSize?: number;
  Category?: string;
  Platform?: string;
  minPrice?: number |null;
  maxPrice?: number | null;
  sortingFilter?: string;
}) => {

  if (Platform ==="Tüm Ürünler" || Platform === "Hepsi"){
    const response = await api.get("/game/all-filter",{
      params: {
        Category : "computer",
        minPrice: minPrice,
        maxPrice: maxPrice,
        page: page,
        pageSize: pageSize,
        sortingFilter: sortingFilter,
      }
    });
    return response.data;
  }

  const response = await api.get("/game/all-filter", {
    params: {
      page: page,
      pageSize: pageSize,
      Category : Category,
      Platform: Platform,
      minPrice: minPrice,
      maxPrice: maxPrice,
      sortingFilter: sortingFilter,
    }
  });
  return response.data;
}

export const fetchPriceRange = async (category:string, platform:string | null) =>{
  if(platform === "Tüm Ürünler" || platform === "Hepsi"){
    const response = await api.get("/game/priceRange", {
    params: {
      categoryName: "computer"
    }
  });
    return response.data;
  }
  const response = await api.get("/game/priceRange", {
    params: {
      categoryName: category,
      platformName: platform
    }
  });
  return response.data;

}
export const fetchGameById = async (id:number) =>{
  
  const response = await api.get("/game/" + id);
  return response.data;
}