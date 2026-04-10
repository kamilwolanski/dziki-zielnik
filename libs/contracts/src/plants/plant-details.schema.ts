import { z } from 'zod';
import { plantBaseSchema } from './plant-base.schema';
import { plantPartEnum, harvestQualityEnum } from './plant-enums';

export const floweringSeasonSchema = z.object({
  startMonth: z.number().min(1).max(12),
  endMonth: z.number().min(1).max(12),
});

export const harvestSeasonSchema = z.object({
  part: plantPartEnum,
  startMonth: z.number().min(1).max(12),
  endMonth: z.number().min(1).max(12),
  quality: harvestQualityEnum,
});

export const plantDetailsSchema = plantBaseSchema
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
    floweringSeasons: floweringSeasonSchema.array(),
    harvestSeasons: harvestSeasonSchema.array(),
  });

export type PlantDetailsDto = z.infer<typeof plantDetailsSchema>;
