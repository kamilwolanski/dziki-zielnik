import { z } from 'zod';
import { plantsTableSchema } from '@dziki-zielnik/database';

export const plantListItemSchema = plantsTableSchema
  .pick({
    id: true,
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

export type PlantListItemDto = z.infer<typeof plantListItemSchema>;
