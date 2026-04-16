import { z } from 'zod';

export const plantCategoryEnum = z.enum(['medicinal', 'edible', 'poisonous']);

export type PlantCategorySlug = z.infer<typeof plantCategoryEnum>;
