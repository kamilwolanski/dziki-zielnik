import '../global.css';
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import Constants from 'expo-constants';
import * as SplashScreen from "expo-splash-screen";
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { QueryClientProvider } from '@tanstack/react-query';
import { useEffect } from 'react';
import { useAuthStore } from '../src/stores/auth.store';
import queryClient from '../src/utils/queryClient';
import { ArbutusSlab_400Regular } from '@expo-google-fonts/arbutus-slab';
import {
  SourceSans3_400Regular,
  SourceSans3_600SemiBold,
  SourceSans3_700Bold,
} from '@expo-google-fonts/source-sans-3';

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ArbutusSlab_400Regular,
    SourceSans3_400Regular,
    SourceSans3_600SemiBold,
    SourceSans3_700Bold,
  });
  const loadFromStorage = useAuthStore((s) => s.loadFromStorage);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.googleWebClientId,
    });
    loadFromStorage();
  }, [loadFromStorage]);

    useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);


  if (!loaded && !error) return null;

  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      </Stack>
    </QueryClientProvider>
  );
}
