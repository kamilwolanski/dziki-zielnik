import { z } from 'zod';

export const plantPartEnum = z.enum([
  'leaf',
  'flower',
  'herb',
  'root',
  'rhizome',
  'bulb',
  'tuber',
  'fruit',
  'seed',
  'sap',
  'bark',
]);

export const harvestQualityEnum = z.enum(['optimal', 'secondary', 'marginal']);

export type PlantPart = z.infer<typeof plantPartEnum>;
export type HarvestQuality = z.infer<typeof harvestQualityEnum>;
