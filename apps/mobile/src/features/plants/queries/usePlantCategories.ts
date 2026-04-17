import { useQuery } from "@tanstack/react-query"
import { plantsApi } from '../../../api/plants.api';

export const usePlantCategories = () => {
    return useQuery({
        queryKey: ['plantCategories'],
        queryFn: () => plantsApi.getPlantCategories(),
    });
};
