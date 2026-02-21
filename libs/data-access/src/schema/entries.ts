import { pgTable, uuid, timestamp, text, decimal } from 'drizzle-orm/pg-core';
import { herbariums } from './herbariums';
import { plants } from './plants';

export const entries = pgTable('entries', {
  id: uuid('id').defaultRandom().primaryKey(),
  herbariumId: uuid('herbarium_id')
    .notNull()
    .references(() => herbariums.id, { onDelete: 'cascade' }),
  plantId: uuid('plant_id')
    .notNull()
    .references(() => plants.id, { onDelete: 'restrict' }),

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
