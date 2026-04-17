import type { PlantCategorySlug } from '@dziki-zielnik/contracts';
import { useState } from 'react';
import { Text, View } from 'react-native';
import EmptyPlantsState from '../../src/components/ui/EmptyPlantsState';
import PlantCategories from '../../src/components/ui/PlantCategories';
import SearchInput from '../../src/components/ui/SearchInput';
import { StyledSafeAreaView } from '../../src/components/ui/StyledSafeAreaView';
import PlantCard from '../../src/components/ui/plantCard/PlantCard';
import { usePlantCategories } from '../../src/features/plants/queries/usePlantCategories';
import { usePlants } from '../../src/features/plants/queries/usePlants';
import useDebounce from '../../src/utils/useDebounce';

export default function Encyclopedia() {
  const [searchValue, setSearchValue] = useState('');
  const [selectedCategory, setSelectedCategory] =
    useState<PlantCategorySlug | null>(null);
  const debouncedSearch = useDebounce(searchValue, 500);

  const { data: plants, isPending } = usePlants(debouncedSearch, selectedCategory);
  const { data: plantCategories, isPending: isPlantCategoriesPending } =
    usePlantCategories();

  if (isPending || isPlantCategoriesPending || !plants) {
    return <Text>Is pending</Text>;
  }

  const hasNoPlants = plants.data.length === 0;
  const canClearFilters = searchValue.length > 0 || selectedCategory !== null;
  const clearFilters = () => {
    setSearchValue('');
    setSelectedCategory(null);
  };

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
      <PlantCategories
        categories={plantCategories || []}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />
      {hasNoPlants ? (
        <EmptyPlantsState
          canClearFilters={canClearFilters}
          onClearFilters={clearFilters}
        />
      ) : (
        <View className="mt-5">
          {plants.data.map((plant) => (
            <PlantCard key={plant.id} {...plant} />
          ))}
        </View>
      )}
    </StyledSafeAreaView>
  );
}
