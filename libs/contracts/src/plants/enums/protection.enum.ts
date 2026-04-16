import { z } from 'zod';

export const protectionStatusEnum = z.enum(['none', 'partial', 'strict']);

export type ProtectionStatus = z.infer<typeof protectionStatusEnum>;
