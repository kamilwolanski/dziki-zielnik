
import { familiesTable } from '@dziki-zielnik/database';
import type { DB } from '@dziki-zielnik/data-access';

export const familiesSeed = [
  {
    latinName: 'Betulaceae',
    commonName: 'Brzozowate',
  },
  {
    latinName: 'Lamiaceae',
    commonName: 'Jasnotowate',
  },
  {
    latinName: 'Asteraceae',
    commonName: 'Astrowate',
  },
  {
    latinName: 'Apiaceae',
    commonName: 'Selerowate',
  },
  {
    latinName: 'Brassicaceae',
    commonName: 'Kapustowate',
  },
  {
    latinName: 'Rosaceae',
    commonName: 'Różowate',
  },
  {
    latinName: 'Plantaginaceae',
    commonName: 'Babkowate',
  },
  {
    latinName: 'Caprifoliaceae',
    commonName: 'Przewiertniowate',
  },
  {
    latinName: 'Fabaceae',
    commonName: 'Bobowate',
  },
  {
    latinName: 'Equisetaceae',
    commonName: 'Skrzypowate',
  },
  {
    latinName: 'Urticaceae',
    commonName: 'Pokrzywowate',
  },
  {
    latinName: 'Polygonaceae',
    commonName: 'Rdestowate',
  },
  {
    latinName: 'Caryophyllaceae',
    commonName: 'Goździkowate',
  },
  {
    latinName: 'Ranunculaceae',
    commonName: 'Jaskrowate',
  },
  {
    latinName: 'Asparagaceae',
    commonName: 'Szparagowate',
  },
  {
    latinName: 'Liliaceae',
    commonName: 'Liliowate',
  },
  {
    latinName: 'Salicaceae',
    commonName: 'Wierzbowate',
  },
  {
    latinName: 'Berberidaceae',
    commonName: 'Berberysowate',
  },
  {
    latinName: 'Cannabaceae',
    commonName: 'Konopiowate',
  },
  {
    latinName: 'Ericaceae',
    commonName: 'Wrzosowate',
  },
  {
    latinName: 'Fagaceae',
    commonName: 'Bukowate',
  },
  {
    latinName: 'Amaryllidaceae',
    commonName: 'Amarylkowate',
  },
] as const satisfies (typeof familiesTable.$inferInsert)[];

export type FamilyLatinName = (typeof familiesSeed)[number]['latinName'];

export async function seedFamilies(
  db: DB,
) {
  await db.insert(familiesTable).values(familiesSeed).onConflictDoNothing();

  const families = await db
    .select({
      id: familiesTable.id,
      latinName: familiesTable.latinName,
    })
    .from(familiesTable);

  return new Map(families.map((f) => [f.latinName, f.id]));
}
