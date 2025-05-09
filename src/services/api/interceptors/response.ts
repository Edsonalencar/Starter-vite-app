// Interceptador de respostas
import { AxiosResponse } from "axios";
import { logWarning } from "../utils/logger";
import { ResponseDTO } from "../types";
import { handlerException } from "../handler/error";

export function responseInterceptor(response: AxiosResponse): AxiosResponse {
  // Verificar se a resposta está no formato esperado
  if (
    !response.data ||
    (typeof response.data === "object" &&
      !("data" in response.data) &&
      !("time" in response.data))
  ) {
    logWarning(
      "API response not in expected ResponseDTO format:",
      response.data
    );

    // Adaptar para o formato ResponseDTO se necessário
    const adaptedResponse = {
      ...response,
      data: {
        data: response.data,
        time: new Date().toISOString(),
      },
    };

    return adaptedResponse;
  }

  return response;
}

export function responseErrorInterceptor(error: any): Promise<never> {
  // Deixar a função handlerException lidar com todos os tipos de erro
  return Promise.reject(handlerException(error));
}
