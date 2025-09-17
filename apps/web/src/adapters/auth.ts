import { http, LoginBody, Login200 } from "./api";
export const login = (body: LoginBody) =>
  http<Login200>("/auth/login", { method: "POST", body: JSON.stringify(body) });
