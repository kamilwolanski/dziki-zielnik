import { useQuery } from '@tanstack/react-query';
import { plantsApi } from '../../../api/plants.api';
import { plantsQueryKeys } from './queryKeys';

export const usePlants = (search: string) => {
  const normalizedSearch = search.trim();
  return useQuery({
    queryKey: plantsQueryKeys.list({ search: normalizedSearch }),
    queryFn: () => plantsApi.getAllPlants(normalizedSearch),
    placeholderData: (prev) => prev,
  });
};
