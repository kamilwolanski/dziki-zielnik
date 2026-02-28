import { relations } from 'drizzle-orm';
import { entriesTable } from './entries.table';
import { herbariumsTable } from '../herbariums/herbariums.table';
import { plantsTable } from '../plants/plants.table';
import { entryPhotosTable } from '../entry-photos/entry-photos.table';

export const entryRelations = relations(entriesTable, ({ one, many }) => ({
  herbarium: one(herbariumsTable, {
    fields: [entriesTable.herbariumId],
    references: [herbariumsTable.id],
  }),
  plant: one(plantsTable, {
    fields: [entriesTable.plantId],
    references: [plantsTable.id],
  }),
  photos: many(entryPhotosTable),
}));
