import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB, plantsTable } from '@dziki-zielnik/database';
import type { DB } from '@dziki-zielnik/database';
import { count } from 'drizzle-orm';
import { type PlantsQuery } from '@dziki-zielnik/contracts';

@Injectable()
export class PlantsRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DB) {}

  async countAll() {
    const [result] = await this.db
      .select({
        total: count(),
      })
      .from(plantsTable);

    return result.total;
  }

  async findAll(query: PlantsQuery) {
    return this.db.query.plantsTable.findMany({
      columns: {
        id: true,
        slug: true,
        latinName: true,
        commonName: true,
        protectionStatus: true,
        isEdible: true,
        isMedicinal: true,
        isPoisonous: true,
      },
      with: {
        family: {
          columns: {
            id: true,
            commonName: true,
          },
        },
        primaryPhoto: {
          columns: {
            url: true,
          },
        },
      },
      where: (plants, { eq, and, ilike, or }) => {
        const conditions = [];

        if (query.search) {
          conditions.push(
            or(
              ilike(plants.latinName, `%${query.search}%`),
              ilike(plants.commonName, `%${query.search}%`),
            ),
          );
        }

        if (query.category === 'medicinal') {
          conditions.push(eq(plants.isMedicinal, true));
        }

        if (query.category === 'edible') {
          conditions.push(eq(plants.isEdible, true));
        }

        if (query.category === 'poisonous') {
          conditions.push(eq(plants.isPoisonous, true));
        }

        return conditions.length ? and(...conditions) : undefined;
      },
    });
  }

  async findOne(slug: string) {
    return this.db.query.plantsTable.findFirst({
      columns: {
        familyId: false,
        genusId: false,
        primaryPhotoId: false,
        createdAt: false,
        updatedAt: false,
      },
      with: {
        family: {
          columns: {
            id: true,
            commonName: true,
            latinName: true,
          },
        },
        genus: {
          columns: {
            id: true,
            commonName: true,
          },
        },
        plantHabitats: {
          with: {
            habitat: {
              columns: {
                name: true,
              },
            },
          },
        },
        plantFloweringSeasons: {
          columns: {
            startMonth: true,
            endMonth: true,
          },
        },
        plantHarvestSeasons: {
          columns: {
            part: true,
            startMonth: true,
            endMonth: true,
            quality: true,
          },
        },
        primaryPhoto: {
          columns: {
            url: true,
          },
        },
        heroPhoto: {
          columns: {
            url: true,
          },
        },
        photos: {
          columns: {
            url: true,
          },
        },
      },
      where: (plants, { eq }) => eq(plants.slug, slug),
    });
  }
}
