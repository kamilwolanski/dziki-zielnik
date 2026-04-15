import { View, Text, Image, ImageSourcePropType } from 'react-native';

export type BadgeVariant = 'neutral' | 'success' | 'primary' | 'info' | 'danger';

interface BadgeProps {
  text: string;
  variant: BadgeVariant;
  iconSource?: ImageSourcePropType;
}

const Badge = ({ text, variant, iconSource }: BadgeProps) => {
  const bgClasses: Record<BadgeVariant, string> = {
    neutral: 'bg-badge-neutral-bg',
    success: 'bg-badge-success-bg',
    primary: 'bg-badge-primary-bg',
    info:    'bg-badge-info-bg',
    danger:  'bg-badge-danger-bg',
  };

  const textClasses: Record<BadgeVariant, string> = {
    neutral: 'text-badge-neutral-text',
    success: 'text-badge-success-text',
    primary: 'text-badge-primary-text',
    info:    'text-badge-info-text',
    danger:  'text-badge-danger-text',
  };

  return (
    <View className={`rounded-xl px-3 py-1 mr-2 flex-row items-center self-start ${bgClasses[variant]}`}>
      {iconSource && (
        <Image source={iconSource} className="w-4 h-4 mr-1.5" resizeMode="contain" />
      )}
      <Text className={`text-[11px] font-bold ${textClasses[variant]}`}>
        {text}
      </Text>
    </View>
  );
};

export default Badge;
