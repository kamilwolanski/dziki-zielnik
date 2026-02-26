import { Inject, Injectable } from '@nestjs/common';
import { DRIZZLE_DB } from '../drizzle.token.js';
import type { DB } from '../db.js';
import { plantsTable } from '@dziki-zielnik/database';

@Injectable()
export class PlantsRepository {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DB) {}

  findAll() {
    return this.db.select().from(plantsTable);
  }
}
