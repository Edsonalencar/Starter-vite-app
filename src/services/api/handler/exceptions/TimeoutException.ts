import { AbstractException } from "./AbstractException";

export class TimeoutException extends AbstractException {
  public timeoutInfo: {
    duration?: number; // Duração do timeout em ms
    endpoint?: string; // Endpoint que sofreu timeout
    timestamp: number; // Timestamp quando ocorreu o timeout
  };

  constructor(
    message?: string | undefined,
    timeoutMs?: number,
    endpoint?: string
  ) {
    super(message || "A requisição demorou muito para responder");
    this.name = "TimeoutException";
    this.timeoutInfo = {
      duration: timeoutMs,
      endpoint: endpoint,
      timestamp: Date.now(),
    };
  }

  describe(): string {
    return this.message;
  }

  errorArray(): any {
    return this.timeoutInfo;
  }

  getTimeoutDuration(): number | null {
    return this.timeoutInfo.duration ? this.timeoutInfo.duration / 1000 : null;
  }

  isRecent(): boolean {
    const fiveMinutesAgo = Date.now() - 5 * 60 * 1000;
    return this.timeoutInfo.timestamp > fiveMinutesAgo;
  }
}
