import axios from "axios";

// Para APIs que utilizam autenticação HTTP básica, passe a authopção. O axios irá codificar as credenciais e definir o Authorizationcabeçalho automaticamente:

const url: string = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: url,
  withCredentials: true,
});

export default api;
