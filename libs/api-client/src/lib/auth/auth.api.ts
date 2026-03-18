import { AxiosInstance } from 'axios';
import {
  AuthGoogleLoginBody,
  AuthRefreshBody,
  AuthRefreshResponse,
  AuthResponse,
} from '@dziki-zielnik/contracts';

export const createAuthApi = (api: AxiosInstance) => ({
  refreshToken: async (body: AuthRefreshBody) => {
    const { data } = await api.post<AuthRefreshResponse>('/auth/refresh', body);

    return data;
  },
  googleLogin: async (body: AuthGoogleLoginBody) => {
    const { data } = await api.post<AuthResponse>('/auth/google', body);

    return data;
  },
  logout: async (body: AuthRefreshBody) => {
    const { data } = await api.post<void>('/auth/logout', body);
    return data;
  },
});
