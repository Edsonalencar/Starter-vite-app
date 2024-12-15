import { Page, ResponseDTO } from "../../types";
import { BaseApi } from "../baseAPI";

const api = new BaseApi();

export class GenericService {
  constructor(private url: string) {}

  getURL = () => this.url;
  getApi = () => new BaseApi();

  create = async <T, U = unknown>(
    data: U,
    headers?: Record<string, string>
  ) => {
    const res = await api.post<ResponseDTO<T>, U>(this.url, data, headers);
    return res as ResponseDTO<T>;
  };

  update = async <T, U = unknown>(
    id: number | string,
    data: U,
    headers?: Record<string, string>
  ) => {
    const res = await api.put<ResponseDTO<T>, U>(
      `${this.url}/${id}`,
      data,
      headers
    );
    return res as ResponseDTO<T>;
  };

  delete = async <T>(id: number | string, headers?: Record<string, string>) => {
    const res = await api.delete<ResponseDTO<string>>(
      `${this.url}/${id}`,
      headers
    );
    return res as ResponseDTO<T>;
  };

  get = async <T>(
    queryParams?: Record<string, string | number>,
    headers?: Record<string, string>
  ) => {
    const res = await api.get<ResponseDTO<T>>(this.url, queryParams, headers);
    return res as ResponseDTO<T>;
  };

  getById = async <T>(
    id: number | string,
    headers?: Record<string, string>
  ) => {
    const res = await api.get<ResponseDTO<T>>(
      `${this.url}/${id}`,
      undefined,
      headers
    );
    return res as ResponseDTO<T>;
  };

  getPage = async <T, U = unknown>(
    page: number,
    data?: U,
    headers?: Record<string, string>
  ) => {
    const res = await api.post<ResponseDTO<Page<T>>, U>(
      `${this.url}/page/${page}`,
      data,
      headers
    );
    return res as ResponseDTO<Page<T>>;
  };
}
