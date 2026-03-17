import { Redirect, Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';
import AnimatedTabBar from "../components/AnimatedTabBar";
import { useAuthStore } from '../../src/stores/auth.store';

export default function TabLayout() {
  const bgTab = useCSSVariable('--color-surface');
  const bgApp = useCSSVariable('--color-background');
  const insets = useSafeAreaInsets();

  const { accessToken, isLoading, user } = useAuthStore();

  if(isLoading) return null;

  if(!accessToken || !user) {
    return <Redirect href={"/(auth)/login"}/>
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#367d50',
        tabBarInactiveTintColor: '#777',
        tabBarStyle: {
          height: 65 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: String(bgTab),
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        sceneStyle: {
          backgroundColor: String(bgApp)
        },
        headerShown: false
      }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="encyclopedia"
        options={{
          title: 'Encyklopedia',
          tabBarIcon: ({ color, size }) => (
            <Feather name="book-open" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="herbarium"
        options={{
          title: 'Zielnik',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="leaf-outline" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" size={22} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
