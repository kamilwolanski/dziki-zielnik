import { Text } from 'react-native';
import { withUniwind } from 'uniwind';
import { SafeAreaView } from 'react-native-safe-area-context';

const StyledSafeAreaView = withUniwind(SafeAreaView)

export default function Herbarium() {
  return (
    <StyledSafeAreaView edges={['bottom', 'top']} className='flex-1'>
      <Text>Herbarium screen</Text>
    </StyledSafeAreaView>
  );
}
