import { Text } from 'react-native';
import { withUniwind } from 'uniwind';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledSafeAreaView = withUniwind(SafeAreaView)

export default function Home() {

  return (
    <StyledSafeAreaView edges={['bottom', 'top']} className='flex-1'>
      <Text className="text-red-500">Home screen</Text>
    </StyledSafeAreaView>
  );
}
