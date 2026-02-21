import { pgTable, uuid, integer, timestamp } from 'drizzle-orm/pg-core';
import { plants } from './plants';

export const plantFloweringSeasons = pgTable('plant_flowering_seasons', {
  id: uuid('id').defaultRandom().primaryKey(),

  plantId: uuid('plant_id')
    .notNull()
    .references(() => plants.id, { onDelete: 'cascade' }),

  startMonth: integer('start_month').notNull(),
  endMonth: integer('end_month').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});
