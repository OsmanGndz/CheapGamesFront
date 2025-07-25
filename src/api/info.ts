import axios from "axios";

const token = localStorage.getItem("token")
  ? JSON.parse(localStorage.getItem("token")!)
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