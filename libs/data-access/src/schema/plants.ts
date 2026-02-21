import {
  pgTable,
  uuid,
  text,
  timestamp,
  boolean,
  AnyPgColumn,
} from 'drizzle-orm/pg-core';
import { families } from './families';
import { plantPhotos } from './plantPhotos';

export const plants = pgTable('plants', {
  id: uuid('id').defaultRandom().primaryKey(),
  familyId: uuid('family_id')
    .notNull()
    .references(() => families.id, { onDelete: 'restrict' }),
  latinName: text('latin_name').notNull().unique(),
  commonName: text('common_name').notNull(),
  description: text('description'),
  primaryPhotoId: uuid('primary_photo_id').references(
    (): AnyPgColumn => plantPhotos.id,
    {
      onDelete: 'set null',
    },
  ),
  isMedicinal: boolean('is_medicinal').notNull().default(false),
  isEdible: boolean('is_edible').notNull().default(false),
  isPoisonous: boolean('is_poisonous').notNull().default(false),
  isProtected: boolean('is_protected').notNull().default(false),

  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .defaultNow()
    .$onUpdateFn(() => new Date()),
});
