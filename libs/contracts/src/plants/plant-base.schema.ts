import { z } from 'zod';
import { protectionStatusEnum } from './plant-enums';

export const plantBaseSchema = z.object({
  id: z.uuid(),
  slug: z.string(),
  latinName: z.string(),
  commonName: z.string(),
  description: z.string().nullable(),
  heightMinCm: z.number().nullable(),
  heightMaxCm: z.number().nullable(),
  isMedicinal: z.boolean(),
  isEdible: z.boolean(),
  isPoisonous: z.boolean(),
  protectionStatus: protectionStatusEnum,
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});
