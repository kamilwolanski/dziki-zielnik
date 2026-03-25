import { Text } from 'react-native';
import { withUniwind } from 'uniwind';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuthStore } from '../../src/stores/auth.store';

const StyledSafeAreaView = withUniwind(SafeAreaView)

export default function Home() {
    const { user } = useAuthStore();

  return (
    <StyledSafeAreaView edges={['bottom', 'top']} className='flex-1 bg-background-main'>
      <Text className="text-red-500">Home screencccccccccccccccccc {user?.email}</Text>
    </StyledSafeAreaView>
  );
}
