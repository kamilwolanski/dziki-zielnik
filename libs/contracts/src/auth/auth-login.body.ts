import { z } from 'zod';

export const authLoginBodySchema = z.object({
  email: z.email(),
});

export type AuthLoginBody = z.infer<typeof authLoginBodySchema>;
