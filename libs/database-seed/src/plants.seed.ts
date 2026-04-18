import { and, eq } from 'drizzle-orm';
import { HabitatName } from './habitats.seed.js';
import {
  plantsTable,
  plantHabitatsTable,
  plantFloweringSeasonsTable,
  plantHarvestSeasonsTable,
  PlantPart,
  DB,
  plantPhotosTable,
} from '@dziki-zielnik/database';

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
      slug: 'brzoza-brodawkowata',
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
      thumbnailUrl:
        'https://dzikizielnikapp.s3.eu-north-1.amazonaws.com/plants/brzoza-brodawkowata/birch_thumb_2x.png',
    },
    {
      latinName: 'Urtica dioica',
      commonName: 'Pokrzywa zwyczajna',
      slug: 'pokrzywa-zwyczajna',
      genus: 'Urtica',
      description:
        'Bylina parząca, szeroko rozpowszechniona, o wszechstronnym zastosowaniu leczniczym i kulinarnym.',
      heightMinCm: 30,
      heightMaxCm: 150,
      isMedicinal: true,
      isEdible: true,
      isPoisonous: false,
      protectionStatus: 'none' as const,
      habitats: [
        'Las mieszany',
        'Skraj lasu',
        'Nieużytek',
        'Ogród',
      ] as const satisfies HabitatName[],
      flowering: { start: 6, end: 9 },
      harvest: [
        {
          part: 'leaf' as const satisfies PlantPart,
          start: 4,
          end: 5,
          quality: 'optimal' as const,
        },
        {
          part: 'herb' as const satisfies PlantPart,
          start: 6,
          end: 8,
          quality: 'secondary' as const,
        },
        {
          part: 'root' as const satisfies PlantPart,
          start: 10,
          end: 11,
          quality: 'optimal' as const,
        },
        {
          part: 'seed' as const satisfies PlantPart,
          start: 8,
          end: 10,
          quality: 'optimal' as const,
        },
      ],
      thumbnailUrl:
        'https://dzikizielnikapp.s3.eu-north-1.amazonaws.com/plants/pokrzywa/nettle_thumb_2x.png',
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
        slug: plant.slug,
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

    const existingPhoto = (
      await db
        .select({ id: plantPhotosTable.id })
        .from(plantPhotosTable)
        .where(
          and(
            eq(plantPhotosTable.plantId, plantId),
            eq(plantPhotosTable.url, plant.thumbnailUrl),
          ),
        )
    )[0];

    const [insertedPhoto] = existingPhoto
      ? [existingPhoto]
      : await db
          .insert(plantPhotosTable)
          .values({
            url: plant.thumbnailUrl,
            plantId: plantId,
          })
          .returning({ id: plantPhotosTable.id });

    await db
      .update(plantsTable)
      .set({ primaryPhotoId: insertedPhoto.id })
      .where(eq(plantsTable.id, plantId));
  }
}
