import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { usersTable } from './users.js';
import { userPhotosTable } from './userPhotos.js';

export const herbariumsTable = pgTable('herbariums', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),

  name: text('name').notNull(),
  description: text('description'),

  coverPhotoId: uuid('cover_photo_id').references(() => userPhotosTable.id, {
    onDelete: 'set null',
  }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
