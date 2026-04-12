import { View, Pressable, Dimensions, Text, StyleProp, ViewStyle } from 'react-native';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

import Animated, {
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function AnimatedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const options = descriptors[state.routes[state.index].key].options;

  const tabBarStyle = options.tabBarStyle || {};
  const activeColor = options.tabBarActiveTintColor;
  const iconStyle = options.tabBarIconStyle || {};
  const tabBarLabelStyle = options.tabBarLabelStyle || {};

  const tabFullWidth = width / state.routes.length;
  const tabWidth = tabFullWidth / 4;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(
          state.index * tabFullWidth + (tabFullWidth - tabWidth) / 2,
          { stiffness: 220, damping: 22, mass: 0.9 },
        ),
      },
    ],
  }));

  return (
    <View
      className="flex-row relative"
      style={tabBarStyle as StyleProp<ViewStyle>}
    >
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            height: 3,
            width: tabWidth,
            backgroundColor: activeColor,
            borderRadius: 999,
          },
          animatedStyle,
        ]}
      />

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const focused = state.index === index;

        const label = options.title;

        const onPress = () => {
          navigation.navigate(route.name as never);
        };

        const color = focused
          ? options.tabBarActiveTintColor || 'green'
          : options.tabBarInactiveTintColor || 'black';

        return (
          <Pressable
            key={route.key}
            onPress={onPress}
            className="flex-1 items-center justify-center"
          >
            <View style={iconStyle}>
              {options.tabBarIcon?.({
                focused,
                color,
                size: 24,
              })}
            </View>

            <Text className="mt-0.5" style={{ ...tabBarLabelStyle, color }}>
              {label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
