import { Redirect, Tabs } from 'expo-router';
import AntDesign from '@expo/vector-icons/AntDesign';
import Feather from '@expo/vector-icons/Feather';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useCSSVariable } from 'uniwind';
import AnimatedTabBar from '../components/ui/AnimatedTabBar';
import { useAuthStore } from '../../src/stores/auth.store';
import { Image } from 'react-native';

export default function TabLayout() {
  const bgTab = useCSSVariable('--color-surface');
  const bgApp = useCSSVariable('--color-background');
  const insets = useSafeAreaInsets();

  const { accessToken, isLoading, user } = useAuthStore();

  if (isLoading) return null;

  if (!accessToken || !user) {
    return <Redirect href={'/(auth)/login'} />;
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
          borderTopWidth: 0.3,
          borderTopColor: 'rgba(58,90,64,.1)',
          boxShadow: '0 -4px 20px rgba(58,90,64,.08)'
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
        sceneStyle: {
          backgroundColor: String(bgApp),
        },
        headerShown: false,
      }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Start',
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../../assets/images/house.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="encyclopedia"
        options={{
          title: 'Encyklopedia',
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../../assets/images/book.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="herbarium"
        options={{
          title: 'Zielnik',
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../../assets/images/rosemary.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profil',
          tabBarIcon: ({ size }) => (
            <Image
              source={require('../../assets/images/user.png')}
              style={{ width: size, height: size }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
