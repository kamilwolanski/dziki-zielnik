import { z } from 'zod';
import { userPublicSchema } from '../users/user-public.schema';

export const authResponseSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
  user: userPublicSchema,
});

export type AuthResponse = z.infer<typeof authResponseSchema>;
