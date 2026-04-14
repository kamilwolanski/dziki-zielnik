import { AxiosInstance } from 'axios';
import {
  type PaginatedPlantsResponse,
  PlantDetailsDto,
  PlantSlugParam,
} from '@dziki-zielnik/contracts';

export const createPlantsApi = (api: AxiosInstance) => ({
  getAllPlants: async (search: string) => {
    const { data } = await api.get<PaginatedPlantsResponse>('/plants', {
      params: search ? { search } : {},
    });

    return data;
  },
  getPlantDetails: async (params: PlantSlugParam) => {
    const { data } = await api.get<PlantDetailsDto>(`/plants/${params.slug}`);

    return data;
  },
});
