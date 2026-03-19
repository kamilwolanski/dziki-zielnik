import React, { useRef, useEffect, useState } from 'react';
import { View, Text, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from 'react-native-svg';

function GoogleIcon() {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <Path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <Path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <Path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </Svg>
  );
}

export default function ShimmerButton({
  handleOnPress,
}: {
  handleOnPress: () => void;
}) {
  const translateX = useRef(new Animated.Value(0)).current;
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!width) return;

    const shimmerWidth = width * 0.3;

    const animate = () => {
      translateX.setValue(-shimmerWidth);

      Animated.sequence([
        Animated.timing(translateX, {
          toValue: width + shimmerWidth,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.delay(800),
      ]).start(() => animate());
    };

    animate();
  }, [translateX, width]);

  return (
    <View className="px-5">
      <TouchableOpacity
        activeOpacity={0.85}
        onPress={handleOnPress}
        className="w-full rounded-3xl overflow-hidden"
        style={{
          shadowColor: '#3a5a40',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.35,
          shadowRadius: 16,
          elevation: 8,
        }}
      >
        <LinearGradient
          onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
          colors={['#3a5a40', '#588157', '#6a9967']}
          locations={[0, 0.6, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          className="flex-row items-center justify-center py-3 gap-3.5"
        >
          {/* shimmer */}
          <Animated.View
            className="absolute left-0"
            style={{
              top: -50,
              height: 200,
              width: width * 0.3,
              transform: [{ translateX }],
            }}
          >
            <LinearGradient
              colors={['transparent', 'rgba(225,225,225,0.20)', 'transparent']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              className="flex-1"
              style={{ transform: [{ rotate: '25deg' }] }}
            />
          </Animated.View>

          <GoogleIcon />

          <Text className="text-white text-lg tracking-wide font-sans-semibold">
            Wejdź do ogrodu z Google
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
