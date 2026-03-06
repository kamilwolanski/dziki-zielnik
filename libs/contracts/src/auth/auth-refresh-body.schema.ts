import { z } from 'zod';

export const authRefreshBodySchema = z.object({
  refreshToken: z.string().min(1),
});

export type AuthRefreshBody = z.infer<typeof authRefreshBodySchema>;
