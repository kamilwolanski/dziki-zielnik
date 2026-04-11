import { AxiosInstance } from 'axios';
import { type PaginatedPlantsResponse, PlantDetailsDto, PlantSlugParam } from '@dziki-zielnik/contracts';

export const createPlantsApi = (api: AxiosInstance) => ({
  getAllPlants: async () => {
    const { data } = await api.get<PaginatedPlantsResponse>('/plants');

    return data;
  },
  getPlantDetails: async (params: PlantSlugParam) => {
    const { data } = await api.get<PlantDetailsDto>(`/plants/${params.slug}`);

    return data;
  },
});
