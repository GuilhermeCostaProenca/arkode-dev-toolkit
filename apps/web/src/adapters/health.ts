import { http, Health200 } from "./api";
export const getHealth = () => http<Health200>("/health");
