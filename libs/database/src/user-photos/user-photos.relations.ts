import { relations } from 'drizzle-orm';
import { userPhotosTable } from './user-photos.table';
import { usersTable } from '../users/users.table';
import { entryPhotosTable } from '../entry-photos/entry-photos.table';

export const userPhotosRelations = relations(
  userPhotosTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [userPhotosTable.userId],
      references: [usersTable.id],
    }),
    entryPhotos: many(entryPhotosTable),
  }),
);
