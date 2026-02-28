import { relations } from 'drizzle-orm';
import { entryPhotosTable } from './entry-photos.table';
import { entriesTable } from '../entries/entries.table';
import { userPhotosTable } from '../user-photos/user-photos.table';

export const entryPhotosRelations = relations(entryPhotosTable, ({ one }) => ({
  entry: one(entriesTable, {
    fields: [entryPhotosTable.entryId],
    references: [entriesTable.id],
  }),
  photo: one(userPhotosTable, {
    fields: [entryPhotosTable.photoId],
    references: [userPhotosTable.id],
  }),
}));
