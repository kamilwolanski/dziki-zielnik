import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlantsService } from './plants.service';
import {
  PaginatedPlantsResponse,
  PlantsQuery,
  plantsQuerySchema,
} from '@dziki-zielnik/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import {
  plantSlugParamSchema,
  type PlantSlugParam,
} from '@dziki-zielnik/contracts';
import { Auth } from '../auth/decorators/auth.decorator';

// @Auth('user')
@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Get()
  async getAllPlants(
    @Query(new ZodValidationPipe(plantsQuerySchema))
    query: PlantsQuery,
  ): Promise<PaginatedPlantsResponse> {
    console.log('Fetching all plants', query);
    return await this.plantsService.findAll(query);
  }

  @Get('/categories')
  getPlantCategories() {
    return this.plantsService.findCategories();
  }

  @Get('/:slug')
  getPlant(
    @Param(new ZodValidationPipe(plantSlugParamSchema))
    params: PlantSlugParam,
  ) {
    return this.plantsService.findOne(params.slug);
  }
}
