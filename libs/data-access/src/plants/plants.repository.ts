import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB, plantsTable } from '@dziki-zielnik/database';
import type { DB } from '@dziki-zielnik/database';
import { count } from "drizzle-orm";

@Injectable()
export class PlantsRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DB) {}

  async countAll() {
    const [result] = await this.db.select({
      total: count()
    })
    .from(plantsTable);
    
    return result.total;
  }

  async findAll(search?: string) {
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
      where: search
        ? (plants, { or, ilike }) =>
            or(
              ilike(plants.latinName, `%${search}%`),
              ilike(plants.commonName, `%${search}%`),
            )
        : undefined,
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
          },
        },
        genus: {
          columns: {
            id: true,
            commonName: true,
          }
        },
        plantHabitats: {
          with: {
            habitat: {
              columns: {
                name: true
              }
            }
          }
        },
        plantFloweringSeasons: {
          columns: {
            startMonth: true,
            endMonth: true
          }
        },
        plantHarvestSeasons: {
          columns: {
            part: true,
            startMonth: true,
            endMonth: true,
            quality: true,
          }
        },
        primaryPhoto: {
          columns: {
            url: true,
          },
        },
        photos: {
          columns: {
            url: true
          }
        }
      },
      where: (plants, { eq }) => eq(plants.slug, slug),
    });
  }
}
