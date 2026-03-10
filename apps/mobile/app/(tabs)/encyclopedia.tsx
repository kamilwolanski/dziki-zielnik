import { View, Text, StyleSheet } from 'react-native';

export default function Encyclopedia() {
  return (
    <View style={styles.container}>
      <Text>Encyclopedia screen</Text>
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
