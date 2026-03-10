import { View, Text, StyleSheet } from 'react-native';

export default function Herbarium() {
  return (
    <View style={styles.container}>
      <Text>Herbarium screen</Text>
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
