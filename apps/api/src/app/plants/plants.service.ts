import { PlantsRepository } from '@dziki-zielnik/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlantsService {
    constructor(private plantsRepository: PlantsRepository) {}
    
    getAllPlants() {
        return this.plantsRepository.findAll();
    }
}
