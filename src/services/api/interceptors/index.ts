// Configuração de todos os interceptadores
import axiosInstance from "../client";
import { requestInterceptor, requestErrorInterceptor } from "./request";
import { responseInterceptor, responseErrorInterceptor } from "./response";

// Configurar interceptadores
export function setupInterceptors(): void {
  // Interceptador para requisições
  axiosInstance.interceptors.request.use(
    requestInterceptor,
    requestErrorInterceptor
  );

  // Interceptador para respostas
  axiosInstance.interceptors.response.use(
    responseInterceptor,
    responseErrorInterceptor
  );
}
