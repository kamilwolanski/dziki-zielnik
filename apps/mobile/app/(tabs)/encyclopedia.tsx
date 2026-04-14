import { Text } from 'react-native';
import { usePlants } from '../../src/features/plants/queries/usePlants';
import { StyledSafeAreaView } from '../../src/components/ui/StyledSafeAreaView';
import SearchInput from '../../src/components/ui/SearchInput';
import { useState } from 'react';
import useDebounce from '../../src/utils/useDebounce';



export default function Encyclopedia() {
  const [searchValue, setSearchValue] = useState('');
  const debouncedSearch = useDebounce(searchValue, 500);
  const { data: plants, isPending } = usePlants(debouncedSearch);

  if (isPending || !plants) return <Text>Is pending</Text>;

  return (
    <StyledSafeAreaView
      edges={['bottom', 'top']}
      className="flex-1 bg-background-main px-4"
    >
      <Text className="text-2xl font-serif-md">Encyklopedia</Text>
      <Text className="text-sm text-text-muted mb-4 font-serif">
        {plants.meta.totalItems} roślin w bazie
      </Text>
      <SearchInput value={searchValue} onChange={setSearchValue} />
      {plants.data.map((plant) => (
        <Text key={plant.id}>{plant.commonName} ({plant.latinName})</Text>
      ))}
    </StyledSafeAreaView>
  );
}
