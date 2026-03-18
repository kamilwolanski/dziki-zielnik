import { View, Text, StyleSheet } from 'react-native';
import { usePlants } from '../../src/features/plants/queries/usePlants';

export default function Encyclopedia() {
  const { data: plants, isPending } = usePlants();


  if(isPending) return <Text>Is pending</Text>

  return (
    <View style={styles.container}>
      <Text>Encyclopedia screen</Text>
      {plants?.map((plant) => (
        <Text key={plant.id}>{plant.commonName}</Text>
      ))}
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
