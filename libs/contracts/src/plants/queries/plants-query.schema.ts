import { z } from 'zod';
import { plantCategoryEnum } from '../enums/plant-category.enum';

export const plantsQuerySchema = z.object({
  search: z.string().optional(),
  category: plantCategoryEnum.optional(),
});

export type PlantsQuery = z.infer<typeof plantsQuerySchema>;
