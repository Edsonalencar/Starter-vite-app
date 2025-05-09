// Tratamento centralizado de erros
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { logError } from "../utils/logger";
import { isOnline } from "../utils/network";
import { redirectToLogin } from "./token";
import { ArgsError } from "../types";
import { config } from "@/config";

import {
  AbstractException,
  InvalidArgException,
  NetworkException,
  TimeoutException,
  UnauthorizedException,
} from "./exceptions";

const nextAuthTokenName = config.NEXT_AUTH_TOKEN_NAME;
const nextAuthRedirectName = config.NEXT_AUTH_REDIRECT_NAME;

export function handlerException(error: AxiosError): never {
  // Verificação de offline primeiro
  if (!isOnline()) {
    toast.error(
      "Sem conexão com a internet. Verifique sua conexão e tente novamente."
    );
    throw new NetworkException("Sem conexão com a internet");
  }

  // Timeout
  if (error.code === "ECONNABORTED") {
    toast.error(
      "A requisição demorou muito para responder. Tente novamente mais tarde."
    );
    throw new TimeoutException("Timeout na requisição");
  }

  // Erro de rede (sem resposta do servidor)
  if (error.request && !error.response) {
    toast.error(
      "Não foi possível conectar ao servidor. Verifique sua conexão ou tente novamente mais tarde."
    );
    throw new NetworkException("Erro de conexão com o servidor");
  }

  // Erro com resposta do servidor
  if (error.response) {
    const { status } = error.response;
    // Garantir que o data é um objeto com tipagem adequada
    const responseBody: any = error.response.data;

    // Log detalhado do erro
    logError(
      {
        status,
        data: responseBody,
        url: error.config?.url,
        method: error.config?.method,
      },
      `HTTP ${status}`
    );

    // Tratamento de erros HTTP específicos
    switch (status) {
      case 401:
        localStorage.removeItem(nextAuthTokenName);
        localStorage.removeItem(nextAuthRedirectName);
        redirectToLogin();
        toast.error("Não autorizado. Faça login novamente.");
        throw new UnauthorizedException("Não autorizado");

      case 403:
        toast.error("Você não tem permissão para acessar este recurso.");
        throw new UnauthorizedException("Acesso negado");

      case 404:
        toast.error("Recurso não encontrado.");
        throw new AbstractException("Recurso não encontrado");

      case 400:
      case 422:
        // Certifique-se de que responseBody é tratado como 'any' ou com tipagem adequada
        const responseData =
          responseBody &&
          typeof responseBody === "object" &&
          "data" in responseBody
            ? responseBody.data
            : responseBody;

        // Verifica se responseData é um objeto com errors
        if (
          responseData &&
          typeof responseData === "object" &&
          "errors" in responseData
        ) {
          const errors = responseData as ArgsError;

          // Exibe uma mensagem para cada erro de validação
          if (errors.errors && Array.isArray(errors.errors)) {
            errors.errors.forEach((errorMsg: string) => {
              toast.error(errorMsg);
            });
          } else if (errors.message) {
            toast.error(errors.message);
          }

          throw new InvalidArgException(
            typeof errors.message === "string"
              ? errors.message
              : "Dados inválidos",
            errors.errors || []
          );
        } else if (typeof responseData === "string") {
          toast.error(responseData);
          throw new AbstractException(responseData);
        }

        toast.error(
          "Dados inválidos. Verifique as informações e tente novamente."
        );
        throw new InvalidArgException("Dados inválidos", []);

      case 500:
      case 502:
      case 503:
      case 504:
        toast.error(
          "Erro no servidor. Nossa equipe foi notificada e estamos trabalhando para resolver o problema."
        );
        throw new AbstractException("Erro no servidor");

      default:
        toast.error("Ocorreu um erro inesperado. Tente novamente mais tarde.");
        throw new AbstractException("Erro inesperado");
    }
  }

  // Erro genérico (não deve chegar aqui, mas por segurança)
  toast.error("Algo saiu errado: " + (error.message || "Erro desconhecido"));
  throw new AbstractException(error.message || "Erro desconhecido");
}
