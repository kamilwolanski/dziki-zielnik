import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { habitats } from './habitats';
import { plants } from './plants';

export const plantHabitats = pgTable(
  'plant_habitats',
  {
    plantId: uuid('plant_id')
      .notNull()
      .references(() => plants.id, { onDelete: 'cascade' }),

    habitatId: uuid('habitat_id')
      .notNull()
      .references(() => habitats.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.plantId, table.habitatId] })],
);
