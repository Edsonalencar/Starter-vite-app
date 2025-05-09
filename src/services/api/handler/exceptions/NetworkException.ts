import { AbstractException } from "./AbstractException";

export class NetworkException extends AbstractException {
  public details: Record<string, any> = {};

  constructor(message?: string | undefined, details?: Record<string, any>) {
    super(message || "Erro de conexão com o servidor");
    this.details = details || {};
    this.name = "NetworkException";
  }

  describe(): string {
    return this.message;
  }

  errorArray(): any {
    return Object.keys(this.details).length > 0 ? this.details : null;
  }

  isOffline(): boolean {
    return (
      this.message.includes("conexão") ||
      this.message.includes("internet") ||
      this.details?.type === "offline"
    );
  }
}
