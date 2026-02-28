import { pgTable, uuid, timestamp } from 'drizzle-orm/pg-core';
import { entriesTable } from '../entries/entries.table';
import { userPhotosTable } from '../user-photos/user-photos.table';

export const entryPhotosTable = pgTable('entry_photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  entryId: uuid('entry_id')
    .notNull()
    .references(() => entriesTable.id, { onDelete: 'cascade' }),
  photoId: uuid('photo_id')
    .notNull()
    .references(() => userPhotosTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
