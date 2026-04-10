import { z } from 'zod';

export const ROLE_VALUES = ['user', 'admin'] as const;
export const roleEnum = z.enum(ROLE_VALUES);

export type Role = z.infer<typeof roleEnum>;
