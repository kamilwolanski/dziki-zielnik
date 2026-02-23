import { pgTable, uuid, pgEnum, integer, timestamp } from 'drizzle-orm/pg-core';
import { plantsTable } from './plants';

export const plantPartEnum = pgEnum('plant_part', [
  'leaf', // liść
  'flower', // kwiat
  'herb', // ziele (część nadziemna)
  'root', // korzeń
  'rhizome', // kłącze
  'bulb', // cebula
  'tuber', // bulwa
  'fruit', // owoc
  'seed', // nasiona
  'sap', // sok
  'bark', // kora
]);

export const harvestQualityEnum = pgEnum('harvest_quality', [
  'optimal',
  'secondary',
  'marginal',
]);

export const plantHarvestSeasonsTable = pgTable('plant_harvest_seasons', {
  id: uuid('id').defaultRandom().primaryKey(),

  plantId: uuid('plant_id')
    .notNull()
    .references(() => plantsTable.id, { onDelete: 'cascade' }),

  part: plantPartEnum('part').notNull(),

  startMonth: integer('start_month').notNull(), // 1–12
  endMonth: integer('end_month').notNull(), // 1–12

  quality: harvestQualityEnum('quality').notNull(),

  createdAt: timestamp('created_at').notNull().defaultNow(),
});
