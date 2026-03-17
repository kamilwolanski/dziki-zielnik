import { View, Text, StyleSheet } from 'react-native';
import { plantsApi } from '../../src/api/plants.api';
import { useEffect, useState } from 'react';
import { PlantListItemDto } from '@dziki-zielnik/contracts';

export default function Encyclopedia() {
  const [plants, setPlants] = useState<PlantListItemDto[]>([]);

  const getPlants = async () => {
    try {
      const res = await plantsApi.getAllPlants();

      setPlants(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPlants()
  }, [])

  return (
    <View style={styles.container}>
      <Text>Encyclopedia screen</Text>
      {plants.map(plant => <Text key={plant.id}>{plant.commonName}</Text>)}
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
