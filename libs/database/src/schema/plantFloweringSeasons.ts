import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { plantsTable } from './plants.js';

export const plantFloweringSeasonsTable = pgTable('plant_flowering_seasons', {
  id: uuid('id').defaultRandom().primaryKey(),

  plantId: uuid('plant_id')
    .notNull()
    .references(() => plantsTable.id, { onDelete: 'cascade' }),

  startMonth: integer('start_month').notNull(),
  endMonth: integer('end_month').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});
