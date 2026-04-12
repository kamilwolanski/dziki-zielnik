import { View, TextInput, Image } from 'react-native';
import { useCSSVariable } from 'uniwind';

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchInput = ({ value, onChange }: SearchInputProps) => {
  const colorMuted = useCSSVariable('--color-input-placeholder');

  return (
    <View className="w-full flex-row items-center bg-input-bg px-4 rounded-2xl border border-input-border">
      <Image
        source={require('../../../assets/images/magnifying-glass.png')}
        style={{ width: 15, height: 15 }}
      />
      <TextInput
        value={value}
        onChangeText={onChange}
        placeholder="Szukaj po nazwie..."
        placeholderTextColor={String(colorMuted)}
        textAlignVertical="center"
        className="flex-1 text-base mx-2 text-input-text"
      />
    </View>
  );
};

export default SearchInput;
