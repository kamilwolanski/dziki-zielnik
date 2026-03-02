import { z } from 'zod';

export const plantSlugParamSchema = z.object({
  slug: z
    .string()
    .min(1)
    .max(120)
    .regex(/^[a-z0-9-]+$/),
});

export type PlantSlugParam = z.infer<typeof plantSlugParamSchema>;
