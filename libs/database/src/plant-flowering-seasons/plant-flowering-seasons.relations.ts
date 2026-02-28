import { relations } from 'drizzle-orm';
import { plantFloweringSeasonsTable } from './plant-flowering-seasons.table';
import { plantsTable } from '../plants/plants.table';

export const plantFloweringSeasonsRelations = relations(
  plantFloweringSeasonsTable,
  ({ one }) => ({
    plant: one(plantsTable, {
      fields: [plantFloweringSeasonsTable.plantId],
      references: [plantsTable.id],
    }),
  }),
);
