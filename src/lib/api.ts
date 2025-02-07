import axios, { AxiosError, CreateAxiosDefaults } from "axios";
import { SERVER_URL } from "./api.conf";
import {
  getAccessToken,
  removeFromStorage,
} from "@/services/auth/auth-token.service";

export type ResponseError = AxiosError<{ message: string | Array<string> }>;
const getContentType = () => ({
  "Content-type": "application/json",
});

const options: CreateAxiosDefaults = {
  baseURL: SERVER_URL,
  headers: getContentType(),
  withCredentials: true,
};

export const axiosClassic = axios.create(options);
export const axiosWithAuth = axios.create(options);

axiosWithAuth.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config?.headers && accessToken)
    config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

export const errorCatch = (error: ResponseError): string => {
  const message = error?.response?.data.message;

  return message
    ? Array.isArray(message)
      ? message[0]
      : message
    : error.message;
};

axiosWithAuth.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      error?.response?.status === 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        return axiosWithAuth.request(originalRequest);
      } catch (error) {
        if (error instanceof AxiosError && error.status === 401)
          removeFromStorage();
      }
    }
    throw error;
  }
);
