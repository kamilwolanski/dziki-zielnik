import { PlantListItemDto } from '@dziki-zielnik/contracts';
import Badge from './Badge';
import { View, Text, Image } from 'react-native';

const PlantCard = ({
  commonName,
  latinName,
  isEdible,
  isMedicinal,
  isPoisonous,
  protectionStatus,
  primaryPhotoUrl,
}: PlantListItemDto) => {
  return (
    <View className="w-full flex-row bg-card-bg rounded-xl p-2 mb-2 shadow-xs border border-card-border">
      {primaryPhotoUrl ? (
        <Image
          source={{ uri: primaryPhotoUrl }}
          className="w-20 h-20 rounded-xl mr-4"
        />
      ) : (
        <View className="w-20 h-20 bg-green-200 rounded-xl mr-4" />
      )}
      <View className="flex-1 justify-between">
        <View>
          <Text className="font-serif-se text-base">{commonName}</Text>
          <Text className="text-text-muted text-sm">{latinName}</Text>
        </View>
        <View className="flex-row">
          {isEdible && (
            <Badge
              text="Jadalne"
              variant="success"
              iconSource={require('../../../../assets/badge/icons/parsley.png')}
            />
          )}
          {isMedicinal && (
            <Badge
              text="Lecznicze"
              variant="primary"
              iconSource={require('../../../../assets/badge/icons/medical.png')}
            />
          )}
          {isPoisonous && (
            <Badge
              text="Trujące"
              variant="danger"
              iconSource={require('../../../../assets/badge/icons/warning.png')}
            />
          )}
          {protectionStatus !== 'none' && (
            <Badge
              text={protectionStatus === 'strict' ? 'Chronione' : 'Częściowo chronione'}
              variant="info"
              iconSource={require('../../../../assets/badge/icons/shield.png')}
            />
          )}
        </View>
      </View>
    </View>
  );
};

export default PlantCard;
