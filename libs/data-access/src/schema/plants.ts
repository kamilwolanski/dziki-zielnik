import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  AnyPgColumn,
  pgEnum,
  integer,
} from 'drizzle-orm/pg-core';
import { families } from './families';
import { plantPhotos } from './plantPhotos';
import { genera } from './genera';

export const protectionEnum = pgEnum('protection_status', [
  'none',
  'partial',
  'strict',
]);

export const plants = pgTable('plants', {
  id: uuid('id').defaultRandom().primaryKey(),
  familyId: uuid('family_id')
    .notNull()
    .references(() => families.id, { onDelete: 'restrict' }),
  genusId: uuid('genus_id')
    .notNull()
    .references(() => genera.id, { onDelete: 'restrict' }),

  latinName: text('latin_name').notNull().unique(),
  commonName: text('common_name').notNull(),
  description: text('description'),
  primaryPhotoId: uuid('primary_photo_id').references(
    (): AnyPgColumn => plantPhotos.id,
    {
      onDelete: 'set null',
    },
  ),

  heightMinCm: integer('height_min_cm'),
  heightMaxCm: integer('height_max_cm'),

  isMedicinal: boolean('is_medicinal').notNull().default(false),
  isEdible: boolean('is_edible').notNull().default(false),
  isPoisonous: boolean('is_poisonous').notNull().default(false),
  protectionStatus: protectionEnum('protection_status')
    .notNull()
    .default('none'),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
