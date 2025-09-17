import { paths } from "../../../packages/contracts/types.gen";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3333";

export async function http<T>(path: string, init?: RequestInit): Promise<T> {
  const r = await fetch(`${API}${path}`, {
    headers: { "Content-Type": "application/json", ...(init?.headers || {}) },
    credentials: "include",
    ...init
  });
  if (!r.ok) throw new Error(`${init?.method ?? "GET"} ${path} -> ${r.status}`);
  return r.json() as Promise<T>;
}

// Tipos de conveniência
export type Health200 = paths["/health"]["get"]["responses"]["200"]["content"]["application/json"];
export type LoginBody = paths["/auth/login"]["post"]["requestBody"]["content"]["application/json"];
export type Login200  = paths["/auth/login"]["post"]["responses"]["200"]["content"]["application/json"];
