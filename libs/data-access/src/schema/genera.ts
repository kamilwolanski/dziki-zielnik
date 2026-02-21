import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { families } from './families';

export const genera = pgTable('genera', {
  id: uuid('id').defaultRandom().primaryKey(),

  familyId: uuid('family_id')
    .notNull()
    .references(() => families.id, { onDelete: 'cascade' }),

  latinName: text('latin_name').notNull(),
  description: text('description'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});