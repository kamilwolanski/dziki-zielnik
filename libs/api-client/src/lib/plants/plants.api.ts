import { AxiosInstance } from 'axios';
import {
  type PaginatedPlantsResponse,
  type PlantCategory,
  type PlantCategorySlug,
  type PlantDetailsDto,
  type PlantSlugParam,
} from '@dziki-zielnik/contracts';

export const createPlantsApi = (api: AxiosInstance) => ({
  getAllPlants: async (search: string, category?: PlantCategorySlug | null) => {
    const { data } = await api.get<PaginatedPlantsResponse>('/plants', {
      params: {
        search: search || undefined,
        category: category || undefined,
      },
    });

    return data;
  },
  getPlantDetails: async (params: PlantSlugParam) => {
    const { data } = await api.get<PlantDetailsDto>(`/plants/${params.slug}`);

    return data;
  },
  getPlantCategories: async () => {
    const { data } = await api.get<PlantCategory[]>('/plants/categories');

    return data;
  },
});
