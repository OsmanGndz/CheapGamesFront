import axios from "axios";

const token = localStorage.getItem("user")
  ? JSON.parse(localStorage.getItem("user")!).token
  : null;


const api = axios.create({
  baseURL: "https://localhost:7238/api", // Backend base URL
  headers: {
    "Content-Type": "application/json",
    "Authorization": token ? `Bearer ${token}` : "",
  },
  withCredentials: false, // Eğer çerez kullanacaksan true yapabilirsin
});

export default api;