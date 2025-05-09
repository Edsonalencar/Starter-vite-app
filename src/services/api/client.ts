// Configuração básica do cliente Axios
import axios from "axios";
import { config } from "@/config";
import { ApiConfig } from "./types";

// Configurações da API
export const API_CONFIG: ApiConfig = {
  baseURL: config.BACKEND_URL + "/api",
  timeout: 30000,
  retries: 2,
  retryDelay: 1000,
};

// Criando a instância do axios
const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  timeout: API_CONFIG.timeout,
  headers: {
    Accept: "application/json, text/plain",
    "Accept-Language": "pt-BR",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default axiosInstance;
