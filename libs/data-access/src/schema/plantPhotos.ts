import { pgTable, uuid, text, timestamp } from 'drizzle-orm/pg-core';
import { plants } from './plants';

export const plantPhotos = pgTable('plant_photos', {
  id: uuid('id').defaultRandom().primaryKey(),
  url: text('url').notNull(),
  plantId: uuid('plant_id')
    .notNull()
    .references(() => plants.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
