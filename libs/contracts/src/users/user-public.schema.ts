import { z } from 'zod';
import { usersTableSchema } from '@dziki-zielnik/database';

export const userPublicSchema = usersTableSchema.pick({
    id: true,
    email: true,
    displayName: true,
    avatarUrl: true,
    role: true
})

export type UserDto = z.infer<typeof userPublicSchema>;
