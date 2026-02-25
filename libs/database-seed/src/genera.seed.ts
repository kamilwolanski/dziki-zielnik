import { generaTable } from '@dziki-zielnik/database';
import type { DB } from '@dziki-zielnik/data-access';


export const generaSeed = [
  {
    latinName: 'Betula',
    commonName: 'Brzoza',
    family: 'Betulaceae',
  },
  {
    latinName: 'Achillea',
    commonName: 'Krwawnik',
    family: 'Asteraceae',
  },
  {
    latinName: 'Trifolium',
    commonName: 'Koniczyna',
    family: 'Fabaceae',
  },
  {
    latinName: 'Pimpinella',
    commonName: 'Biedrzeniec',
    family: 'Apiaceae',
  },
  {
    latinName: 'Glechoma',
    commonName: 'Bluszczyk kurdybanek',
    family: 'Lamiaceae',
  },
  {
    latinName: 'Vaccinium',
    commonName: 'Borówka',
    family: 'Ericaceae',
  },
  { latinName: 'Fagus', commonName: 'Buk', family: 'Fagaceae' },
  {
    latinName: 'Artemisia',
    commonName: 'Bylica',
    family: 'Asteraceae',
  },
  {
    latinName: 'Humulus',
    commonName: 'Chmiel',
    family: 'Cannabaceae',
  },
  {
    latinName: 'Armoracia',
    commonName: 'Chrzan',
    family: 'Brassicaceae',
  },
  { latinName: 'Prunus', commonName: 'Śliwa', family: 'Rosaceae' },
  {
    latinName: 'Allium',
    commonName: 'Czosnek',
    family: 'Amaryllidaceae',
  },
  {
    latinName: 'Stachys',
    commonName: 'Czyściec',
    family: 'Lamiaceae',
  },
] as const;

export async function seedGenera(
  db: DB,
  familyMap: Map<string, string>,
) {
  const genera = generaSeed.map((g) => {
    const familyId = familyMap.get(g.family);
    if (!familyId) throw new Error(`Missing family ${g.family}`);

    return {
      latinName: g.latinName,
      commonName: g.commonName,
      familyId,
    };
  });

  await db.insert(generaTable).values(genera).onConflictDoNothing();

  const allGenera = await db
    .select({
      id: generaTable.id,
      latinName: generaTable.latinName,
      familyId: generaTable.familyId,
    })
    .from(generaTable);

  return new Map(allGenera.map((g) => [g.latinName, g]));
}
