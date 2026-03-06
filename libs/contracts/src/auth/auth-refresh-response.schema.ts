import { z } from 'zod';

export const authRefreshResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthRefreshResponse = z.infer<typeof authRefreshResponseSchema>;
