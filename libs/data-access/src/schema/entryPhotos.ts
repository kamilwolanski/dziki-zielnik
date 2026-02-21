import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { entries } from './entries';
import { userPhotos } from './userPhotos';

export const entryPhotos = pgTable('entry_photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  entryId: uuid('entry_id')
    .notNull()
    .references(() => entries.id, { onDelete: 'cascade' }),
  photoId: uuid('photo_id')
    .notNull()
    .references(() => userPhotos.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
