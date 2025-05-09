// Gerenciamento de tokens de autenticação
import { decodeJwt } from "jose";
import { toast } from "react-toastify";
import { logError, logWarning } from "../utils/logger";
import { config } from "@/config";

const nextAuthTokenName = config.NEXT_AUTH_TOKEN_NAME;
const nextAuthRedirectName = config.NEXT_AUTH_REDIRECT_NAME;
const FRONT_URL = config.FRONT_URL;

// Função auxiliar para redirecionar para página de login
export function redirectToLogin(): void {
  localStorage.removeItem(nextAuthTokenName);
  localStorage.removeItem(nextAuthRedirectName);

  if (typeof window !== "undefined") {
    window.location.href = FRONT_URL + "/login";
  }
}

export function getAuthToken(): string | null {
  return localStorage.getItem(nextAuthTokenName);
}

export function setAuthToken(token: string): void {
  localStorage.setItem(nextAuthTokenName, token);
}

export function removeAuthToken(): void {
  localStorage.removeItem(nextAuthTokenName);
  localStorage.removeItem(nextAuthRedirectName);
}

export function checkToken(): boolean {
  const token = getAuthToken();
  let isTokenValid = false;

  if (!token) {
    toast.error("Nenhum token encontrado, favor fazer login novamente!");
    return isTokenValid;
  }

  try {
    const { exp } = decodeJwt(token);

    if (typeof exp !== "number") {
      logError("Token sem data de expiração", "Token Validation");
      throw new Error("Invalid token: missing expiration field.");
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const timeUntilExpiration = exp - currentTime;

    // Aviso antecipado de que o token vai expirar em breve (5 minutos)
    if (timeUntilExpiration > 0 && timeUntilExpiration < 300) {
      logWarning("Token expira em menos de 5 minutos");
      // Opcional: implementar renovação automática de token
      // refreshToken();
    }

    if (exp < currentTime) {
      removeAuthToken();
      redirectToLogin();
      toast.error("Sessão Expirada, favor fazer login novamente!");
      return isTokenValid;
    }

    isTokenValid = true;
  } catch (error: any) {
    logError(error, "Token Validation");
  }

  return isTokenValid;
}

// Função auxiliar para apiAnchorTo (redirecionar)
export function apiAnchorTo(url: string): void {
  if (typeof window !== "undefined") {
    window.location.href = url;
  }
}
