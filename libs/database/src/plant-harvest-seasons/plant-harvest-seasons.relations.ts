import { relations } from 'drizzle-orm';
import { plantHarvestSeasonsTable } from './plant-harvest-seasons.table';
import { plantsTable } from '../plants/plants.table';

export const plantHarvestSeasonRelations = relations(
  plantHarvestSeasonsTable,
  ({ one }) => ({
    plant: one(plantsTable, {
      fields: [plantHarvestSeasonsTable.plantId],
      references: [plantsTable.id],
    }),
  }),
);
