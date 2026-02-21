import { relations } from 'drizzle-orm';
import { plants } from './plants';
import { plantPhotos } from './plantPhotos';
import { families } from './families';
import { plantHabitats } from './plantHabitats';
import { habitats } from './habitats';
import { users } from './users';
import { herbariums } from './herbariums';
import { entries } from './entries';
import { entryPhotos } from './entryPhotos';
import { userPhotos } from './userPhotos';

export const plantRelations = relations(plants, ({ one, many }) => ({
  family: one(families, {
    fields: [plants.familyId],
    references: [families.id],
  }),

  photos: many(plantPhotos),

  primaryPhoto: one(plantPhotos, {
    fields: [plants.primaryPhotoId],
    references: [plantPhotos.id],
  }),

  plantHabitats: many(plantHabitats),
}));

export const plantPhotosRelations = relations(plantPhotos, ({ one }) => ({
  plant: one(plants, {
    fields: [plantPhotos.plantId],
    references: [plants.id],
  }),
}));

export const plantHabitatRelations = relations(plantHabitats, ({ one }) => ({
  plant: one(plants, {
    fields: [plantHabitats.plantId],
    references: [plants.id],
  }),
  habitat: one(habitats, {
    fields: [plantHabitats.habitatId],
    references: [habitats.id],
  }),
}));

export const habitatRelations = relations(habitats, ({ many }) => ({
  plantHabitats: many(plantHabitats),
}));

export const familyRelations = relations(families, ({ many }) => ({
  plants: many(plants),
}));

export const userRelations = relations(users, ({ many }) => ({
  herbariums: many(herbariums),
  photos: many(userPhotos),
}));

export const herbariumRelations = relations(herbariums, ({ one, many }) => ({
  user: one(users, {
    fields: [herbariums.userId],
    references: [users.id],
  }),
  entries: many(entries),
  coverPhoto: one(userPhotos, {
    fields: [herbariums.coverPhotoId],
    references: [userPhotos.id],
  }),
}));

export const entryRelations = relations(entries, ({ one, many }) => ({
  herbarium: one(herbariums, {
    fields: [entries.herbariumId],
    references: [herbariums.id],
  }),
  plant: one(plants, {
    fields: [entries.plantId],
    references: [plants.id],
  }),
  photos: many(entryPhotos),
}));

export const entryPhotosRelations = relations(entryPhotos, ({ one }) => ({
  entry: one(entries, {
    fields: [entryPhotos.entryId],
    references: [entries.id],
  }),
  photo: one(userPhotos, {
    fields: [entryPhotos.photoId],
    references: [userPhotos.id],
  }),
}));

export const userPhotosRelations = relations(userPhotos, ({ one, many }) => ({
  user: one(users, {
    fields: [userPhotos.userId],
    references: [users.id],
  }),
  entryPhotos: many(entryPhotos),
}));
