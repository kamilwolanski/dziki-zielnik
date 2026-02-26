import { PlantsRepository } from '@dziki-zielnik/data-access';
import { Injectable } from '@nestjs/common';
import { PlantListItemDto } from './dtos/plant-list-item.dto';

@Injectable()
export class PlantsService {
  constructor(private plantsRepository: PlantsRepository) {}

  async findAll(): Promise<PlantListItemDto[]> {
    const plants = await this.plantsRepository.findAll();
    return plants.map((p) => {
      const dto = new PlantListItemDto();
      dto.id = p.id;
      dto.latinName = p.latinName;
      dto.commonName = p.commonName;
      dto.familyCommonName = p.family.commonName;
      dto.primaryPhotoUrl = p.primaryPhoto?.url ?? null;
      dto.isMedicinal = p.isMedicinal;
      dto.isEdible = p.isEdible;
      dto.isPoisonous = p.isPoisonous;
      dto.protectionStatus = p.protectionStatus;
      return dto;
    });
  }
}
