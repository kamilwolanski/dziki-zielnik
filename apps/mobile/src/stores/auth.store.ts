import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { UserDto } from '@dziki-zielnik/contracts';

const ACCESS_TOKEN_KEY = 'access_token';
export const REFRESH_TOKEN_KEY = 'refresh_token';

interface AuthState {
  user: UserDto | null;
  accessToken: string | null;
  isLoading: boolean;

  setAuth: (
    user: UserDto,
    accessToken: string,
    refreshToken: string,
  ) => Promise<void>;

  clearAuth: () => Promise<void>;
  loadFromStorage: () => Promise<void>;
  loadRefreshToken: () => Promise<string | null>;
  setTokens: (accessToken: string, refreshToken: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  accessToken: null,
  isLoading: true,

  setAuth: async (user, accessToken, refreshToken) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);

    set({ user, accessToken });
  },

  clearAuth: async () => {
    await SecureStore.deleteItemAsync(ACCESS_TOKEN_KEY);
    await SecureStore.deleteItemAsync(REFRESH_TOKEN_KEY);

    set({ user: null, accessToken: null });
  },

  loadFromStorage: async () => {
    const accessToken = await SecureStore.getItemAsync(ACCESS_TOKEN_KEY);

    set({
      accessToken,
      isLoading: false,
    });
  },

  loadRefreshToken: async () => {
    return await SecureStore.getItemAsync(REFRESH_TOKEN_KEY);
  },

  setTokens: async (accessToken: string, refreshToken: string) => {
    await SecureStore.setItemAsync(ACCESS_TOKEN_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_TOKEN_KEY, refreshToken);

    set({ accessToken });
  },
}));
