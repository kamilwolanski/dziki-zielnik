import { eq } from 'drizzle-orm';
import { HabitatName } from './habitats.seed.js';
import {
  plantsTable,
  plantHabitatsTable,
  plantFloweringSeasonsTable,
  plantHarvestSeasonsTable,
  PlantPart
} from '@dziki-zielnik/database';
import type { DB } from '@dziki-zielnik/data-access';

export async function seedPlants(
  db: DB,
  genusMap: Map<
    string,
    {
      id: string;
      familyId: string;
    }
  >,
  habitatMap: Map<string, string>,
) {
  const plantsSeed = [
    {
      latinName: 'Betula pendula',
      commonName: 'Brzoza brodawkowata',
      genus: 'Betula',
      description: 'Drzewo liściaste o białej korze.',
      heightMinCm: 1000,
      heightMaxCm: 2500,
      isMedicinal: true,
      isEdible: false,
      isPoisonous: false,
      protectionStatus: 'none' as const,
      habitats: ['Las mieszany', 'Skraj lasu'] as const satisfies HabitatName[],
      flowering: { start: 4, end: 5 },
      harvest: [
        {
          part: 'sap' as const satisfies PlantPart,
          start: 3,
          end: 3,
          quality: 'optimal' as const,
        },
        {
          part: 'sap' as const satisfies PlantPart,
          start: 4,
          end: 4,
          quality: 'secondary' as const,
        },
      ],
    },
  ] as const;

  for (const plant of plantsSeed) {
    const genus = genusMap.get(plant.genus);

    if (!genus?.id) {
      throw new Error(
        `Missing genus "${plant.genus}" for plant ${plant.latinName}`,
      );
    }

    const [inserted] = await db
      .insert(plantsTable)
      .values({
        latinName: plant.latinName,
        commonName: plant.commonName,
        description: plant.description,
        familyId: genus.familyId,
        genusId: genus.id,
        heightMinCm: plant.heightMinCm,
        heightMaxCm: plant.heightMaxCm,
        isMedicinal: plant.isMedicinal,
        isEdible: plant.isEdible,
        isPoisonous: plant.isPoisonous,
        protectionStatus: plant.protectionStatus,
      })
      .onConflictDoNothing()
      .returning({ id: plantsTable.id });

    const plantId =
      inserted?.id ??
      (
        await db
          .select({ id: plantsTable.id })
          .from(plantsTable)
          .where(eq(plantsTable.latinName, plant.latinName))
      )[0]?.id;

    if (!plantId) {
      throw new Error(`Could not resolve plantId for ${plant.latinName}`);
    }

    const habitatIds = plant.habitats.map((h) => {
      const id = habitatMap.get(h);
      if (!id) {
        throw new Error(`Missing habitat "${h}" for plant ${plant.latinName}`);
      }
      return { plantId: plantId, habitatId: id };
    });

    await db
      .insert(plantHabitatsTable)
      .values(habitatIds)
      .onConflictDoNothing();

    await db
      .insert(plantFloweringSeasonsTable)
      .values({
        plantId: plantId,
        startMonth: plant.flowering.start,
        endMonth: plant.flowering.end,
      })
      .onConflictDoNothing();

    await db
      .insert(plantHarvestSeasonsTable)
      .values(
        plant.harvest.map((h) => ({
          plantId: plantId,
          part: h.part,
          startMonth: h.start,
          endMonth: h.end,
          quality: h.quality,
        })),
      )
      .onConflictDoNothing();
  }
}
