import { relations } from 'drizzle-orm';
import { usersTable } from './users.table';
import { herbariumsTable } from '../herbariums/herbariums.table';
import { userPhotosTable } from '../user-photos/user-photos.table';

export const userRelations = relations(usersTable, ({ many }) => ({
  herbariums: many(herbariumsTable),
  photos: many(userPhotosTable),
}));
