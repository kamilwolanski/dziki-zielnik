import { useEffect, useRef } from 'react';
import { Animated, Image, ImageSourcePropType } from 'react-native';
import { useCSSVariable } from 'uniwind';

export type BadgeVariant = 'neutral' | 'success' | 'primary' | 'info' | 'danger';

const badgeColorVariables = [
  '--color-badge-neutral-bg',
  '--color-badge-success-bg',
  '--color-badge-primary-bg',
  '--color-badge-info-bg',
  '--color-badge-danger-bg',
  '--color-badge-neutral-text',
  '--color-badge-success-text',
  '--color-badge-primary-text',
  '--color-badge-info-text',
  '--color-badge-danger-text',
  '--color-badge-active-bg',
  '--color-badge-active-text',
];

interface BadgeProps {
  text: string;
  variant: BadgeVariant;
  iconSource?: ImageSourcePropType;
  active?: boolean;
}

const Badge = ({ text, variant, iconSource, active = false }: BadgeProps) => {
  const activeProgress = useRef(new Animated.Value(active ? 1 : 0)).current;
  const [
    neutralBg,
    successBg,
    primaryBg,
    infoBg,
    dangerBg,
    neutralText,
    successText,
    primaryText,
    infoText,
    dangerText,
    activeBg,
    activeText,
  ] = useCSSVariable(badgeColorVariables);

  const bgColors: Record<BadgeVariant, string> = {
    neutral: String(neutralBg),
    success: String(successBg),
    primary: String(primaryBg),
    info: String(infoBg),
    danger: String(dangerBg),
  };

  const textColors: Record<BadgeVariant, string> = {
    neutral: String(neutralText),
    success: String(successText),
    primary: String(primaryText),
    info: String(infoText),
    danger: String(dangerText),
  };

  useEffect(() => {
    Animated.timing(activeProgress, {
      toValue: active ? 1 : 0,
      duration: 180,
      useNativeDriver: false,
    }).start();
  }, [active, activeProgress]);

  const backgroundColor = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [bgColors[variant], String(activeBg)],
  });

  const color = activeProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [textColors[variant], String(activeText)],
  });

  return (
    <Animated.View
      className="rounded-full px-3 py-1 mr-1 flex-row items-center self-start border border-card-border"
      style={{ backgroundColor }}
    >
      {iconSource && (
        <Image source={iconSource} className="w-4 h-4 mr-1.5" resizeMode="contain" />
      )}
      <Animated.Text className="text-[11px] font-bold" style={{ color }}>
        {text}
      </Animated.Text>
    </Animated.View>
  );
};

export default Badge;
