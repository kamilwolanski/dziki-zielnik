import { Controller, Get, Param, Query } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PaginatedPlantsResponse } from '@dziki-zielnik/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { plantSlugParamSchema, type PlantSlugParam } from '@dziki-zielnik/contracts';
import { Auth } from '../auth/decorators/auth.decorator';

@Auth('user')
@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Get()
  async getAllPlants(@Query('search') search?: string): Promise<PaginatedPlantsResponse> {
    console.log('Fetching all plants', search); 
    return await this.plantsService.findAll(search);
  }

  @Get('/:slug')
  getPlant(
    @Param(new ZodValidationPipe(plantSlugParamSchema))
    params: PlantSlugParam
) {
    return this.plantsService.findOne(params.slug);
  }
}
