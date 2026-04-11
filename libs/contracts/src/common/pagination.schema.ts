import { z } from 'zod';

export const createPaginationResponseSchema = <T extends z.ZodTypeAny>(
  itemSchema: T,
) =>
  z.object({
    data: z.array(itemSchema),
    meta: z.object({
      totalItems: z.number(),
    }),
  });
