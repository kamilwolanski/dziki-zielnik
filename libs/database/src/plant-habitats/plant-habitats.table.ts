import { pgTable, uuid, primaryKey } from 'drizzle-orm/pg-core';
import { habitatsTable } from '../habitats/habitats.table';
import { plantsTable } from '../plants/plants.table';

export const plantHabitatsTable = pgTable(
  'plant_habitats',
  {
    plantId: uuid('plant_id')
      .notNull()
      .references(() => plantsTable.id, { onDelete: 'cascade' }),

    habitatId: uuid('habitat_id')
      .notNull()
      .references(() => habitatsTable.id, { onDelete: 'cascade' }),
  },
  (table) => [primaryKey({ columns: [table.plantId, table.habitatId] })],
);
