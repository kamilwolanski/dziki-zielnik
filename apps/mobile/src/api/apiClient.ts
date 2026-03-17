import { createApiClient } from '@dziki-zielnik/api-client';
import { useAuthStore } from '../stores/auth.store';
import * as SecureStore from 'expo-secure-store';
import axios from 'axios';
import { AuthRefreshResponse } from '@dziki-zielnik/contracts';

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://10.0.2.2:3000/api';

const refreshClient = axios.create({
  baseURL: API_URL,
});

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = await SecureStore.getItemAsync('refresh_token');

  if (!refreshToken) return null;

  try {
    const { data } = await refreshClient.post<AuthRefreshResponse>(
      '/auth/refresh',
      { refreshToken },
    );

    await useAuthStore
      .getState()
      .setTokens(data.accessToken, data.refreshToken);

    return data.accessToken;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        await useAuthStore.getState().clearAuth();
      }
    }

    return null;
  }
};

export const apiClient = createApiClient(
  API_URL,
  () => useAuthStore.getState().accessToken,
  refreshAccessToken,
);
