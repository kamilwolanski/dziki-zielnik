import { relations } from 'drizzle-orm';
import { usersTable } from './users.table';
import { herbariumsTable } from '../herbariums/herbariums.table';
import { userPhotosTable } from '../user-photos/user-photos.table';
import { userOauthAccountsTable } from '../user-oauth-accounts/user-oauth-accounts.table';
import { refreshTokensTable } from '../refresh-tokens/refresh-tokens.table';

export const userRelations = relations(usersTable, ({ many }) => ({
  herbariums: many(herbariumsTable),
  photos: many(userPhotosTable),
  oauthAccounts: many(userOauthAccountsTable),
  refreshTokens: many(refreshTokensTable),
}));
