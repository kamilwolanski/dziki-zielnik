import { Text } from 'react-native';
import { usePlants } from '../../src/features/plants/queries/usePlants';
import { StyledSafeAreaView } from '../components/ui/StyledSafeAreaView';


export default function Encyclopedia() {
  const { data: plants, isPending } = usePlants();

  if (isPending) return <Text>Is pending</Text>;
  console.log(plants);
  return (
    <StyledSafeAreaView
      edges={['bottom', 'top']}
      className="flex-1 bg-background-main px-4"
    >
      <Text className='text-2xl font-serif-md'>Encyklopedia</Text>
    </StyledSafeAreaView>
  );
}
