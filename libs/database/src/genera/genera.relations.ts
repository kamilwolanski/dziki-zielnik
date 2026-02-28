import { relations } from 'drizzle-orm';
import { generaTable } from './genera.table';
import { familiesTable } from '../families/families.table';
import { plantsTable } from '../plants/plants.table';

export const generaRelations = relations(generaTable, ({ one, many }) => ({
  family: one(familiesTable, {
    fields: [generaTable.familyId],
    references: [familiesTable.id],
  }),
  plants: many(plantsTable),
}));
