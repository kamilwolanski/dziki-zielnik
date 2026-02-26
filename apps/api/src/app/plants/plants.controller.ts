import { Controller, Get } from '@nestjs/common';
import { PlantsService } from './plants.service';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}
  @Get()
  getAllPlants() {
    return this.plantsService.getAllPlants();
  }
}
