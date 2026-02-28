import { relations } from 'drizzle-orm';
import { plantPhotosTable } from './plant-photos.table';
import { plantsTable } from '../plants/plants.table';

export const plantPhotosRelations = relations(plantPhotosTable, ({ one }) => ({
  plant: one(plantsTable, {
    fields: [plantPhotosTable.plantId],
    references: [plantsTable.id],
  }),
}));
