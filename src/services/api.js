import axios from "axios";
import * as loginService from "./loginService";

const mysqlBaseUrl = "https://anrsistemas.dev.br";
// const mysqlBaseUrl = "http://localhost:21090";

console.log("mysql Base Url:", mysqlBaseUrl);

export const api = axios.create({
  baseURL: mysqlBaseUrl,
});

api.interceptors.request.use(async (config) => {
  const token = loginService.getToken();
  if (token) {
    config.headers.authorization = `${token}`;
  }
  return config;
});
