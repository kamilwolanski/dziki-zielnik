import { relations } from 'drizzle-orm';
import { usersTable } from '../users/users.table';
import { refreshTokensTable } from '../refresh-tokens/refresh-tokens.table'
 
export const refreshTokensRelations = relations(refreshTokensTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [refreshTokensTable.userId],
    references: [usersTable.id],
  }),
}));
