import { Stack } from "expo-router";
import { View, Text } from "react-native";

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: "Home" }} />
      <View>
        <Text>Home screen</Text>
      </View>
    </>
  );
}
