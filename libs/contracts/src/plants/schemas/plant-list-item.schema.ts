import { z } from 'zod';
import { plantBaseSchema } from './plant-base.schema';
import { createPaginationResponseSchema } from '../../common/pagination.schema';

export const plantListItemSchema = plantBaseSchema
  .pick({
    id: true,
    slug: true,
    latinName: true,
    commonName: true,
    protectionStatus: true,
    isEdible: true,
    isMedicinal: true,
    isPoisonous: true,
  })
  .extend({
    familyCommonName: z.string(),
    primaryPhotoUrl: z.string().nullable(),
  });

export const paginatedPlantListItemSchema = createPaginationResponseSchema(plantListItemSchema);

export type PlantListItemDto = z.infer<typeof plantListItemSchema>;
export type PaginatedPlantsResponse = z.infer<typeof paginatedPlantListItemSchema>;
