import type { PlantCategorySlug } from '@dziki-zielnik/contracts';
import { useQuery } from '@tanstack/react-query';
import { plantsApi } from '../../../api/plants.api';
import { plantsQueryKeys } from './queryKeys';

export const usePlants = (search: string, category: PlantCategorySlug | null) => {
  const normalizedSearch = search.trim();

  return useQuery({
    queryKey: plantsQueryKeys.list({ search: normalizedSearch, category }),
    queryFn: () => plantsApi.getAllPlants(normalizedSearch, category),
    placeholderData: (prev) => prev,
  });
};
