import { decodeJwt } from "jose";

import { AbstractException } from "./handler/AbstractException";
import { InvalidArgException } from "./handler/InvalidArgException";
import { UnauthorizedException } from "./handler/UnauthorizedExption";
import { ArgsError, ResponseDTO } from "../types";
import { anchorTo } from "../utils/link";
import { toast } from "react-toastify";

const nextAuthTokenName =
  import.meta.env.VITE_NEXT_AUTH_TOKEN_NAME ?? "nextauth.token";
const nextAuthRedirectName =
  import.meta.env.VITE_NEXT_AUTH_REDIRECT_NAME ?? "nextauth.redirect";

export class BaseApi {
  public isExpired = false;
  private baseAPI = import.meta.env.VITE_BACKEND + "/api";

  private buildUrlWithParams(
    rota: string,
    params?: Record<string, string | number>
  ): string {
    const url = new URL(`${this.baseAPI}${rota}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }
    return url.toString();
  }

  private async request<T>(
    method: string,
    rota: string,
    options: {
      headers?: Record<string, string>;
      body?: unknown;
      queryParams?: Record<string, string | number>;
      noAuth?: boolean; // Flag para requisições sem autenticação
    } = {}
  ): Promise<T | undefined> {
    const token = localStorage.getItem(nextAuthTokenName) ?? undefined;

    if (!options.noAuth && !checkToken(token)) return;

    const headers: Record<string, string> = {
      Accept: "application/json, text/plain",
      "Accept-Language": "pt-BR",
      "Content-Type": "application/json;charset=UTF-8",
      ...(options.noAuth ? {} : { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const url = this.buildUrlWithParams(rota, options.queryParams);

    const init: RequestInit = {
      method,
      headers,
      body: options.body ? JSON.stringify(options.body) : undefined,
    };

    try {
      const res = await fetch(url, init);

      if (!res.ok) {
        throw new Error(`Erro inesperado: ${res.statusText}`);
      }

      return res.json() as Promise<T>;
    } catch (e) {
      handlerExceptionResponse({ e });
    }
  }

  async get<T>(
    rota: string,
    queryParams?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T | undefined> {
    return this.request<T>("GET", rota, { headers, queryParams });
  }

  async post<T, U>(
    rota: string,
    body?: U,
    headers?: Record<string, string>
  ): Promise<T | undefined> {
    return this.request<T>("POST", rota, { headers, body });
  }

  async postNoAuth<T, U>(
    rota: string,
    body?: U,
    headers?: Record<string, string>
  ): Promise<T | undefined> {
    return this.request<T>("POST", rota, { headers, body, noAuth: true });
  }

  async put<T, U>(
    rota: string,
    body?: U,
    headers?: Record<string, string>
  ): Promise<T | undefined> {
    return this.request<T>("PUT", rota, { headers, body });
  }

  async delete<T>(
    rota: string,
    headers?: Record<string, string>
  ): Promise<T | undefined> {
    return this.request<T>("DELETE", rota, { headers });
  }

  async postFormData<T>(
    rota: string,
    body: FormData,
    headers?: Record<string, string>
  ): Promise<T | undefined> {
    return this.request<T>("POST", rota, {
      headers: {
        "Content-Type": "multipart/form-data",
        ...headers,
      },
      body,
    });
  }
}

export function checkToken(token?: string) {
  let isTokenValid = false;

  if (!token) {
    toast.error("Nenhum token encontrado, favor fazer login novamente!");
    return isTokenValid;
  }

  try {
    const { exp } = decodeJwt(token);

    if (typeof exp !== "number") {
      throw new Error("Invalid token: missing expiration field.");
    }

    const currentTime = Math.floor(Date.now() / 1000);

    if (exp < currentTime) {
      localStorage.removeItem(nextAuthTokenName);
      localStorage.removeItem(nextAuthRedirectName);
      anchorTo("/login");

      toast.error("Sessão Expirada, favor fazer login novamente!");
      return isTokenValid;
    }

    isTokenValid = true;
  } catch (error: any) {
    console.error("Error validating token:", error.message);
  }

  return isTokenValid;
}

export async function requestBody<T>(
  res: Response,
  baseIn?: BaseApi
): Promise<T | undefined> {
  if (res.ok) return (await res.json()) as T;
  else if (res.status == 403) {
    if (baseIn != null && !baseIn.isExpired) {
      localStorage.removeItem(nextAuthTokenName);
      localStorage.removeItem(nextAuthRedirectName);
      anchorTo("/login");
      toast.error("Ação não autorizada!");
    }
  } else handlerExption(res.status, await res.json());
}

function handlerExceptionResponse(content: any) {
  if (typeof content === "object" && "errors" in content) {
    const errors = content as ArgsError;
    toast.error(errors.message as string);
    throw new InvalidArgException(errors.message as string, errors.errors);
  } else if (typeof content === "string") {
    toast.error(content);
    throw new AbstractException(content as string);
  } else {
    throw new AbstractException("Alguma coisa saiu errado!");
  }
}

function handlerExption(status: number, res: ResponseDTO<any>) {
  if (status == 401) {
    localStorage.removeItem(nextAuthTokenName);
    localStorage.removeItem(nextAuthRedirectName);
    anchorTo("/login");
    throw new UnauthorizedException(res.data as string);
  } else if (status == 400) {
    handlerExceptionResponse(res.data);
  } else if (status == 500) {
    handlerExceptionResponse(res.data);
  } else {
    handlerExceptionResponse(res.data);
  }
}
