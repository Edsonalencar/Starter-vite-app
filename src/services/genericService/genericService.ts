import { IApiService, Page, ResponseDTO } from "./interface";

export class GenericService {
  constructor(private url: string, private api: IApiService) {}

  getURL = () => this.url;
  getApi = () => this.api;

  create = async <T, U = unknown>(
    data: U,
    headers?: Record<string, string>
  ) => {
    const res = await this.api.post<ResponseDTO<T>, U>(this.url, data, headers);
    return res as ResponseDTO<T>;
  };

  update = async <T, U = unknown>(
    id: number | string,
    data: U,
    headers?: Record<string, string>
  ) => {
    const res = await this.api.put<ResponseDTO<T>, U>(
      `${this.url}/${id}`,
      data,
      headers
    );
    return res as ResponseDTO<T>;
  };

  patch = async <T, U = unknown>(
    id: number | string,
    data: U,
    headers?: Record<string, string>
  ) => {
    const res = await this.api.patch<ResponseDTO<T>, U>(
      `${this.url}/${id}`,
      data,
      headers
    );
    return res as ResponseDTO<T>;
  };

  delete = async <T>(id: number | string, headers?: Record<string, string>) => {
    const res = await this.api.delete<ResponseDTO<string>>(
      `${this.url}/${id}`,
      headers
    );
    return res as ResponseDTO<T>;
  };

  get = async <T>(
    queryParams?: Record<string, string | number>,
    headers?: Record<string, string>
  ) => {
    const res = await this.api.get<ResponseDTO<T>>(
      this.url,
      queryParams,
      headers
    );
    return res as ResponseDTO<T>;
  };

  getById = async <T>(
    id: number | string,
    headers?: Record<string, string>
  ) => {
    const res = await this.api.get<ResponseDTO<T>>(
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
    const res = await this.api.post<ResponseDTO<Page<T>>, U>(
      `${this.url}/page/${page}`,
      data,
      headers
    );
    return res as ResponseDTO<Page<T>>;
  };
}
