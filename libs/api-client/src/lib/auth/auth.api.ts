import { AxiosInstance } from 'axios';
import { AuthRefreshBody, AuthRefreshResponse } from '@dziki-zielnik/contracts';

export const createAuthApi = (api: AxiosInstance) => ({
  refreshToken: async (body: AuthRefreshBody) => {
    const { data } = await api.post<AuthRefreshResponse>('/auth/refresh', body);
    return data;
  },
});
