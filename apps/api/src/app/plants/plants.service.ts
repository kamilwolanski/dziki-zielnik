import { type PlantListItemDto, plantListItemSchema, plantDetailsSchema, type PlantDetailsDto } from '@dziki-zielnik/contracts';
import { PlantsRepository } from '@dziki-zielnik/data-access';
import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class PlantsService {
  constructor(private plantsRepository: PlantsRepository) {}

  async findAll(): Promise<PlantListItemDto[]> {
    const plants = await this.plantsRepository.findAll();
    const mapped = plants.map((p) => ({
      id: p.id,
      slug: p.slug,
      latinName: p.latinName,
      commonName: p.commonName,
      familyCommonName: p.family.commonName,
      primaryPhotoUrl: p.primaryPhoto?.url ?? null,
      isMedicinal: p.isMedicinal,
      isEdible: p.isEdible,
      isPoisonous: p.isPoisonous,
      protectionStatus: p.protectionStatus,
    }));

    return plantListItemSchema.array().parse(mapped);
  }

  async findOne(slug: string): Promise<PlantDetailsDto> {
    const plant = await this.plantsRepository.findOne(slug)

    if(!plant) {
      throw new NotFoundException('Plant not found');
    }

    const mapped = {
      id: plant.id,
      slug: plant.slug,
      latinName: plant.latinName,
      commonName: plant.commonName,
      description: plant.description,
      familyCommonName: plant.family.commonName,
      genusCommonName: plant.genus.commonName,
      plantHabitats: plant.plantHabitats.map(plantHabitat => plantHabitat.habitat.name),
      floweringSeasons: plant.plantFloweringSeasons,
      harvestSeasons: plant.plantHarvestSeasons,
      primaryPhotoUrl: plant.primaryPhoto?.url ?? null,
      photosUrls: plant.photos.map(photo => photo.url),
      isMedicinal: plant.isMedicinal,
      isEdible: plant.isEdible,
      isPoisonous: plant.isPoisonous,
      protectionStatus: plant.protectionStatus,
    }

    return plantDetailsSchema.parse(mapped)
  }
}
