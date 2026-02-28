import { relations } from 'drizzle-orm';
import { plantHabitatsTable } from './plant-habitats.table';
import { plantsTable } from '../plants/plants.table';
import { habitatsTable } from '../habitats/habitats.table';

export const plantHabitatRelations = relations(
  plantHabitatsTable,
  ({ one }) => ({
    plant: one(plantsTable, {
      fields: [plantHabitatsTable.plantId],
      references: [plantsTable.id],
    }),
    habitat: one(habitatsTable, {
      fields: [plantHabitatsTable.habitatId],
      references: [habitatsTable.id],
    }),
  }),
);
