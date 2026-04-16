import { z } from 'zod';
import { plantCategoryEnum } from '../enums/plant-category.enum';

export const plantCategorySchema = z.object({
  slug: plantCategoryEnum,
  label: z.string(),
});

export type PlantCategory = z.infer<typeof plantCategorySchema>;
