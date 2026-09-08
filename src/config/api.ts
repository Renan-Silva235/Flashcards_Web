import axios from "axios";
import dotenv from "dotenv";

// Para APIs que utilizam autenticação HTTP básica, passe a authopção. O axios irá codificar as credenciais e definir o Authorizationcabeçalho automaticamente:

dotenv.config();
const url: string = import.meta.env.VITE_API_URL;

const api = axios.create({ baseURL: url });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.set("Authorization", `Bearer ${token}`);
  }

  return config;
});

export default api;
