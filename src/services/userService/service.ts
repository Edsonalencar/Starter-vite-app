import { LoginType } from "../../types";
import { BaseApi } from "../baseApi/baseAPI";
import { AbstractException } from "../baseApi/handler/AbstractException";
import { ResponseDTO } from "../baseApi/interface";

const API = new BaseApi();

export class UserService {
  static async login({
    username,
    password,
  }: LoginType): Promise<ResponseDTO<string>> {
    const res = await API.postNoAuth("/users/login", {
      username,
      password,
    });

    if (res == undefined)
      throw new AbstractException("Alguma coisa aconteceu errado!");

    return res as ResponseDTO<string>;
  }
}
