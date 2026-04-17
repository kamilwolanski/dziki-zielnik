import { Pressable, Text, View } from 'react-native';

const EMPTY_TITLE = 'Nic nie znaleziono';
const EMPTY_DESCRIPTION = 'Spróbuj zmienić frazę albo wybrać inną kategorię.';
const CLEAR_FILTERS_LABEL = 'Wyczyść filtry';

type EmptyPlantsStateProps = {
  canClearFilters: boolean;
  onClearFilters: () => void;
};

const EmptyPlantsState = ({
  canClearFilters,
  onClearFilters,
}: EmptyPlantsStateProps) => (
  <View className="mt-12 items-center px-6">
    <Text className="text-xl font-serif-md text-text-primary text-center">
      {EMPTY_TITLE}
    </Text>
    <Text className="mt-2 text-sm text-text-muted text-center font-serif">
      {EMPTY_DESCRIPTION}
    </Text>
    {canClearFilters && (
      <Pressable
        className="mt-5 rounded-full bg-primary px-5 py-2"
        onPress={onClearFilters}
      >
        <Text className="text-sm font-sans-bold text-white">
          {CLEAR_FILTERS_LABEL}
        </Text>
      </Pressable>
    )}
  </View>
);

export default EmptyPlantsState;
