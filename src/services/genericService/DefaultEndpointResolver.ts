import { IEndpointResolver } from "./interface";

export class DefaultEndpointResolver implements IEndpointResolver {
  constructor(private baseURL: string) {}

  getRoot(): string {
    return this.baseURL;
  }

  getById(id: string | number): string {
    return `${this.baseURL}/${id}`;
  }

  update(id: string | number): string {
    return `${this.baseURL}/${id}`;
  }

  delete(id: string | number): string {
    return `${this.baseURL}/${id}`;
  }

  getPage(page: number): string {
    return `${this.baseURL}/page/${page}`;
  }

  patch(id: string | number): string {
    return `${this.baseURL}/${id}`;
  }
}
