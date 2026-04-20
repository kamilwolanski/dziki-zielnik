import { Stack } from 'expo-router';

export default function EncyclopediaLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Encyklopedia', headerShown: false }} />
      <Stack.Screen name="[slug]" options={{ title: 'Szczegoly rosliny', headerShown: true }} />
    </Stack>
  );
}
