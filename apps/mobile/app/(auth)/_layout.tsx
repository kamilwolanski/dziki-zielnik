import { Redirect, Stack } from 'expo-router';
import { useAuthStore } from '../../src/stores/auth.store';

export default function AuthLayout() {
  const { accessToken, user } = useAuthStore();

  if (accessToken && user) {
    return <Redirect href={'/(tabs)'} />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
