// Lógica de retentativas para requisições
import { logInfo } from "../utils/logger";

// Configurações padrão
const DEFAULT_MAX_RETRIES = 2;
const DEFAULT_RETRY_DELAY = 1000; // ms

export async function retryRequest<T>(
  fn: () => Promise<T>,
  maxRetries: number = DEFAULT_MAX_RETRIES,
  retryDelay: number = DEFAULT_RETRY_DELAY
): Promise<T> {
  let lastError;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error: any) {
      lastError = error;

      // Não tentar novamente para erros específicos (4xx exceto timeout)
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        throw error;
      }

      // Último tente, rethrow
      if (attempt === maxRetries) {
        throw error;
      }

      // Esperar antes de tentar novamente (exponential backoff)
      const delay = retryDelay * Math.pow(2, attempt);
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Notificar sobre a retentativa
      logInfo(`Tentativa ${attempt + 1} de ${maxRetries + 1}...`);
    }
  }

  throw lastError;
}
