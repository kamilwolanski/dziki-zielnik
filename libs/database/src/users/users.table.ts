import { pgTable, uuid, text, timestamp, pgEnum } from 'drizzle-orm/pg-core';
import { ROLE_VALUES } from '@dziki-zielnik/contracts';

export const roleEnum = pgEnum('user_role', ROLE_VALUES);

export const usersTable = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: text('email').notNull().unique(),
  displayName: text('display_name'),
  avatarUrl: text('avatar_url'),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  deletedAt: timestamp('deleted_at'),
});
