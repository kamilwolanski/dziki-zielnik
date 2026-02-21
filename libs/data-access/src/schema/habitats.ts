import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';

export const habitats = pgTable('habitats', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull().unique(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
