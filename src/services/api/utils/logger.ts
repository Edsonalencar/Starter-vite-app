export function logError(error: any, context: string = ""): void {
  if (process.env.NODE_ENV !== "production") {
    console.error(`[API Error${context ? ` - ${context}` : ""}]:`, error);
  }
}

export function logWarning(message: string, data?: any): void {
  if (process.env.NODE_ENV !== "production") {
    console.warn(`[API Warning] ${message}`, data || "");
  }
}

export function logInfo(message: string, data?: any): void {
  if (process.env.NODE_ENV !== "production") {
    console.info(`[API Info] ${message}`, data || "");
  }
}
