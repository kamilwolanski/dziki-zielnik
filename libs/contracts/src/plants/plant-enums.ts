import { z } from 'zod';

export const plantPartEnum = z.enum(['ROOT', 'LEAF', 'FLOWER', 'FRUIT', 'SEED', 'BARK', 'STEM']);
export const harvestQualityEnum = z.enum(['POOR', 'AVERAGE', 'GOOD', 'EXCELLENT']);
export const protectionStatusEnum = z.enum(['none', 'partial', 'strict']);