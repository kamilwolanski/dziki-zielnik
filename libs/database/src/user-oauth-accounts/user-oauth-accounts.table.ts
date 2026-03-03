import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { usersTable } from '../users/users.table';

export const oauthProviderEnum = pgEnum('oauth_provider', ['google', 'apple']);

export const userOauthAccountsTable = pgTable(
  'user_oauth_accounts',
  {
    id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('user_id')
      .notNull()
      .references(() => usersTable.id, { onDelete: 'cascade' }),
    provider: oauthProviderEnum('provider').notNull(),
    providerUserId: text('provider_user_id').notNull(),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    uniqueIndex('provider_user_unique').on(
      table.provider,
      table.providerUserId,
    ),
  ],
);
