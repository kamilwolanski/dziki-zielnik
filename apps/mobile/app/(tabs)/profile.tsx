import { View, Text, StyleSheet, Button } from 'react-native';
import { useLogout } from '../../src/features/auth/queries/uselogout';

export default function Profile() {
  const { mutateAsync, isPending } = useLogout();

  const handleLogout = async () => {
    await mutateAsync();
  };

  return (
    <View style={styles.container}>
      <Button title="Wyloguj się" onPress={handleLogout} disabled={isPending} />
      <Text>Profile screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
