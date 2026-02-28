import { Controller, Get } from '@nestjs/common';
import { PlantsService } from './plants.service';
import {
  PlantListItemDto,
} from '@dziki-zielnik/contracts';

@Controller('plants')
export class PlantsController {
  constructor(private plantsService: PlantsService) {}
  @Get()
  async getAllPlants(): Promise<PlantListItemDto[]> {
    return await this.plantsService.findAll();
  }
}
