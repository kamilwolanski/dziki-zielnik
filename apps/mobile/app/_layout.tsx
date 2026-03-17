import '../global.css';
import { Stack } from 'expo-router';
import Constants from 'expo-constants';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useEffect } from 'react';
import { useAuthStore } from '../src/stores/auth.store';

export default function RootLayout() {
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.googleWebClientId,
    });
    loadFromStorage();
  }, [loadFromStorage]);

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
