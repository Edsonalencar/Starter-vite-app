import { DefaultEndpointResolver } from "./DefaultEndpointResolver";
import { IApiService, IEndpointResolver, Page, ResponseDTO } from "./interface";

export class GenericService {
  private resolver: IEndpointResolver;

  constructor(
    private url: string,
    private api: IApiService,
    resolver?: IEndpointResolver // Opcional, usa DefaultEndpointResolver se não fornecido
  ) {
    this.resolver = resolver ?? new DefaultEndpointResolver(url);
  }

  create = async <T, U = unknown>(
    data: U,
    headers?: Record<string, string>
  ) => {
    const res = await this.api.post<ResponseDTO<T>, U>(
      this.resolver.getRoot(),
      data,
      headers
    );
    return res as ResponseDTO<T>;
  };

  get = async <T>(
    queryParams?: Record<string, string | number>,
    headers?: Record<string, string>
  ) => {
    const res = await this.api.get<ResponseDTO<T>>(
      this.resolver.getRoot(),
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
      this.resolver.getById(id),
      undefined,
      headers
    );
    return res as ResponseDTO<T>;
  };

  update = async <T, U = unknown>(
    id: number | string,
    data: U,
    headers?: Record<string, string>
  ) => {
    const res = await this.api.put<ResponseDTO<T>, U>(
      this.resolver.update(id),
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
      this.resolver.patch(id),
      data,
      headers
    );
    return res as ResponseDTO<T>;
  };

  delete = async <T>(id: number | string, headers?: Record<string, string>) => {
    const res = await this.api.delete<ResponseDTO<T>>(
      this.resolver.delete(id),
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
      this.resolver.getPage(page),
      data,
      headers
    );
    return res as ResponseDTO<Page<T>>;
  };
}
