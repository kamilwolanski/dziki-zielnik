import { relations } from 'drizzle-orm';
import { plantsTable } from './plants';
import { plantPhotosTable } from './plantPhotos';
import { familiesTable } from './families';
import { plantHabitatsTable } from './plantHabitats';
import { habitatsTable } from './habitats';
import { usersTable } from './users';
import { herbariumsTable } from './herbariums';
import { entriesTable } from './entries';
import { entryPhotosTable } from './entryPhotos';
import { userPhotosTable } from './userPhotos';
import { generaTable } from './genera';
import { plantFloweringSeasonsTable } from './plantFloweringSeasons';

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
}));

export const plantPhotosRelations = relations(plantPhotosTable, ({ one }) => ({
  plant: one(plantsTable, {
    fields: [plantPhotosTable.plantId],
    references: [plantsTable.id],
  }),
}));

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

export const habitatRelations = relations(habitatsTable, ({ many }) => ({
  plantHabitats: many(plantHabitatsTable),
}));

export const familyRelations = relations(familiesTable, ({ many }) => ({
  plants: many(plantsTable),
}));

export const userRelations = relations(usersTable, ({ many }) => ({
  herbariums: many(herbariumsTable),
  photos: many(userPhotosTable),
}));

export const herbariumRelations = relations(
  herbariumsTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [herbariumsTable.userId],
      references: [usersTable.id],
    }),
    entries: many(entriesTable),
    coverPhoto: one(userPhotosTable, {
      fields: [herbariumsTable.coverPhotoId],
      references: [userPhotosTable.id],
    }),
  }),
);

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

export const entryPhotosRelations = relations(entryPhotosTable, ({ one }) => ({
  entry: one(entriesTable, {
    fields: [entryPhotosTable.entryId],
    references: [entriesTable.id],
  }),
  photo: one(userPhotosTable, {
    fields: [entryPhotosTable.photoId],
    references: [userPhotosTable.id],
  }),
}));

export const userPhotosRelations = relations(
  userPhotosTable,
  ({ one, many }) => ({
    user: one(usersTable, {
      fields: [userPhotosTable.userId],
      references: [usersTable.id],
    }),
    entryPhotos: many(entryPhotosTable),
  }),
);

export const generaRelations = relations(generaTable, ({ one, many }) => ({
  family: one(familiesTable, {
    fields: [generaTable.familyId],
    references: [familiesTable.id],
  }),
  plants: many(plantsTable),
}));

export const plantFloweringSeasonsRelations = relations(
  plantFloweringSeasonsTable,
  ({ one }) => ({
    plant: one(plantsTable, {
      fields: [plantFloweringSeasonsTable.plantId],
      references: [plantsTable.id],
    }),
  }),
);
