import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { familiesTable } from './families';

export const generaTable = pgTable('genera', {
  id: uuid('id').defaultRandom().primaryKey(),

  familyId: uuid('family_id')
    .notNull()
    .references(() => familiesTable.id, { onDelete: 'cascade' }),

  latinName: text('latin_name').notNull().unique(),
  commonName: text('common_name'),
  description: text('description'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});