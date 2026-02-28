import { relations } from 'drizzle-orm';
import { plantsTable } from './plants.table';
import { familiesTable } from '../families/families.table';
import { plantPhotosTable } from '../plant-photos/plant-photos.table';
import { plantHabitatsTable } from '../plant-habitats/plant-habitats.table';
import { plantFloweringSeasonsTable } from '../plant-flowering-seasons/plant-flowering-seasons.table';
import { generaTable } from '../genera/genera.table';
import { plantHarvestSeasonsTable } from '../plant-harvest-seasons/plant-harvest-seasons.table';

export const plantRelations = relations(plantsTable, ({ one, many }) => ({
  family: one(familiesTable, {
    fields: [plantsTable.familyId],
    references: [familiesTable.id],
  }),

  photos: many(plantPhotosTable),

  primaryPhoto: one(plantPhotosTable, {
    fields: [plantsTable.primaryPhotoId],
    references: [plantPhotosTable.id],
  }),

  plantHabitats: many(plantHabitatsTable),
  plantFloweringSeasons: many(plantFloweringSeasonsTable),

  genus: one(generaTable, {
    fields: [plantsTable.genusId],
    references: [generaTable.id],
  }),

  plantHarvestSeasons: many(plantHarvestSeasonsTable),
}));
