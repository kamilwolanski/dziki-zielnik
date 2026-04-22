import {
  plantDetailsSchema,
  type PlantDetailsDto,
  type PaginatedPlantsResponse,
  paginatedPlantListItemSchema,
  type PlantCategory,
  type PlantsQuery,
} from '@dziki-zielnik/contracts';
import { PlantsRepository } from '@dziki-zielnik/data-access';
import { Injectable, NotFoundException } from '@nestjs/common';


@Injectable()
export class PlantsService {
  constructor(private plantsRepository: PlantsRepository) {}

  private readonly categories: PlantCategory[] = [
    { slug: 'medicinal', label: 'Lecznicze' },
    { slug: 'edible', label: 'Jadalne' },
    { slug: 'poisonous', label: 'Trujące' },
  ];

  async findAll(query: PlantsQuery): Promise<PaginatedPlantsResponse> {
    const [plants, total] = await Promise.all([
      this.plantsRepository.findAll(query),
      this.plantsRepository.countAll(),
    ]);

    const meta = {
      totalItems: total,
    };
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

    return paginatedPlantListItemSchema.parse({
      data: mapped,
      meta: meta,
    });
  }

  async findOne(slug: string): Promise<PlantDetailsDto> {
    const plant = await this.plantsRepository.findOne(slug);
    console.log('found plant', plant);
    if (!plant) {
      throw new NotFoundException('Plant not found');
    }

    const mapped = {
      id: plant.id,
      slug: plant.slug,
      latinName: plant.latinName,
      commonName: plant.commonName,
      description: plant.description,
      familyCommonName: plant.family.commonName,
      familyLatinName: plant.family.latinName,
      genusCommonName: plant.genus.commonName,
      plantHabitats: plant.plantHabitats.map(
        (plantHabitat) => plantHabitat.habitat.name,
      ),
      floweringSeasons: plant.plantFloweringSeasons,
      harvestSeasons: plant.plantHarvestSeasons,
      primaryPhotoUrl: plant.primaryPhoto?.url ?? null,
      heroPhotoUrl: plant.heroPhoto?.url ?? null,
      photosUrls: plant.photos.map((photo) => photo.url),
      isMedicinal: plant.isMedicinal,
      isEdible: plant.isEdible,
      isPoisonous: plant.isPoisonous,
      protectionStatus: plant.protectionStatus,
      heightMinCm: plant.heightMinCm,
      heightMaxCm: plant.heightMaxCm,
    };

    return plantDetailsSchema.parse(mapped);
  }

  findCategories() {
    return this.categories;
  }
}
