// Interceptador de requisições
import { InternalAxiosRequestConfig, AxiosError } from "axios";
import { isOnline } from "../utils/network";
import { logError } from "../utils/logger";
import { toast } from "react-toastify";
import { checkToken, getAuthToken } from "../handler/token";

export function requestInterceptor(
  config: InternalAxiosRequestConfig
): InternalAxiosRequestConfig | Promise<never> {
  // Verifica conexão com internet
  if (!isOnline()) {
    toast.error("Sem conexão com a internet");
    return Promise.reject(new Error("Offline"));
  }

  // Verifica se a requisição não deve ser autenticada
  if (config.headers && "noAuth" in config.headers) {
    const hasNoAuth = config.headers["noAuth"];
    delete config.headers["noAuth"];

    if (hasNoAuth) {
      return config;
    }
  }

  // Para requisições autenticadas, verifica o token
  const token = getAuthToken();

  if (token && checkToken()) {
    config.headers.set("Authorization", `Bearer ${token}`);
    return config;
  } else if (!token) {
    // Se não houver token, a requisição continua sem autorização
    return config;
  } else {
    // Se o token for inválido, cancela a requisição
    return Promise.reject(new Error("Token inválido"));
  }
}

export function requestErrorInterceptor(error: AxiosError): Promise<never> {
  logError(error, "Request Interceptor");
  return Promise.reject(error);
}
