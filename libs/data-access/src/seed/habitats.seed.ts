import { habitatsTable } from '../schema';
import { DB } from '../db';

export const habitatsSeed = [
  { name: 'Las liściasty' },
  { name: 'Las iglasty' },
  { name: 'Las mieszany' },
  { name: 'Skraj lasu' },
  { name: 'Zarośla / zakrzewienia' },

  { name: 'Łąka' },
  { name: 'Pastwisko' },
  { name: 'Polana' },
  { name: 'Murawa' },
  { name: 'Sucha murawa / step' },
  { name: 'Nieurożytki' },

  { name: 'Brzeg rzeki' },
  { name: 'Brzeg jeziora' },
  { name: 'Staw' },
  { name: 'Teren podmokły' },
  { name: 'Bagno' },

  { name: 'Teren górski' },
  { name: 'Wydmy / piaski' },
  { name: 'Skały' },
  { name: 'Żwirowiska' },

  { name: 'Ogród' },
  { name: 'Park' },
  { name: 'Przydroże' },
] as const satisfies (typeof habitatsTable.$inferInsert)[];
export type HabitatName = (typeof habitatsSeed)[number]['name'];

export async function seedHabitats(db: DB) {
  await db.insert(habitatsTable).values(habitatsSeed).onConflictDoNothing();

  const habitats = await db
    .select({
      id: habitatsTable.id,
      name: habitatsTable.name,
    })
    .from(habitatsTable);

  return new Map(habitats.map((h) => [h.name, h.id]));
}
