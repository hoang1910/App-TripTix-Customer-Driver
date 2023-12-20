import { storage } from "@storage/index";
import axios from "axios";
import {
  errorInterceptor,
  getTokenFromAsyncStorage,
  onFulfill,
} from "./config";
import { url } from "./url";

const httpClient = axios.create({
  baseURL: url.baseUrl,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use(async (config) => {
  const token = await getTokenFromAsyncStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});
httpClient.interceptors.response.use(onFulfill, errorInterceptor);

export default httpClient;
