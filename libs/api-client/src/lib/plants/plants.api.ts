import { AxiosInstance } from 'axios';
import { PlantDetailsDto, PlantListItemDto, PlantSlugParam } from '@dziki-zielnik/contracts';

export const createPlantsApi = (api: AxiosInstance) => ({
  getAllPlants: async () => {
    const { data } = await api.get<PlantListItemDto[]>('/plants');

    return data;
  },
  getPlantDetails: async (params: PlantSlugParam) => {
    const { data } = await api.get<PlantDetailsDto>(`/plants/${params.slug}`);

    return data;
  },
});
