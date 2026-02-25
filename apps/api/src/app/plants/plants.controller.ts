import { Controller, Get, Inject } from '@nestjs/common';
import { DRIZZLE_DB } from '../drizzle/drizzle.module';
import * as schema from '@dziki-zielnik/database';
import type { DB } from '@dziki-zielnik/data-access';

@Controller('plants')
export class PlantsController {
  constructor(@Inject(DRIZZLE_DB) private readonly db: DB) {}
  @Get()
  findAll() {
    return this.db.select().from(schema.plantsTable);
  }
}
