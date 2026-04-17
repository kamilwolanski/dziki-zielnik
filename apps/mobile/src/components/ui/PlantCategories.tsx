import type { PlantCategory } from '@dziki-zielnik/contracts';
import { Pressable, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import Badge from './plantCard/Badge';

const categoryIcons: Record<PlantCategory['slug'], ImageSourcePropType> = {
  edible: require('../../../assets/badge/icons/parsley.png'),
  medicinal: require('../../../assets/badge/icons/medical.png'),
  poisonous: require('../../../assets/badge/icons/warning.png'),
};

type Props = {
  categories: PlantCategory[];
  selected: PlantCategory['slug'] | null;
  onSelect: (id: PlantCategory['slug'] | null) => void;
};

const PlantCategories = ({ categories, selected, onSelect }: Props) => {
  return (
    <View className="flex-row flex-wrap gap-2 mt-4">
      <Pressable onPress={() => onSelect(null)}>
        <Badge
          text="Wszystkie"
          variant="neutral"
          active={selected === null}
        />
      </Pressable>

      {categories.map((cat) => (
        <Pressable
          key={cat.slug}
          onPress={() => onSelect(cat.slug)}
        >
          <Badge
            text={cat.label}
            variant="neutral"
            iconSource={categoryIcons[cat.slug]}
            active={selected === cat.slug}
          />
        </Pressable>
      ))}
    </View>
  );
};

export default PlantCategories;
