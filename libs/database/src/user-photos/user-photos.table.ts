import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from '../users/users.table';

export const userPhotosTable = pgTable('user_photos', {
  id: uuid('id').defaultRandom().primaryKey(),

  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),

  url: text('url').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
