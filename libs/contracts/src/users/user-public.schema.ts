import { z } from 'zod';
import { roleEnum } from '../auth/user-role.enum'; 

export const userPublicSchema = z.object({
  id: z.uuid(),
  email: z.email(),
  displayName: z.string().nullable(),
  avatarUrl: z.string().nullable(),
  role: roleEnum,
});

export type UserDto = z.infer<typeof userPublicSchema>;
