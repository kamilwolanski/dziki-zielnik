import '../global.css';
import { Stack, useRouter } from 'expo-router';
import { useEffect } from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import Constants from 'expo-constants';

export default function RootLayout() {
  const router = useRouter();

  const isAuth = false;
  useEffect(() => {
    console.log('Constants.expoConfig?.extra?.googleWebClientId', Constants.expoConfig?.extra?.googleWebClientId)
    GoogleSignin.configure({
      webClientId: Constants.expoConfig?.extra?.googleWebClientId,
    });
    if(!isAuth) {
      router.replace("/(auth)/login")
    } else {
      router.replace("/(tabs)")
    }
  }, [isAuth, router])

  return (
    <Stack>
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
    </Stack>
  );
}
