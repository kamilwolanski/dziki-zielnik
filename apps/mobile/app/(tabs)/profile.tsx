import { Text, Button } from 'react-native';
import { useLogout } from '../../src/features/auth/queries/uselogout';
import { StyledSafeAreaView } from '../../src/components/ui/StyledSafeAreaView';

export default function Profile() {
  const { mutateAsync, isPending } = useLogout();

  const handleLogout = async () => {
    await mutateAsync();
  };

  return (
    <StyledSafeAreaView
      edges={['bottom', 'top']}
      className="flex-1 bg-background-main"
    >
      <Button title="Wyloguj się" onPress={handleLogout} disabled={isPending} />
      <Text>Profile screen</Text>
    </StyledSafeAreaView>
  );
}
