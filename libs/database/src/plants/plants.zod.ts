import { createSelectSchema } from 'drizzle-zod';
import { plantsTable } from './plants.table';

export const plantsTableSchema = createSelectSchema(plantsTable);
export type Plant = typeof plantsTable.$inferSelect;
