import { Text } from 'react-native';
import { usePlants } from '../../src/features/plants/queries/usePlants';
import { StyledSafeAreaView } from '../../src/components/ui/StyledSafeAreaView';
import SearchInput from '../../src/components/ui/SearchInput';
import { useEffect, useRef, useState } from 'react';


export default function Encyclopedia() {
  const { data: plants, isPending } = usePlants();
  const [searchValue, setSearchValue] = useState('');

  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);

    timerRef.current = setTimeout(() => {
      console.log('fetch', searchValue);
    }, 500);
    
    return () =>  clearTimeout(timerRef.current);
  }, [searchValue]);

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
    </StyledSafeAreaView>
  );
}
