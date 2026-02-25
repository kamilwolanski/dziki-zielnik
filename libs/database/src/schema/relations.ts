import { relations } from 'drizzle-orm';
import { plantsTable } from './plants.js';
import { plantPhotosTable } from './plantPhotos.js';
import { familiesTable } from './families.js';
import { plantHabitatsTable } from './plantHabitats.js';
import { habitatsTable } from './habitats.js';
import { usersTable } from './users.js';
import { herbariumsTable } from './herbariums.js';
import { entriesTable } from './entries.js';
import { entryPhotosTable } from './entryPhotos.js';
import { userPhotosTable } from './userPhotos.js';
import { generaTable } from './genera.js';
import { plantFloweringSeasonsTable } from './plantFloweringSeasons.js';

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
  genera: many(generaTable),
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
