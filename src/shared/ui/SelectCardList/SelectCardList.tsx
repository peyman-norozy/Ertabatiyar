import { View, Pressable } from 'react-native';
import { SelectPicker, Text } from '@/shared/ui';
import { useZonesContext } from '@/context/ZonesContext';
import { useTranslation } from 'react-i18next';

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
  enterDelay: string;
  exitDelay: string;
  setEnterDelay: any;
  setExitDelay: any;
};

export function SelectCardList({
  options,
  value,
  onChange,
  loading = false,
  enterDelay,
  exitDelay,
  setEnterDelay,
  setExitDelay,
}: Props) {
  const { systemStatus } = useZonesContext();
  const { t } = useTranslation();
  const isSystemOn = systemStatus;

  const delayOptions = [
    { label: t('seconds', { count: 0 }), value: '0' },
    { label: t('seconds', { count: 30 }), value: '30' },
    { label: t('seconds', { count: 60 }), value: '60' },
    { label: t('seconds', { count: 90 }), value: '90' },
    { label: t('seconds', { count: 120 }), value: '120' },
  ];

  if (loading) {
    return (
      <View>
        {[1, 2, 3, 4, 5, 6].map(item => (
          <View
            key={item}
            className="flex-row items-start p-4 rounded-2xl mb-4 border-2 bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 animate-pulse"
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
    <View className="p-4 rounded-2xl mb-4 border-2 bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800">
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
                !isLast
                  ? 'border-b border-gray-200 dark:border-neutral-800'
                  : ''
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
                    isDisabled
                      ? 'text-gray-400 dark:text-gray-500'
                      : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {item.label}
                </Text>

                {item.description && (
                  <Text
                    font={'font-yekan-medium'}
                    className={`text-sm mt-1 ${
                      isDisabled
                        ? 'text-gray-400 dark:text-gray-500'
                        : 'text-gray-500 dark:text-gray-400'
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
                !isLast
                  ? 'border-b border-gray-200 dark:border-neutral-800'
                  : ''
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
                    isDisabled
                      ? 'text-gray-400 dark:text-gray-500'
                      : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {item.label}
                </Text>

                {item.description && (
                  <Text
                    font={'font-yekan-medium'}
                    className={`text-sm mt-1 ${
                      isDisabled
                        ? 'text-gray-400 dark:text-gray-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {item.description}
                  </Text>
                )}
              </View>
            </Pressable>
          );
        } else if (isSystemOn === 'ARM') {
          return (
            <Pressable
              key={item.value}
              onPress={() => !isDisabled && onChange(item.value)}
              disabled={isDisabled}
              className={`flex-row items-start mt-4 pb-4 ${
                !isLast
                  ? 'border-b border-gray-200 dark:border-neutral-800'
                  : ''
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
                    isDisabled
                      ? 'text-gray-400 dark:text-gray-500'
                      : 'text-gray-800 dark:text-white'
                  }`}
                >
                  {item.label}
                </Text>

                {item.description && (
                  <Text
                    font={'font-yekan-medium'}
                    className={`text-sm mt-1 ${
                      isDisabled
                        ? 'text-gray-400 dark:text-gray-500'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {item.description}
                  </Text>
                )}
                {item.value === 'D' && isSelected && (
                  <View
                    className="flex-1"
                    style={{
                      zIndex: isSelected ? 9999 : 1,
                      overflow: 'visible',
                    }}
                  >
                    <View className="mt-4">
                      <Text className="text-[#020202] text-sm">
                        {t('general.connection_delay')}
                      </Text>
                      <SelectPicker
                        options={delayOptions}
                        selectedValue={enterDelay}
                        onValueChange={newValue => {
                          setEnterDelay(newValue);
                        }}
                        zIndex={5000}
                      />
                    </View>
                    <View className="mt-4">
                      <Text className="text-[#020202] text-sm">
                        {t('general.disconnection_delay')}
                      </Text>
                      <SelectPicker
                        options={delayOptions}
                        selectedValue={exitDelay}
                        onValueChange={newValue => setExitDelay(newValue)}
                        zIndex={4000}
                      />
                    </View>
                  </View>
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
