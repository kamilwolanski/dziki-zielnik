import { Text } from 'react-native';
import { StyledSafeAreaView } from '../../src/components/ui/StyledSafeAreaView';



export default function Herbarium() {
  return (
    <StyledSafeAreaView
      edges={['bottom', 'top']}
      className="flex-1 bg-background-main"
    >
      <Text>Herbarium screen</Text>
    </StyledSafeAreaView>
  );
}
