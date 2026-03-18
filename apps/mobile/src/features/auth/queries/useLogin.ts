import { useMutation } from '@tanstack/react-query';
import { authApi } from '../../../api/auth.api';
import { useAuthStore } from '../../../stores/auth.store';

export const useGoogleLogin = () => {
  const setAuth = useAuthStore((s) => s.setAuth);

  return useMutation({
    mutationFn: (idToken: string) => authApi.googleLogin({ idToken }),

    onSuccess: async (data) => {
      await setAuth(data.user, data.accessToken, data.refreshToken);
    },
  });
};
