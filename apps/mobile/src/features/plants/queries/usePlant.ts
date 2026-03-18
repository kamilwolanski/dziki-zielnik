import { useQuery } from '@tanstack/react-query';
import { plantsApi } from '../../../api/plants.api';
import { plantsQueryKeys } from './queryKeys';

export const usePlant = (slug: string) => {
  return useQuery({
    queryKey: plantsQueryKeys.detail(slug),
    queryFn: () => plantsApi.getPlantDetails({ slug }),
    enabled: !!slug,
  });
};
