import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../../../api/auth.api';
import { useAuthStore } from '../../../stores/auth.store';

export const useLogout = () => {
  const clearAuth = useAuthStore((s) => s.clearAuth);
  const loadRefreshToken = useAuthStore((s) => s.loadRefreshToken);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const refreshToken = await loadRefreshToken();
      if (!refreshToken) throw new Error('No refresh token');

      await authApi.logout({ refreshToken });
    },

    onSettled: async () => {
      await clearAuth();
      queryClient.clear();
    },
  });
};
