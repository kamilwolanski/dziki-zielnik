import { relations } from 'drizzle-orm';
import { habitatsTable } from './habitats.table.js';
import { plantHabitatsTable } from '../plant-habitats/plant-habitats.table';

export const habitatRelations = relations(habitatsTable, ({ many }) => ({
  plantHabitats: many(plantHabitatsTable),
}));
