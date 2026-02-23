import {
  pgTable,
  uuid,
  timestamp,
  text,
  decimal,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { herbariumsTable } from './herbariums';
import { plantsTable } from './plants';

export const quantityUnitEnum = pgEnum('quantity_unit', [
  'g',
  'kg',
  'pcs',
  'handful',
  'bundle',
]);

export const entriesTable = pgTable('entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  herbariumId: uuid('herbarium_id')
    .notNull()
    .references(() => herbariumsTable.id, { onDelete: 'cascade' }),
  plantId: uuid('plant_id')
    .notNull()
    .references(() => plantsTable.id, { onDelete: 'restrict' }),

  quantity: decimal('quantity', { precision: 10, scale: 2 }),
  quantityUnit: quantityUnitEnum('quantity_unit'),

  collectedAt: timestamp('collected_at'),
  notes: text('notes'),

  latitude: decimal('latitude', { precision: 9, scale: 6 }),
  longitude: decimal('longitude', { precision: 9, scale: 6 }),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
