import { View, Pressable } from 'react-native';
import { Text } from '@/shared/ui';
import { useZonesContext } from '@/context/ZonesContext';

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
  const { system } = useZonesContext();
  const isSystemOn = system['SYS'];

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

  console.log(isSystemOn, 'sdfjueuegffgtrt');

  return (
    <View className="p-4 rounded-2xl mb-4 border-2 bg-white border-gray-200">
      {options.map((item, index) => {
        const isSelected = value === item.value;
        const isDisabled = item.disabled;
        const isLast = index === options.length - 1;

        if (
          isSystemOn === 'DISARM' &&
          (item.value === 'OFF' || item.value === '24H')
        ) {
          return (
            <Pressable
              key={item.value}
              onPress={() => !isDisabled && onChange(item.value)}
              disabled={isDisabled}
              className={`flex-row items-start mt-4 pb-4 ${
                !isLast ? 'border-b border-gray-200' : ''
              }`}
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
                  font={'font-yekan-semibold'}
                  className={`${
                    isDisabled ? 'text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {item.label}
                </Text>

                {item.description && (
                  <Text
                    font={'font-yekan-medium'}
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
        } else if (
          isSystemOn === 'SEMIARM' &&
          (item.value === 'OFF' || item.value === '24H' || item.value === 'N')
        ) {
          return (
            <Pressable
              key={item.value}
              onPress={() => !isDisabled && onChange(item.value)}
              disabled={isDisabled}
              className={`flex-row items-start mt-4 pb-4 ${
                !isLast ? 'border-b border-gray-200' : ''
              }`}
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
                  font={'font-yekan-semibold'}
                  className={`${
                    isDisabled ? 'text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {item.label}
                </Text>

                {item.description && (
                  <Text
                    font={'font-yekan-medium'}
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
        } else {
          return (
            <Pressable
              key={item.value}
              onPress={() => !isDisabled && onChange(item.value)}
              disabled={isDisabled}
              className={`flex-row items-start mt-4 pb-4 ${
                !isLast ? 'border-b border-gray-200' : ''
              }`}
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
                  font={'font-yekan-semibold'}
                  className={`${
                    isDisabled ? 'text-gray-400' : 'text-gray-800'
                  }`}
                >
                  {item.label}
                </Text>

                {item.description && (
                  <Text
                    font={'font-yekan-medium'}
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
        }
      })}
    </View>
  );
}

export default SelectCardList;
