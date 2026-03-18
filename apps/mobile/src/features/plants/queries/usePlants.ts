import { useQuery } from '@tanstack/react-query';
import { plantsApi } from '../../../api/plants.api';
import { plantsQueryKeys } from './queryKeys';

export const usePlants = () => {
  return useQuery({
    queryKey: plantsQueryKeys.lists(),
    queryFn: plantsApi.getAllPlants,
  });
};
