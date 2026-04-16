import { z } from 'zod';

export const plantPartEnum = z.enum(['ROOT', 'LEAF', 'FLOWER', 'FRUIT', 'SEED', 'BARK', 'STEM']);
export const harvestQualityEnum = z.enum(['POOR', 'AVERAGE', 'GOOD', 'EXCELLENT']);

export type PlantPart = z.infer<typeof plantPartEnum>;
export type HarvestQuality = z.infer<typeof harvestQualityEnum>;
