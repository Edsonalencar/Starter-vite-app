// Tipos relacionados à API

export interface ResponseDTO<T> {
  data?: T | any;
  time: string;
}

export interface ArgsError {
  message: string | null;
  errors: string[];
}

export interface ApiConfig {
  baseURL: string;
  timeout: number;
  retries: number;
  retryDelay: number;
}
