import { PlantListItemDto } from '@dziki-zielnik/contracts';
import { PlantsRepository } from '@dziki-zielnik/data-access';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PlantsService {
  constructor(private plantsRepository: PlantsRepository) {}

  async findAll(): Promise<PlantListItemDto[]> {
    const plants = await this.plantsRepository.findAll();
    return plants.map((p) => ({
      id: p.id,
      latinName: p.latinName,
      commonName: p.commonName,
      familyCommonName: p.family.commonName,
      primaryPhotoUrl: p.primaryPhoto?.url ?? null,
      isMedicinal: p.isMedicinal,
      isEdible: p.isEdible,
      isPoisonous: p.isPoisonous,
      protectionStatus: p.protectionStatus,
    }));
  }
}
