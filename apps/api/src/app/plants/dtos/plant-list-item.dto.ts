export class PlantListItemDto {
  id!: string;
  latinName!: string;
  commonName!: string;
  familyCommonName!: string;
  primaryPhotoUrl!: string | null;
  isMedicinal!: boolean;
  isEdible!: boolean;
  isPoisonous!: boolean;
  protectionStatus!: 'none' | 'partial' | 'strict';
}
