import { Controller, Get } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantListItemDto, plantListItemSchema } from '@dziki-zielnik/contracts';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}
  @Get()
  async getAllPlants(): Promise<PlantListItemDto[]> {
    const plants = await this.plantsService.findAll();
    return plantListItemSchema.array().parse(plants);
  }
}
