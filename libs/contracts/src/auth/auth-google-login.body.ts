import { z } from 'zod';

export const authGoogleLoginBodySchema = z.object({
  idToken: z.string().min(1),
});

export type AuthGoogleLoginBody = z.infer<typeof authGoogleLoginBodySchema>;
