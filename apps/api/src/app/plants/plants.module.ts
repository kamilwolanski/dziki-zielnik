import { Module } from '@nestjs/common';
import { PlantsController } from './plants.controller';
import { PlantsService } from './plants.service';
import { DrizzleModule } from '../drizzle/drizzle.module';
import { PlantsRepository } from '@dziki-zielnik/data-access';

@Module({
  imports: [DrizzleModule],
  controllers: [PlantsController],
  providers: [PlantsService, PlantsRepository],
})
export class PlantsModule {}
