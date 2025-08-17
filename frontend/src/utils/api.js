import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000" // Fixed: baseurl -> baseURL
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') { // Check if we're on client side
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;