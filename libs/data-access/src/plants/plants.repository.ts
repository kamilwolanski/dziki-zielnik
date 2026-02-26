import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB } from '../drizzle.token.js';
import type { DB } from '../db.js';

@Injectable()
export class PlantsRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DB) {}

  findAll() {
    return this.db.query.plantsTable.findMany({
      columns: {
        id: true,
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
    });
  }
}
