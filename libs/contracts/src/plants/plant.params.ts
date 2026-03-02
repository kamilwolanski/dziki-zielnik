import { z } from 'zod';

export const plantSlugParamSchema = z.object({
  slug: z
    .string()
    .min(1, { message: 'Slug jest wymagany' })
    .max(120, { message: 'Slug jest za długi (max 120 znaków)' })
    .regex(/^[a-z0-9-]+$/, {
      message: 'Slug może zawierać tylko małe litery, cyfry i myślniki',
    }),
});

export type PlantSlugParam = z.infer<typeof plantSlugParamSchema>;
