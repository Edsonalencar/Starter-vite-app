export interface IApiService {
  post<T, U = unknown>(
    url: string,
    data?: U,
    headers?: Record<string, string>
  ): Promise<T>;

  put<T, U = unknown>(
    url: string,
    data: U,
    headers?: Record<string, string>
  ): Promise<T>;

  patch<T, U = unknown>(
    url: string,
    data: U,
    headers?: Record<string, string>
  ): Promise<T>;

  delete<T>(url: string, headers?: Record<string, string>): Promise<T>;

  get<T>(
    url: string,
    queryParams?: Record<string, string | number>,
    headers?: Record<string, string>
  ): Promise<T>;
}

export interface IEndpointResolver {
  getRoot(): string;
  getById(id: string | number): string;
  update(id: string | number): string;
  delete(id: string | number): string;
  getPage(page: number): string;
  patch(id: string | number): string;
}

export interface ResponseDTO<T> {
  data?: T | any;
  time: string;
}

export interface Page<T> {
  totalElements: number;
  totalPages: number;
  pageable: any;
  number: number;
  content: Array<T>;
  numberOfElements: number;
  hasContent: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  first: boolean;
  last: boolean;
  size: number;
}
