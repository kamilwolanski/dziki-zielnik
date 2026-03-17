import { AxiosInstance } from 'axios';
import { PlantListItemDto } from '@dziki-zielnik/contracts';

export const createPlantsApi = (api: AxiosInstance) => ({
  getAllPlants: async () => {
    const { data } = await api.get<PlantListItemDto[]>('/plants');

    return data;
  },
});
