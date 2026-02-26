import { Controller, Get } from '@nestjs/common';
import { PlantsService } from './plants.service';
import { PlantListItemDto } from './dtos/plant-list-item.dto';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}
  @Get()
  getAllPlants(): Promise<PlantListItemDto[]> {
    return this.plantsService.findAll();
  }
}
