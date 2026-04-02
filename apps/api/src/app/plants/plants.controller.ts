import { Controller, Get, Param } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantListItemDto } from '@dziki-zielnik/contracts';
import { ZodValidationPipe } from '../common/zod-validation.pipe';
import { plantSlugParamSchema, type PlantSlugParam } from '@dziki-zielnik/contracts';
import { Auth } from '../auth/decorators/auth.decorator';

@Auth('user')
@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}

  @Get()
  async getAllPlants(): Promise<PlantListItemDto[]> {
    console.log('Fetching all plants'); // Debug log to check if the method is being called
    return await this.plantsService.findAll();
  }

  @Get('/:slug')
  getPlant(
    @Param(new ZodValidationPipe(plantSlugParamSchema))
    params: PlantSlugParam
) {
    return this.plantsService.findOne(params.slug);
  }
}
