import { Text } from 'react-native';
import { StyledSafeAreaView } from '../../../src/components/ui/StyledSafeAreaView';
import { useLocalSearchParams } from 'expo-router';

export default function PlantDetails() {
  const { slug } = useLocalSearchParams();
  return (
    <StyledSafeAreaView
      edges={['bottom']}
      className="flex-1 bg-background-main px-4"
    >
      <Text className="text-2xl font-serif-md">Plant details: {slug}</Text>
    </StyledSafeAreaView>
  );
}
