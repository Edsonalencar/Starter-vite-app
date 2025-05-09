import { LoginType } from "../../types";
import { apiNoAuth } from "../api";
import { AbstractException } from "../api/handler/exceptions/AbstractException";
import { ResponseDTO } from "../api/types";

export class UserService {
  static async login({
    username,
    password,
  }: LoginType): Promise<ResponseDTO<string>> {
    const res = await apiNoAuth.post("/users/login", {
      username,
      password,
    });

    if (res == undefined)
      throw new AbstractException("Alguma coisa aconteceu errado!");

    return res;
  }
}
