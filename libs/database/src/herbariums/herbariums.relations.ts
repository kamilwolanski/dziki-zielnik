import { relations } from 'drizzle-orm';
import { herbariumsTable } from './herbariums.table';
import { usersTable } from '../users/users.table';
import { entriesTable } from '../entries/entries.table';
import { userPhotosTable } from '../user-photos/user-photos.table';

export const herbariumRelations = relations(
  herbariumsTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [herbariumsTable.userId],
      references: [usersTable.id],
    }),
    entries: many(entriesTable),
    coverPhoto: one(userPhotosTable, {
      fields: [herbariumsTable.coverPhotoId],
      references: [userPhotosTable.id],
    }),
  }),
);