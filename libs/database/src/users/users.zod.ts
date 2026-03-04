import { createSelectSchema } from 'drizzle-zod';
import { usersTable } from './users.table';

export const usersTableSchema = createSelectSchema(usersTable);
export type User = typeof usersTable.$inferSelect;
