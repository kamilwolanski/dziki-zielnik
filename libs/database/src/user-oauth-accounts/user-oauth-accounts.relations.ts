import { relations } from 'drizzle-orm';
import { userOauthAccountsTable } from './user-oauth-accounts.table';
import { usersTable } from '../users/users.table';

export const userOauthAccountsRelations = relations(
  userOauthAccountsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [userOauthAccountsTable.userId],
      references: [usersTable.id],
    }),
  }),
);
