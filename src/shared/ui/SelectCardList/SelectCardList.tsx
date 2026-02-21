import { View, Text, Pressable } from 'react-native';

export type CardOption = {
  label: string;
  value: string;
  description?: string;
  disabled?: boolean;
};

type Props = {
  options: CardOption[];
  value: string;
  onChange: (_val: string) => void;
  loading?: boolean;
};

export function SelectCardList({
  options,
  value,
  onChange,
  loading = false,
}: Props) {
  if (loading) {
    return (
      <View>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <View
            key={item}
            className="flex-row items-start p-4 rounded-2xl mb-4 border-2 bg-white border-gray-200 animate-pulse"
          >
            <View className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 mt-1 items-center justify-center">
              <View className="w-2.5 h-2.5 rounded-full bg-gray-300" />
            </View>
            <View className="flex-1">
              <View className="h-5 w-1/2 bg-gray-300 rounded mb-2" />
              <View className="h-4 w-2/3 bg-gray-200 rounded" />
            </View>
          </View>
        ))}
      </View>
    );
  }

  return (
    <View>
      {options.map(item => {
        const isSelected = value === item.value;
        const isDisabled = item.disabled;

        return (
          <Pressable
            key={item.value}
            onPress={() => !isDisabled && onChange(item.value)}
            disabled={isDisabled}
            className="flex-row items-start p-4 rounded-2xl mb-4 border-2 bg-white border-gray-200"
          >
            <View
              className={`w-5 h-5 rounded-full border-2 mr-3 mt-1 items-center justify-center ${
                isDisabled
                  ? 'border-gray-300'
                  : isSelected
                  ? 'border-blue-500'
                  : 'border-gray-400'
              }`}
            >
              {isSelected && (
                <View className="w-2.5 h-2.5 rounded-full bg-blue-500" />
              )}
            </View>
            <View className="flex-1">
              <Text
                className={`text-base font-bold ${
                  isDisabled ? 'text-gray-400' : 'text-gray-800'
                }`}
              >
                {item.label}
              </Text>

              {item.description && (
                <Text
                  className={`text-sm mt-1 ${
                    isDisabled ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  {item.description}
                </Text>
              )}
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

export default SelectCardList;
