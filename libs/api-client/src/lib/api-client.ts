import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface RetryAxiosRequestConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

export const createApiClient = (
  baseURL: string,
  getToken?: () => string | null,
  onUnauthorized?: () => Promise<string | null>,
): AxiosInstance => {
  const client = axios.create({ baseURL });

  client.interceptors.request.use((config) => {
    const token = getToken?.();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
  client.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as RetryAxiosRequestConfig;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        const newToken = await onUnauthorized?.();

        if (newToken) {
          originalRequest.headers = {
            ...originalRequest.headers,
            Authorization: `Bearer ${newToken}`,
          };

          return client(originalRequest);
        }
      }

      return Promise.reject(error);
    },
  );

  return client;
};
