import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7238/api", // Backend base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: false, // Eğer çerez kullanacaksan true yapabilirsin
});

export default api;