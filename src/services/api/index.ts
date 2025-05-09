// Ponto de entrada principal da API
import axiosInstance from "./client";
import { setupInterceptors } from "./interceptors";
import { ResponseDTO } from "./types";
import { retryRequest } from "./handler/retry";
import ServiceWeaverBuilder, { IApiService } from "service-weaver";

// Configurar interceptadores
setupInterceptors();

// API principal com métodos tipados que retornam ResponseDTO<T>
const api = {
  get: <T>(
    url: string,
    params?: any,
    shouldRetry: boolean = true
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .get(url, { params })
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },

  post: <T>(
    url: string,
    data?: any,
    shouldRetry: boolean = false
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .post(url, data)
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },

  put: <T>(
    url: string,
    data?: any,
    shouldRetry: boolean = false
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .put(url, data)
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },

  delete: <T>(
    url: string,
    shouldRetry: boolean = false
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .delete(url)
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },

  patch: <T>(
    url: string,
    data?: any,
    shouldRetry: boolean = false
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .patch(url, data)
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },
};

// API para requisições sem autenticação
const apiNoAuth = {
  get: <T>(
    url: string,
    params?: any,
    shouldRetry: boolean = true
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .get(url, { params, headers: { noAuth: true } })
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },

  post: <T>(
    url: string,
    data?: any,
    shouldRetry: boolean = false
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .post(url, data, { headers: { noAuth: true } })
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },

  put: <T>(
    url: string,
    data?: any,
    shouldRetry: boolean = false
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .put(url, data, { headers: { noAuth: true } })
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },

  delete: <T>(
    url: string,
    shouldRetry: boolean = false
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .delete(url, { headers: { noAuth: true } })
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },

  patch: <T>(
    url: string,
    data?: any,
    shouldRetry: boolean = false
  ): Promise<ResponseDTO<T>> => {
    const requestFn = () =>
      axiosInstance
        .patch(url, data, { headers: { noAuth: true } })
        .then((response) => response.data as ResponseDTO<T>);

    return shouldRetry ? retryRequest(requestFn) : requestFn();
  },
};

const BaseService = ServiceWeaverBuilder.build(api as IApiService);

// Exportar API, apiNoAuth e módulos específicos
export { api, apiNoAuth, BaseService };
export default api;
