import { relations } from 'drizzle-orm';
import { familiesTable } from './families.table';
import { plantsTable } from '../plants/plants.table';
import { generaTable } from '../genera/genera.table';

export const familyRelations = relations(familiesTable, ({ many }) => ({
  plants: many(plantsTable),
  genera: many(generaTable),
}));