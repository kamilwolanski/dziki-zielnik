import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const familiesTable = pgTable('families', {
  id: uuid('id').defaultRandom().primaryKey(),
  latinName: text('latin_name').notNull().unique(),
  commonName: text('common_name').notNull(),
  description: text('description'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});

