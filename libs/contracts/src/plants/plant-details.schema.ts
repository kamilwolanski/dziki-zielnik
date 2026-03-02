import { z } from 'zod';
import { plantsTableSchema, plantPartEnum, harvestQualityEnum } from '@dziki-zielnik/database';

export const plantPartZodEnum = z.enum(plantPartEnum.enumValues);
export const harvestQualityZodEnum = z.enum(harvestQualityEnum.enumValues);

export const plantDetailsSchema = plantsTableSchema
  .pick({
    id: true,
    slug: true,
    description: true,
    latinName: true,
    commonName: true,
    protectionStatus: true,
    isEdible: true,
    isMedicinal: true,
    isPoisonous: true,
  })
  .extend({
    familyCommonName: z.string(),
    genusCommonName: z.string(),
    plantHabitats: z.string().array(),
    photosUrls: z.string().array(),
    primaryPhotoUrl: z.string().nullable(),
    floweringSeasons: z.object({
      startMonth: z.number().min(1).max(12),
      endMonth: z.number().min(1).max(12),
    }).array(),
    harvestSeasons: z.object({
      part: plantPartZodEnum,
      startMonth: z.number().min(1).max(12),
      endMonth: z.number().min(1).max(12),
      quality: harvestQualityZodEnum,
    }).array(),
  });

export type PlantDetailsDto = z.infer<typeof plantDetailsSchema>;
